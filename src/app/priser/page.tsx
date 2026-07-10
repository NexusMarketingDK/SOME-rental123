import Link from "next/link";
import { Check, X, Sparkles, Zap, Building2, CreditCard } from "lucide-react";
import { getCurrency } from "@/lib/locale-server";
import { formatPriceKey } from "@/lib/currency";
import { MobileNav } from "@/components/layout/mobile-nav";

const FEATURES = [
  { label: "Generér SOME opslag (AI)", starter: true, pro: true, business: true },
  { label: "Generér præsentationsvideoer", starter: true, pro: true, business: true },
  { label: "Download", starter: true, pro: true, business: true },
  { label: "Web Share (del via telefonens delingsmenu)", starter: true, pro: true, business: true },
  { label: "Kopiér link", starter: true, pro: true, business: true },
  { label: "Blog & guides", starter: true, pro: true, business: true },
  { label: "Planlæg opslag", starter: false, pro: true, business: true },
  { label: "Forbind Facebook / Instagram-konto", starter: false, pro: true, business: true },
  { label: "Direkte publicering til Facebook", starter: false, pro: true, business: true },
  { label: "Direkte publicering til Instagram Business*", starter: false, pro: true, business: true },
  { label: "Analytics", starter: false, pro: true, business: true },
  { label: "Flere brands / projekter", starter: false, pro: true, business: true },
  { label: "Flere brugere / teamadgang", starter: false, pro: false, business: true },
  { label: "API-adgang", starter: false, pro: false, business: true },
  { label: "Prioriteret support", starter: false, pro: false, business: true },
];

function Tick({ yes }: { yes: boolean }) {
  return yes ? (
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
  const businessMinPrice = formatPriceKey("businessMin", currency);
  const businessMaxPrice = formatPriceKey("businessMax", currency);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Minimal nav */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg font-bold text-sm text-white" style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}>S</span>
            <span className="text-lg font-bold text-[#1B3F7A]">somevideopost.com</span>
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
            Alle planer inkluderer credits der kan bruges til SOME opslag og præsentationsvideoer. Ingen skjulte gebyrer.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-14 space-y-16">

        {/* Credits explanation */}
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100">
              <Sparkles size={20} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-slate-900 mb-1">Hvad er credits?</h2>
              <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                1 credit svarer til 1 euro i værdi og trækkes fra det månedlige beløb du betaler. Hvert SOME opslag koster 1 credit, og hver præsentationsvideo koster 1 credit. Bruger du flere end din plan inkluderer, kan du tilkøbe ekstra credits — minimum 10 credits ad gangen.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {[
                  { label: "1 SOME opslag", credits: "1 credit" },
                  { label: "1 præsentationsvideo", credits: "1 credit" },
                  { label: "Ekstra credits", credits: "min. 10 ad gangen" },
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
            <p className="mt-3 text-sm text-slate-600">Del nemt til dine sociale medier med AI-genererede opslag og videoer.</p>
            <ul className="my-6 flex flex-col gap-2.5">
              <CheckItem>AI-generering af SOME opslag</CheckItem>
              <CheckItem>AI-generering af præsentationsvideoer</CheckItem>
              <CheckItem>Download til enheden</CheckItem>
              <CheckItem>Web Share (del via telefonens delingsmenu)</CheckItem>
              <CheckItem>Kopiér link til deling</CheckItem>
              <CheckItem>Grundlæggende boligoversigt</CheckItem>
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
            <p className="mt-3 text-sm text-slate-600">Publicér direkte fra platformen og administrér dine sociale medier.</p>
            <ul className="my-6 flex flex-col gap-2.5">
              <CheckItem>Alt i Starter</CheckItem>
              <CheckItem>Forbind Facebook / Instagram via OAuth</CheckItem>
              <CheckItem>Direkte publicering (hvor API&apos;er tillader det)</CheckItem>
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
              <span className="text-4xl font-extrabold text-slate-900">{businessMinPrice}</span>
              <span className="text-slate-500 text-sm">–{businessMaxPrice}/md.</span>
            </div>
            <p className="mt-1 text-xs text-slate-400">Bureauer og større virksomheder</p>
            <p className="mt-3 text-sm text-slate-600">Skalerbar løsning til teams med avancerede behov og prioriteret support.</p>
            <ul className="my-6 flex flex-col gap-2.5">
              <CheckItem>Alt i Pro</CheckItem>
              <CheckItem>Flere brugere og teamadgang</CheckItem>
              <CheckItem>Flere brands under ét abonnement</CheckItem>
              <CheckItem>Teamfunktioner og rollestyring</CheckItem>
              <CheckItem>API-adgang</CheckItem>
              <CheckItem>Prioriteret support</CheckItem>
            </ul>
            <div className="mt-auto">
              <a
                href="mailto:kontakt@somevideopost.com"
                className="block w-full rounded-xl py-3 text-center text-sm font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #FFB36B, #FF6B4A)" }}
              >
                Kontakt os
              </a>
            </div>
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
                    <td className="px-4 py-3 text-center"><Tick yes={f.starter} /></td>
                    <td className="px-4 py-3 text-center"><Tick yes={f.pro} /></td>
                    <td className="px-4 py-3 text-center"><Tick yes={f.business} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-400">* Direkte publicering til Instagram Business kræver godkendt Meta Business-konto og er underlagt Metas API-begrænsninger.</p>
        </div>

        {/* FAQ / extra credits */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Ofte stillede spørgsmål</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                q: "Hvad sker der hvis jeg bruger alle mine credits?",
                a: "Du kan til enhver tid tilkøbe ekstra credits i pakker af minimum 10 credits. De trækkes direkte fra din konto og udløber ikke.",
              },
              {
                q: "Kan jeg skifte plan?",
                a: "Ja, du kan opgradere eller nedgradere din plan når som helst. Ændringen træder i kraft ved næste faktureringsperiode.",
              },
              {
                q: "Hvad koster ekstra credits?",
                a: "1 credit svarer til 1 euro i værdi. Du køber minimum 10 credits ad gangen. Præcis pris afhænger af din valgte plan.",
              },
              {
                q: "Er der binding?",
                a: "Nej. Alle planer er månedlige uden binding. Du kan opsige når som helst, og adgang fortsætter til slutningen af den betalte periode.",
              },
            ].map((item) => (
              <div key={item.q}>
                <p className="font-semibold text-slate-900 mb-1">{item.q}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{item.a}</p>
              </div>
            ))}
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
              href="mailto:kontakt@somevideopost.com"
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
