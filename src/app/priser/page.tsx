import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, Sparkles, Zap, Building2, CreditCard, Video } from "lucide-react";
import { getCurrency } from "@/lib/locale-server";
import { formatPriceKey } from "@/lib/currency";
import { MobileNav } from "@/components/layout/mobile-nav";
import { CinematicWalkthrough } from "@/components/walkthrough/cinematic-walkthrough";

export const metadata: Metadata = {
  title: "Priser — SOME VIDEO POST | AI-video og sociale medier til udlejere",
  description:
    "Se priser for somevideopost.com. Generer AI-præsentationsvideoer og sociale medie-opslag til din feriebolig. Planer uden binding — start gratis.",
  keywords:
    "somevideopost priser, AI video pris, sociale medier udlejning abonnement, feriebolig markedsføring pris",
  alternates: { canonical: "https://www.somevideopost.com/priser" },
  openGraph: {
    title: "Priser — SOME VIDEO POST",
    description:
      "Generer AI-præsentationsvideoer og sociale medie-opslag til din feriebolig. Planer uden binding — start gratis.",
    type: "website",
    siteName: "somevideopost.com",
    url: "https://www.somevideopost.com/priser",
  },
};

const FEATURES: { label: string; starter: string | boolean; pro: string | boolean; business: string | boolean }[] = [
  { label: "Præsentationsvideoer inkluderet pr. måned", starter: "1", pro: "2", business: "6" },
  { label: "Del opslag direkte på sociale medier", starter: true, pro: true, business: true },
  { label: "Generér SOME opslag (AI)", starter: true, pro: true, business: true },
  { label: "Download i alle formater", starter: true, pro: true, business: true },
  { label: "Forbind Facebook / Instagram-konto", starter: true, pro: true, business: true },
  { label: "Blog & guides", starter: true, pro: true, business: true },
  { label: "Planlæg opslag", starter: false, pro: true, business: true },
  { label: "Analytics", starter: false, pro: true, business: true },
  { label: "Flere brands / projekter", starter: false, pro: true, business: true },
  { label: "Ekstra præsentationsvideo (tilkøb)", starter: "€50/stk.", pro: "€50/stk.", business: "€50/stk." },
  { label: "Meta-integration for annoncering", starter: false, pro: false, business: true },
  { label: "Flere brugere / teamadgang", starter: false, pro: false, business: true },
  { label: "Prioriteret support", starter: false, pro: false, business: true },
];

function Tick({ value }: { value: string | boolean }) {
  if (typeof value === "string") {
    return <span className="text-sm font-semibold text-slate-900">{value}</span>;
  }
  return value ? (
    <Check size={16} className="mx-auto text-emerald-500" strokeWidth={2.5} />
  ) : (
    <X size={16} className="mx-auto text-slate-300" strokeWidth={2} />
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-slate-700">
      <Check size={14} className="mt-0.5 shrink-0 text-emerald-500" strokeWidth={2.5} />
      <span>{children}</span>
    </li>
  );
}

