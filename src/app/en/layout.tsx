import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.somevideopost.com"),
  title: "SOME VIDEO POST — Automated social media & AI video for vacation rental hosts",
  description:
    "somevideopost.com saves you time and gets professional posts on Facebook, Instagram, TikTok and LinkedIn automatically. Sync your booking calendar from Airbnb, Booking.com and more. AI-generated content and presentation videos for vacation homes, apartments and houses.",
  keywords:
    "somevideopost, SOME video post, AI property video, vacation rental social media, holiday home posts, automatic booking calendar, Airbnb Facebook posts, property marketing, host platform, presentation video real estate",
  openGraph: {
    title: "SOME VIDEO POST — Automated social media & AI video for vacation rental hosts",
    description:
      "Save hours every week. Post to all social media at once, sync your booking calendar and let AI generate your posts and presentation videos automatically.",
    type: "website",
    siteName: "somevideopost.com",
    url: "https://www.somevideopost.com/en",
  },
  alternates: {
    canonical: "https://www.somevideopost.com/en",
    languages: {
      "da": "https://www.somevideopost.com",
      "en": "https://www.somevideopost.com/en",
      "es": "https://www.somevideopost.com/es",
      "de": "https://www.somevideopost.com/de",
    },
  },
};

export default function EnLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
