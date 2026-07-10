import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, CalendarDays } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { POSTS, getPost, getCategory, formatDate, articleBody } from "@/lib/blog";

export function generateStaticParams() {
  return POSTS.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const post = getPost(Number(id));
  if (!post) return { title: "Artikel ikke fundet — SOME VIDEO POST" };

  const url = `https://www.somevideopost.com/blog/${post.id}`;
  return {
    title: `${post.title} — SOME VIDEO POST`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      siteName: "somevideopost.com",
      url,
    },
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = getPost(Number(id));
  if (!post) notFound();

  const cat = getCategory(post.category);
  const body = articleBody(post);

  // Related posts from the same category (excluding the current one)
  const related = POSTS.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader active="blog" />

      <article className="mx-auto max-w-3xl px-6 py-12">
        {/* Back link */}
        <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-[#1B3F7A] transition-colors">
          <ArrowLeft size={15} /> Tilbage til blog
        </Link>

        {/* Category + meta */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          {cat && (
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-white"
              style={{ background: cat.color }}
            >
              {cat.label}
            </Link>
          )}
          <span className="inline-flex items-center gap-1 text-xs text-slate-400"><CalendarDays size={12} /> {formatDate(post.date)}</span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-400"><Clock size={12} /> {post.readTime} læsning</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">{post.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-500">{post.excerpt}</p>

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
          <h2 className="text-xl font-bold">Prøv SOME VIDEO POST gratis</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-blue-200">
            Gå fra boliglink til færdigt opslag og cinematisk video på minutter. Intet kreditkort påkrævet.
          </p>
          <Link
            href="/signup"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
          >
            Opret gratis konto <ArrowRight size={15} />
          </Link>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-4 text-lg font-bold text-slate-900">Læs også</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/blog/${r.id}`}
                  className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <h3 className="text-sm font-bold leading-snug text-slate-900 group-hover:text-blue-700 transition-colors">{r.title}</h3>
                  <span className="mt-3 text-[11px] text-slate-400">{r.readTime} læsning</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
