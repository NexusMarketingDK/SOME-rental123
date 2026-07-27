import Link from "next/link";
import {
  Sparkles, Clapperboard, SendHorizontal, UploadCloud, ArrowRight, Wand2,
  Film, Camera, Home as HomeIcon, Sun, Mic, Globe, Music, Type,
  Share2, Zap, Target, Crown,
} from "lucide-react";
import { Topbar } from "@/components/layout/topbar";

// The tools that actually exist today — the studio's clickable entry points.
const TOOLS = [
  {
    href: "/posts/new",
    icon: SendHorizontal,
    title: "Generér SoMe-opslag",
    text: "Indsæt et boliglink → AI skriver en sælgende tekst tilpasset platformen, klar til deling.",
    tag: "5 kr / opslag",
    color: "#1B3F7A",
    bg: "#EEF3FB",
  },
  {
    href: "/videos/new",
    icon: Clapperboard,
    title: "Opret præsentationsvideo",
    text: "Forvandl boligens billeder til en cinematisk video med kamerabevægelser og musik.",
    tag: "€50 / video",
    color: "#FF6B4A",
    bg: "#FFF4F1",
  },
  {
    href: "/videos/upload",
    icon: UploadCloud,
    title: "Upload færdig video",
    text: "Har du allerede lavet en video (fx i Veo3)? Læg den ind, klar til download og deling.",
    tag: "Gratis",
    color: "#059669",
    bg: "#ECFDF5",
  },
];

// Value proposition — what the studio offers via the underlying AI video models.
const FEATURES = [
  { icon: Film, title: "Image-to-Video", text: "Forvandl boligbilleder til cinematiske videoer med realistiske kamerabevægelser." },
  { icon: Camera, title: "Cinematisk kamera", text: "Drone-optagelser, dolly, zoom og glidende tracking-shots der viser hvert rum smukt." },
  { icon: HomeIcon, title: "Multi-scene tour", text: "Komplet rundtur: facade, stue, køkken, soveværelser, terrasse, have og udsigt." },
  { icon: Sun, title: "Realistiske effekter", text: "Naturligt sollys, bølgende gardiner, glitrende pool og svajende træer." },
  { icon: Mic, title: "AI-voiceover", text: "Naturlig speak på flere sprog til international præsentation." },
  { icon: Globe, title: "Multi-sprog", text: "Dansk, engelsk, tysk, spansk, fransk m.fl. med lokaliseret speak og undertekster." },
  { icon: Music, title: "Musik & lyd", text: "Professionelt udvalgt baggrundsmusik og ambient lyd til den rette stemning." },
  { icon: Type, title: "Automatiske undertekster", text: "Præcise undertekster optimeret til lyd-fri visning på sociale medier." },
  { icon: Share2, title: "Social-klar", text: "Eksport i rette format til TikTok, Reels, Facebook, YouTube Shorts og LinkedIn." },
  { icon: Sparkles, title: "AI-forbedring", text: "Lysere interiør, flottere himmel og luksuriøs præsentation — stadig realistisk." },
  { icon: Zap, title: "Hurtig behandling", text: "Færdige videoer på minutter i stedet for timers manuel redigering." },
  { icon: Target, title: "Marketing-optimeret", text: "Skabt til flere bookinger, forespørgsler og maksimal synlighed." },
];

export default function StudioPage() {
  return (
    <>
      <Topbar title="Studio" description="Dit AI-studie til opslag og præsentationsvideoer." />

      <div className="flex-1">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden px-6 py-12 md:px-8" style={{ background: "linear-gradient(150deg,#0a1428 0%,#14306b 55%,#0a1428 100%)" }}>
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-20 blur-[90px]" style={{ background: "radial-gradient(circle,#FF6B4A,transparent 70%)" }} />
          <div className="relative mx-auto max-w-5xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-semibold text-orange-300">
              <Wand2 size={12} /> AI-studie
            </div>
            <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl">
              Fra boliglink til færdigt<br />
              <span style={{ background: "linear-gradient(90deg,#FFB36B,#FF6B4A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>opslag og video</span>
            </h1>
            <p className="mt-3 max-w-xl text-blue-200">
              Lav sælgende SoMe-opslag og cinematiske præsentationsvideoer ét sted — drevet af Google Veo 3 og ByteDance Seedance.
            </p>
          </div>
        </section>

        {/* ── Tools ── */}
        <section className="px-6 py-10 md:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-1 text-lg font-bold text-slate-900">Værktøjer</h2>
            <p className="mb-6 text-sm text-slate-500">Vælg hvad du vil lave.</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TOOLS.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: t.bg }}>
                      <t.icon size={20} style={{ color: t.color }} />
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">{t.tag}</span>
                  </div>
                  <h3 className="font-bold text-slate-900">{t.title}</h3>
                  <p className="mt-1.5 flex-1 text-sm text-slate-500 leading-relaxed">{t.text}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#FF6B4A]">
                    Åbn <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Feature value prop ── */}
        <section className="bg-[#FAF7F2] px-6 py-12 md:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B4A]">Hvad studiet kan</span>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">Premium AI-video til ejendomme</h2>
              <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
                Drevet af verdens førende AI-modeller — cinematisk kvalitet, realistisk bevægelse og professionel storytelling automatisk.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <div key={f.title} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50">
                    <f.icon size={17} className="text-[#FF6B4A]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{f.title}</h3>
                    <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Studio access ── */}
        <section className="px-6 py-12 md:px-8" style={{ background: "linear-gradient(135deg,#1B3F7A 0%,#2a5298 100%)" }}>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <Crown size={22} className="text-orange-300" />
            </div>
            <h2 className="text-2xl font-bold text-white">Studie-adgang</h2>
            <p className="max-w-xl text-blue-200">
              €10/md giver adgang til studiet og din månedlige opslag-saldo. Præsentationsvideoer betales pr. stk. (€50). Opsig når som helst.
            </p>
            <Link
              href="/billing"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#1B3F7A] shadow-lg transition-opacity hover:opacity-90"
            >
              <Sparkles size={15} /> Se studie-adgang & saldo
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
