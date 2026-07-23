import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, Sparkles, Zap, Building2, CreditCard, Video } from "lucide-react";
import { getCurrency } from "@/lib/locale-server";
import { formatPriceKey } from "@/lib/currency";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CinematicWalkthrough } from "@/components/walkthrough/cinematic-walkthrough";
import { MetaAdsSection } from "@/components/meta-ads-section";
import { FreePostsShowcase } from "@/components/pricing/free-posts-showcase";

export const metadata: Metadata = {
  title: "Priser — SOME VIDEO POST | AI-video og sociale medier til udlejere",
  description:
    "Se priser for somevideopost.com. Tre pakker fra €50/md. med præsentationsvideoer inkluderet, direkte deling til sociale medier og Meta-annoncering på Business. Ingen binding.",
  keywords:
    "somevideopost priser, AI video pris, sociale medier udlejning abonnement, feriebolig markedsføring pris, meta annoncering pris",
  alternates: { canonical: "https://www.somevideopost.com/priser" },
  openGraph: {
    title: "Priser — SOME VIDEO POST",
    description:
      "Tre pakker fra €50/md. med præsentationsvideoer inkluderet og direkte deling til sociale medier. Ingen binding.",
    type: "website",
    siteName: "somevideopost.com",
    url: "https://www.somevideopost.com/priser",
  },
};

const ORANGE_GRADIENT = "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)";

