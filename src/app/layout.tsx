import type { Metadata } from "next";
import { Geist, Fraunces } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vakanza — Automatisk sociale medier til udlejere",
  description:
    "Spar tid og få professionelle opslag på Facebook, Instagram, TikTok og LinkedIn automatisk. Synkroniser din bookingkalender fra Airbnb, Booking.com og mere. AI-genererede tekster og video til ferieboliger, lejligheder og huse.",
  keywords:
    "sociale medier udlejning, feriebolig opslag, automatisk booking kalender, Airbnb Facebook opslag, lejlighed markedsføring, udlejer platform",
  openGraph: {
    title: "Vakanza — Automatisk sociale medier til udlejere",
    description:
      "Spar timer hver uge. Post på alle sociale medier på én gang, synkroniser din bookingkalender og lad AI generere dine opslag automatisk.",
    type: "website",
  },
  alternates: {
    canonical: "https://vakanza.dk",
    languages: {
      "da": "https://vakanza.dk",
      "en": "https://vakanza.dk/en",
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value === "en" ? "en" : "da";

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        {children}
      </body>
    </html>
  );
}
