import { Link2, Sparkles, Share2, ArrowRight, ArrowDown, ImagePlus, Check, Gift, Video } from "lucide-react";

const ORANGE_GRADIENT = "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)";

/* Real property photos (same set used across the marketing site). */
const HERO_PHOTO = "https://images.unsplash.com/photo-1601084881623-cbe9425f1297?auto=format&fit=crop&w=600&q=80";
const UPLOAD_PHOTOS = [
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=200&q=80",
];

const SOCIALS = [
  { name: "Facebook", color: "#1877F2", letter: "f" },
  { name: "Instagram", color: "#E1306C", letter: "IG" },
  { name: "LinkedIn", color: "#0A66C2", letter: "in" },
  { name: "TikTok", color: "#111827", letter: "TT" },
];

const SELLING_TEXT =
  "🏖️ Strandnær villa i Alicante — 3 soveværelser, privat pool og havudsigt. Perfekt til 6 gæster. Book dit sommereventyr nu! 🌊 #feriebolig #Alicante";

function StepArrow() {
  return (
    <>
      <div className="hidden md:flex items-center justify-center px-1 text-slate-600">
        <ArrowRight size={22} strokeWidth={2} />
      </div>
      <div className="flex md:hidden items-center justify-center text-slate-600">
        <ArrowDown size={20} strokeWidth={2} />
      </div>
    </>
  );
}

/**
 * Marketing showcase for the (nearly free) AI-generated post feature: paste a
 * rental link, AI writes the perfect selling copy, and it's shared to social
 * media with the host's own photos. Presentational only — CSS animations, no JS.
 */
export function FreePostsShowcase() {
  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-10">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-300">
          <Gift size={13} /> 50 gratis AI-opslag inkluderet
        </div>
        <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          AI skriver den perfekte tekst — <span style={{ background: ORANGE_GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>næsten gratis</span>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-300">
          Indsæt linket til din feriebolig, vælg dine bedste billeder — så skriver AI en sælgende annoncetekst og deler den direkte på dine sociale medier med dine egne billeder. De første 50 opslag er gratis med.
        </p>
      </div>

      {/* 3-step flow */}
      <div className="mt-10 flex flex-col items-stretch gap-3 md:flex-row md:gap-1">

        {/* Step 1 — paste link + choose photos */}
        <div className="flex-1 rounded-2xl border border-white/10 bg-[#0a1430] p-5">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-[11px] font-bold text-blue-300">1</span>
            <span className="text-sm font-semibold text-white">Indsæt dit boliglink</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5">
            <Link2 size={13} className="shrink-0 text-blue-400" />
            <span className="flex-1 truncate font-mono text-xs text-white">feriebolig-spanien.dk/d/6877…</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {["Airbnb", "Booking.com", "Novasol"].map((p) => (
              <span key={p} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/60">{p}</span>
            ))}
          </div>
          <p className="mt-4 mb-2 flex items-center gap-1.5 text-[11px] font-semibold text-white/70">
            <ImagePlus size={12} className="text-orange-400" /> Vælg dine egne billeder
          </p>
          <div className="flex gap-1.5">
            {UPLOAD_PHOTOS.map((src) => (
              <div key={src} className="relative h-12 w-12 overflow-hidden rounded-lg border border-white/15">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="Uploadet boligbillede" className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute right-0.5 top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500">
                  <Check size={9} className="text-white" strokeWidth={3} />
                </div>
              </div>
            ))}
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-dashed border-white/25 text-white/40">
              <ImagePlus size={16} />
            </div>
          </div>
        </div>

        <StepArrow />

        {/* Step 2 — AI writes selling copy */}
        <div className="flex-1 rounded-2xl border border-white/10 bg-[#0a1430] p-5">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500/20 text-[11px] font-bold text-orange-300">2</span>
            <span className="text-sm font-semibold text-white">AI skriver sælgende tekst</span>
          </div>
          <div className="rounded-xl border border-orange-400/20 bg-orange-500/[0.06] p-3">
            <div className="mb-2 flex items-center gap-1.5">
              <Sparkles size={11} className="text-orange-400" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">AI-genereret opslag</span>
            </div>
            <p className="text-[13px] leading-relaxed text-white/85">
              {SELLING_TEXT}
              <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-orange-400 align-middle" />
            </p>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {["Sælgende tone", "Klar til deling", "Ud fra dit link"].map((tag) => (
              <span key={tag} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/60">{tag}</span>
            ))}
          </div>
        </div>

        <StepArrow />

        {/* Step 3 — share on social with your photos */}
        <div className="flex-1 rounded-2xl border border-white/10 bg-[#0a1430] p-5">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/20 text-[11px] font-bold text-purple-300">3</span>
            <span className="text-sm font-semibold text-white">Del på sociale medier</span>
          </div>
          {/* Post preview */}
          <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <div className="flex items-center gap-2 px-3 py-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: ORANGE_GRADIENT }}>s</div>
              <span className="text-[11px] font-semibold text-white">Din feriebolig</span>
              <Share2 size={11} className="ml-auto text-white/40" />
            </div>
            <div className="relative aspect-[4/3] w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={HERO_PHOTO} alt="Strandnær villa med privat pool" className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute bottom-1.5 left-1.5 rounded-md bg-black/55 px-1.5 py-0.5 text-[9px] font-medium text-white backdrop-blur-sm">
                Dine egne billeder
              </div>
            </div>
            <p className="px-3 py-2 text-[10px] leading-snug text-white/70">
              🏖️ Strandnær villa i Alicante — privat pool og havudsigt…
            </p>
          </div>
          <div className="mt-3 flex gap-2">
            {SOCIALS.map((s) => (
              <div key={s.name} className="flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: s.color }} title={s.name}>
                {s.letter}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Highlight bar: nearly free posts, video costs a bit more */}
      <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/[0.06] px-5 py-4 sm:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
            <Gift size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-white">50 AI-opslag helt gratis</p>
            <p className="text-xs text-slate-400">Inkluderet i alle pakker — Pro giver 100/md. og Business ubegrænset.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
          <Video size={15} className="text-orange-400" />
          <span className="text-xs text-slate-300">Præsentationsvideo koster lidt mere</span>
        </div>
      </div>
    </section>
  );
}
