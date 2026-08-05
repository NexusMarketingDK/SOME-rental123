import Link from "next/link";
import { BrandWordmark } from "@/components/layout/brand-wordmark";
import type { Locale } from "@/lib/i18n";

const ORANGE_GRADIENT = "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)";

function FacebookIcon({ size = 15 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>;
}
function InstagramIcon({ size = 15 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
}

type FooterT = {
  tagline: string;
  product: string; integrations: string; support: string;
  features: string; aiVideo: string; why: string; pricing: string; blog: string;
  createAccount: string; login: string; getStarted: string; viewAll: string;
  ctaTitle: string; ctaSub: string; ctaBtn: string;
  rights: string; privacy: string; cookies: string; terms: string;
};

const STRINGS: Record<Locale, FooterT> = {
  da: {
    tagline: "AI-drevet markedsføring til udlejere af ferieboliger. Spar tid og nå flere gæster automatisk.",
    product: "Produkt", integrations: "Integrationer", support: "Support",
    features: "Funktioner", aiVideo: "AI-video", why: "Hvorfor somevideopost.com", pricing: "Priser", blog: "Blog",
    createAccount: "Opret konto", login: "Log ind", getStarted: "Kom i gang", viewAll: "Se alle integrationer",
    ctaTitle: "Kom i gang i dag", ctaSub: "Ingen binding.", ctaBtn: "Start nu",
    rights: "Alle rettigheder forbeholdes.", privacy: "Privatliv", cookies: "Cookies", terms: "Vilkår",
  },
  en: {
    tagline: "AI-powered marketing for holiday-home hosts. Save time and reach more guests automatically.",
    product: "Product", integrations: "Integrations", support: "Support",
    features: "Features", aiVideo: "AI video", why: "Why somevideopost.com", pricing: "Pricing", blog: "Blog",
    createAccount: "Create account", login: "Log in", getStarted: "Get started", viewAll: "See all integrations",
    ctaTitle: "Get started today", ctaSub: "No commitment.", ctaBtn: "Start now",
    rights: "All rights reserved.", privacy: "Privacy", cookies: "Cookies", terms: "Terms",
  },
  es: {
    tagline: "Marketing con IA para anfitriones de alquiler vacacional. Ahorra tiempo y llega a más huéspedes automáticamente.",
    product: "Producto", integrations: "Integraciones", support: "Soporte",
    features: "Funciones", aiVideo: "Vídeo IA", why: "Por qué somevideopost.com", pricing: "Precios", blog: "Blog",
    createAccount: "Crear cuenta", login: "Iniciar sesión", getStarted: "Empezar", viewAll: "Ver todas las integraciones",
    ctaTitle: "Empieza hoy", ctaSub: "Sin compromiso.", ctaBtn: "Empezar ahora",
    rights: "Todos los derechos reservados.", privacy: "Privacidad", cookies: "Cookies", terms: "Términos",
  },
  de: {
    tagline: "KI-gestütztes Marketing für Ferienvermieter. Spare Zeit und erreiche automatisch mehr Gäste.",
    product: "Produkt", integrations: "Integrationen", support: "Support",
    features: "Funktionen", aiVideo: "KI-Video", why: "Warum somevideopost.com", pricing: "Preise", blog: "Blog",
    createAccount: "Konto erstellen", login: "Anmelden", getStarted: "Loslegen", viewAll: "Alle Integrationen ansehen",
    ctaTitle: "Heute loslegen", ctaSub: "Keine Bindung.", ctaBtn: "Jetzt starten",
    rights: "Alle Rechte vorbehalten.", privacy: "Datenschutz", cookies: "Cookies", terms: "AGB",
  },
};

const INTEGRATION_NAMES = ["Airbnb", "Booking.com", "Idealista.com", "Facebook & Instagram", "TikTok", "LinkedIn"];

/** Shared dark marketing footer used across the public sub-pages (blog, priser, why…). */
export function SiteFooter({ locale = "da" }: { locale?: Locale }) {
  const t = STRINGS[locale] ?? STRINGS.da;

  return (
    <footer className="border-t border-white/5" style={{ background: "#04091c" }}>
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold text-white" style={{ background: ORANGE_GRADIENT }}>s</span>
              <BrandWordmark />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">{t.tagline}</p>
            <div className="mt-5 flex gap-3">
              <a href="https://www.facebook.com/profile.php?id=61592058891174" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-blue-400/40 hover:text-blue-300">
                <FacebookIcon />
              </a>
              <a href="#" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-blue-400/40 hover:text-blue-300">
                <InstagramIcon />
              </a>
              <a href="#" aria-label="TikTok" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-blue-400/40 hover:text-blue-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" /></svg>
              </a>
            </div>
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">{t.product}</p>
            <ul className="flex flex-col gap-3 text-sm text-slate-400">
              <li><Link href="/#features" className="transition-colors hover:text-white">{t.features}</Link></li>
              <li><Link href="/#ai" className="transition-colors hover:text-white">{t.aiVideo}</Link></li>
              <li><Link href="/hvorfor-somevideopost" className="transition-colors hover:text-white">{t.why}</Link></li>
              <li><Link href="/priser" className="transition-colors hover:text-white">{t.pricing}</Link></li>
              <li><Link href="/blog" className="transition-colors hover:text-white">{t.blog}</Link></li>
              <li><Link href="/signup" className="transition-colors hover:text-white">{t.createAccount}</Link></li>
              <li><Link href="/login" className="transition-colors hover:text-white">{t.login}</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
              <Link href="/integrationer" className="transition-colors hover:text-white">{t.integrations}</Link>
            </p>
            <ul className="flex flex-col gap-3 text-sm text-slate-400">
              {INTEGRATION_NAMES.map((p) => (
                <li key={p}><Link href="/integrationer" className="transition-colors hover:text-white">{p}</Link></li>
              ))}
              <li><Link href="/integrationer" className="font-medium text-slate-300 transition-colors hover:text-white">{t.viewAll} →</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">{t.support}</p>
            <ul className="flex flex-col gap-3 text-sm text-slate-400">
              <li><a href="mailto:mail@somevideopost.com" className="transition-colors hover:text-white">mail@somevideopost.com</a></li>
              <li><Link href="/signup" className="transition-colors hover:text-white">{t.getStarted}</Link></li>
            </ul>
            <div className="mt-6 rounded-xl border border-orange-500/20 bg-orange-500/10 p-4">
              <p className="text-xs font-semibold text-orange-400">{t.ctaTitle}</p>
              <p className="mt-1 text-xs text-slate-400">{t.ctaSub}</p>
              <Link href="/signup" className="mt-3 block w-full rounded-lg py-2 text-center text-xs font-bold text-white transition-opacity hover:opacity-90" style={{ background: ORANGE_GRADIENT }}>
                {t.ctaBtn}
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/5 pt-8 md:flex-row md:justify-between">
          <p className="text-xs text-slate-600">© {new Date().getFullYear()} somevideopost.com. {t.rights}</p>
          <div className="flex gap-6 text-xs text-slate-600">
            <a href="#" className="transition-colors hover:text-slate-400">{t.privacy}</a>
            <a href="#" className="transition-colors hover:text-slate-400">{t.cookies}</a>
            <a href="#" className="transition-colors hover:text-slate-400">{t.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
