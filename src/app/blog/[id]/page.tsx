import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, CalendarDays } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { JsonLd } from "@/components/seo/json-ld";
import { getLocale } from "@/lib/locale-server";
import { POSTS, getPost, getCategory, formatDate, articleBody, tr } from "@/lib/blog";
import type { Locale } from "@/lib/i18n";

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.somevideopost.com";

const CHROME: Record<Locale, {
  back: string; readSuffix: string; ctaTitle: string; ctaBody: string;
  whyLink: string; ctaBtn: string; related: string;
}> = {
  da: { back: "Tilbage til blog", readSuffix: "læsning", ctaTitle: "Prøv SOME VIDEO POST gratis", ctaBody: "Gå fra boliglink til færdigt opslag og cinematisk video på minutter. Intet kreditkort påkrævet.", whyLink: "Læs hvorfor udlejere vælger somevideopost.com", ctaBtn: "Opret gratis konto", related: "Læs også" },
  en: { back: "Back to blog", readSuffix: "read", ctaTitle: "Try SOME VIDEO POST free", ctaBody: "Go from a property link to a finished post and cinematic video in minutes. No credit card required.", whyLink: "Read why hosts choose somevideopost.com", ctaBtn: "Create free account", related: "Read also" },
  es: { back: "Volver al blog", readSuffix: "de lectura", ctaTitle: "Prueba SOME VIDEO POST gratis", ctaBody: "Pasa del enlace del anuncio a una publicación y un vídeo cinematográfico en minutos. Sin tarjeta.", whyLink: "Descubre por qué los anfitriones eligen somevideopost.com", ctaBtn: "Crear cuenta gratis", related: "Lee también" },
  de: { back: "Zurück zum Blog", readSuffix: "Lesezeit", ctaTitle: "SOME VIDEO POST kostenlos testen", ctaBody: "Vom Immobilienlink zum fertigen Beitrag und kinematischen Video in Minuten. Keine Kreditkarte nötig.", whyLink: "Lies, warum Vermieter somevideopost.com wählen", ctaBtn: "Kostenloses Konto erstellen", related: "Auch lesen" },
};

export function generateStaticParams() {
  return POSTS.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const post = getPost(Number(id));
  if (!post) return { title: "Artikel ikke fundet — SOME VIDEO POST" };

  const locale = await getLocale();
  const title = tr(post.title, locale);
  const excerpt = tr(post.excerpt, locale);
  const url = `https://www.somevideopost.com/blog/${post.id}`;
  return {
    title: `${title} — SOME VIDEO POST`,
    description: excerpt,
    alternates: { canonical: url },
    openGraph: { title, description: excerpt, type: "article", siteName: "somevideopost.com", url },
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = getPost(Number(id));
  if (!post) notFound();

  const locale = await getLocale();
  const c = CHROME[locale] ?? CHROME.da;
  const cat = getCategory(post.category);
  const body = articleBody(post, locale);
  const title = tr(post.title, locale);
  const excerpt = tr(post.excerpt, locale);

  // Related posts from the same category (excluding the current one)
  const related = POSTS.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3);

  const url = `${BASE}/blog/${post.id}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: title,
      description: excerpt,
      datePublished: post.date,
      dateModified: post.date,
      articleSection: cat ? tr(cat.label, locale) : undefined,
      author: { "@type": "Organization", name: "somevideopost.com", url: BASE },
      publisher: { "@type": "Organization", name: "somevideopost.com", url: BASE },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      url,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Forside", item: BASE },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
        { "@type": "ListItem", position: 3, name: title, item: url },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <JsonLd data={jsonLd} />
      <SiteHeader active="blog" locale={locale} />

      <article className="mx-auto max-w-3xl px-6 py-12">
        {/* Back link */}
        <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-[#1B3F7A] transition-colors">
          <ArrowLeft size={15} /> {c.back}
        </Link>

        {/* Category + meta */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          {cat && (
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-white"
              style={{ background: cat.color }}
            >
              {tr(cat.label, locale)}
            </Link>
          )}
          <span className="inline-flex items-center gap-1 text-xs text-slate-400"><CalendarDays size={12} /> {formatDate(post.date, locale)}</span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-400"><Clock size={12} /> {post.readTime} {c.readSuffix}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">{title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-500">{excerpt}</p>

        <hr className="my-8 border-slate-200" />

        {/* Body */}
        <div className="flex flex-col gap-8">
          {body.map((section) => (
            <section key={section.heading}>
              <h2 className="mb-3 text-xl font-bold text-slate-900">{section.heading}</h2>
              <div className="flex flex-col gap-4">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="text-base leading-relaxed text-slate-600">{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div
          className="mt-12 rounded-2xl p-8 text-center text-white"
          style={{ background: "linear-gradient(135deg, #1B3F7A 0%, #14306b 100%)" }}
        >
          <h2 className="text-xl font-bold">{c.ctaTitle}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-blue-200">
            {c.ctaBody}{" "}
            <Link href="/hvorfor-somevideopost" className="font-semibold text-white underline underline-offset-2">
              {c.whyLink}
            </Link>.
          </p>
          <Link
            href="/signup"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
          >
            {c.ctaBtn} <ArrowRight size={15} />
          </Link>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-4 text-lg font-bold text-slate-900">{c.related}</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/blog/${r.id}`}
                  className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <h3 className="text-sm font-bold leading-snug text-slate-900 group-hover:text-blue-700 transition-colors">{tr(r.title, locale)}</h3>
                  <span className="mt-3 text-[11px] text-slate-400">{r.readTime} {c.readSuffix}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <SiteFooter locale={locale} />
    </div>
  );
}
