import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Vakanza — Automated social media for vacation rental hosts",
  description:
    "Save time and get professional posts on Facebook, Instagram, TikTok and LinkedIn automatically. Sync your booking calendar from Airbnb, Booking.com and more. AI-generated content and video for vacation homes, apartments and houses.",
  keywords:
    "vacation rental social media, holiday home posts, automatic booking calendar, Airbnb Facebook posts, property marketing, host platform",
  openGraph: {
    title: "Vakanza — Automated social media for vacation rental hosts",
    description:
      "Save hours every week. Post to all social media at once, sync your booking calendar and let AI generate your posts automatically.",
    type: "website",
  },
  alternates: {
    canonical: "https://vakanza.dk/en",
    languages: {
      "da": "https://vakanza.dk",
      "en": "https://vakanza.dk/en",
    },
  },
};

export default function EnLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
