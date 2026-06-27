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
  const imageUrls = extractImages(html);
  const jldPrice = extractJsonLdField(html, "price", "lowPrice", "highPrice");
  const metaPrice = getMeta(html, "product:price:amount") ?? getMeta(html, "og:price:amount");
  const textPrice = plainText.match(/(\d[\d\s.,]*)\s*(kr\.?|DKK|€|\$)/i)?.[0]?.trim();
  const price = jldPrice ?? metaPrice ?? textPrice;
  const sizeMatch = plainText.match(/(\d+[\.,]?\d*)\s*m[²2]/i);
  const size = sizeMatch ? `${sizeMatch[1]} m²` : undefined;
  let conditions: string | undefined;
  for (const re of [
    /house rules?[\s\S]{0,50}?<[^>]+>([\s\S]{50,800}?)<\/(div|section|ul|p)/i,
    /husregler[\s\S]{0,50}?<[^>]+>([\s\S]{50,500}?)<\/(div|section|ul|p)/i,
    /betingelser[\s\S]{0,50}?<[^>]+>([\s\S]{50,500}?)<\/(div|section|ul|p)/i,
  ]) {
    const m = html.match(re);
    if (m?.[1]) { conditions = m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 600); break; }
  }
  return {
    title: title ? decodeHTMLEntities(title).slice(0, 200) : undefined,
    description: description ? decodeHTMLEntities(description).slice(0, 2000) : undefined,
    location: location ? decodeHTMLEntities(String(location)).slice(0, 200) : undefined,
    imageUrls,
    price,
    size,
    conditions,
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
  const condIdx = lines.findIndex((l) => /house rules|husregler|betingelser|cancellation/i.test(l));
  const conditions = condIdx >= 0
    ? lines.slice(condIdx + 1, condIdx + 15).filter((l) => l.trim()).join("\n").trim().slice(0, 600) || undefined
    : undefined;
  const locationMatch = markdown.match(/📍\s*(.+)|Located in ([^\n]+)|Beliggenhed:\s*([^\n]+)/i);
  const location = (locationMatch?.[1] ?? locationMatch?.[2] ?? locationMatch?.[3])?.trim();
  return { title, description, location, imageUrls: imageUrls.slice(0, 20), price, size, conditions };
}

function isBlockedDomain(url: string): boolean {
  return /airbnb\.(com|es|co\.|dk|de|fr|it|nl|se|no)/i.test(url);
}

async function fetchViaJina(url: string): Promise<{ markdown?: string; error?: string }> {
  try {
    const res = await fetch(`https://r.jina.ai/${encodeURIComponent(url)}`, {
      headers: {
        "Accept": "text/plain",
        "X-Return-Format": "markdown",
        "X-No-Cache": "true",
      },
      signal: AbortSignal.timeout(25_000),
    });
    if (!res.ok) return { error: `proxy_${res.status}` };
    const text = await res.text();
    if (text.length < 200) return { error: "proxy_empty" };
    return { markdown: text };
  } catch {
    return { error: "proxy_timeout" };
  }
}

async function fetchDirect(url: string): Promise<{ html?: string }> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "da,en-US;q=0.9,en;q=0.8",
        "Cache-Control": "no-cache",
      },
      signal: AbortSignal.timeout(12_000),
    });
    if (!res.ok) return {};
    return { html: await res.text() };
  } catch {
    return {};
  }
}

export async function scrapePropertyUrl(url: string): Promise<{ data?: ScrapedProperty; error?: string }> {
  if (!url || !url.startsWith("http")) return { error: "Ugyldig URL" };

  const blocked = isBlockedDomain(url);

  // For known bot-protected sites, go straight to Jina
  if (!blocked) {
    const direct = await fetchDirect(url);
    if (direct.html) {
      const data = parseFromHtml(direct.html);
      if (data.title || data.description || data.imageUrls.length > 0) return { data };
    }
  }

  // Jina Reader — renders JS and bypasses most bot protection
  const jina = await fetchViaJina(url);
  if (jina.markdown) {
    const data = parseFromMarkdown(jina.markdown);
    // If Jina returned something useful
    if (data.title || data.description) return { data };
    // Jina succeeded but page was near-empty (bot wall)
  }

  // For Airbnb specifically, give a helpful message
  if (blocked) {
    return {
      error: "Airbnb blokerer automatisk hentning. Udfyld felterne manuelt, eller brug booking-linket nedenfor.",
    };
  }

  // Generic fallback — still try direct if we haven't yet
  const direct2 = await fetchDirect(url);
  if (direct2.html) {
    const data = parseFromHtml(direct2.html);
    if (data.title || data.description || data.imageUrls.length > 0) return { data };
  }

  return { error: "Kunne ikke hente oplysninger fra siden. Prøv en anden URL eller udfyld manuelt." };
}
