"use server";

export type ScrapedProperty = {
  title?: string;
  description?: string;
  location?: string;
  imageUrls: string[];
  price?: string;
  size?: string;
  conditions?: string;
};

function getMeta(html: string, property: string): string | undefined {
  const m =
    html.match(new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, "i")) ??
    html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`, "i")) ??
    html.match(new RegExp(`<meta[^>]+name=["']${property}["'][^>]+content=["']([^"']+)["']`, "i")) ??
    html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${property}["']`, "i"));
  return m?.[1] ? decodeHTMLEntities(m[1]) : undefined;
}

function decodeHTMLEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function extractImages(html: string): string[] {
  const images: string[] = [];

  // og:image tags
  const ogRe = /<meta[^>]+(?:property=["']og:image["'][^>]+content=["']([^"']+)["']|content=["']([^"']+)["'][^>]+property=["']og:image["'])/gi;
  let m;
  while ((m = ogRe.exec(html)) !== null) {
    const url = m[1] ?? m[2];
    if (url && url.startsWith("http") && !images.includes(url)) images.push(url);
  }

  // JSON-LD images
  const jsonLdRe = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  while ((m = jsonLdRe.exec(html)) !== null) {
    try {
      const data = JSON.parse(m[1]);
      const extract = (obj: unknown) => {
        if (!obj || typeof obj !== "object") return;
        if (Array.isArray(obj)) { obj.forEach(extract); return; }
        const o = obj as Record<string, unknown>;
        if (typeof o.image === "string" && o.image.startsWith("http") && !images.includes(o.image)) images.push(o.image);
        if (Array.isArray(o.image)) o.image.forEach((img) => { if (typeof img === "string" && img.startsWith("http") && !images.includes(img)) images.push(img); });
        Object.values(o).forEach(extract);
      };
      extract(data);
    } catch {}
  }

  return images.slice(0, 20);
}

function extractJsonLdField(html: string, ...keys: string[]): string | undefined {
  const jsonLdRe = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = jsonLdRe.exec(html)) !== null) {
    try {
      const data = JSON.parse(m[1]);
      const search = (obj: unknown): string | undefined => {
        if (!obj || typeof obj !== "object") return;
        if (Array.isArray(obj)) { for (const item of obj) { const r = search(item); if (r) return r; } return; }
        const o = obj as Record<string, unknown>;
        for (const key of keys) {
          if (typeof o[key] === "string" && o[key]) return o[key] as string;
          if (typeof o[key] === "number") return String(o[key]);
        }
        for (const val of Object.values(o)) { const r = search(val); if (r) return r; }
      };
      const result = search(data);
      if (result) return result;
    } catch {}
  }
}

function extractSize(text: string): string | undefined {
  const m = text.match(/(\d+[\.,]?\d*)\s*m[²2]/i);
  if (m) return `${m[1]} m²`;
}

function extractPrice(html: string, text: string): string | undefined {
  // JSON-LD price
  const jld = extractJsonLdField(html, "price", "lowPrice", "highPrice");
  if (jld) return jld;

  // meta price
  const metaPrice = getMeta(html, "product:price:amount") ?? getMeta(html, "og:price:amount");
  if (metaPrice) return metaPrice;

  // text pattern: kr, DKK, €, $
  const m = text.match(/(\d[\d\s.,]*)\s*(kr\.?|DKK|€|\$)/i) ?? text.match(/(kr\.?|DKK|€|\$)\s*(\d[\d\s.,]*)/i);
  if (m) return m[0].trim();
}

function extractConditions(html: string): string | undefined {
  // Look for house rules / betingelser sections
  const patterns = [
    /house rules?[\s\S]{0,50}?<[^>]+>([\s\S]{50,800}?)<\/(div|section|ul|p)/i,
    /husregler[\s\S]{0,50}?<[^>]+>([\s\S]{50,500}?)<\/(div|section|ul|p)/i,
    /betingelser[\s\S]{0,50}?<[^>]+>([\s\S]{50,500}?)<\/(div|section|ul|p)/i,
    /cancellation policy[\s\S]{0,50}?<[^>]+>([\s\S]{50,500}?)<\/(div|section|ul|p)/i,
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m?.[1]) {
      return m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 600);
    }
  }
}

export async function scrapePropertyUrl(url: string): Promise<{ data?: ScrapedProperty; error?: string }> {
  if (!url || !url.startsWith("http")) return { error: "Ugyldig URL" };

  let html: string;
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "da,en;q=0.9",
      },
      signal: AbortSignal.timeout(12_000),
    });
    if (!res.ok) return { error: `Siden svarede med status ${res.status}` };
    html = await res.text();
  } catch {
    return { error: "Kunne ikke hente siden. Tjek URL og prøv igen." };
  }

  const plainText = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

  const title =
    getMeta(html, "og:title") ??
    html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim();

  const description =
    getMeta(html, "og:description") ??
    getMeta(html, "description") ??
    extractJsonLdField(html, "description");

  const location =
    getMeta(html, "og:locality") ??
    extractJsonLdField(html, "addressLocality", "addressRegion", "address");

  const imageUrls = extractImages(html);
  const price = extractPrice(html, plainText);
  const size = extractSize(plainText);
  const conditions = extractConditions(html);

  return {
    data: {
      title: title ? decodeHTMLEntities(title).slice(0, 200) : undefined,
      description: description ? decodeHTMLEntities(description).slice(0, 2000) : undefined,
      location: location ? decodeHTMLEntities(String(location)).slice(0, 200) : undefined,
      imageUrls,
      price,
      size,
      conditions,
    },
  };
}
