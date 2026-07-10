import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["playwright-core"],
  async redirects() {
    // Locale-prefixed auth routes don't exist — the auth pages live at the
    // root (/login, /signup). Redirect at the edge so /es/login etc. never
    // 404 or render blank, regardless of how the user got there (Google
    // Translate, bookmarks, manual URL).
    const locales = ["en", "es", "de"];
    const authPaths = ["login", "signup"];
    return locales.flatMap((loc) =>
      authPaths.map((p) => ({
        source: `/${loc}/${p}`,
        destination: `/${p}`,
        permanent: true,
      })),
    );
  },
};

export default nextConfig;
