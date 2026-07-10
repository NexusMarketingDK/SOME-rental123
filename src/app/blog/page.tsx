import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { CinematicWalkthrough } from "@/components/walkthrough/cinematic-walkthrough";
import { CATEGORIES, POSTS, formatDate } from "@/lib/blog";

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

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Nav */}
      <SiteHeader active="blog" />

      {/* Hero */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-semibold text-slate-600">
            <BookOpen size={13} /> Videnscenter
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Blog & Guides
          </h1>
          <p className="mt-3 text-base text-slate-500 max-w-xl mx-auto">
            Tips, strategier og indsigt til udlejere af ferieboliger, private lejligheder og hoteller — samt guides til AI-drevet SOME marketing.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10 space-y-16">
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
                    <h2 className="text-lg font-bold text-slate-900">{cat.label}</h2>
                    {cat.tag && (
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
                        style={{ background: cat.color }}
                      >
                        {cat.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500">{cat.description}</p>
                </div>
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs text-slate-400">{catPosts.length} artikler</span>
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
                        {post.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-500 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{formatDate(post.date)}</span>
                      <span>{post.readTime} læsning</span>
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
              <h2 className="text-xl font-bold mb-2">Klar til at gøre din bolig uimodståelig?</h2>
              <p className="text-blue-200 text-sm mb-6 max-w-md mx-auto md:mx-0">
                AI genererer sælgende SOME-opslag og professionelle præsentationsvideoer direkte fra din annonce — klar på minutter. Prøv demoen her: scroll i videoen for at gå rundt i boligen.
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <Link
                  href="/posts/new"
                  className="rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-slate-900 hover:bg-slate-100 transition"
                >
                  Generer SOME opslag
                </Link>
                <Link
                  href="/videos/new"
                  className="rounded-xl border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/20 transition"
                >
                  Opret præsentationsvideo
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-[280px]">
                <div className="absolute inset-0 scale-90 rounded-[2.5rem] opacity-40 blur-2xl" style={{ background: "linear-gradient(135deg, #FFB36B, #FF6B4A)" }} />
                <div className="relative">
                  <CinematicWalkthrough locale="da" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
