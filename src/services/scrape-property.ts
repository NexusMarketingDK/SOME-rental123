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

function decodeHTMLEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ");
}

function getMeta(html: string, property: string): string | undefined {
  const m =
    html.match(new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, "i")) ??
    html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`, "i")) ??
    html.match(new RegExp(`<meta[^>]+name=["']${property}["'][^>]+content=["']([^"']+)["']`, "i")) ??
    html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${property}["']`, "i"));
  return m?.[1] ? decodeHTMLEntities(m[1]) : undefined;
}

function extractImages(html: string): string[] {
  const images: string[] = [];
  const ogRe = /<meta[^>]+(?:property=["']og:image["'][^>]+content=["']([^"']+)["']|content=["']([^"']+)["'][^>]+property=["']og:image["'])/gi;
  let m;
  while ((m = ogRe.exec(html)) !== null) {
    const url = m[1] ?? m[2];
    if (url?.startsWith("http") && !images.includes(url)) images.push(url);
  }
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

function parseFromHtml(html: string): ScrapedProperty {
  const plainText = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  const title = getMeta(html, "og:title") ?? html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim();
  const description = getMeta(html, "og:description") ?? getMeta(html, "description") ?? extractJsonLdField(html, "description");
  const location = getMeta(html, "og:locality") ?? extractJsonLdField(html, "addressLocality", "addressRegion", "address");
  const jsonLdConditions = extractJsonLdField(html, "houseRules", "house_rules", "termsOfService", "cancellationPolicy", "conditions");
  const imageUrls = extractImages(html);
  const jldPrice = extractJsonLdField(html, "price", "lowPrice", "highPrice");
  const metaPrice = getMeta(html, "product:price:amount") ?? getMeta(html, "og:price:amount");
  const textPrice = plainText.match(/(\d[\d\s.,]*)\s*(kr\.?|DKK|€|\$)/i)?.[0]?.trim();
  const price = jldPrice ?? metaPrice ?? textPrice;
  const sizeMatch = plainText.match(/(\d+[\.,]?\d*)\s*m[²2]/i);
  const size = sizeMatch ? `${sizeMatch[1]} m²` : undefined;
  let conditions: string | undefined;
  // Extract conditions/house rules section from HTML — try progressively broader patterns
  const conditionPatterns = [
    // JSON-LD fields
    /"(?:houseRules?|house_rules?|husregler|betingelser|terms|cancellationPolicy|conditions)":\s*"([^"]{30,1000})"/i,
    // Heading followed by content block
    /(?:house\s*rules?|husregler|betingelser|afbestilling|cancellation\s*policy|regler|conditions?)[\s\S]{0,80}?<(?:ul|ol|p|div)[^>]*>([\s\S]{40,1200}?)<\/(?:ul|ol|p|div)>/i,
    // Any element with relevant data-testid or class
    /(?:data-testid|class)="[^"]*(?:rule|condition|policy|husregel|betingelse)[^"]*"[^>]*>([\s\S]{30,1000}?)<\/(?:div|section|article|ul)/i,
  ];
  for (const re of conditionPatterns) {
    const m = html.match(re);
    if (m?.[1]) {
      const text = m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      if (text.length >= 30) { conditions = text.slice(0, 800); break; }
    }
  }
  // Fallback: scan plain text for conditions section
  if (!conditions) {
    const plain = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    const m = plain.match(/(?:house\s*rules?|husregler|betingelser|afbestillingspolitik|regler for ophold)[:\s]{0,10}([\s\S]{30,800}?)(?:\n\n|\s{5,}|$)/i);
    if (m?.[1]) conditions = m[1].trim().slice(0, 800);
  }
  return {
    title: title ? decodeHTMLEntities(title).slice(0, 200) : undefined,
    description: description ? decodeHTMLEntities(description).slice(0, 2000) : undefined,
    location: location ? decodeHTMLEntities(String(location)).slice(0, 200) : undefined,
    imageUrls,
    price,
    size,
    conditions: jsonLdConditions ?? conditions,
  };
}

function parseFromMarkdown(markdown: string): ScrapedProperty {
  const lines = markdown.split("\n");
  const title = lines.find((l) => /^#{1,2}\s/.test(l))?.replace(/^#+\s*/, "").trim();
  const description = lines
    .filter((l) => l.trim().length > 80 && !/^[#!*\-\d\[|]/.test(l.trim()))
    .slice(0, 3).join("\n").trim().slice(0, 2000) || undefined;
  const imageUrls: string[] = [];
  const imgRe = /!\[.*?\]\((https?:\/\/[^)]+)\)/g;
  let m;
  while ((m = imgRe.exec(markdown)) !== null) {
    if (!imageUrls.includes(m[1])) imageUrls.push(m[1]);
  }
  const priceMatch = markdown.match(/(\d[\d\s.,]*)\s*(kr\.?|DKK|€|\$)/i);
  const price = priceMatch?.[0]?.trim();
  const sizeMatch = markdown.match(/(\d+[\.,]?\d*)\s*m[²2]/i);
  const size = sizeMatch ? `${sizeMatch[1]} m²` : undefined;
  const condIdx = lines.findIndex((l) => /house\s*rules?|husregler|betingelser|afbestilling|cancellation\s*policy|regler for ophold/i.test(l));
  const conditions = condIdx >= 0
    ? lines.slice(condIdx + 1, condIdx + 20).filter((l) => l.trim()).join("\n").trim().slice(0, 800) || undefined
    : undefined;
  const locationMatch = markdown.match(/📍\s*(.+)|Located in ([^\n]+)|Beliggenhed:\s*([^\n]+)/i);
  const location = (locationMatch?.[1] ?? locationMatch?.[2] ?? locationMatch?.[3])?.trim();
  return { title, description, location, imageUrls: imageUrls.slice(0, 20), price, size, conditions };
}

function isAirbnb(url: string): boolean {
  return /airbnb\.(com|es|co\.|dk|de|fr|it|nl|se|no)/i.test(url);
}

const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
];

async function fetchDirect(url: string, uaIndex = 0): Promise<{ html?: string }> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": USER_AGENTS[uaIndex % USER_AGENTS.length],
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "da-DK,da;q=0.9,en-US;q=0.8,en;q=0.7",
        "Accept-Encoding": "gzip, deflate, br",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
      },
      signal: AbortSignal.timeout(12_000),
    });
    if (!res.ok) return {};
    return { html: await res.text() };
  } catch {
    return {};
  }
}

async function fetchViaJina(url: string): Promise<{ markdown?: string }> {
  try {
    const res = await fetch(`https://r.jina.ai/${encodeURIComponent(url)}`, {
      headers: {
        "Accept": "text/plain",
        "X-Return-Format": "markdown",
        "X-No-Cache": "true",
        "X-With-Images-Summary": "true",
      },
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) return {};
    const text = await res.text();
    if (text.length < 200) return {};
    return { markdown: text };
  } catch {
    return {};
  }
}

async function fetchViaAllOrigins(url: string): Promise<{ html?: string }> {
  try {
    const res = await fetch(
      `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
      { signal: AbortSignal.timeout(15_000) }
    );
    if (!res.ok) return {};
    const html = await res.text();
    if (html.length < 500) return {};
    return { html };
  } catch {
    return {};
  }
}

async function fetchViaScraperApi(url: string): Promise<{ html?: string }> {
  // Uses a free public CORS proxy — no API key needed
  try {
    const res = await fetch(
      `https://corsproxy.io/?${encodeURIComponent(url)}`,
      {
        headers: { "User-Agent": USER_AGENTS[1] },
        signal: AbortSignal.timeout(15_000),
      }
    );
    if (!res.ok) return {};
    const html = await res.text();
    if (html.length < 500) return {};
    return { html };
  } catch {
    return {};
  }
}

async function fetchViaGoogleCache(url: string): Promise<{ html?: string }> {
  try {
    const cacheUrl = `https://webcache.googleusercontent.com/search?q=cache:${encodeURIComponent(url)}&hl=da`;
    const res = await fetch(cacheUrl, {
      headers: { "User-Agent": USER_AGENTS[0] },
      signal: AbortSignal.timeout(12_000),
    });
    if (!res.ok) return {};
    return { html: await res.text() };
  } catch {
    return {};
  }
}

function hasUsefulData(data: ScrapedProperty): boolean {
  return !!(data.title || data.description || data.imageUrls.length > 0);
}

export async function scrapePropertyUrl(url: string): Promise<{ data?: ScrapedProperty; error?: string }> {
  if (!url || !url.startsWith("http")) return { error: "Ugyldig URL" };

  if (isAirbnb(url)) {
    return {
      error: "Airbnb blokerer automatisk hentning. Gem billederne manuelt fra Airbnb og upload dem herunder.",
    };
  }

  // 1. Direct fetch — fastest, works on simple sites
  const direct = await fetchDirect(url, 0);
  if (direct.html) {
    const data = parseFromHtml(direct.html);
    if (hasUsefulData(data)) return { data };
  }

  // 2. Alternative User-Agent
  const direct2 = await fetchDirect(url, 1);
  if (direct2.html) {
    const data = parseFromHtml(direct2.html);
    if (hasUsefulData(data)) return { data };
  }

  // 3. Jina Reader — renders JavaScript, bypasses many bot walls
  const jina = await fetchViaJina(url);
  if (jina.markdown) {
    const data = parseFromMarkdown(jina.markdown);
    if (hasUsefulData(data)) return { data };
  }

  // 4. allorigins.win — CORS proxy, different IP
  const allorigins = await fetchViaAllOrigins(url);
  if (allorigins.html) {
    const data = parseFromHtml(allorigins.html);
    if (hasUsefulData(data)) return { data };
  }

  // 5. corsproxy.io — another public proxy
  const cors = await fetchViaScraperApi(url);
  if (cors.html) {
    const data = parseFromHtml(cors.html);
    if (hasUsefulData(data)) return { data };
  }

  // 6. Google Cache — last resort
  const cache = await fetchViaGoogleCache(url);
  if (cache.html) {
    const data = parseFromHtml(cache.html);
    if (hasUsefulData(data)) return { data };
  }

  return {
    error: "Siden er beskyttet mod automatisk hentning. Upload billeder manuelt, eller prøv at kopiere billede-URLs direkte fra siden.",
  };
}
