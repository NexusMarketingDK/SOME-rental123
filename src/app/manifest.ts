import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SOME VIDEO POST",
    short_name: "SOME VIDEO POST",
    description:
      "AI-præsentationsvideoer og automatiske opslag på sociale medier til udlejere af ferieboliger.",
    start_url: "/",
    display: "standalone",
    background_color: "#050d24",
    theme_color: "#050d24",
    lang: "da",
    categories: ["business", "productivity", "photo"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
