import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Video, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { DemoVideoPhone } from "@/components/demo-video-phone";
import { JsonLd } from "@/components/seo/json-ld";
import { getLocale } from "@/lib/locale-server";
import { CATEGORIES, POSTS, formatDate, tr } from "@/lib/blog";
import type { Locale } from "@/lib/i18n";

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.somevideopost.com";

export const metadata: Metadata = {
  title: "Blog & guides — SOME VIDEO POST | AI-video og sociale medier til udlejere",
  description:
    "Guides om AI-genererede præsentationsvideoer, sociale medier og markedsføring af ferieboliger. Lær hvordan somevideopost.com hjælper udlejere med at få flere bookinger.",
  keywords:
    "feriebolig markedsføring, AI video guide, sociale medier udlejning, præsentationsvideo bolig, somevideopost blog",
  alternates: { canonical: "https://www.somevideopost.com/blog" },
  openGraph: {
    title: "Blog & guides — SOME VIDEO POST",
    description:
      "Guides om AI-genererede præsentationsvideoer, sociale medier og markedsføring af ferieboliger.",
    type: "website",
    siteName: "somevideopost.com",
    url: "https://www.somevideopost.com/blog",
  },
};

const CHROME: Record<Locale, {
  badge: string; title: string; subtitle: string; articles: string; readSuffix: string;
  featuredBadge: string; featuredTitle: string; featuredSub: string; readGuide: string;
  ctaTitle: string; ctaBody: string; ctaGenPost: string; ctaCreateVideo: string;
  seoTitle: string; seoP1: string; seoP2: string; seoWhy: string; seoOr: string; seoSignup: string; seoTry: string;
}> = {
  da: {
    badge: "Videnscenter", title: "Blog & Guides",
    subtitle: "Tips, strategier og indsigt til udlejere af ferieboliger, private lejligheder og hoteller — samt guides til AI-drevet SOME marketing.",
    articles: "artikler", readSuffix: "læsning",
    featuredBadge: "Fremhævet guide", featuredTitle: "Præsentationsvideo til din bolig — fra link til færdig video på minutter",
    featuredSub: "Se hele brugerflowet med interaktiv simulering, fordelene ved video og hvordan det løfter din SEO.", readGuide: "Læs guiden",
    ctaTitle: "Klar til at gøre din bolig uimodståelig?",
    ctaBody: "AI genererer sælgende SOME-opslag og professionelle præsentationsvideoer direkte fra din annonce — klar på minutter. Se en rigtig AI-genereret præsentationsvideo her ved siden af.",
    ctaGenPost: "Generer SOME opslag", ctaCreateVideo: "Opret præsentationsvideo",
    seoTitle: "AI-video og sociale medier til udlejere — samlet ét sted",
    seoP1: "somevideopost.com hjælper udlejere af ferieboliger, private lejligheder og hoteller med at markedsføre deres bolig professionelt uden teknisk viden. Du indsætter et link til din annonce fra Airbnb, Booking.com eller Novasol — eller uploader dine egne fotos — og AI skaber automatisk en cinematisk præsentationsvideo og et sælgende opslag, tilpasset hver platform.",
    seoP2: "Fra det samme brugervenlige dashboard deler du dine videoer og opslag automatisk på Facebook, Instagram, TikTok, LinkedIn og YouTube — eller downloader videoen i 9:16, 1:1 og 16:9. Vores guides giver dig konkrete tips til prissætning, valg af platform og det bedste tidspunkt at poste.",
    seoWhy: "Læs hvorfor tusindvis af udlejere vælger somevideopost.com", seoOr: "eller", seoSignup: "opret en gratis konto", seoTry: "og prøv selv.",
  },
  en: {
    badge: "Knowledge hub", title: "Blog & Guides",
    subtitle: "Tips, strategies and insight for hosts of holiday homes, private apartments and hotels — plus guides to AI-driven social media marketing.",
    articles: "articles", readSuffix: "read",
    featuredBadge: "Featured guide", featuredTitle: "Presentation video for your property — from link to finished video in minutes",
    featuredSub: "See the whole user flow with an interactive simulation, the benefits of video and how it boosts your SEO.", readGuide: "Read the guide",
    ctaTitle: "Ready to make your property irresistible?",
    ctaBody: "AI generates selling social posts and professional presentation videos straight from your listing — ready in minutes. See a real AI-generated presentation video right here.",
    ctaGenPost: "Generate social post", ctaCreateVideo: "Create presentation video",
    seoTitle: "AI video and social media for hosts — all in one place",
    seoP1: "somevideopost.com helps hosts of holiday homes, private apartments and hotels market their property professionally without technical knowledge. Paste a link to your listing from Airbnb, Booking.com or Novasol — or upload your own photos — and AI automatically creates a cinematic presentation video and a selling post tailored to each platform.",
    seoP2: "From the same easy dashboard you share your videos and posts automatically to Facebook, Instagram, TikTok, LinkedIn and YouTube — or download the video in 9:16, 1:1 and 16:9. Our guides give you concrete tips on pricing, platform choice and the best time to post.",
    seoWhy: "Read why thousands of hosts choose somevideopost.com", seoOr: "or", seoSignup: "create a free account", seoTry: "and try it yourself.",
  },
  es: {
    badge: "Centro de recursos", title: "Blog y guías",
    subtitle: "Consejos, estrategias e ideas para anfitriones de casas vacacionales, apartamentos y hoteles — además de guías de marketing en redes con IA.",
    articles: "artículos", readSuffix: "de lectura",
    featuredBadge: "Guía destacada", featuredTitle: "Vídeo de presentación de tu vivienda — del enlace al vídeo en minutos",
    featuredSub: "Mira todo el flujo con una simulación interactiva, las ventajas del vídeo y cómo mejora tu SEO.", readGuide: "Leer la guía",
    ctaTitle: "¿Listo para hacer tu vivienda irresistible?",
    ctaBody: "La IA genera publicaciones vendedoras y vídeos de presentación profesionales directamente desde tu anuncio — listos en minutos. Mira aquí un vídeo real generado por IA.",
    ctaGenPost: "Generar publicación", ctaCreateVideo: "Crear vídeo de presentación",
    seoTitle: "Vídeo con IA y redes sociales para anfitriones — todo en un solo lugar",
    seoP1: "somevideopost.com ayuda a anfitriones de casas vacacionales, apartamentos y hoteles a promocionar su propiedad profesionalmente sin conocimientos técnicos. Pega un enlace de tu anuncio de Airbnb, Booking.com o Novasol — o sube tus fotos — y la IA crea automáticamente un vídeo de presentación cinematográfico y una publicación adaptada a cada plataforma.",
    seoP2: "Desde el mismo panel compartes tus vídeos y publicaciones automáticamente en Facebook, Instagram, TikTok, LinkedIn y YouTube — o descargas el vídeo en 9:16, 1:1 y 16:9. Nuestras guías te dan consejos sobre precios, elección de plataforma y el mejor momento para publicar.",
    seoWhy: "Descubre por qué miles de anfitriones eligen somevideopost.com", seoOr: "o", seoSignup: "crea una cuenta gratis", seoTry: "y pruébalo tú mismo.",
  },
  de: {
    badge: "Wissenszentrum", title: "Blog & Ratgeber",
    subtitle: "Tipps, Strategien und Einblicke für Vermieter von Ferienhäusern, Privatwohnungen und Hotels — plus Leitfäden zum KI-gestützten Social-Media-Marketing.",
    articles: "Artikel", readSuffix: "Lesezeit",
    featuredBadge: "Empfohlener Leitfaden", featuredTitle: "Präsentationsvideo für deine Immobilie — vom Link zum fertigen Video in Minuten",
    featuredSub: "Sieh den gesamten Ablauf mit interaktiver Simulation, die Vorteile von Video und wie es dein SEO stärkt.", readGuide: "Zum Leitfaden",
    ctaTitle: "Bereit, deine Immobilie unwiderstehlich zu machen?",
    ctaBody: "Die KI erstellt verkaufsstarke Social-Beiträge und professionelle Präsentationsvideos direkt aus deiner Anzeige — fertig in Minuten. Sieh hier ein echtes KI-generiertes Präsentationsvideo.",
    ctaGenPost: "Beitrag generieren", ctaCreateVideo: "Präsentationsvideo erstellen",
    seoTitle: "KI-Video und Social Media für Vermieter — alles an einem Ort",
    seoP1: "somevideopost.com hilft Vermietern von Ferienhäusern, Privatwohnungen und Hotels, ihre Immobilie professionell zu vermarkten — ohne technisches Wissen. Füge einen Link zu deiner Anzeige von Airbnb, Booking.com oder Novasol ein — oder lade eigene Fotos hoch — und die KI erstellt automatisch ein kinematisches Präsentationsvideo und einen verkaufsstarken Beitrag für jede Plattform.",
    seoP2: "Über dasselbe einfache Dashboard teilst du deine Videos und Beiträge automatisch auf Facebook, Instagram, TikTok, LinkedIn und YouTube — oder lädst das Video in 9:16, 1:1 und 16:9 herunter. Unsere Leitfäden geben dir konkrete Tipps zu Preisen, Plattformwahl und dem besten Zeitpunkt.",
    seoWhy: "Lies, warum Tausende Vermieter somevideopost.com wählen", seoOr: "oder", seoSignup: "erstelle ein kostenloses Konto", seoTry: "und probiere es selbst.",
  },
};

