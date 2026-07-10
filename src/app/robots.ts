import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.somevideopost.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/login", "/signup"],
      disallow: [
        "/dashboard",
        "/videos",
        "/posts",
        "/properties",
        "/accounts",
        "/analytics",
        "/billing",
        "/calendar",
        "/api/",
      ],
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
