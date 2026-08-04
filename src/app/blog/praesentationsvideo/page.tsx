import type { Metadata } from "next";
import Link from "next/link";
import {
  Link2, Sparkles, Share2, Clock, TrendingUp, Search, CheckCircle2,
  ArrowRight, Play, Video, Rocket, Globe, Hash, MousePointerClick,
} from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { WorkflowDemo } from "@/components/workflow-demo";
import { DemoVideoPhone } from "@/components/demo-video-phone";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { LANDING } from "@/lib/i18n";

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.somevideopost.com";
const PAGE_URL = `${BASE}/blog/praesentationsvideo`;
const ORANGE_GRADIENT = "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)";

// The same AI-generated sample clip shown across the site, used here as the
// subject the whole article is built around.
const DEMO_VIDEO_URL =
  "https://acwfpiyswezwecemnndw.supabase.co/storage/v1/object/public/videos/38fe7fda-f755-4942-aba2-17642e3774e1/upload-1785073692222.mp4";

export const metadata: Metadata = {
  title:
    "Præsentationsvideo til din bolig — fra link til færdig AI-video på minutter | SOME VIDEO POST",
  description:
    "Se hvordan en AI-præsentationsvideo bliver til: indsæt et boliglink, og AI skaber en cinematisk video klar til Reels, TikTok og Facebook. Enkelt at bruge, flere bookinger og bedre SEO — hele brugerflowet forklaret trin for trin.",
  keywords:
    "præsentationsvideo bolig, AI video feriebolig, boliglink til video, video marketing udlejning, SEO video bolig, del video Facebook Instagram TikTok, cinematisk boligvideo, somevideopost",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Præsentationsvideo til din bolig — fra link til færdig AI-video på minutter",
    description:
      "Indsæt et boliglink, og AI skaber en cinematisk præsentationsvideo klar til sociale medier. Se brugerflowet, fordelene og hvordan video løfter din SEO.",
    type: "article",
    siteName: "somevideopost.com",
    url: PAGE_URL,
  },
};

const STEPS = [
  {
    icon: Link2,
    color: "#1B3F7A",
    bg: "#EEF3FB",
    title: "1 · Indsæt dit boliglink",
    text: "Kopiér linket til din annonce fra Airbnb, Booking.com eller Novasol — eller upload dine egne fotos. Ingen teknisk opsætning.",
  },
  {
    icon: Sparkles,
    color: "#FF6B4A",
    bg: "#FFF4F1",
    title: "2 · AI producerer videoen",
    text: "AI henter billederne, bygger en cinematisk fotorute med kamerabevægelser, overgange og musik — og du følger fremdriften live.",
  },
  {
    icon: Play,
    color: "#059669",
    bg: "#ECFDF5",
    title: "3 · Videoen er klar",
    text: "På 5–15 minutter har du en færdig præsentationsvideo i 9:16 — klar til Reels, TikTok og Facebook Stories.",
  },
  {
    icon: Share2,
    color: "#7C3AED",
    bg: "#F5F3FF",
    title: "4 · Del og få flere bookinger",
    text: "Del direkte på Facebook, Instagram, TikTok, LinkedIn og YouTube — eller download i alle formater fra ét dashboard.",
  },
];

const BENEFITS = [
  {
    icon: Video,
    color: "#1B3F7A",
    bg: "#EEF3FB",
    title: "Cinematisk kvalitet",
    text: "Professionelle kamerabevægelser og overgange gennem hvert rum — samme udtryk som dyre videoproduktioner, uden den store pris.",
  },
  {
    icon: Clock,
    color: "#FF6B4A",
    bg: "#FFF4F1",
    title: "Klar på 15 minutter",
    text: "Din færdige video leveres på 5–15 minutter. Du får besked i appen, så snart den er klar til download og deling.",
  },
  {
    icon: TrendingUp,
    color: "#059669",
    bg: "#ECFDF5",
    title: "3× flere forespørgsler",
    text: "Video skiller sig markant ud i feedet og driver op til 3× flere klik og bookingforespørgsler end stillbilleder.",
  },
  {
    icon: Share2,
    color: "#7C3AED",
    bg: "#F5F3FF",
    title: "Del på alle platforme",
    text: "9:16 til Reels og TikTok, 1:1 til feed og 16:9 til YouTube og din hjemmeside — download eller del med ét klik.",
  },
];

