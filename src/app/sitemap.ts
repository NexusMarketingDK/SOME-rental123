import type { MetadataRoute } from "next";
import { POSTS } from "@/lib/blog";

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.somevideopost.com";
const LOCALES = ["en", "es", "de"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Localised landing pages (da is the root, en/es/de are prefixed)
  const landingPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...LOCALES.map((loc) => ({
      url: `${BASE}/${loc}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];

  return [
    ...landingPages,
    {
      url: `${BASE}/hvorfor-somevideopost`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE}/priser`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...POSTS.map((post) => ({
      url: `${BASE}/blog/${post.id}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${BASE}/signup`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${BASE}/login`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
