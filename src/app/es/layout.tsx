import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Vakanza — Marketing automatizado en redes sociales para anfitriones de alquiler vacacional",
  description: "Ahorra tiempo y obtén publicaciones profesionales en Facebook, Instagram, TikTok y LinkedIn automáticamente. Sincroniza tu calendario de reservas de Airbnb, Booking.com y más. Contenido y vídeos generados por IA para casas de vacaciones.",
  alternates: {
    canonical: "https://vakanza.dk/es",
    languages: { da: "https://vakanza.dk", en: "https://vakanza.dk/en", es: "https://vakanza.dk/es", de: "https://vakanza.dk/de" },
  },
};

export default function EsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
