import type { Metadata } from "next";
import Link from "next/link";
import { Link2, Share2, Download, CheckCircle2, ArrowRight, Globe } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.somevideopost.com";
const PAGE_URL = `${BASE}/integrationer`;
const ORANGE_GRADIENT = "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)";

export const metadata: Metadata = {
  title: "Integrationer — SOME VIDEO POST | Import fra boligsider & deling til sociale medier",
  description:
    "Importér din bolig fra Airbnb, Booking.com, Idealista og enhver udlejningsside med et visningslink — og del dine AI-videoer og opslag direkte til Facebook, Instagram, TikTok, LinkedIn og YouTube.",
  keywords:
    "somevideopost integrationer, Airbnb, Booking.com, Idealista, Facebook, Instagram, TikTok, LinkedIn, boligudlejning integration, del video sociale medier",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Integrationer — SOME VIDEO POST",
    description:
      "Importér fra Airbnb, Booking.com, Idealista og enhver udlejningsside — del til Facebook, Instagram, TikTok, LinkedIn og YouTube.",
    type: "website",
    siteName: "somevideopost.com",
    url: PAGE_URL,
  },
};

// ── Localized copy ──────────────────────────────────────────────────────────
type T = {
  badge: string; title1: string; title2: string; intro: string;
  importTitle: string; importSub: string;
  shareTitle: string; shareSub: string;
  anySiteTitle: string; anySiteBody: string;
  ctaTitle: string; ctaSub: string; ctaBtn: string; ctaSecondary: string;
};

const STRINGS: Record<Locale, T> = {
  da: {
    badge: "Integrationer",
    title1: "Forbind din bolig med",
    title2: "alle dine kanaler",
    intro: "Importér din bolig fra de sider, du allerede bruger — og del dine færdige videoer og opslag direkte til dine sociale medier. Alt fra ét dashboard.",
    importTitle: "Importér fra boligsider",
    importSub: "Indsæt et visningslink, så henter AI automatisk billeder, titel, pris og beskrivelse.",
    shareTitle: "Del til sociale medier",
    shareSub: "Del dine AI-videoer og opslag med ét klik — eller download i alle formater.",
    anySiteTitle: "Enhver udlejningsside med et visningslink",
    anySiteBody: "Ud over de nævnte virker det med alle boligudlejningssider, der har et offentligt visningslink — på tværs af alle lande og sprog. Har din annonce et link, kan du importere den.",
    ctaTitle: "Klar til at samle det hele ét sted?",
    ctaSub: "Opret en gratis konto og forbind dine kanaler på minutter.",
    ctaBtn: "Kom i gang gratis",
    ctaSecondary: "Se priser",
  },
  en: {
    badge: "Integrations",
    title1: "Connect your property to",
    title2: "all your channels",
    intro: "Import your property from the sites you already use — and share your finished videos and posts straight to your social media. All from one dashboard.",
    importTitle: "Import from listing sites",
    importSub: "Paste a listing link and AI automatically fetches photos, title, price and description.",
    shareTitle: "Share to social media",
    shareSub: "Share your AI videos and posts in one click — or download in every format.",
    anySiteTitle: "Any rental site with a listing link",
    anySiteBody: "Beyond the ones listed, it works with any holiday-rental site that has a public listing link — across all countries and languages. If your listing has a link, you can import it.",
    ctaTitle: "Ready to bring it all together?",
    ctaSub: "Create a free account and connect your channels in minutes.",
    ctaBtn: "Get started free",
    ctaSecondary: "See pricing",
  },
  es: {
    badge: "Integraciones",
    title1: "Conecta tu propiedad con",
    title2: "todos tus canales",
    intro: "Importa tu propiedad desde los sitios que ya usas — y comparte tus vídeos y publicaciones directamente en tus redes sociales. Todo desde un panel.",
    importTitle: "Importa desde portales",
    importSub: "Pega un enlace de anuncio y la IA descarga automáticamente fotos, título, precio y descripción.",
    shareTitle: "Comparte en redes sociales",
    shareSub: "Comparte tus vídeos y publicaciones con un clic — o descárgalos en todos los formatos.",
    anySiteTitle: "Cualquier portal con un enlace de anuncio",
    anySiteBody: "Además de los indicados, funciona con cualquier portal de alquiler vacacional que tenga un enlace público — en todos los países e idiomas. Si tu anuncio tiene un enlace, puedes importarlo.",
    ctaTitle: "¿Listo para reunirlo todo?",
    ctaSub: "Crea una cuenta gratis y conecta tus canales en minutos.",
    ctaBtn: "Empieza gratis",
    ctaSecondary: "Ver precios",
  },
  de: {
    badge: "Integrationen",
    title1: "Verbinde deine Immobilie mit",
    title2: "all deinen Kanälen",
    intro: "Importiere deine Immobilie von den Seiten, die du bereits nutzt — und teile deine fertigen Videos und Beiträge direkt in deinen sozialen Medien. Alles aus einem Dashboard.",
    importTitle: "Aus Immobilienportalen importieren",
    importSub: "Füge einen Anzeigenlink ein und die KI lädt automatisch Fotos, Titel, Preis und Beschreibung.",
    shareTitle: "In sozialen Medien teilen",
    shareSub: "Teile deine KI-Videos und Beiträge mit einem Klick — oder lade sie in jedem Format herunter.",
    anySiteTitle: "Jede Vermietungsseite mit einem Anzeigenlink",
    anySiteBody: "Neben den genannten funktioniert es mit jeder Ferienvermietungsseite mit öffentlichem Anzeigenlink — in allen Ländern und Sprachen. Hat deine Anzeige einen Link, kannst du sie importieren.",
    ctaTitle: "Bereit, alles zu vereinen?",
    ctaSub: "Erstelle ein kostenloses Konto und verbinde deine Kanäle in Minuten.",
    ctaBtn: "Kostenlos starten",
    ctaSecondary: "Preise ansehen",
  },
};

