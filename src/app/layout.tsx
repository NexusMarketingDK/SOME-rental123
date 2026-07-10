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
  metadataBase: new URL("https://www.somevideopost.com"),
  title: "SOME VIDEO POST — Automatisk sociale medier og AI-video til udlejere",
  description:
    "somevideopost.com sparer dig tid og giver professionelle opslag på Facebook, Instagram, TikTok og LinkedIn automatisk. Synkroniser din bookingkalender fra Airbnb, Booking.com og mere. AI-genererede tekster og præsentationsvideoer til ferieboliger, lejligheder og huse.",
  keywords:
    "somevideopost, SOME video post, AI video feriebolig, sociale medier udlejning, feriebolig opslag, automatisk booking kalender, Airbnb Facebook opslag, lejlighed markedsføring, udlejer platform, præsentationsvideo bolig",
  openGraph: {
    title: "SOME VIDEO POST — Automatisk sociale medier og AI-video til udlejere",
    description:
      "Spar timer hver uge. Post på alle sociale medier på én gang, synkroniser din bookingkalender og lad AI generere dine opslag og præsentationsvideoer automatisk.",
    type: "website",
    siteName: "somevideopost.com",
    url: "https://www.somevideopost.com",
  },
  alternates: {
    canonical: "https://www.somevideopost.com",
    languages: {
      "da": "https://www.somevideopost.com",
      "en": "https://www.somevideopost.com/en",
      "es": "https://www.somevideopost.com/es",
      "de": "https://www.somevideopost.com/de",
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get("locale")?.value;
  const locale = (["da","en","es","de"].includes(rawLocale ?? "") ? rawLocale : "da") as string;

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