const FEATURES: { label: string; starter: string | boolean; pro: string | boolean; business: string | boolean }[] = [
  { label: "Præsentationsvideoer inkluderet pr. måned", starter: "1", pro: "2", business: "6" },
  { label: "Del opslag direkte på sociale medier", starter: true, pro: true, business: true },
  { label: "AI-genererede opslag", starter: "50", pro: "100/md.", business: "Ubegrænset" },
  { label: "AI-tekst genereret automatisk via link eller egen prompt", starter: true, pro: true, business: true },
  { label: "Del opslag med dine foretrukne billeder", starter: true, pro: true, business: true },
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
    return <span className="text-sm font-semibold text-white">{value}</span>;
  }
  return value ? (
    <Check size={16} className="mx-auto text-emerald-400" strokeWidth={2.5} />
  ) : (
    <X size={16} className="mx-auto text-slate-600" strokeWidth={2} />
  );
}

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
  const starterPrice = formatPriceKey("starter", currency);
  const proPrice = formatPriceKey("pro", currency);
  const businessPrice = formatPriceKey("business", currency);
  const videoPrice = formatPriceKey("video", currency);

  return (
    <div className="min-h-screen text-slate-100" style={{ background: "#050d24" }}>
      <SiteHeader active="pricing" />

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/5" style={{ background: "linear-gradient(135deg, #040a1c 0%, #071233 55%, #0a1f4d 100%)" }}>
        <div className="absolute left-0 top-0 h-64 w-64 opacity-20" style={{ backgroundImage: "radial-gradient(circle, #4d8dff 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-blue-400/20" style={{ boxShadow: "0 0 80px rgba(59,130,246,0.2)" }} />
        <div className="relative mx-auto max-w-4xl px-6 py-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-200">
            <CreditCard size={13} /> Gennemsigtige priser
          </div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Vælg den pakke der passer til dig
          </h1>
          <p className="mt-4 text-base text-slate-300 max-w-xl mx-auto">
            Alle pakker inkluderer direkte deling til sociale medier og et fast antal præsentationsvideoer hver måned. Ingen skjulte gebyrer, ingen binding.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16 space-y-16">

        {/* Free AI posts showcase — the near-free headline feature */}
        <FreePostsShowcase />

        {/* How it works */}
        <div className="rounded-2xl border border-blue-400/20 bg-blue-500/[0.06] p-6 md:p-8 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/15">
              <Sparkles size={20} className="text-blue-300" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-white mb-1">Sådan fungerer det</h2>
              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                Vælg en månedlig pakke der passer til, hvor meget du deler. Hver pakke inkluderer et fast antal AI-præsentationsvideoer om måneden og giver dig mulighed for at dele opslag direkte på dine sociale medier. Den fangende salgstekst til at udleje din bolig genereres automatisk — indsæt blot et link til din annonce eller skriv din egen prompt, og du vælger selv de billeder, opslaget deles med. Har du brug for flere videoer, kan du tilkøbe dem for {videoPrice}/stk.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {[
                  { label: "Starter", credits: "1 video/md." },
                  { label: "Pro", credits: "2 videoer/md." },
                  { label: "Business", credits: "6 videoer/md." },
                  { label: "Ekstra video", credits: `${videoPrice}/stk.` },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    <span className="text-xs font-semibold text-white">{item.label}</span>
                    <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-200">{item.credits}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid items-start gap-6 md:grid-cols-3">

          {/* Starter */}
          <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm">
            <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-lg bg-blue-500/15 px-2.5 py-1 text-xs font-semibold text-blue-300">
              <Zap size={12} /> Starter
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">{starterPrice}</span>
              <span className="text-slate-400 text-sm">/md.</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">Faktureres månedligt · inkl. moms</p>
            <p className="mt-3 text-sm text-slate-300">Kom i gang med direkte deling til sociale medier og din første video hver måned.</p>
            <ul className="my-6 flex flex-col gap-2.5">
              <CheckItem><strong className="text-white">1 præsentationsvideo</strong> pr. måned inkluderet</CheckItem>
              <CheckItem><strong className="text-white">50 gratis AI-genererede opslag</strong> — del med dine foretrukne billeder</CheckItem>
              <CheckItem>Del opslag direkte på sociale medier</CheckItem>
              <CheckItem>Download i alle formater</CheckItem>
              <CheckItem>Op til 5 boliger</CheckItem>
            </ul>
            <div className="mt-auto">
              <Link
                href="/signup"
                className="block w-full rounded-xl border border-white/20 py-3 text-center text-sm font-bold text-slate-200 transition-colors hover:border-blue-400/50 hover:text-white"
              >
                Kom i gang gratis
              </Link>
            </div>
          </div>

          {/* Pro — most popular */}
          <div className="relative flex flex-col rounded-2xl border border-blue-400/50 bg-white/[0.05] p-8 shadow-[0_0_45px_rgba(59,130,246,0.25)] backdrop-blur-sm">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="rounded-full px-4 py-1 text-xs font-bold text-white whitespace-nowrap" style={{ background: ORANGE_GRADIENT }}>Mest populær</span>
            </div>
            <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-lg bg-blue-500/15 px-2.5 py-1 text-xs font-semibold text-blue-300">
              <Sparkles size={12} /> Pro
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">{proPrice}</span>
              <span className="text-slate-400 text-sm">/md.</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">Faktureres månedligt · inkl. moms</p>
            <p className="mt-3 text-sm text-slate-300">Til den aktive udlejer der deler mere og vil have overblik og indsigt.</p>
            <ul className="my-6 flex flex-col gap-2.5">
              <CheckItem><strong className="text-white">2 præsentationsvideoer</strong> pr. måned inkluderet</CheckItem>
              <CheckItem>Alt i Starter</CheckItem>
              <CheckItem><strong className="text-white">100 AI-genererede opslag</strong> pr. måned</CheckItem>
              <CheckItem>Del direkte på alle kanaler</CheckItem>
              <CheckItem>Planlægning af opslag</CheckItem>
              <CheckItem>Analytics og indsigt</CheckItem>
              <CheckItem>Flere brands / projekter</CheckItem>
            </ul>
            <div className="mt-auto">
              <Link
                href="/signup"
                className="block w-full rounded-xl py-3 text-center text-sm font-bold text-white shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #1e4f9a, #4d8dff)" }}
              >
                Vælg Pro
              </Link>
            </div>
          </div>

          {/* Business */}
          <div className="flex flex-col rounded-2xl border border-orange-500/25 bg-orange-500/[0.06] p-8 backdrop-blur-sm">
            <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-lg bg-orange-500/15 px-2.5 py-1 text-xs font-semibold text-orange-400">
              <Building2 size={12} /> Business
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">{businessPrice}</span>
              <span className="text-slate-400 text-sm">/md.</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">Alt inkluderet · prioriteret support</p>
            <p className="mt-3 text-sm text-slate-300">Den komplette løsning med annoncering via Meta og prioriteret support.</p>
            <ul className="my-6 flex flex-col gap-2.5">
              <CheckItem><strong className="text-white">6 præsentationsvideoer</strong> pr. måned inkluderet</CheckItem>
              <CheckItem>Alt inkluderet — alt i Pro</CheckItem>
              <CheckItem><strong className="text-white">Ubegrænsede AI-genererede opslag</strong></CheckItem>
              <CheckItem>Meta-integration for annoncering</CheckItem>
              <CheckItem>Prioriteret support</CheckItem>
              <CheckItem>Team og flere brugere</CheckItem>
            </ul>
            <div className="mt-auto">
              <Link
                href="/signup"
                className="block w-full rounded-xl py-3 text-center text-sm font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: ORANGE_GRADIENT }}
              >
                Vælg Business
              </Link>
            </div>
          </div>
        </div>

        {/* Extra video add-on */}
        <div className="-mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 backdrop-blur-sm sm:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400">
              <Video size={20} />
            </div>
            <div>
              <p className="font-semibold text-white">Ekstra præsentationsvideo</p>
              <p className="text-sm text-slate-400">Brug for flere videoer end din pakke inkluderer? Tilkøb efter behov.</p>
            </div>
          </div>
          <p className="text-2xl font-extrabold text-white whitespace-nowrap">{videoPrice} <span className="text-sm font-normal text-slate-400">/ stk.</span></p>
        </div>

        {/* Meta advertising (Business) */}
        <MetaAdsSection />

        {/* Feature comparison table */}
        <div>
          <h2 className="text-xl font-bold text-white mb-6">Sammenlign pakker</h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 pl-6 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 w-1/2">Funktion</th>
                  <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-300">Starter</th>
                  <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider text-blue-300">Pro</th>
                  <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider text-orange-400">Business</th>
                </tr>
              </thead>
              <tbody>
                {FEATURES.map((f, i) => (
                  <tr key={f.label} className={i % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"}>
                    <td className="py-3 pl-6 pr-4 text-slate-300">{f.label}</td>
                    <td className="px-4 py-3 text-center"><Tick value={f.starter} /></td>
                    <td className="px-4 py-3 text-center"><Tick value={f.pro} /></td>
                    <td className="px-4 py-3 text-center"><Tick value={f.business} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-500">Meta-integration for annoncering (Business) kræver en godkendt Meta Business-konto og er underlagt Metas API-begrænsninger.</p>
        </div>

        {/* FAQ */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm">
          <h2 className="text-xl font-bold text-white mb-6">Ofte stillede spørgsmål</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                q: "Hvor mange videoer er inkluderet?",
                a: `Starter inkluderer 1 præsentationsvideo om måneden, Pro inkluderer 2, og Business inkluderer 6. Har du brug for flere, tilkøber du dem for ${videoPrice}/stk.`,
              },
              {
                q: "Hvor mange AI-genererede opslag er inkluderet?",
                a: "Starter inkluderer 50 gratis AI-genererede opslag, Pro giver 100 om måneden, og Business har ubegrænset antal. Den fangende salgstekst til din bolig genereres automatisk — enten ved at indsætte et link til din annonce eller ud fra din egen prompt — og du vælger selv de billeder, opslaget deles med.",
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
                a: "Business-pakken giver adgang til Meta Marketing API, så du kan bruge dine videoer og opslag til rigtige annoncekampagner på Facebook og Instagram — med målgruppestyring, retargeting og annonceindsigt, sammen med prioriteret support.",
              },
              {
                q: "Er der binding?",
                a: "Nej. Alle pakker er månedlige uden binding. Du kan opsige når som helst, og adgang fortsætter til slutningen af den betalte periode.",
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
                <CheckItem><span className="text-slate-300">Prøv selv: scroll i videoen for at gå rundt i boligen</span></CheckItem>
                <CheckItem><span className="text-slate-300">Skift farvestemning med filtre</span></CheckItem>
                <CheckItem><span className="text-slate-300">Klar på under 15 minutter</span></CheckItem>
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-[300px]">
                <div className="absolute inset-0 scale-90 rounded-[2.5rem] opacity-40 blur-2xl" style={{ background: ORANGE_GRADIENT }} />
                <div className="relative">
                  <CinematicWalkthrough locale="da" />
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
