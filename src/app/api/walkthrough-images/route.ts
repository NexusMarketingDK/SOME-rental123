import { NextResponse } from "next/server";
import { scrapePropertyUrl } from "@/services/scrape-property";
import type { RoomKey, Scene } from "@/components/walkthrough/cinematic-walkthrough";

// Demo listing for the landing-page walkthrough prototype.
// Hardcoded server-side so this endpoint can't be used as an open scrape proxy.
const LISTING_URL =
  "https://www.ferieboliger.dk/feriebolig-90-4813?fromdate=25.07.2026&todate=01.08.2026";

const SCRAPE_TIMEOUT_MS = 15_000;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

// Natural tour order used both for sorting classified photos and for
// assigning room labels to unclassified ones.
const TOUR_ORDER: RoomKey[] = [
  "facade", "entrance", "kitchen", "living", "bedroom", "bathroom", "terrace",
];

// Keywords (da/en/es/de) matched against image URLs to classify rooms.
const ROOM_KEYWORDS: Record<RoomKey, RegExp> = {
  facade: /facade|exterior|fassade|fachada|front|villa|house|hus/i,
  entrance: /entrance|entre|entrada|eingang|hall|flur/i,
  kitchen: /kitchen|koekken|k%C3%B8kken|cocina|kueche|k%C3%BCche/i,
  living: /living|stue|salon|sal%C3%B3n|wohnzimmer|lounge/i,
  bedroom: /bed|sovev|dormitorio|schlaf/i,
  bathroom: /bath|badev|ba%C3%B1o|bano|badezimmer|shower|wc/i,
  terrace: /terra|pool|garden|have|jardin|patio|balcon|outdoor/i,
};

// Curated photo placeholders — Spanish villa/apartment style matching the demo listing.
// Hotlinked from Unsplash; the client preloads and only swaps them in if they load.
const PHOTO_FALLBACK: Scene[] = [
  { src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=90", roomKey: "facade" },
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=90", roomKey: "entrance" },
  { src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=90", roomKey: "kitchen" },
  { src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=90", roomKey: "living" },
  { src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1600&q=90", roomKey: "bedroom" },
  { src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=90", roomKey: "bathroom" },
  { src: "https://images.unsplash.com/photo-1601084881623-cbe9425f1297?auto=format&fit=crop&w=1600&q=90", roomKey: "terrace" },
];

// Hardcoded demo metadata shown when live scrape fails.
const DEMO_META = {
  title: "Strandnær villa · Alicante, Spanien",
  location: "Alicante, Spanien",
  price: "€149 / nat",
  guests: "6 gæster",
  beds: "3 soveværelser",
  baths: "2 badeværelser",
  rating: "4.94",
  reviews: "87 anmeldelser",
};

type Payload = {
  source: "listing" | "placeholder";
  title?: string;
  location?: string;
  price?: string;
  guests?: string;
  beds?: string;
  baths?: string;
  rating?: string;
  reviews?: string;
  scenes: Scene[];
};

let cache: { at: number; payload: Payload } | null = null;

function looksLikePhoto(url: string): boolean {
  if (/\.(svg|gif)(\?|$)/i.test(url)) return false;
  if (/logo|icon|favicon|sprite|badge|avatar|map|pixel/i.test(url)) return false;
  return true;
}

/** Sort scraped photos into a natural tour order and assign room labels. */
function buildScenes(imageUrls: string[]): Scene[] {
  const photos = imageUrls.filter(looksLikePhoto).slice(0, 14);

  const classified = new Map<RoomKey, string>();
  const unclassified: string[] = [];
  for (const url of photos) {
    const key = TOUR_ORDER.find(
      (k) => ROOM_KEYWORDS[k].test(url) && !classified.has(k),
    );
    if (key) classified.set(key, url);
    else unclassified.push(url);
  }

  // Walk the tour: use the classified photo for each room when we have one,
  // otherwise fill with the next unclassified photo in listing order.
  const scenes: Scene[] = [];
  for (const key of TOUR_ORDER) {
    const src = classified.get(key) ?? unclassified.shift();
    if (src) scenes.push({ src, roomKey: key });
  }
  return scenes;
}

export async function GET() {
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) {
    return NextResponse.json(cache.payload, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
    });
  }

  let payload: Payload = { source: "placeholder", scenes: PHOTO_FALLBACK, ...DEMO_META };

  try {
    const result = await Promise.race([
      scrapePropertyUrl(LISTING_URL),
      new Promise<{ data?: undefined }>((resolve) =>
        setTimeout(() => resolve({}), SCRAPE_TIMEOUT_MS),
      ),
    ]);

    if (result.data?.imageUrls?.length) {
      const scenes = buildScenes(result.data.imageUrls);
      if (scenes.length >= 4) {
        payload = {
          ...DEMO_META,
          source: "listing",
          title: result.data.title ?? DEMO_META.title,
          location: result.data.location ?? DEMO_META.location,
          scenes,
        };
      }
    }
  } catch {
    // Scrape failed — placeholder payload stands.
  }

  cache = { at: Date.now(), payload };
  return NextResponse.json(payload, {
    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
  });
}