const SEO_POINTS = [
  {
    icon: Clock,
    title: "Længere besøgstid",
    text: "Video holder besøgende på siden længere. Den øgede dwell-time er et positivt signal til Google og hjælper din annonce med at rangere højere.",
  },
  {
    icon: Globe,
    title: "Flere formater, flere kanaler",
    text: "Samme video eksporteres til Reels, TikTok, YouTube og din hjemmeside. Flere kanaler betyder flere backlinks og bredere rækkevidde.",
  },
  {
    icon: Hash,
    title: "Sociale signaler",
    text: "Likes, delinger og kommentarer på dine videoopslag skaber sociale signaler, der styrker din synlighed og trafik til dine annoncer.",
  },
  {
    icon: Search,
    title: "Struktureret data",
    text: "Hver video kan mærkes op med VideoObject-skema, så søgemaskiner viser den som et rigt resultat med thumbnail — direkte i søgeresultaterne.",
  },
];

export default function PresentationVideoBlogPage() {
  const t = LANDING.da;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline:
        "Præsentationsvideo til din bolig — fra link til færdig AI-video på minutter",
      description:
        "Sådan bliver en AI-præsentationsvideo til: indsæt et boliglink, og AI skaber en cinematisk video klar til sociale medier. Enkelt, effektivt og godt for din SEO.",
      datePublished: "2026-08-04",
      dateModified: "2026-08-04",
      articleSection: "Video Marketing",
      author: { "@type": "Organization", name: "somevideopost.com", url: BASE },
      publisher: { "@type": "Organization", name: "somevideopost.com", url: BASE },
      mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
      url: PAGE_URL,
    },
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "AI-genereret præsentationsvideo af en feriebolig",
      description:
        "En cinematisk præsentationsvideo skabt automatisk af AI ud fra en boligannonce — klar til Reels, TikTok og Facebook.",
      thumbnailUrl: [`${BASE}/walkthrough/01-facade.svg`],
      contentUrl: DEMO_VIDEO_URL,
      uploadDate: "2026-07-26",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Forside", item: BASE },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
        { "@type": "ListItem", position: 3, name: "Præsentationsvideo", item: PAGE_URL },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <JsonLd data={jsonLd} />
      <SiteHeader active="blog" />

      {/* ── Hero ── */}
      <section
        className="overflow-hidden border-b border-slate-200 text-white"
        style={{ background: "linear-gradient(135deg, #1B3F7A 0%, #14306b 55%, #0f2347 100%)" }}
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-14 md:grid-cols-2 md:py-16">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1.5 text-xs font-semibold text-orange-300">
              <Video size={13} /> Guide · Video Marketing
            </div>
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">
              Præsentationsvideo til din bolig — fra link til færdig video på{" "}
              <span style={{ background: ORANGE_GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                minutter
              </span>
            </h1>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-blue-200">
              Indsæt et boliglink, og AI skaber automatisk en cinematisk
              præsentationsvideo af din bolig — klar til at dele på sociale
              medier. Her ser du hele brugerflowet, fordelene og hvordan video
              løfter din synlighed i søgemaskinerne.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/videos/new"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: ORANGE_GRADIENT }}
              >
                <Sparkles size={15} /> Lav din video nu
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20"
              >
                Opret gratis konto <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* The video the whole article is built around */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-[280px]">
              <div className="absolute inset-0 scale-90 rounded-[2.5rem] opacity-40 blur-2xl" style={{ background: ORANGE_GRADIENT }} />
              <div className="relative">
                <DemoVideoPhone label="AI-præsentationsvideo" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-14 space-y-16">
        {/* ── User-flow simulation ── */}
        <section>
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B4A]">Sådan fungerer det</span>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">Se brugerflowet — trin for trin</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
              Prøv den interaktive simulering nedenfor: fra du indsætter et link,
              til AI'en genererer opslag og video, og du deler det med ét klik.
            </p>
          </div>

          <div className="grid items-center gap-10 md:grid-cols-2">
            {/* Interactive simulation of the flow */}
            <div className="flex justify-center">
              <div className="w-full max-w-[320px]">
                <WorkflowDemo t={t} />
              </div>
            </div>

            {/* Step descriptions */}
            <ol className="flex flex-col gap-4">
              {STEPS.map((s) => (
                <li key={s.title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: s.bg }}>
                    <s.icon size={20} style={{ color: s.color }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Enkelthed (simplicity) ── */}
        <section className="rounded-2xl border border-slate-200 bg-white p-8 md:p-10">
          <div className="grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#1B3F7A]">Enkelthed</span>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">Så enkelt er det — ingen teknisk viden</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
                Du behøver hverken videoudstyr, redigeringsprogrammer eller
                erfaring. Hele processen foregår i ét brugervenligt dashboard:
                indsæt et link eller upload dine fotos, og AI klarer resten —
                billedvalg, kamerabevægelser, musik og undertekster.
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {[
                  "Indsæt boliglink eller upload egne billeder — intet setup",
                  "AI vælger de bedste billeder og bygger fotoruten automatisk",
                  "Følg fremdriften live og få besked, når videoen er klar",
                  "Alt samlet ét sted — opret, se, download og del",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-green-600" />
                    <span className="text-sm leading-relaxed text-slate-600">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-50 p-8 text-center">
              <MousePointerClick size={28} className="text-[#FF6B4A]" />
              <p className="mt-3 text-4xl font-black text-slate-900">1 link</p>
              <p className="mt-1 text-sm text-slate-500">er alt, hvad der skal til</p>
              <div className="mt-5 h-px w-full bg-slate-200" />
              <p className="mt-5 text-4xl font-black text-slate-900">~15 min</p>
              <p className="mt-1 text-sm text-slate-500">til færdig, delbar video</p>
            </div>
          </div>
        </section>

        {/* ── Fordele (benefits) ── */}
        <section>
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B4A]">Fordele</span>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">Derfor virker præsentationsvideoer</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {BENEFITS.map((f) => (
              <div key={f.title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: f.bg }}>
                  <f.icon size={20} style={{ color: f.color }} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SEO-optimering ── */}
        <section className="rounded-2xl border border-slate-200 bg-white p-8 md:p-10">
          <div className="mb-8 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#059669]">SEO-optimering</span>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">Bliv fundet af flere lejere</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
              En præsentationsvideo er ikke kun pæn at se på — den arbejder for
              din synlighed. Video løfter både din placering i søgemaskinerne og
              din rækkevidde på sociale medier på flere måder samtidig.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {SEO_POINTS.map((s) => (
              <div key={s.title} className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                  <s.icon size={18} className="text-[#059669]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm leading-relaxed text-slate-500">
            Vil du dykke ned i strategien bag?{" "}
            <Link href="/hvorfor-somevideopost" className="font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800">
              Læs hvorfor udlejere vælger somevideopost.com
            </Link>{" "}
            eller se{" "}
            <Link href="/priser" className="font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800">
              priser og pakker
            </Link>.
          </p>
        </section>

        {/* ── CTA ── */}
        <section
          className="overflow-hidden rounded-2xl p-8 text-center text-white md:p-12"
          style={{ background: "linear-gradient(135deg, #1B3F7A 0%, #14306b 100%)" }}
        >
          <Rocket size={26} className="mx-auto text-orange-300" />
          <h2 className="mt-3 text-2xl font-bold">Klar til at gøre din bolig uimodståelig?</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-blue-200">
            Gå fra boliglink til færdig præsentationsvideo på minutter. Intet
            kreditkort påkrævet for at komme i gang.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/videos/new"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#1B3F7A] transition hover:bg-slate-100"
            >
              <Sparkles size={15} /> Lav din video nu
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/20"
            >
              Flere guides <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </div>

      <SiteFooter />
    </div>
  );
}
