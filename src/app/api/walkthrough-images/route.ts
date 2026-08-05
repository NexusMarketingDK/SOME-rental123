import { NextResponse } from "next/server";
import type { Scene } from "@/components/walkthrough/cinematic-walkthrough";

// ── Curated, high-resolution demo tour ──────────────────────────────────────
// Professional Spanish villa/apartment photos served at 2560px, q=90. This
// resolution keeps every room razor-sharp even under the walkthrough's Ken
// Burns zoom (up to ~1.65×) on high-DPI / retina screens, where the canvas
// backing store is 2–3× the CSS size.
//
// We serve curated photos rather than scraping the live listing so the demo's
// quality is guaranteed — scraped listing thumbnails are often too small and
// look soft once magnified.
const HI_RES = "auto=format&fit=crop&w=2560&q=90";

const PHOTO_SCENES: Scene[] = [
  { src: `https://images.unsplash.com/photo-1570129477492-45c003edd2be?${HI_RES}`, roomKey: "facade" },
  { src: `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?${HI_RES}`, roomKey: "entrance" },
  { src: `https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?${HI_RES}`, roomKey: "kitchen" },
  { src: `https://images.unsplash.com/photo-1586023492125-27b2c045efd7?${HI_RES}`, roomKey: "living" },
  { src: `https://images.unsplash.com/photo-1631049307264-da0ec9d70304?${HI_RES}`, roomKey: "bedroom" },
  { src: `https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?${HI_RES}`, roomKey: "bathroom" },
  { src: `https://images.unsplash.com/photo-1601084881623-cbe9425f1297?${HI_RES}`, roomKey: "terrace" },
];

// Demo listing metadata. Raw numbers only — the client component appends
// locale-aware unit labels.
const DEMO_META = {
  title: "Strandnær villa · Alicante, Spanien",
  location: "Alicante, Spanien",
  price: "€149",
  guests: "6",
  beds: "3",
  baths: "2",
  rating: "4.94",
  reviews: "87",
};

export async function GET() {
  return NextResponse.json(
    { source: "placeholder", scenes: PHOTO_SCENES, ...DEMO_META },
    {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}
