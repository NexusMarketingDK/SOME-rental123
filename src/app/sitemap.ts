import type { MetadataRoute } from "next";

// Matches the canonical domain hardcoded in the locale layouts' metadata.alternates.
const BASE = "https://vakanza.dk";

const LANGUAGES = { da: BASE, en: `${BASE}/en`, es: `${BASE}/es`, de: `${BASE}/de` };

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: BASE,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: LANGUAGES },
    },
    {
      url: `${BASE}/en`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: LANGUAGES },
    },
    {
      url: `${BASE}/es`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: LANGUAGES },
    },
    {
      url: `${BASE}/de`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: LANGUAGES },
    },
    {
      url: `${BASE}/login`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE}/signup`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
