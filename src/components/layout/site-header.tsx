import Link from "next/link";
import { MobileNav } from "@/components/layout/mobile-nav";
import { BrandWordmark } from "@/components/layout/brand-wordmark";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import type { Locale } from "@/lib/i18n";

type NavKey = "home" | "features" | "video" | "why" | "blog" | "pricing";

const ORANGE_GRADIENT = "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)";

const NAV_LINKS: { key: NavKey; href: string; label: string; external?: boolean }[] = [
  { key: "home", href: "/", label: "Forside" },
  { key: "features", href: "/#features", label: "Funktioner", external: true },
  { key: "video", href: "/#ai", label: "Video", external: true },
  { key: "why", href: "/hvorfor-somevideopost", label: "Hvorfor os" },
  { key: "blog", href: "/blog", label: "Blog" },
  { key: "pricing", href: "/priser", label: "Priser" },
];

/**
 * Shared sticky marketing header (dark, front-page style) used across the public
 * sub-pages (blog, articles, pricing, why…). Mirrors the landing-page nav so the
 * menu is identical everywhere.
 */
export function SiteHeader({ active, locale = "da" }: { active?: NavKey; locale?: Locale }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur" style={{ background: "rgba(5,13,36,0.9)" }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-bold text-sm text-white" style={{ background: ORANGE_GRADIENT }}>s</span>
          <BrandWordmark />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-300 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.key}
              href={l.href}
              className={l.key === active ? "text-white font-semibold" : "hover:text-white transition-colors"}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher current={locale} />
          <Link href="/login" className="hidden sm:inline text-sm font-medium text-slate-300 hover:text-white transition-colors">Log ind</Link>
          <Link href="/signup" className="rounded-xl px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ background: ORANGE_GRADIENT }}>
            Kom i gang gratis
          </Link>
          <MobileNav
            dark
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
