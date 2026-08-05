import type { Metadata } from "next";
import Link from "next/link";
import { Check, Sparkles, CreditCard, Video, Wand2, Share2, Crown, Gift } from "lucide-react";
import { getCurrency } from "@/lib/locale-server";
import { formatPrice, formatPriceKey, PLAN_POST_CREDITS, PLAN_INCLUDED_VIDEOS } from "@/lib/currency";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { DemoVideoPhone } from "@/components/demo-video-phone";

export const metadata: Metadata = {
  title: "Priser — SOME VIDEO POST | Gratis, Basic & Pro plan",
  description:
    "Gratis at oprette konto. Basic for €20/md. giver 10 AI-opslag med direkte deling og automation. Pro for €99/md. inkluderer 2 videoer og 20 opslag. Præsentationsvideoer koster €20 pr. styk. Ingen binding.",
  keywords:
    "somevideopost priser, AI video pris, gratis plan, basic plan, pro plan, sociale medier udlejning, præsentationsvideo pris",
  alternates: { canonical: "https://www.somevideopost.com/priser" },
  openGraph: {
    title: "Priser — SOME VIDEO POST | Gratis, Basic & Pro",
    description:
      "Gratis at oprette konto. Basic €20/md. (10 opslag), Pro €99/md. (2 videoer + 20 opslag), og €20 pr. præsentationsvideo. Ingen binding.",
    type: "website",
    siteName: "somevideopost.com",
    url: "https://www.somevideopost.com/priser",
  },
};

const ORANGE_GRADIENT = "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)";

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-slate-300">
      <Check size={14} className="mt-0.5 shrink-0 text-emerald-400" strokeWidth={2.5} />
      <span>{children}</span>
    </li>
  );
}

