import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.somevideopost.com"),
  title: "SOME VIDEO POST — Marketing automatizado en redes sociales y vídeo IA para alquiler vacacional",
  description: "somevideopost.com te ahorra tiempo y obtiene publicaciones profesionales en Facebook, Instagram, TikTok y LinkedIn automáticamente. Sincroniza tu calendario de reservas de Airbnb, Booking.com y más. Contenido y vídeos de presentación generados por IA para casas de vacaciones.",
  keywords:
    "somevideopost, SOME video post, vídeo IA propiedad, redes sociales alquiler vacacional, publicaciones casa vacaciones, calendario reservas automático, marketing inmobiliario, vídeo de presentación",
  openGraph: {
    title: "SOME VIDEO POST — Marketing automatizado en redes sociales y vídeo IA para alquiler vacacional",
    description: "Ahorra horas cada semana. Publica en todas las redes sociales a la vez, sincroniza tu calendario de reservas y deja que la IA genere tus publicaciones y vídeos de presentación automáticamente.",
    type: "website",
    siteName: "somevideopost.com",
    url: "https://www.somevideopost.com/es",
  },
  alternates: {
    canonical: "https://www.somevideopost.com/es",
    languages: { da: "https://www.somevideopost.com", en: "https://www.somevideopost.com/en", es: "https://www.somevideopost.com/es", de: "https://www.somevideopost.com/de" },
  },
};

export default function EsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
