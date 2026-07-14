import Link from "next/link";
import { Megaphone, Target, Repeat, BarChart3, Rocket, ArrowRight, Lock, CheckCircle2 } from "lucide-react";

/** What the Meta Marketing API integration unlocks — shared across dashboard & pricing. */
export const META_ADS_CAPABILITIES: { icon: React.ElementType; title: string; desc: string }[] = [
  {
    icon: Rocket,
    title: "Boost dine opslag og videoer",
    desc: "Løft dine bedste præsentationsvideoer og opslag til betalt annoncering på Facebook og Instagram direkte fra dashboardet.",
  },
  {
    icon: Target,
    title: "Præcis målgruppestyring",
    desc: "Målret rejsende efter interesser, geografi, alder og adfærd, så din bolig vises for dem, der faktisk booker.",
  },
  {
    icon: Repeat,
    title: "Retargeting af besøgende",
    desc: "Ram igen de brugere, der har set din bolig eller video, med automatiske retargeting-annoncer.",
  },
  {
    icon: BarChart3,
    title: "Annonceindsigt samlet ét sted",
    desc: "Følg rækkevidde, klik, omkostning og bookingforespørgsler fra dine kampagner uden at forlade appen.",
  },
];

/**
 * Meta advertising promo/feature block. Rendered on the dashboard (for logged-in
 * users) and reused on the pricing page to describe the Business-only capability.
 *
 * `hasBusiness` toggles between the "connect your Meta account" state and the
 * "available with Business" upsell.
 */
export function MetaAdsSection({ hasBusiness = false }: { hasBusiness?: boolean }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/10 p-6 md:p-8 text-white"
      style={{ background: "linear-gradient(135deg, #0a1f4d 0%, #14306b 55%, #0f2347 100%)" }}
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #4d8dff, transparent)" }} />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-52 w-52 rounded-full opacity-10 blur-2xl" style={{ background: "radial-gradient(circle, #FF6B4A, transparent)" }} />

      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <Megaphone size={18} className="text-orange-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">Meta annoncering</h2>
                <span className="rounded-full bg-orange-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-orange-300">Business</span>
              </div>
              <p className="text-xs text-blue-200">Drevet af Meta Marketing API</p>
            </div>
          </div>
          {hasBusiness ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
              <CheckCircle2 size={13} /> Aktiv på din pakke
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-blue-100">
              <Lock size={12} /> Inkluderet i Business
            </span>
          )}
        </div>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-blue-100">
          Med Business-pakken forbinder du din Meta Business-konto og bruger dine AI-videoer og opslag til
          rigtige annoncekampagner på Facebook og Instagram — direkte fra somevideopost.com via Metas
          Marketing API.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {META_ADS_CAPABILITIES.map((c) => (
            <div key={c.title} className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                <c.icon size={16} className="text-blue-200" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{c.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-blue-200">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {hasBusiness ? (
            <Link
              href="/accounts/connect"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-[#14306b] transition-opacity hover:opacity-90"
            >
              <Megaphone size={15} /> Forbind Meta-konto
            </Link>
          ) : (
            <Link
              href="/priser"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-[0_0_25px_rgba(255,107,74,0.35)] transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
            >
              <Rocket size={15} /> Få Meta annoncering med Business <ArrowRight size={15} />
            </Link>
          )}
          <Link href="/priser" className="text-sm font-medium text-blue-200 transition-colors hover:text-white">
            Se priser
          </Link>
        </div>

        <p className="mt-3 text-[11px] text-blue-300">
          Kræver en godkendt Meta Business-konto og er underlagt Metas API-begrænsninger.
        </p>
      </div>
    </div>
  );
}