// Import sources (listing / rental sites). Names are proper nouns.
const IMPORT_SOURCES = [
  "Airbnb", "Booking.com", "Idealista.com", "Novasol", "Vrbo", "Feriepartner",
  "Expedia", "TripAdvisor", "Feriebolig-spanien.dk",
];

// Share destinations (social channels).
const SHARE_CHANNELS = [
  "Facebook & Instagram", "TikTok", "LinkedIn", "YouTube", "Facebook-grupper",
];

export default async function IntegrationsPage() {
  const locale = await getLocale();
  const t = STRINGS[locale] ?? STRINGS.da;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: metadata.title,
    description: metadata.description,
    url: PAGE_URL,
    publisher: { "@type": "Organization", name: "somevideopost.com", url: BASE },
  };

  return (
    <div className="min-h-screen text-slate-100" style={{ background: "#050d24" }}>
      <JsonLd data={jsonLd} />
      <SiteHeader active="integrations" locale={locale} />

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/5" style={{ background: "linear-gradient(135deg, #040a1c 0%, #071233 55%, #0a1f4d 100%)" }}>
        <div className="relative mx-auto max-w-4xl px-6 py-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-200">
            <Globe size={13} /> {t.badge}
          </div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            {t.title1}{" "}
            <span style={{ background: ORANGE_GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{t.title2}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-300">{t.intro}</p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-16 space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Import */}
          <div className="rounded-2xl border border-blue-400/30 bg-white/[0.04] p-8 backdrop-blur-sm">
            <div className="mb-2 inline-flex items-center gap-2 rounded-lg bg-blue-500/15 px-2.5 py-1 text-xs font-semibold text-blue-300">
              <Link2 size={12} /> {t.importTitle}
            </div>
            <p className="mt-3 text-sm text-slate-300">{t.importSub}</p>
            <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {IMPORT_SOURCES.map((name) => (
                <li key={name} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-200">
                  <CheckCircle2 size={14} className="shrink-0 text-emerald-400" /> {name}
                </li>
              ))}
            </ul>
          </div>

          {/* Share */}
          <div className="rounded-2xl border border-orange-500/25 bg-orange-500/[0.06] p-8 backdrop-blur-sm">
            <div className="mb-2 inline-flex items-center gap-2 rounded-lg bg-orange-500/15 px-2.5 py-1 text-xs font-semibold text-orange-400">
              <Share2 size={12} /> {t.shareTitle}
            </div>
            <p className="mt-3 text-sm text-slate-300">{t.shareSub}</p>
            <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {SHARE_CHANNELS.map((name) => (
                <li key={name} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-200">
                  <Share2 size={13} className="shrink-0 text-orange-300" /> {name}
                </li>
              ))}
              <li className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-200">
                <Download size={13} className="shrink-0 text-slate-300" /> Download (9:16 · 1:1 · 16:9)
              </li>
            </ul>
          </div>
        </div>

        {/* Any site */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
              <Globe size={20} className="text-blue-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{t.anySiteTitle}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{t.anySiteBody}</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="overflow-hidden rounded-2xl border border-white/10 p-8 text-center md:p-12" style={{ background: "linear-gradient(135deg, #040a1c 0%, #0a1f4d 100%)" }}>
          <h2 className="text-2xl font-bold text-white">{t.ctaTitle}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-300">{t.ctaSub}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link href="/signup" className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90" style={{ background: ORANGE_GRADIENT }}>
              {t.ctaBtn} <ArrowRight size={15} />
            </Link>
            <Link href="/priser" className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">
              {t.ctaSecondary}
            </Link>
          </div>
        </div>
      </div>

      <SiteFooter locale={locale} />
    </div>
  );
}
