import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Vakanza — Automatisiertes Social-Media-Marketing für Ferienvermieter",
  description: "Spare Zeit und erhalte professionelle Beiträge auf Facebook, Instagram, TikTok und LinkedIn automatisch. Synchronisiere deinen Buchungskalender von Airbnb, Booking.com und mehr. KI-generierte Inhalte und Videos für Ferienhäuser.",
  alternates: {
    canonical: "https://vakanza.dk/de",
    languages: { da: "https://vakanza.dk", en: "https://vakanza.dk/en", es: "https://vakanza.dk/es", de: "https://vakanza.dk/de" },
  },
};

export default function DeLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
