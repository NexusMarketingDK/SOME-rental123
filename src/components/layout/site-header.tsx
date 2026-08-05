import Link from "next/link";
import { MobileNav } from "@/components/layout/mobile-nav";
import { BrandWordmark } from "@/components/layout/brand-wordmark";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import type { Locale } from "@/lib/i18n";

type NavKey = "home" | "features" | "integrations" | "video" | "why" | "blog" | "pricing";

const ORANGE_GRADIENT = "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)";

const NAV_LINKS: { key: NavKey; href: string; external?: boolean }[] = [
  { key: "home", href: "/" },
  { key: "features", href: "/#features", external: true },
  { key: "integrations", href: "/integrationer" },
  { key: "video", href: "/#ai", external: true },
  { key: "why", href: "/hvorfor-somevideopost" },
  { key: "blog", href: "/blog" },
  { key: "pricing", href: "/priser" },
];

const NAV_LABELS: Record<Locale, Record<NavKey, string>> = {
  da: { home: "Forside", features: "Funktioner", integrations: "Integrationer", video: "Video", why: "Hvorfor os", blog: "Blog", pricing: "Priser" },
  en: { home: "Home", features: "Features", integrations: "Integrations", video: "Video", why: "Why us", blog: "Blog", pricing: "Pricing" },
  es: { home: "Inicio", features: "Funciones", integrations: "Integraciones", video: "Vídeo", why: "Por qué", blog: "Blog", pricing: "Precios" },
  de: { home: "Start", features: "Funktionen", integrations: "Integrationen", video: "Video", why: "Warum wir", blog: "Blog", pricing: "Preise" },
};

const AUX: Record<Locale, { login: string; cta: string }> = {
  da: { login: "Log ind", cta: "Kom i gang" },
  en: { login: "Log in", cta: "Get started" },
  es: { login: "Iniciar sesión", cta: "Empezar" },
  de: { login: "Anmelden", cta: "Loslegen" },
};

/**
 * Shared sticky marketing header (dark, front-page style) used across the public
 * sub-pages (blog, articles, pricing, why…). Nav labels follow the visitor's
 * language so the menu is localized everywhere.
 */
export function SiteHeader({ active, locale = "da" }: { active?: NavKey; locale?: Locale }) {
  const labels = NAV_LABELS[locale] ?? NAV_LABELS.da;
  const aux = AUX[locale] ?? AUX.da;

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
              {labels[l.key]}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher current={locale} />
          <Link href="/login" className="hidden sm:inline text-sm font-medium text-slate-300 hover:text-white transition-colors">{aux.login}</Link>
          <Link href="/signup" className="rounded-xl px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ background: ORANGE_GRADIENT }}>
            {aux.cta}
          </Link>
          <MobileNav
            dark
            links={[
              ...NAV_LINKS.map(({ href, key, external }) => ({ href, label: labels[key], external })),
              { href: "/login", label: aux.login },
            ]}
          />
        </div>
      </div>
    </header>
  );
}
