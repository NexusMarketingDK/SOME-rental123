import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.somevideopost.com"),
  title: "SOME VIDEO POST — Automatisiertes Social-Media-Marketing & KI-Video für Ferienvermieter",
  description: "somevideopost.com spart dir Zeit und erstellt automatisch professionelle Beiträge auf Facebook, Instagram, TikTok und LinkedIn. Synchronisiere deinen Buchungskalender von Airbnb, Booking.com und mehr. KI-generierte Inhalte und Präsentationsvideos für Ferienhäuser.",
  keywords:
    "somevideopost, SOME video post, KI-Video Immobilie, Social Media Ferienvermietung, Ferienhaus Beiträge, automatischer Buchungskalender, Immobilienmarketing, Präsentationsvideo",
  openGraph: {
    title: "SOME VIDEO POST — Automatisiertes Social-Media-Marketing & KI-Video für Ferienvermieter",
    description: "Spare jede Woche Stunden. Poste auf allen sozialen Medien gleichzeitig, synchronisiere deinen Buchungskalender und lass die KI deine Beiträge und Präsentationsvideos automatisch generieren.",
    type: "website",
    siteName: "somevideopost.com",
    url: "https://www.somevideopost.com/de",
  },
  alternates: {
    canonical: "https://www.somevideopost.com/de",
    languages: { da: "https://www.somevideopost.com", en: "https://www.somevideopost.com/en", es: "https://www.somevideopost.com/es", de: "https://www.somevideopost.com/de" },
  },
};

export default function DeLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