export default async function PriserPage() {
  const currency = await getCurrency();
  const starterPrice = formatPriceKey("starter", currency);
  const proPrice = formatPriceKey("pro", currency);
  const businessPrice = formatPriceKey("business", currency);
  const videoPrice = formatPriceKey("video", currency);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Minimal nav */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg font-bold text-sm text-white" style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}>S</span>
            <span className="text-lg font-bold uppercase tracking-tight text-[#1B3F7A]">SOME VIDEO <span className="text-orange-500">POST</span></span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <Link href="/" className="hover:text-[#1B3F7A] transition-colors">Forside</Link>
            <Link href="/#features" className="hover:text-[#1B3F7A] transition-colors">Funktioner</Link>
            <Link href="/blog" className="hover:text-[#1B3F7A] transition-colors">Blog</Link>
            <Link href="/priser" className="text-[#1B3F7A] font-semibold">Priser</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden sm:inline text-sm font-medium text-slate-600 hover:text-[#1B3F7A] transition-colors">Log ind</Link>
            <Link href="/signup" className="rounded-xl px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}>
              Kom i gang gratis
            </Link>
            <MobileNav links={[
              { href: "/", label: "Forside" },
              { href: "/#features", label: "Funktioner", external: true },
              { href: "/blog", label: "Blog" },
              { href: "/priser", label: "Priser" },
              { href: "/login", label: "Log ind" },
            ]} />
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-semibold text-slate-600">
            <CreditCard size={13} /> Gennemsigtige priser
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Vælg den plan der passer til dig
          </h1>
          <p className="mt-3 text-base text-slate-500 max-w-xl mx-auto">
            Alle pakker inkluderer direkte deling til sociale medier og et fast antal præsentationsvideoer hver måned. Ingen skjulte gebyrer, ingen binding.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-14 space-y-16">

        {/* How it works */}
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100">
              <Sparkles size={20} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-slate-900 mb-1">Sådan fungerer det</h2>
              <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                Vælg en månedlig pakke der passer til, hvor meget du deler. Hver pakke inkluderer et fast antal AI-præsentationsvideoer om måneden og giver dig mulighed for at dele opslag direkte på dine sociale medier. Har du brug for flere videoer, kan du tilkøbe dem for {videoPrice}/stk.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {[
                  { label: "Starter", credits: "1 video/md." },
                  { label: "Pro", credits: "2 videoer/md." },
                  { label: "Business", credits: "6 videoer/md." },
                  { label: "Ekstra video", credits: `${videoPrice}/stk.` },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 rounded-lg border border-blue-200 bg-white px-3 py-2">
                    <span className="text-xs font-semibold text-slate-900">{item.label}</span>
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">{item.credits}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid gap-6 md:grid-cols-3">

          {/* Starter */}
          <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
              <Zap size={12} /> Starter
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-slate-900">{starterPrice}</span>
              <span className="text-slate-500 text-sm">/md.</span>
            </div>
            <p className="mt-1 text-xs text-slate-400">Faktureres månedligt · inkl. moms</p>
            <p className="mt-3 text-sm text-slate-600">Kom i gang med direkte deling til sociale medier og din første video hver måned.</p>
            <ul className="my-6 flex flex-col gap-2.5">
              <CheckItem><strong>1 præsentationsvideo</strong> pr. måned inkluderet</CheckItem>
              <CheckItem>Del opslag direkte på sociale medier</CheckItem>
              <CheckItem>AI-generering af SOME opslag</CheckItem>
              <CheckItem>Download i alle formater</CheckItem>
              <CheckItem>Op til 5 boliger</CheckItem>
            </ul>
            <div className="mt-auto">
              <Link
                href="/signup"
                className="block w-full rounded-xl border-2 border-[#1B3F7A] py-3 text-center text-sm font-bold text-[#1B3F7A] transition-colors hover:bg-[#1B3F7A] hover:text-white"
              >
                Kom i gang gratis
              </Link>
            </div>
          </div>

          {/* Pro */}
          <div className="relative flex flex-col rounded-2xl border-2 border-[#1B3F7A] bg-white p-8 shadow-xl">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="rounded-full px-4 py-1 text-xs font-bold text-white whitespace-nowrap" style={{ background: "linear-gradient(135deg, #FFB36B, #FF6B4A)" }}>Mest populær</span>
            </div>
            <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
              <Sparkles size={12} /> Pro
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-[#1B3F7A]">{proPrice}</span>
              <span className="text-slate-500 text-sm">/md.</span>
            </div>
            <p className="mt-1 text-xs text-slate-400">Faktureres månedligt · inkl. moms</p>
            <p className="mt-3 text-sm text-slate-600">Til den aktive udlejer der deler mere og vil have overblik og indsigt.</p>
            <ul className="my-6 flex flex-col gap-2.5">
              <CheckItem><strong>2 præsentationsvideoer</strong> pr. måned inkluderet</CheckItem>
              <CheckItem>Alt i Starter</CheckItem>
              <CheckItem>Del direkte på alle kanaler</CheckItem>
              <CheckItem>Planlægning af opslag</CheckItem>
              <CheckItem>Analytics og indsigt</CheckItem>
              <CheckItem>Flere brands / projekter</CheckItem>
            </ul>
            <div className="mt-auto">
              <Link
                href="/signup"
                className="block w-full rounded-xl py-3 text-center text-sm font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #1B3F7A, #2a5298)" }}
              >
                Vælg Pro
              </Link>
            </div>
          </div>

          {/* Business */}
          <div className="flex flex-col rounded-2xl border border-orange-200 bg-orange-50/50 p-8 shadow-sm">
            <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-lg bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-700">
              <Building2 size={12} /> Business
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-slate-900">{businessPrice}</span>
              <span className="text-slate-500 text-sm">/md.</span>
            </div>
            <p className="mt-1 text-xs text-slate-400">Alt inkluderet · prioriteret support</p>
            <p className="mt-3 text-sm text-slate-600">Den komplette løsning med annoncering via Meta og prioriteret support.</p>
            <ul className="my-6 flex flex-col gap-2.5">
              <CheckItem><strong>6 præsentationsvideoer</strong> pr. måned inkluderet</CheckItem>
              <CheckItem>Alt inkluderet — alt i Pro</CheckItem>
              <CheckItem>Meta-integration for annoncering</CheckItem>
              <CheckItem>Prioriteret support</CheckItem>
              <CheckItem>Team og flere brugere</CheckItem>
            </ul>
            <div className="mt-auto">
              <Link
                href="/signup"
                className="block w-full rounded-xl py-3 text-center text-sm font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #FFB36B, #FF6B4A)" }}
              >
                Vælg Business
              </Link>
            </div>
          </div>

          {/* Extra video add-on */}
          <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-orange-200 bg-orange-50/60 px-6 py-5 sm:flex-row">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <Video size={20} />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Ekstra præsentationsvideo</p>
                <p className="text-sm text-slate-500">Brug for flere videoer end din pakke inkluderer? Tilkøb efter behov.</p>
              </div>
            </div>
            <p className="text-2xl font-extrabold text-slate-900 whitespace-nowrap">{videoPrice} <span className="text-sm font-normal text-slate-500">/ stk.</span></p>
          </div>
        </div>

        {/* Feature comparison table */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-6">Sammenlign planer</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="py-4 pl-6 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 w-1/2">Funktion</th>
                  <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">Starter</th>
                  <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider text-[#1B3F7A]">Pro</th>
                  <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider text-orange-600">Business</th>
                </tr>
              </thead>
              <tbody>
                {FEATURES.map((f, i) => (
                  <tr key={f.label} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                    <td className="py-3 pl-6 pr-4 text-slate-700">{f.label}</td>
                    <td className="px-4 py-3 text-center"><Tick value={f.starter} /></td>
                    <td className="px-4 py-3 text-center"><Tick value={f.pro} /></td>
                    <td className="px-4 py-3 text-center"><Tick value={f.business} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-400">Meta-integration for annoncering (Business) kræver en godkendt Meta Business-konto og er underlagt Metas API-begrænsninger.</p>
        </div>

        {/* FAQ */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Ofte stillede spørgsmål</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                q: "Hvor mange videoer er inkluderet?",
                a: `Starter inkluderer 1 præsentationsvideo om måneden, Pro inkluderer 2, og Business inkluderer 6. Har du brug for flere, tilkøber du dem for ${videoPrice}/stk.`,
              },
              {
                q: "Kan jeg dele direkte på sociale medier?",
                a: "Ja. Alle pakker giver dig mulighed for at dele opslag direkte på dine sociale medier fra dashboardet.",
              },
              {
                q: "Hvad koster en ekstra præsentationsvideo?",
                a: `En ekstra præsentationsvideo koster ${videoPrice} pr. styk, ud over det din pakke inkluderer hver måned.`,
              },
              {
                q: "Kan jeg skifte pakke?",
                a: "Ja, du kan opgradere eller nedgradere din pakke når som helst. Ændringen træder i kraft ved næste faktureringsperiode.",
              },
              {
                q: "Hvad er Meta-integration for annoncering?",
                a: "Business-pakken giver adgang til Meta-integration, så du kan bruge dine videoer og opslag til annoncering på Facebook og Instagram — sammen med prioriteret support.",
              },
              {
                q: "Er der binding?",
                a: "Nej. Alle pakker er månedlige uden binding. Du kan opsige når som helst, og adgang fortsætter til slutningen af den betalte periode.",
              },
            ].map((item) => (
              <div key={item.q}>
                <p className="font-semibold text-slate-900 mb-1">{item.q}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Live video demo */}
        <div
          className="overflow-hidden rounded-2xl p-8 md:p-12 text-white"
          style={{ background: "linear-gradient(160deg, #0a0f1e 0%, #0f1f3d 50%, #0a0f1e 100%)" }}
        >
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="mb-3 inline-block rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-orange-400">Live demo</span>
              <h2 className="text-2xl font-bold mb-3">Se hvad en præsentationsvideo indeholder</h2>
              <p className="text-sm leading-relaxed text-slate-300 mb-5 max-w-md">
                Sådan ser en AI-genereret præsentationsvideo ud. Indsæt et link til din annonce — AI&apos;en henter billederne, bygger fotoruten og leverer en cinematisk video i 9:16 til Reels & TikTok.
              </p>
              <ul className="flex flex-col gap-2 text-sm text-slate-300">
                <CheckItem><span className="text-slate-300">Prøv selv: scroll i videoen for at gå rundt i boligen</span></CheckItem>
                <CheckItem><span className="text-slate-300">Skift farvestemning med filtre</span></CheckItem>
                <CheckItem><span className="text-slate-300">Klar på under 15 minutter</span></CheckItem>
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-[300px]">
                <div className="absolute inset-0 scale-90 rounded-[2.5rem] opacity-40 blur-2xl" style={{ background: "linear-gradient(135deg, #FFB36B, #FF6B4A)" }} />
                <div className="relative">
                  <CinematicWalkthrough locale="da" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className="rounded-2xl p-8 text-white text-center"
          style={{ background: "linear-gradient(135deg, #1B3F7A 0%, #14306b 100%)" }}
        >
          <h2 className="text-xl font-bold mb-2">Klar til at komme i gang?</h2>
          <p className="text-blue-200 text-sm mb-6 max-w-md mx-auto">
            Prøv somevideopost.com gratis. Intet kreditkort påkrævet.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/signup"
              className="rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-slate-900 hover:bg-slate-100 transition"
            >
              Opret gratis konto
            </Link>
            <a
              href="mailto:mail@somevideopost.com"
              className="rounded-xl border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/20 transition"
            >
              Kontakt salg
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
