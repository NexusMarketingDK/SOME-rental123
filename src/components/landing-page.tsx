import Link from "next/link";
import {
  CalendarDays, Share2, Sparkles, Video, Clock, CheckCircle2,
  ArrowRight, Home, Zap, Image as ImageIcon, Star, Users,
  TrendingUp, Play, Globe,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { LANDING, LOCALE_FLAGS, LOCALE_LABELS, LOCALE_PATHS, LOCALES } from "@/lib/i18n";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90">
      {children}
    </span>
  );
}

function FeatureCard({ icon: Icon, title, desc, accent }: { icon: React.ElementType; title: string; desc: string; accent: string }) {
  return (
    <div className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${accent}`}>
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

function DashboardMockup({ t }: { t: ReturnType<typeof LANDING[Locale]["mockupLabel"] extends string ? () => typeof LANDING[Locale] : never> }) {
  return (
    <div className="relative mx-auto w-full max-w-lg select-none">
      <div className="absolute -inset-4 rounded-3xl bg-white/10 blur-2xl" />
      <div className="relative rounded-2xl border border-white/20 bg-[#0e1f3d] p-4 shadow-2xl">
        <div className="mb-3 flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <div className="ml-3 h-4 flex-1 rounded bg-white/5" />
        </div>
        <div className="mb-3 grid grid-cols-3 gap-2">
          {[
            { label: "Posts today", val: "12" },
            { label: "Reach", val: "4.2k" },
            { label: "Bookings", val: "+3" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg bg-white/5 p-2.5">
              <p className="text-xs text-white/40">{s.label}</p>
              <p className="mt-0.5 text-lg font-bold text-white">{s.val}</p>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {[
            { platform: "Instagram", time: "Now · live", color: "#E1306C", letter: "IG" },
            { platform: "Facebook", time: "In 2 hours", color: "#1877F2", letter: "FB" },
            { platform: "TikTok", time: "Tomorrow 09:00", color: "#010101", letter: "TT" },
          ].map((p) => (
            <div key={p.platform} className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ backgroundColor: p.color }}>
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
        <div className="mt-3 flex items-center gap-3 rounded-xl border border-orange-400/20 bg-orange-400/5 p-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-400/20">
            <Play size={14} className="text-orange-300" fill="currentColor" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-white">AI video ready ✓</p>
            <p className="text-[10px] text-white/40">Seaside cottage · 45 sec</p>
          </div>
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-semibold text-emerald-400">READY</span>
        </div>
      </div>
    </div>
  );
}

function Testimonial({ name, role, quote }: { name: string; role: string; quote: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-3 flex">
        {[...Array(5)].map((_, i) => <Star key={i} size={13} className="fill-orange-400 text-orange-400" />)}
      </div>
      <p className="text-sm leading-relaxed text-slate-600 italic">&ldquo;{quote}&rdquo;</p>
      <div className="mt-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1B3F7A] text-xs font-bold text-white">{name[0]}</div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{name}</p>
          <p className="text-xs text-slate-400">{role}</p>
        </div>
      </div>
    </div>
  );
}

function LanguageSwitcher({ current }: { current: Locale }) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-slate-300 transition-colors">
        <Globe size={12} />
        <span>{LOCALE_FLAGS[current]} {LOCALE_LABELS[current]}</span>
        <span className="text-slate-400">▾</span>
      </button>
      <div className="absolute right-0 top-full mt-1 hidden group-hover:block z-50 min-w-[140px] rounded-xl border border-slate-200 bg-white shadow-lg py-1">
        {LOCALES.map((loc) => (
          <a
            key={loc}
            href={LOCALE_PATHS[loc]}
            className={`flex items-center gap-2 px-3 py-2 text-xs hover:bg-slate-50 transition-colors ${loc === current ? "font-semibold text-[#1B3F7A]" : "text-slate-600"}`}
          >
            <span>{LOCALE_FLAGS[loc]}</span>
            <span>{LOCALE_LABELS[loc]}</span>
            {loc === current && <span className="ml-auto text-[#1B3F7A]">✓</span>}
          </a>
        ))}
      </div>
    </div>
  );
}

export function LandingPage({ locale }: { locale: Locale }) {
  const t = LANDING[locale];

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">

      {/* ── Nav ── */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg font-bold text-sm text-white" style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}>V</span>
            <span className="text-lg font-bold text-[#1B3F7A]">Vakanza</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#" className="hover:text-[#1B3F7A] transition-colors">{t.navHome}</a>
            <a href="#features" className="hover:text-[#1B3F7A] transition-colors">{t.navFeatures}</a>
            <a href="#ai" className="hover:text-[#1B3F7A] transition-colors">{t.navVideo}</a>
            <a href="#pricing" className="hover:text-[#1B3F7A] transition-colors">{t.navPricing}</a>
          </nav>
          <div className="flex items-center gap-3">
            <LanguageSwitcher current={locale} />
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-[#1B3F7A] transition-colors">{t.navLogin}</Link>
            <Link href="/signup" className="rounded-xl px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}>
              {t.navStart}
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-20 md:py-28" style={{ background: "linear-gradient(135deg, #0d1f3c 0%, #1B3F7A 60%, #1e4f9a 100%)" }}>
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-5 flex flex-wrap gap-2">
                <Pill><Sparkles size={11} className="text-yellow-300" /> AI-powered</Pill>
                <Pill><Globe size={11} /> Social media</Pill>
                <Pill><Video size={11} /> Presentation videos</Pill>
              </div>
              <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-[3.25rem]">
                {t.heroLine1}<br />{t.heroLine2}<br />
                <span style={{ background: "linear-gradient(90deg, #FFB36B, #FF6B4A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{t.heroAccent}</span>
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-blue-100">{t.heroSub}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-slate-900 shadow-lg transition-opacity hover:opacity-90" style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}>
                  {t.heroCta} <ArrowRight size={16} />
                </Link>
                <a href="#pricing" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-7 py-3.5 text-sm font-medium text-white hover:bg-white/10 transition-colors">
                  {t.heroCta2}
                </a>
              </div>
              <p className="mt-3 text-xs text-blue-300">{t.heroNoCard}</p>
              <div className="mt-8 flex flex-wrap gap-6 border-t border-white/10 pt-6">
                {[
                  { icon: Users, val: t.stat1Val, label: t.stat1Label },
                  { icon: TrendingUp, val: t.stat2Val, label: t.stat2Label },
                  { icon: Clock, val: t.stat3Val, label: t.stat3Label },
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
            <div className="hidden lg:block">
              <div className="relative mx-auto w-full max-w-lg select-none">
                <div className="absolute -inset-4 rounded-3xl bg-white/10 blur-2xl" />
                <div className="relative rounded-2xl border border-white/20 bg-[#0e1f3d] p-4 shadow-2xl">
                  <div className="mb-3 flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                    <div className="ml-3 h-4 flex-1 rounded bg-white/5" />
                  </div>
                  <div className="mb-3 grid grid-cols-3 gap-2">
                    {[{ label: "Posts today", val: "12" }, { label: "Reach", val: "4.2k" }, { label: "Bookings", val: "+3" }].map((s) => (
                      <div key={s.label} className="rounded-lg bg-white/5 p-2.5">
                        <p className="text-xs text-white/40">{s.label}</p>
                        <p className="mt-0.5 text-lg font-bold text-white">{s.val}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {[{ platform: "Instagram", time: "Now · live", color: "#E1306C", letter: "IG" }, { platform: "Facebook", time: "In 2 hours", color: "#1877F2", letter: "FB" }, { platform: "TikTok", time: "Tomorrow 09:00", color: "#010101", letter: "TT" }].map((p) => (
                      <div key={p.platform} className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ backgroundColor: p.color }}>{p.letter}</div>
                        <div className="flex-1">
                          <p className="text-xs font-medium text-white">{p.platform}</p>
                          <p className="text-[10px] text-white/40">{p.time}</p>
                        </div>
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-3 rounded-xl border border-orange-400/20 bg-orange-400/5 p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-400/20">
                      <Play size={14} className="text-orange-300" fill="currentColor" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-white">AI video ready ✓</p>
                      <p className="text-[10px] text-white/40">Seaside cottage · 45 sec</p>
                    </div>
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-semibold text-emerald-400">READY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Logo bar ── */}
      <div className="border-y border-slate-100 bg-slate-50 py-4">
        <div className="mx-auto max-w-5xl px-6">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">{t.worksWith}</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {["Airbnb", "Booking.com", "Novasol", "Facebook", "Instagram", "TikTok", "LinkedIn", "YouTube"].map((p) => (
              <span key={p} className="text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors">{p}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Features ── */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold text-[#1B3F7A] md:text-4xl">{t.featTitle}</h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-500">{t.featSub}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard icon={Video} title={t.feat1Title} desc={t.feat1Desc} accent="bg-orange-50 text-orange-600" />
            <FeatureCard icon={Share2} title={t.feat2Title} desc={t.feat2Desc} accent="bg-blue-50 text-blue-600" />
            <FeatureCard icon={CalendarDays} title={t.feat3Title} desc={t.feat3Desc} accent="bg-emerald-50 text-emerald-600" />
            <FeatureCard icon={Sparkles} title={t.feat4Title} desc={t.feat4Desc} accent="bg-purple-50 text-purple-600" />
            <FeatureCard icon={Home} title={t.feat5Title} desc={t.feat5Desc} accent="bg-pink-50 text-pink-600" />
            <FeatureCard icon={Zap} title={t.feat6Title} desc={t.feat6Desc} accent="bg-yellow-50 text-yellow-600" />
          </div>
        </div>
      </section>

      {/* ── AI Video section ── */}
      <section id="ai" className="relative overflow-hidden py-28" style={{ background: "linear-gradient(160deg, #0a0f1e 0%, #0f1f3d 50%, #0a0f1e 100%)" }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]" style={{ background: "radial-gradient(circle, #FF6B4A, transparent 70%)" }} />
          <div className="absolute -right-40 bottom-20 h-[400px] w-[400px] rounded-full opacity-15 blur-[100px]" style={{ background: "radial-gradient(circle, #FFB36B, transparent 70%)" }} />
        </div>
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold text-orange-400">
              <Sparkles size={11} /> Powered by Google Veo AI
            </div>
            <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              {t.aiTitle1}<br />
              <span style={{ background: "linear-gradient(90deg, #FFB36B, #FF6B4A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {t.aiTitle2}
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">{t.aiSub}</p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 scale-90 rounded-[2.5rem] opacity-40 blur-2xl" style={{ background: "linear-gradient(135deg, #FFB36B, #FF6B4A)" }} />
                <div className="relative mx-auto w-[220px] overflow-hidden rounded-[2.5rem] border-4 border-white/10 bg-black shadow-2xl">
                  <div className="absolute left-1/2 top-3 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
                  <div className="relative aspect-[9/16] overflow-hidden" style={{ background: "linear-gradient(160deg, #1a2540 0%, #0d1520 100%)" }}>
                    <div className="absolute inset-0">
                      <img src="https://d8j0ntlcm91z4.cloudfront.net/user_3FimRw5snqnWCSryULAZQYDRUt3/hf_20260628_010551_53f64722-cfad-4a28-a4b6-b6f9e903fc1b.png" alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/30">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm">
                        <Play size={22} className="text-white" fill="white" />
                      </div>
                      <div className="mt-2 px-4 text-center">
                        <p className="text-[10px] font-semibold text-white/90">{t.mockupLabel}</p>
                        <p className="text-[9px] text-white/60">{t.mockupSub}</p>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                          <span className="text-[9px] font-medium text-white">REELS READY</span>
                        </div>
                        <span className="text-[9px] text-white/70">0:28</span>
                      </div>
                      <div className="mt-1.5 h-0.5 overflow-hidden rounded-full bg-white/20">
                        <div className="h-full w-2/3 rounded-full" style={{ background: "linear-gradient(90deg, #FFB36B, #FF6B4A)" }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-8 top-12 rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-md">
                  <p className="text-[10px] font-semibold text-white">9:16 format</p>
                  <p className="text-[9px] text-slate-400">Reels & TikTok</p>
                </div>
                <div className="absolute -left-8 bottom-16 rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-md">
                  <p className="text-[10px] font-semibold text-emerald-400">✓ Ready in 15 min</p>
                  <p className="text-[9px] text-slate-400">AI generates</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                {([
                  { n: "01", title: t.step1Title, desc: t.step1Desc },
                  { n: "02", title: t.step2Title, desc: t.step2Desc },
                  { n: "03", title: t.step3Title, desc: t.step3Desc },
                ] as const).map((step) => (
                  <div key={step.n} className="flex gap-4 rounded-2xl border border-white/5 bg-white/5 p-5 backdrop-blur-sm">
                    <div className="shrink-0">
                      <span className="text-2xl font-bold" style={{ background: "linear-gradient(135deg, #FFB36B, #FF6B4A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{step.n}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">{step.title}</p>
                      <p className="mt-1 text-sm text-slate-400">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "3×", label: t.aiStat1 },
                  { value: "15 min", label: t.aiStat2 },
                  { value: "9:16", label: t.aiStat3 },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-white/5 bg-white/5 p-4 text-center">
                    <p className="text-xl font-bold text-white">{s.value}</p>
                    <p className="mt-0.5 text-[11px] text-slate-500">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-orange-500/20 bg-orange-500/10 p-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-orange-400">{t.aiOnetimeLabel}</p>
                  <p className="text-3xl font-bold text-white">€67 <span className="text-sm font-normal text-slate-400">/ video</span></p>
                </div>
                <Link href="/signup" className="rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg transition-opacity hover:opacity-90" style={{ background: "linear-gradient(135deg, #FFB36B, #FF6B4A)" }}>
                  {t.aiOrderBtn}
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-16 flex flex-wrap justify-center gap-3">
            {t.aiFeats.map((f) => (
              <span key={f} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-slate-300">
                <CheckCircle2 size={11} className="text-orange-400" /> {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold text-[#1B3F7A] md:text-4xl">{t.howTitle}</h2>
            <p className="mt-3 text-slate-500">{t.howSub}</p>
          </div>
          <div className="relative grid gap-10 md:grid-cols-3">
            <div className="absolute left-1/6 right-1/6 top-7 hidden h-px bg-gradient-to-r from-[#1B3F7A]/20 via-[#1B3F7A]/40 to-[#1B3F7A]/20 md:block" />
            {([
              { n: "1", icon: Home, title: t.how1Title, desc: t.how1Desc },
              { n: "2", icon: Video, title: t.how2Title, desc: t.how2Desc },
              { n: "3", icon: Zap, title: t.how3Title, desc: t.how3Desc },
            ] as const).map((s) => (
              <div key={s.n} className="relative text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold text-white shadow-lg" style={{ background: "linear-gradient(135deg, #1B3F7A, #2a5298)" }}>
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
            <h2 className="text-3xl font-bold text-[#1B3F7A]">{t.testTitle}</h2>
            <p className="mt-3 text-slate-500">{t.testSub}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <Testimonial name={t.test1Name} role={t.test1Role} quote={t.test1Quote} />
            <Testimonial name={t.test2Name} role={t.test2Role} quote={t.test2Quote} />
            <Testimonial name={t.test3Name} role={t.test3Role} quote={t.test3Quote} />
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold text-[#1B3F7A] md:text-4xl">{t.priceTitle}</h2>
            <p className="mt-3 text-slate-500">{t.priceSub}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="relative rounded-2xl border-2 border-[#1B3F7A] bg-white p-8 shadow-xl md:col-span-1">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="rounded-full px-4 py-1 text-xs font-bold text-white" style={{ background: "linear-gradient(135deg, #FFB36B, #FF6B4A)" }}>{t.mostPopular}</span>
              </div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                <Share2 size={12} /> {t.plan1Name}
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-[#1B3F7A]">€40</span>
                <span className="text-slate-500">/mo</span>
              </div>
              <p className="text-xs text-slate-400">incl. VAT</p>
              <ul className="my-7 flex flex-col gap-2.5">
                {t.plan1Items.map((item) => <Check key={item}>{item}</Check>)}
              </ul>
              <Link href="/signup" className="block w-full rounded-xl py-3 text-center text-sm font-bold text-white transition-opacity hover:opacity-90" style={{ background: "linear-gradient(135deg, #1B3F7A, #2a5298)" }}>
                {t.startFreeBtn}
              </Link>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <div className="mb-2 inline-flex items-center gap-2 rounded-lg bg-pink-50 px-2.5 py-1 text-xs font-semibold text-pink-600">
                <ImageIcon size={12} /> {t.plan2Name}
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-slate-900">€0.67</span>
                <span className="text-slate-500">/each</span>
              </div>
              <p className="text-xs text-slate-400">{t.plan2PayLabel}</p>
              <ul className="my-7 flex flex-col gap-2.5">
                {t.plan2Items.map((item) => <Check key={item}>{item}</Check>)}
              </ul>
              <Link href="/signup" className="block w-full rounded-xl border-2 border-slate-300 py-3 text-center text-sm font-bold text-slate-700 transition-colors hover:border-[#1B3F7A] hover:text-[#1B3F7A]">
                {t.plan2StartBtn}
              </Link>
            </div>
            <div className="rounded-2xl border border-orange-200 bg-orange-50/50 p-8">
              <div className="mb-2 inline-flex items-center gap-2 rounded-lg bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-700">
                <Video size={12} /> {t.plan3Name}
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-slate-900">€67</span>
                <span className="text-slate-500">/video</span>
              </div>
              <p className="text-xs text-slate-400">{t.plan3OnetimeLabel}</p>
              <ul className="my-7 flex flex-col gap-2.5">
                {t.plan3Items.map((item) => <Check key={item}>{item}</Check>)}
              </ul>
              <Link href="/signup" className="block w-full rounded-xl py-3 text-center text-sm font-bold text-white transition-opacity hover:opacity-90" style={{ background: "linear-gradient(135deg, #FFB36B, #FF6B4A)" }}>
                {t.plan3OrderBtn}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 text-white" style={{ background: "linear-gradient(135deg, #0d1f3c 0%, #1B3F7A 100%)" }}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium">
            <Sparkles size={11} className="text-yellow-300" /> {t.ctaBadge}
          </div>
          <h2 className="text-3xl font-bold md:text-4xl">{t.ctaTitle1}<br />{t.ctaTitle2}</h2>
          <p className="mx-auto mt-4 max-w-lg text-blue-100">{t.ctaSub}</p>
          <Link href="/signup" className="mt-8 inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-slate-900 shadow-lg transition-opacity hover:opacity-90" style={{ background: "linear-gradient(135deg, #FFB36B, #FF6B4A)" }}>
            {t.ctaBtn} <ArrowRight size={18} />
          </Link>
          <p className="mt-3 text-sm text-blue-300">{t.ctaNoCard}</p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 bg-[#0d1f3c]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}>V</span>
                <span className="text-lg font-bold text-white">Vakanza</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">{t.footerDesc}</p>
              <div className="mt-5 flex gap-3">
                <a href="#" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-orange-400/40 hover:text-orange-400">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-orange-400/40 hover:text-orange-400">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
                </a>
                <a href="#" aria-label="TikTok" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-orange-400/40 hover:text-orange-400">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">{t.footerProduct}</p>
              <ul className="flex flex-col gap-3 text-sm text-slate-400">
                <li><a href="#features" className="transition-colors hover:text-white">{t.footerFeatures}</a></li>
                <li><a href="#ai" className="transition-colors hover:text-white">{t.footerAiVideo}</a></li>
                <li><a href="#pricing" className="transition-colors hover:text-white">{t.footerPricing}</a></li>
                <li><Link href="/signup" className="transition-colors hover:text-white">{t.footerCreateAccount}</Link></li>
                <li><Link href="/login" className="transition-colors hover:text-white">{t.footerLogin}</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">{t.footerIntegrations}</p>
              <ul className="flex flex-col gap-3 text-sm text-slate-400">
                {["Airbnb", "Booking.com", "Facebook & Instagram", "TikTok", "LinkedIn"].map((p) => (
                  <li key={p}><span className="cursor-default">{p}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">{t.footerSupport}</p>
              <ul className="flex flex-col gap-3 text-sm text-slate-400">
                <li><a href="mailto:kontakt@vakanza.dk" className="transition-colors hover:text-white">kontakt@vakanza.dk</a></li>
                <li><Link href="/signup" className="transition-colors hover:text-white">{t.plan2StartBtn}</Link></li>
              </ul>
              <div className="mt-6 rounded-xl border border-orange-500/20 bg-orange-500/10 p-4">
                <p className="text-xs font-semibold text-orange-400">{t.footerTryFree}</p>
                <p className="mt-1 text-xs text-slate-400">{t.footerNoCard}</p>
                <Link href="/signup" className="mt-3 block w-full rounded-lg py-2 text-center text-xs font-bold text-white transition-opacity hover:opacity-90" style={{ background: "linear-gradient(135deg, #FFB36B, #FF6B4A)" }}>
                  {t.footerStartBtn}
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/5 pt-8 md:flex-row md:justify-between">
            <p className="text-xs text-slate-600">{t.footerCopyright}</p>
            <div className="flex gap-6 text-xs text-slate-600">
              <a href="#" className="transition-colors hover:text-slate-400">{t.footerPrivacy}</a>
              <a href="#" className="transition-colors hover:text-slate-400">{t.footerCookies}</a>
              <a href="#" className="transition-colors hover:text-slate-400">{t.footerTerms}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