export default async function PriserPage() {
  const currency = await getCurrency();
  const basicPrice = formatPriceKey("basic", currency);
  const proPrice = formatPriceKey("pro", currency);
  const videoPrice = formatPriceKey("video", currency);
  const postPrice = formatPriceKey("aiPost", currency, { decimals: true });
  const metaAdsPrice = formatPriceKey("metaAds", currency);

  return (
    <div className="min-h-screen text-slate-100" style={{ background: "#050d24" }}>
      <SiteHeader active="pricing" />

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/5" style={{ background: "linear-gradient(135deg, #040a1c 0%, #071233 55%, #0a1f4d 100%)" }}>
        <div className="absolute left-0 top-0 h-64 w-64 opacity-20" style={{ backgroundImage: "radial-gradient(circle, #4d8dff 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-blue-400/20" style={{ boxShadow: "0 0 80px rgba(59,130,246,0.2)" }} />
        <div className="relative mx-auto max-w-4xl px-6 py-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-200">
            <CreditCard size={13} /> Enkel, gennemsigtig pris
          </div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Gratis at starte — betal, når du vokser
          </h1>
          <p className="mt-4 text-base text-slate-300 max-w-xl mx-auto">
            Opret konto gratis. Vælg <strong className="text-white">Basic</strong> for {basicPrice}/md. med {PLAN_POST_CREDITS.basic} AI-opslag, direkte deling og automation — eller <strong className="text-white">Pro</strong> for {proPrice}/md. med {PLAN_INCLUDED_VIDEOS.pro} videoer og {PLAN_POST_CREDITS.pro} opslag. Ekstra præsentationsvideoer koster {videoPrice}/stk. Ingen binding.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-16 space-y-16">

        {/* Pricing cards — Free / Basic / Pro */}
        <div className="grid items-stretch gap-6 md:grid-cols-3">

          {/* Free */}
          <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm">
            <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-lg bg-white/10 px-2.5 py-1 text-xs font-semibold text-slate-300">
              <Gift size={12} /> Gratis
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">{formatPrice(0, currency)}</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">Gratis at oprette konto</p>
            <p className="mt-3 text-sm text-slate-300">
              Kom i gang uden kort. Udforsk studiet og se, hvordan AI laver opslag og videoer.
            </p>
            <ul className="my-6 flex flex-1 flex-col gap-2.5">
              <CheckItem>Opret konto og udforsk dashboardet</CheckItem>
              <CheckItem>Se demoer af opslag og præsentationsvideo</CheckItem>
              <CheckItem>Køb enkelte AI-opslag ({postPrice}/opslag) eller videoer ({videoPrice}/stk.)</CheckItem>
              <CheckItem>Opgradér til Basic eller Pro når som helst</CheckItem>
            </ul>
            <div className="mt-auto">
              <Link
                href="/signup"
                className="block w-full rounded-xl border border-white/20 py-3 text-center text-sm font-bold text-white transition hover:bg-white/10"
              >
                Opret gratis konto
              </Link>
            </div>
          </div>

          {/* Basic — most popular */}
          <div className="relative flex flex-col rounded-2xl border border-blue-400/50 bg-white/[0.05] p-8 shadow-[0_0_45px_rgba(59,130,246,0.25)] backdrop-blur-sm">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">Mest populær</span>
            <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-lg bg-blue-500/15 px-2.5 py-1 text-xs font-semibold text-blue-300">
              <Sparkles size={12} /> Basic
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">{basicPrice}</span>
              <span className="text-slate-400 text-sm">/md.</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">Faktureres månedligt · ingen binding</p>
            <p className="mt-3 text-sm text-slate-300">
              Til dig, der laver opslag jævnligt og vil dele og automatisere direkte.
            </p>
            <ul className="my-6 flex flex-1 flex-col gap-2.5">
              <CheckItem><strong className="text-white">{PLAN_POST_CREDITS.basic} SoMe-opslag</strong> (tekst + billede) hver måned</CheckItem>
              <CheckItem>Del direkte på Facebook & Instagram</CheckItem>
              <CheckItem>Automation & planlægning af opslag</CheckItem>
              <CheckItem>Præsentationsvideoer for {videoPrice}/stk.</CheckItem>
              <CheckItem>Meta-annoncering som tilkøb ({metaAdsPrice}/md.)</CheckItem>
              <CheckItem>Alle studie-værktøjer og downloads</CheckItem>
            </ul>
            <div className="mt-auto">
              <Link
                href="/signup"
                className="block w-full rounded-xl py-3 text-center text-sm font-bold text-white shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #1e4f9a, #4d8dff)" }}
              >
                Vælg Basic
              </Link>
            </div>
          </div>

          {/* Pro */}
          <div className="flex flex-col rounded-2xl border border-orange-500/40 bg-orange-500/[0.06] p-8 backdrop-blur-sm">
            <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-lg bg-orange-500/15 px-2.5 py-1 text-xs font-semibold text-orange-400">
              <Crown size={12} /> Pro
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">{proPrice}</span>
              <span className="text-slate-400 text-sm">/md.</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">Faktureres månedligt · ingen binding</p>
            <p className="mt-3 text-sm text-slate-300">
              Til dig, der vil have videoer inkluderet og maksimal rækkevidde hver måned.
            </p>
            <ul className="my-6 flex flex-1 flex-col gap-2.5">
              <CheckItem><strong className="text-white">{PLAN_INCLUDED_VIDEOS.pro} præsentationsvideoer</strong> inkluderet hver måned</CheckItem>
              <CheckItem><strong className="text-white">{PLAN_POST_CREDITS.pro} SoMe-opslag</strong> (tekst + billede) hver måned</CheckItem>
              <CheckItem><strong className="text-white">Meta-annoncering inkluderet</strong> (Marketing API)</CheckItem>
              <CheckItem>Del direkte på alle sociale medier</CheckItem>
              <CheckItem>Automation, planlægning & prioriteret support</CheckItem>
              <CheckItem>Ekstra videoer for {videoPrice}/stk.</CheckItem>
            </ul>
            <div className="mt-auto">
              <Link
                href="/signup"
                className="block w-full rounded-xl py-3 text-center text-sm font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: ORANGE_GRADIENT }}
              >
                Vælg Pro
              </Link>
            </div>
          </div>
        </div>

        {/* Pay-per-use video banner */}
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-orange-500/25 bg-orange-500/[0.06] p-6 backdrop-blur-sm sm:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/15">
              <Video size={22} className="text-orange-400" />
            </div>
            <div>
              <p className="font-bold text-white">Præsentationsvideo — {videoPrice}/stk.</p>
              <p className="text-sm text-slate-400">Betal pr. brug på Free & Basic. Inkluderet på Pro (2/md.). Se forhåndsvisning, betal først når du er tilfreds.</p>
            </div>
          </div>
          <Link
            href="/videos/new"
            className="whitespace-nowrap rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: ORANGE_GRADIENT }}
          >
            Opret en video
          </Link>
        </div>

        {/* How it works */}
        <div className="rounded-2xl border border-blue-400/20 bg-blue-500/[0.06] p-6 md:p-8 backdrop-blur-sm">
          <h2 className="text-lg font-bold text-white mb-6">Sådan fungerer det</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: Sparkles, title: "1 · Opret konto & vælg plan", desc: `Opret gratis. Vælg Basic (${basicPrice}/md., ${PLAN_POST_CREDITS.basic} opslag) eller Pro (${proPrice}/md., ${PLAN_INCLUDED_VIDEOS.pro} videoer + ${PLAN_POST_CREDITS.pro} opslag).` },
              { icon: Wand2, title: "2 · Lav opslag og videoer", desc: `Generér opslag inkluderet i din plan, og lav ekstra præsentationsvideoer for ${videoPrice}/stk. efter behov.` },
              { icon: Share2, title: "3 · Del direkte", desc: "Del opslag og videoer direkte på Facebook og Instagram fra dashboardet." },
            ].map((step) => (
              <div key={step.title} className="flex flex-col gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15">
                  <step.icon size={20} className="text-blue-300" />
                </div>
                <p className="text-sm font-bold text-white">{step.title}</p>
                <p className="text-sm leading-relaxed text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm">
          <h2 className="text-xl font-bold text-white mb-6">Ofte stillede spørgsmål</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                q: "Hvad er forskellen på Free, Basic og Pro?",
                a: `Det er gratis at oprette konto (Free). Basic koster ${basicPrice}/md. og giver ${PLAN_POST_CREDITS.basic} AI-opslag om måneden med direkte deling og automation. Pro koster ${proPrice}/md. og inkluderer ${PLAN_INCLUDED_VIDEOS.pro} præsentationsvideoer og ${PLAN_POST_CREDITS.pro} opslag om måneden.`,
              },
              {
                q: "Hvad koster en præsentationsvideo?",
                a: `En præsentationsvideo koster ${videoPrice} pr. styk på Free og Basic. På Pro er ${PLAN_INCLUDED_VIDEOS.pro} videoer inkluderet hver måned, og ekstra videoer koster ${videoPrice}/stk.`,
              },
              {
                q: "Hvornår betaler jeg for en video?",
                a: "Du kan se en forhåndsvisning, mens videoen bygges, og betaler først, når du vil låse den fulde video op til download og deling. Uploadede videoer koster ingenting.",
              },
              {
                q: "Kan jeg dele direkte på sociale medier?",
                a: "Ja. Med Basic og Pro deler du opslag og videoer direkte på Facebook og Instagram fra dashboardet — og automatiserer opslag på det bedste tidspunkt.",
              },
              {
                q: "Hvad sker der, når mine månedlige opslag er brugt?",
                a: `Basic giver ${PLAN_POST_CREDITS.basic} og Pro ${PLAN_POST_CREDITS.pro} AI-opslag om måneden. Saldoen fyldes automatisk op hver måned, så længe dit abonnement er aktivt — og du kan altid tilkøbe ekstra opslag.`,
              },
              {
                q: "Er der binding?",
                a: "Nej. Basic og Pro er månedlige uden binding, og du kan opsige når som helst. Videoer på Free og Basic betaler du kun for, når du bruger dem.",
              },
            ].map((item) => (
              <div key={item.q}>
                <p className="font-semibold text-white mb-1">{item.q}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Live video demo */}
        <div
          className="overflow-hidden rounded-2xl border border-white/10 p-8 md:p-12 text-white"
          style={{ background: "linear-gradient(160deg, #040a1c 0%, #0a1f4d 50%, #040a1c 100%)" }}
        >
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="mb-3 inline-block rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-orange-400">Live demo</span>
              <h2 className="text-2xl font-bold mb-3">Se hvad en præsentationsvideo indeholder</h2>
              <p className="text-sm leading-relaxed text-slate-300 mb-5 max-w-md">
                Sådan ser en AI-genereret præsentationsvideo ud. Indsæt et link til din annonce — AI&apos;en henter billederne, bygger fotoruten og leverer en cinematisk video i 9:16 til Reels & TikTok.
              </p>
              <ul className="flex flex-col gap-2 text-sm text-slate-300">
                <CheckItem><span className="text-slate-300">Cinematiske kamerabevægelser gennem hvert rum</span></CheckItem>
                <CheckItem><span className="text-slate-300">Musik, overgange og undertekster tilføjes automatisk</span></CheckItem>
                <CheckItem><span className="text-slate-300">Klar på under 5 minutter</span></CheckItem>
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-[300px]">
                <div className="absolute inset-0 scale-90 rounded-[2.5rem] opacity-40 blur-2xl" style={{ background: ORANGE_GRADIENT }} />
                <div className="relative">
                  <DemoVideoPhone />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className="relative overflow-hidden rounded-2xl border border-white/10 p-8 text-white text-center"
          style={{ background: "linear-gradient(135deg, #040a1c 0%, #0a1f4d 100%)" }}
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-blue-400/20" style={{ boxShadow: "0 0 60px rgba(59,130,246,0.2)" }} />
          <div className="relative">
            <h2 className="text-2xl font-bold mb-2">Klar til at komme i gang?</h2>
            <p className="text-slate-300 text-sm mb-6 max-w-md mx-auto">
              Kom i gang med somevideopost.com i dag. Ingen binding.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/signup"
                className="rounded-xl px-6 py-3 text-sm font-bold text-white shadow-[0_0_30px_rgba(255,107,74,0.35)] transition-opacity hover:opacity-90"
                style={{ background: ORANGE_GRADIENT }}
              >
                Opret konto
              </Link>
              <a
                href="mailto:mail@somevideopost.com"
                className="rounded-xl border border-white/25 bg-white/5 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition"
              >
                Kontakt salg
              </a>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