export default async function BlogPage() {
  const locale = await getLocale();
  const t = CHROME[locale] ?? CHROME.da;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "SOME VIDEO POST — Blog & guides",
      description: t.subtitle,
      url: `${BASE}/blog`,
      publisher: { "@type": "Organization", name: "somevideopost.com", url: BASE },
      blogPost: POSTS.map((p) => ({
        "@type": "BlogPosting",
        headline: tr(p.title, locale),
        description: tr(p.excerpt, locale),
        datePublished: p.date,
        url: `${BASE}/blog/${p.id}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Forside", item: BASE },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <JsonLd data={jsonLd} />
      <SiteHeader active="blog" locale={locale} />

      {/* Hero */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-semibold text-slate-600">
            <BookOpen size={13} /> {t.badge}
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">{t.title}</h1>
          <p className="mt-3 text-base text-slate-500 max-w-xl mx-auto">{t.subtitle}</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10 space-y-16">
        {/* Featured guide — presentation video */}
        <Link
          href="/blog/praesentationsvideo"
          className="group flex flex-col items-start gap-5 overflow-hidden rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-center sm:p-8"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl" style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}>
            <Video size={26} className="text-white" />
          </div>
          <div className="flex-1">
            <span className="mb-1.5 inline-block rounded-full bg-orange-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#FF6B4A]">
              {t.featuredBadge}
            </span>
            <h2 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B4A] transition-colors">{t.featuredTitle}</h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-500">{t.featuredSub}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-[#FF6B4A]">
            {t.readGuide} <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>

        {CATEGORIES.map((cat) => {
          const catPosts = POSTS.filter((p) => p.category === cat.id);
          const Icon = cat.icon;
          return (
            <section key={cat.id}>
              {/* Category header */}
              <div className="mb-6 flex items-center gap-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${cat.iconBg}`}>
                  <Icon size={20} style={{ color: cat.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900">{tr(cat.label, locale)}</h2>
                    {cat.tag && (
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
                        style={{ background: cat.color }}
                      >
                        {cat.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500">{tr(cat.description, locale)}</p>
                </div>
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs text-slate-400">{catPosts.length} {t.articles}</span>
              </div>

              {/* Posts grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {catPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className={`group flex flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${cat.border}`}
                  >
                    <div className="flex-1">
                      {post.type && (
                        <span
                          className="mb-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
                          style={{ background: cat.color }}
                        >
                          {post.type}
                        </span>
                      )}
                      <h3 className="text-sm font-bold leading-snug text-slate-900 group-hover:text-blue-700 transition-colors">
                        {tr(post.title, locale)}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-500 line-clamp-3">
                        {tr(post.excerpt, locale)}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{formatDate(post.date, locale)}</span>
                      <span>{post.readTime} {t.readSuffix}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* CTA with live video demo */}
        <div
          className="overflow-hidden rounded-2xl p-8 md:p-12 text-white"
          style={{ background: "linear-gradient(135deg, #1B3F7A 0%, #14306b 100%)" }}
        >
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="text-center md:text-left">
              <span className="mb-3 inline-block rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-orange-300">Live demo</span>
              <h2 className="text-xl font-bold mb-2">{t.ctaTitle}</h2>
              <p className="text-blue-200 text-sm mb-6 max-w-md mx-auto md:mx-0">{t.ctaBody}</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <Link href="/posts/new" className="rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-slate-900 hover:bg-slate-100 transition">
                  {t.ctaGenPost}
                </Link>
                <Link href="/videos/new" className="rounded-xl border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/20 transition">
                  {t.ctaCreateVideo}
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-[280px]">
                <div className="absolute inset-0 scale-90 rounded-[2.5rem] opacity-40 blur-2xl" style={{ background: "linear-gradient(135deg, #FFB36B, #FF6B4A)" }} />
                <div className="relative">
                  <DemoVideoPhone />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO content section */}
        <section className="rounded-2xl border border-slate-200 bg-white p-8 md:p-10">
          <h2 className="text-2xl font-bold text-slate-900">{t.seoTitle}</h2>
          <div className="mt-4 flex flex-col gap-4 text-[15px] leading-relaxed text-slate-600">
            <p>{t.seoP1}</p>
            <p>{t.seoP2}</p>
            <p>
              <Link href="/hvorfor-somevideopost" className="font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800">
                {t.seoWhy}
              </Link>{" "}
              {t.seoOr}{" "}
              <Link href="/signup" className="font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800">{t.seoSignup}</Link>{" "}
              {t.seoTry}
            </p>
          </div>
        </section>
      </div>

      <SiteFooter locale={locale} />
    </div>
  );
}
