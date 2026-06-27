import Link from "next/link";
import {
  CalendarDays,
  Share2,
  Sparkles,
  Video,
  Clock,
  CheckCircle2,
  ArrowRight,
  Home,
  Zap,
  Image as ImageIcon,
  Star,
  Users,
  TrendingUp,
  Play,
  Instagram,
  Globe,
} from "lucide-react";

/* ─── Tiny UI helpers ─── */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90">
      {children}
    </span>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  desc,
  accent,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  accent: string;
}) {
  return (
    <div className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div
        className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${accent}`}
      >
        <Icon size={20} />
      </div>
      <h3 className="mb-2 font-semibold text-slate-900">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-500">{desc}</p>
    </div>
  );
}

function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-slate-700">
      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-500" />
      {children}
    </li>
  );
}

/* ─── Mock dashboard card ─── */
function DashboardMockup() {
  return (
    <div className="relative mx-auto w-full max-w-lg select-none">
      {/* Glow */}
      <div className="absolute -inset-4 rounded-3xl bg-white/10 blur-2xl" />
      <div className="relative rounded-2xl border border-white/20 bg-[#0e1f3d] p-4 shadow-2xl">
        {/* Top bar */}
        <div className="mb-3 flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <div className="ml-3 h-4 flex-1 rounded bg-white/5" />
        </div>
        {/* Stat row */}
        <div className="mb-3 grid grid-cols-3 gap-2">
          {[
            { label: "Opslag i dag", val: "12" },
            { label: "Rækkevidde", val: "4.2k" },
            { label: "Bookinger", val: "+3" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg bg-white/5 p-2.5">
              <p className="text-xs text-white/40">{s.label}</p>
              <p className="mt-0.5 text-lg font-bold text-white">{s.val}</p>
            </div>
          ))}
        </div>
        {/* Post cards */}
        <div className="space-y-2">
          {[
            { platform: "Instagram", time: "Nu · live", color: "#E1306C", letter: "IG" },
            { platform: "Facebook", time: "Om 2 timer", color: "#1877F2", letter: "FB" },
            { platform: "TikTok", time: "I morgen 09:00", color: "#010101", letter: "TT" },
          ].map((p) => (
            <div key={p.platform} className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2">
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
                style={{ backgroundColor: p.color }}
              >
                {p.letter}
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-white">{p.platform}</p>
                <p className="text-[10px] text-white/40">{p.time}</p>
              </div>
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </div>
          ))}
        </div>
        {/* Video preview */}
        <div className="mt-3 flex items-center gap-3 rounded-xl border border-orange-400/20 bg-orange-400/5 p-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-400/20">
            <Play size={14} className="text-orange-300" fill="currentColor" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-white">AI-video klar ✓</p>
            <p className="text-[10px] text-white/40">Sommerhus ved havet · 45 sek</p>
          </div>
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-semibold text-emerald-400">KLAR</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Phone mockup for video ─── */
function PhoneMockup() {
  return (
    <div className="relative mx-auto w-40 select-none">
      <div className="rounded-[2rem] border-4 border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
        <div className="h-4 flex items-center justify-center bg-slate-800">
          <div className="h-1 w-10 rounded-full bg-slate-600" />
        </div>
        <div className="relative aspect-[9/16] bg-gradient-to-b from-sky-400 to-blue-600">
          {/* Fake property image layers */}
          <div className="absolute inset-0 flex flex-col">
            <div className="flex-1 bg-gradient-to-b from-sky-300 via-blue-400 to-blue-600" />
            <div className="h-1/3 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
          </div>
          {/* House silhouette */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div
              className="w-0 h-0"
              style={{ borderLeft: "20px solid transparent", borderRight: "20px solid transparent", borderBottom: "14px solid rgba(255,255,255,0.9)" }}
            />
            <div className="w-10 h-8 bg-white/80" />
          </div>
          {/* Caption overlay */}
          <div className="absolute bottom-0 inset-x-0 p-2">
            <p className="text-[7px] font-semibold text-white leading-tight">Drømmehus ved havet</p>
            <p className="text-[6px] text-white/70">Book nu via link i bio</p>
          </div>
          {/* Side icons */}
          <div className="absolute right-1.5 bottom-12 flex flex-col items-center gap-1.5">
            <div className="flex flex-col items-center">
              <Star size={8} className="fill-white text-white" />
              <span className="text-[5px] text-white">2.4k</span>
            </div>
            <div className="flex flex-col items-center">
              <Share2 size={7} className="text-white" />
              <span className="text-[5px] text-white">Del</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Testimonial ─── */
function Testimonial({ name, role, quote }: { name: string; role: string; quote: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-3 flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={13} className="fill-orange-400 text-orange-400" />
        ))}
      </div>
      <p className="text-sm leading-relaxed text-slate-600 italic">"{quote}"</p>
      <div className="mt-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1B3F7A] text-xs font-bold text-white">
          {name[0]}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{name}</p>
          <p className="text-xs text-slate-400">{role}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ─── */
export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">

      {/* ── Nav ── */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-2">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg font-bold text-sm text-white"
              style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
            >
              V
            </span>
            <span className="text-lg font-bold text-[#1B3F7A]">Vakanza</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#features" className="hover:text-[#1B3F7A] transition-colors">Funktioner</a>
            <a href="#ai" className="hover:text-[#1B3F7A] transition-colors">AI-billeder & Video</a>
            <a href="#pricing" className="hover:text-[#1B3F7A] transition-colors">Priser</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-[#1B3F7A] transition-colors">
              Log ind
            </Link>
            <Link
              href="/signup"
              className="rounded-xl px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
            >
              Start gratis
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-20 md:py-28" style={{ background: "linear-gradient(135deg, #0d1f3c 0%, #1B3F7A 60%, #1e4f9a 100%)" }}>
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Glow blobs */}
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Text */}
            <div>
              <div className="mb-5 flex flex-wrap gap-2">
                <Pill><Sparkles size={11} className="text-yellow-300" /> AI-drevet</Pill>
                <Pill><Globe size={11} /> Sociale medier</Pill>
                <Pill><Video size={11} /> Præsentationsvideoer</Pill>
              </div>
              <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-[3.25rem]">
                Markedsfør din<br />
                feriebolig på<br />
                <span style={{ background: "linear-gradient(90deg, #FFB36B, #FF6B4A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  autopilot
                </span>
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-blue-100">
                Vakanza poster automatisk til Facebook, Instagram, TikTok og LinkedIn, genererer AI-billeder og professionelle præsentationsvideoer — mens du bruger din tid på det der betyder mest.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-slate-900 shadow-lg transition-opacity hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
                >
                  Start gratis i dag <ArrowRight size={16} />
                </Link>
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-7 py-3.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                >
                  Se priser
                </a>
              </div>
              <p className="mt-3 text-xs text-blue-300">Ingen kreditkort krævet · Gratis at starte</p>
              {/* Mini stats */}
              <div className="mt-8 flex flex-wrap gap-6 border-t border-white/10 pt-6">
                {[
                  { icon: Users, val: "500+", label: "Aktive udlejere" },
                  { icon: TrendingUp, val: "3×", label: "Mere engagement" },
                  { icon: Clock, val: "< 15 min", label: "Video leveret" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-2">
                    <s.icon size={15} className="text-orange-300" />
                    <div>
                      <p className="text-sm font-bold text-white">{s.val}</p>
                      <p className="text-[11px] text-blue-300">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Dashboard mockup */}
            <div className="hidden lg:block">
              <DashboardMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── Logo bar ── */}
      <div className="border-y border-slate-100 bg-slate-50 py-4">
        <div className="mx-auto max-w-5xl px-6">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">Virker med</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {["Airbnb", "Booking.com", "Facebook", "Instagram", "TikTok", "LinkedIn", "Snapchat", "YouTube"].map((p) => (
              <span key={p} className="text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors">{p}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Features ── */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold text-[#1B3F7A] md:text-4xl">
              Alt du behøver — ét sted
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-500">
              Fra Airbnb til TikTok. Vakanza samler det hele, så du kan fokusere på dine gæster.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard icon={Share2} title="Post på alle platforme på én gang" desc="Skriv ét opslag og send det til Facebook, Instagram, TikTok og LinkedIn simultant — automatisk på dine valgte tidspunkter." accent="bg-blue-50 text-blue-600" />
            <FeatureCard icon={Sparkles} title="AI-genererede opslag" desc="Lad AI skrive professionelle, engagerende opslag baseret på din bolig. Vælg tone: familievenlig, luksus eller last-minute tilbud." accent="bg-purple-50 text-purple-600" />
            <FeatureCard icon={ImageIcon} title="AI-genererede billeder" desc="Generer smukke billeder af din bolig med AI. Upload en reference, og Vakanza skaber professionelle marketingbilleder på få sekunder." accent="bg-pink-50 text-pink-600" />
            <FeatureCard icon={Video} title="Præsentationsvideo på minutter" desc="Henter billeder automatisk fra Airbnb & Booking.com. AI skaber en professionel video med musik, klar til Reels og TikTok." accent="bg-orange-50 text-orange-600" />
            <FeatureCard icon={CalendarDays} title="Kalendersynkronisering" desc="Importer din bookingkalender fra Airbnb, Booking.com eller Google Calendar automatisk. Se alle bookinger ét sted." accent="bg-emerald-50 text-emerald-600" />
            <FeatureCard icon={Zap} title="Fuldautomatisk autopilot" desc="Sæt Vakanza til at generere og poste med dine foretrukne intervaller. Altid professionelt — uden du løfter en finger." accent="bg-yellow-50 text-yellow-600" />
          </div>
        </div>
      </section>

      {/* ── AI section ── */}
      <section id="ai" className="bg-slate-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
              <Sparkles size={11} /> AI-funktioner
            </div>
            <h2 className="text-3xl font-bold text-[#1B3F7A] md:text-4xl">
              Professionelle billeder & videoer<br />— genereret af AI
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-500">
              Du behøver ikke ansætte en fotograf eller videograf. Vakanza's AI klarer det hele.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* AI images card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50">
                  <ImageIcon size={22} className="text-pink-500" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">AI-genererede billeder</h3>
                  <p className="text-sm text-slate-500">Skab professionelle marketingbilleder</p>
                </div>
              </div>
              {/* Fake image grid */}
              <div className="mb-5 grid grid-cols-3 gap-2">
                {[
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                  "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
                ].map((g, i) => (
                  <div key={i} className="aspect-square rounded-xl" style={{ background: g }}>
                    <div className="flex h-full items-center justify-center">
                      <Home size={18} className="text-white/60" />
                    </div>
                  </div>
                ))}
              </div>
              <ul className="flex flex-col gap-2">
                <Check>Upload én reference — AI genererer variationer</Check>
                <Check>Optimerede til sociale medier (1:1, 4:5, 9:16)</Check>
                <Check>Sommerhus, lejlighed, villa — alle boligtyper</Check>
                <Check>Klar på sekunder</Check>
              </ul>
              <div className="mt-6 flex items-center justify-between rounded-xl bg-pink-50 p-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pris</p>
                  <p className="text-2xl font-bold text-slate-900">5 kr <span className="text-sm font-normal text-slate-500">/ billede</span></p>
                </div>
                <Link href="/signup" className="rounded-lg bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600 transition-colors">
                  Prøv nu
                </Link>
              </div>
            </div>

            {/* Video card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
                  <Video size={22} className="text-orange-500" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">AI-præsentationsvideo</h3>
                  <p className="text-sm text-slate-500">Professionel video på under 15 minutter</p>
                </div>
              </div>
              {/* Phone + description side by side */}
              <div className="mb-5 flex items-center gap-6">
                <PhoneMockup />
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: "linear-gradient(135deg, #FFB36B, #FF6B4A)" }}>1</div>
                    <p className="text-xs text-slate-600">Indsæt dit Airbnb- eller Booking.com-link — vi henter billeder automatisk</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: "linear-gradient(135deg, #FFB36B, #FF6B4A)" }}>2</div>
                    <p className="text-xs text-slate-600">AI genererer video med musik og flydende overgange</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: "linear-gradient(135deg, #FFB36B, #FF6B4A)" }}>3</div>
                    <p className="text-xs text-slate-600">Download og del på Instagram Reels, TikTok og Facebook</p>
                  </div>
                </div>
              </div>
              <ul className="flex flex-col gap-2">
                <Check>Henter billeder automatisk fra Airbnb & Booking.com</Check>
                <Check>9:16 format — perfekt til Reels & TikTok</Check>
                <Check>Leveret direkte i appen inden for 15 minutter</Check>
                <Check>Op til 3× mere engagement end statiske billeder</Check>
              </ul>
              <div className="mt-6 flex items-center justify-between rounded-xl bg-orange-50 p-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Engangspris</p>
                  <p className="text-2xl font-bold text-slate-900">499 kr <span className="text-sm font-normal text-slate-500">/ video</span></p>
                </div>
                <Link href="/signup" className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ background: "linear-gradient(135deg, #FFB36B, #FF6B4A)" }}>
                  Bestil video
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold text-[#1B3F7A] md:text-4xl">I gang på 3 minutter</h2>
            <p className="mt-3 text-slate-500">Ingen teknisk viden nødvendig</p>
          </div>
          <div className="relative grid gap-10 md:grid-cols-3">
            {/* Connecting line */}
            <div className="absolute left-1/6 right-1/6 top-7 hidden h-px bg-gradient-to-r from-[#1B3F7A]/20 via-[#1B3F7A]/40 to-[#1B3F7A]/20 md:block" />
            {[
              { n: "1", icon: Home, title: "Tilføj din bolig", desc: "Upload billeder og beskriv din feriebolig. Tilslut din bookingkalender fra Airbnb eller Booking.com." },
              { n: "2", icon: Instagram, title: "Forbind sociale medier", desc: "Forbind Facebook, Instagram, TikTok og LinkedIn med ét klik. Vælg hvilke platforme du vil poste til." },
              { n: "3", icon: Zap, title: "Lad Vakanza klare resten", desc: "AI genererer og poster automatisk på dine valgte tidspunkter. Professionelt — uden du løfter en finger." },
            ].map((s) => (
              <div key={s.n} className="relative text-center">
                <div
                  className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold text-white shadow-lg"
                  style={{ background: "linear-gradient(135deg, #1B3F7A, #2a5298)" }}
                >
                  {s.n}
                </div>
                <s.icon size={22} className="mx-auto mb-2 text-[#1B3F7A]" />
                <h3 className="mb-2 font-semibold text-slate-900">{s.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-[#1B3F7A]">Hvad udlejere siger</h2>
            <p className="mt-3 text-slate-500">Brugt af hundredvis af udlejere over hele Danmark</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <Testimonial
              name="Mette K."
              role="Airbnb-vært, Skagen"
              quote="Jeg sparer mindst 5 timer om ugen. Vakanza poster automatisk mens jeg fokuserer på mine gæster. Videoerne er imponerende professionelle!"
            />
            <Testimonial
              name="Thomas B."
              role="3 sommerhuse, Bornholm"
              quote="AI-videoerne har øget mine bookinger med 40%. Det tog bogstaveligt talt 2 minutter at bestille — videoen var klar inden frokost."
            />
            <Testimonial
              name="Louise M."
              role="Ferielejlighed, København"
              quote="Endelig kan jeg nå alle platforme uden at bruge timer på det. Opslag genereret af AI er bedre end dem jeg selv ville skrive!"
            />
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold text-[#1B3F7A] md:text-4xl">Enkle, transparente priser</h2>
            <p className="mt-3 text-slate-500">Ingen skjulte gebyrer · Ingen binding</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Social plan */}
            <div className="relative rounded-2xl border-2 border-[#1B3F7A] bg-white p-8 shadow-xl md:col-span-1">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="rounded-full px-4 py-1 text-xs font-bold text-white" style={{ background: "linear-gradient(135deg, #FFB36B, #FF6B4A)" }}>
                  Mest populær
                </span>
              </div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                <Share2 size={12} /> Social Medie Plan
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-[#1B3F7A]">299</span>
                <span className="text-slate-500">kr/md</span>
              </div>
              <p className="text-xs text-slate-400">Inkl. moms</p>
              <ul className="my-7 flex flex-col gap-2.5">
                <Check>4 sociale medie platforme</Check>
                <Check>Ubegrænsede opslag</Check>
                <Check>Automatisk posting med valgfrit interval</Check>
                <Check>Kalendersynkronisering (Airbnb & Booking.com)</Check>
                <Check>Op til 5 boliger</Check>
                <Check>AI-opslag — <strong>5 kr/opslag</strong></Check>
                <Check>AI-billeder — <strong>5 kr/billede</strong></Check>
              </ul>
              <Link
                href="/signup"
                className="block w-full rounded-xl py-3 text-center text-sm font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #1B3F7A, #2a5298)" }}
              >
                Start gratis i dag
              </Link>
            </div>

            {/* AI Credits */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <div className="mb-2 inline-flex items-center gap-2 rounded-lg bg-pink-50 px-2.5 py-1 text-xs font-semibold text-pink-600">
                <ImageIcon size={12} /> AI-billeder & opslag
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-slate-900">5</span>
                <span className="text-slate-500">kr/stk</span>
              </div>
              <p className="text-xs text-slate-400">Pay-as-you-go</p>
              <ul className="my-7 flex flex-col gap-2.5">
                <Check>AI-genererede professionelle opslag</Check>
                <Check>AI-genererede marketingbilleder</Check>
                <Check>Vælg tone og stil</Check>
                <Check>Optimeret til alle platforme</Check>
                <Check>Ingen abonnement krævet</Check>
                <Check>Køb credits efter behov</Check>
              </ul>
              <Link
                href="/signup"
                className="block w-full rounded-xl border-2 border-slate-300 py-3 text-center text-sm font-bold text-slate-700 transition-colors hover:border-[#1B3F7A] hover:text-[#1B3F7A]"
              >
                Kom i gang
              </Link>
            </div>

            {/* Video */}
            <div className="rounded-2xl border border-orange-200 bg-orange-50/50 p-8">
              <div className="mb-2 inline-flex items-center gap-2 rounded-lg bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-700">
                <Video size={12} /> Præsentationsvideo
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-slate-900">499</span>
                <span className="text-slate-500">kr/video</span>
              </div>
              <p className="text-xs text-slate-400">Engangspris pr. video</p>
              <ul className="my-7 flex flex-col gap-2.5">
                <Check>Henter billeder fra Airbnb & Booking.com</Check>
                <Check>Eller upload egne billeder</Check>
                <Check>Professionel video med musik</Check>
                <Check>9:16 format til Reels & TikTok</Check>
                <Check>Leveret inden for 15 minutter</Check>
                <Check>Download direkte i appen</Check>
              </ul>
              <Link
                href="/signup"
                className="block w-full rounded-xl py-3 text-center text-sm font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #FFB36B, #FF6B4A)" }}
              >
                Bestil video
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 text-white" style={{ background: "linear-gradient(135deg, #0d1f3c 0%, #1B3F7A 100%)" }}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium">
            <Sparkles size={11} className="text-yellow-300" /> Spar tid fra dag 1
          </div>
          <h2 className="text-3xl font-bold md:text-4xl">
            Klar til at markedsføre<br />din bolig på autopilot?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-blue-100">
            Tilslut dig hundredvis af udlejere der allerede bruger Vakanza til at nå flere lejere — professionelt og automatisk.
          </p>
          <Link
            href="/signup"
            className="mt-8 inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-slate-900 shadow-lg transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #FFB36B, #FF6B4A)" }}
          >
            Start gratis i dag <ArrowRight size={18} />
          </Link>
          <p className="mt-3 text-sm text-blue-300">Ingen kreditkort · Annuller når som helst</p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-100 bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-lg text-sm font-bold text-white"
              style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
            >
              V
            </span>
            <span className="font-bold text-[#1B3F7A]">Vakanza</span>
          </div>
          <p className="text-xs text-slate-400">© 2026 Vakanza. Alle rettigheder forbeholdes.</p>
          <div className="flex gap-5 text-xs text-slate-400">
            <Link href="/login" className="hover:text-slate-700 transition-colors">Log ind</Link>
            <Link href="/signup" className="hover:text-slate-700 transition-colors">Opret konto</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
