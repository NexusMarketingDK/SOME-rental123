import Link from "next/link";
import {
  CalendarDays,
  Share2,
  Sparkles,
  Video,
  Clock,
  CheckCircle2,
  ArrowRight,
  LayoutDashboard,
  Home,
  Zap,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900">
      {/* ── Nav ── */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1B3F7A]">
              <Home size={16} className="text-white" />
            </span>
            <span className="text-lg font-semibold text-[#1B3F7A]" style={{ fontFamily: "var(--font-fraunces)" }}>
              Vakanza
            </span>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#features" className="hover:text-[#1B3F7A]">Funktioner</a>
            <a href="#how" className="hover:text-[#1B3F7A]">Sådan virker det</a>
            <a href="#pricing" className="hover:text-[#1B3F7A]">Priser</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-[#1B3F7A]">
              Log ind
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-[#1B3F7A] px-4 py-2 text-sm font-medium text-white hover:bg-[#152f5c] transition-colors"
            >
              Kom i gang gratis
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f2451] via-[#1B3F7A] to-[#1e5799] py-24 text-white">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm">
            <Sparkles size={14} className="text-yellow-300" />
            AI-drevet markedsføring til udlejere
          </div>
          <h1
            className="mt-4 text-4xl font-semibold leading-tight md:text-6xl"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Post på alle sociale medier<br />
            <span className="text-yellow-300">på én gang</span> — automatisk
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
            Spar timer hver uge. Vakanza poster automatisk til Facebook, Instagram, TikTok og LinkedIn, synkroniserer din bookingkalender fra Airbnb og Booking.com, og lader AI generere professionelle opslag for dig.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-8 py-4 text-base font-semibold text-slate-900 shadow-lg hover:bg-yellow-300 transition-colors"
            >
              Start gratis i dag <ArrowRight size={18} />
            </Link>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-8 py-4 text-base font-medium text-white hover:bg-white/10 transition-colors"
            >
              Se hvordan det virker
            </a>
          </div>
          <p className="mt-4 text-sm text-blue-200">Ingen kreditkort krævet · Gratis at prøve</p>
        </div>
      </section>

      {/* ── Social proof bar ── */}
      <div className="border-y border-slate-100 bg-slate-50 py-5">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-center text-sm font-medium text-slate-500 mb-4">Fungerer med dine eksisterende platforme</p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-slate-400 text-sm font-semibold">
            {["Airbnb", "Booking.com", "Facebook", "Instagram", "TikTok", "LinkedIn", "Google Calendar"].map((p) => (
              <span key={p} className="text-slate-500">{p}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Features ── */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-[#1B3F7A]" style={{ fontFamily: "var(--font-fraunces)" }}>
              Alt hvad du behøver — ét sted
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              Fra booking til sociale medier. Vakanza samler det hele så du kan fokusere på dine gæster.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Share2,
                title: "Post på alle platforme på én gang",
                desc: "Skriv ét opslag og send det til Facebook, Instagram, TikTok og LinkedIn simultant. Sæt det til at poste automatisk på dine ønskede tidspunkter.",
                color: "bg-blue-50 text-blue-600",
              },
              {
                icon: Sparkles,
                title: "AI-genererede opslag",
                desc: "Lad AI skrive professionelle, engagerende opslag baseret på din bolig. Vælg tone — familieferie, luksus eller last-minute tilbud.",
                color: "bg-purple-50 text-purple-600",
              },
              {
                icon: CalendarDays,
                title: "Kalendersynkronisering",
                desc: "Importer din bookingkalender fra Airbnb, Booking.com eller Google Calendar automatisk. Se alle dine bookinger ét sted.",
                color: "bg-emerald-50 text-emerald-600",
              },
              {
                icon: Video,
                title: "Automatisk video af din bolig",
                desc: "Upload dine billeder og lad Vakanza skabe en professionel fremvisningsvideo til sociale medier. Perfekt til at tiltrække nye lejere.",
                color: "bg-orange-50 text-orange-600",
              },
              {
                icon: Home,
                title: "Administrer flere boliger",
                desc: "Har du flere lejligheder, sommerhuse eller ferieboliger? Administrer dem alle under én konto med individuelle indstillinger.",
                color: "bg-rose-50 text-rose-600",
              },
              {
                icon: Clock,
                title: "Spar tid med autopilot",
                desc: "Sæt Vakanza til at genere og poste automatisk med dine foretrukne intervaller. Altid professionelt — uden du løfter en finger.",
                color: "bg-yellow-50 text-yellow-600",
              },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${f.color}`}>
                  <f.icon size={22} />
                </div>
                <h3 className="mb-2 font-semibold text-slate-900">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how" className="bg-slate-50 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-[#1B3F7A]" style={{ fontFamily: "var(--font-fraunces)" }}>
              I gang på 3 minutter
            </h2>
            <p className="mt-3 text-slate-500">Ingen teknisk viden nødvendig</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { step: "1", icon: Home, title: "Tilføj din bolig", desc: "Upload billeder og beskriv din feriebolig, lejlighed eller hus. Tilslut din bookingkalender fra Airbnb eller Booking.com." },
              { step: "2", icon: Share2, title: "Forbind sociale medier", desc: "Forbind dine Facebook, Instagram, TikTok og LinkedIn sider med ét klik. Vælg hvilke platforme du vil poste til." },
              { step: "3", icon: Zap, title: "Lad Vakanza klare resten", desc: "AI genererer professionelle opslag automatisk og poster dem på de tidspunkter du vælger. Du sidder tilbage og nyder friheden." },
            ].map((s) => (
              <div key={s.step} className="relative text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#1B3F7A] text-white text-xl font-bold" style={{ fontFamily: "var(--font-fraunces)" }}>
                  {s.step}
                </div>
                <h3 className="mb-2 font-semibold text-slate-900">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-[#1B3F7A]" style={{ fontFamily: "var(--font-fraunces)" }}>
              Enkle, transparente priser
            </h2>
            <p className="mt-3 text-slate-500">Ingen skjulte gebyrer. Ingen binding.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-3xl mx-auto">
            {/* Social plan */}
            <div className="relative rounded-2xl border-2 border-[#1B3F7A] bg-white p-8 shadow-lg">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-[#1B3F7A] px-4 py-1 text-xs font-semibold text-white">Mest populær</span>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-slate-900" style={{ fontFamily: "var(--font-fraunces)" }}>
                  Social Medie Plan
                </h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#1B3F7A]">299</span>
                  <span className="text-slate-500">kr/md</span>
                </div>
                <p className="mt-1 text-sm text-slate-500">Inkl. moms</p>
              </div>
              <ul className="mb-8 flex flex-col gap-3">
                {[
                  "4 sociale medie platforme",
                  "Ubegrænsede opslag",
                  "AI-genererede tekster",
                  "Automatisk posting med interval",
                  "Kalendersynkronisering",
                  "Op til 5 boliger",
                  "Billede-upload",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 size={16} className="text-[#1B3F7A] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="block w-full rounded-xl bg-[#1B3F7A] py-3 text-center text-sm font-semibold text-white hover:bg-[#152f5c] transition-colors"
              >
                Start gratis i dag
              </Link>
            </div>

            {/* Video add-on */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <div className="mb-6">
                <div className="mb-3 inline-flex items-center gap-2 rounded-lg bg-orange-100 px-3 py-1.5 text-sm font-medium text-orange-700">
                  <Video size={14} /> Tilvalg
                </div>
                <h3 className="text-xl font-semibold text-slate-900" style={{ fontFamily: "var(--font-fraunces)" }}>
                  Bolig-fremvisningsvideo
                </h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900">499</span>
                  <span className="text-slate-500">kr/video</span>
                </div>
                <p className="mt-1 text-sm text-slate-500">Engangspris pr. video</p>
              </div>
              <ul className="mb-8 flex flex-col gap-3">
                {[
                  "Professionel fremvisningsvideo",
                  "Baseret på dine egne billeder",
                  "Optimeret til sociale medier",
                  "Perfekt til Instagram Reels & TikTok",
                  "Leveret inden for 24 timer",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 size={16} className="text-orange-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="block w-full rounded-xl border-2 border-slate-300 py-3 text-center text-sm font-semibold text-slate-700 hover:border-[#1B3F7A] hover:text-[#1B3F7A] transition-colors"
              >
                Bestil video
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-br from-[#0f2451] via-[#1B3F7A] to-[#1e5799] py-20 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-semibold" style={{ fontFamily: "var(--font-fraunces)" }}>
            Klar til at spare tid og få flere bookinger?
          </h2>
          <p className="mt-4 text-blue-100">
            Tilslut dig udlejere der allerede bruger Vakanza til at markedsføre deres boliger professionelt — uden at bruge timer på det.
          </p>
          <Link
            href="/signup"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-8 py-4 text-base font-semibold text-slate-900 hover:bg-yellow-300 transition-colors shadow-lg"
          >
            Kom i gang gratis <ArrowRight size={18} />
          </Link>
          <p className="mt-3 text-sm text-blue-200">Ingen kreditkort · Annuller når som helst</p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-100 bg-white py-8">
        <div className="mx-auto max-w-6xl px-6 flex flex-col items-center gap-2 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-[#1B3F7A]">
              <Home size={12} className="text-white" />
            </span>
            <span className="text-sm font-semibold text-[#1B3F7A]">Vakanza</span>
          </div>
          <p className="text-xs text-slate-400">© 2026 Vakanza. Alle rettigheder forbeholdes.</p>
          <div className="flex gap-4 text-xs text-slate-400">
            <Link href="/login" className="hover:text-slate-700">Log ind</Link>
            <Link href="/signup" className="hover:text-slate-700">Opret konto</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
