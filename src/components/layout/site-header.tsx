import Link from "next/link";
import { MobileNav } from "@/components/layout/mobile-nav";

type NavKey = "home" | "features" | "why" | "blog" | "pricing";

const NAV_LINKS: { key: NavKey; href: string; label: string; external?: boolean }[] = [
  { key: "home", href: "/", label: "Forside" },
  { key: "features", href: "/#features", label: "Funktioner", external: true },
  { key: "why", href: "/hvorfor-somevideopost", label: "Hvorfor os" },
  { key: "blog", href: "/blog", label: "Blog" },
  { key: "pricing", href: "/priser", label: "Priser" },
];

/** Shared sticky marketing header used across public pages (blog, articles, …). */
export function SiteHeader({ active }: { active?: NavKey }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg font-bold text-sm text-white" style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}>S</span>
          <span className="text-lg font-bold uppercase tracking-tight text-[#1B3F7A]">SOME VIDEO <span className="text-orange-500">POST</span></span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.key}
              href={l.href}
              className={
                l.key === active
                  ? "text-[#1B3F7A] font-semibold"
                  : "hover:text-[#1B3F7A] transition-colors"
              }
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden sm:inline text-sm font-medium text-slate-600 hover:text-[#1B3F7A] transition-colors">Log ind</Link>
          <Link href="/signup" className="rounded-xl px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}>
            Kom i gang gratis
          </Link>
          <MobileNav
            links={[
              ...NAV_LINKS.map(({ href, label, external }) => ({ href, label, external })),
              { href: "/login", label: "Log ind" },
            ]}
          />
        </div>
      </div>
    </header>
  );
}
