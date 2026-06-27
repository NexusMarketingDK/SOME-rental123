import Link from "next/link";
import { Plus, Video, Clock, CheckCircle2, XCircle, Loader2, Sparkles, Share2, TrendingUp, Star, Zap, Play, Clapperboard, ArrowRight } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { createClient } from "@/lib/supabase/server";
import type { VideoOrder } from "@/types/database";
import { VideoDemo } from "@/components/video-demo";
import { VideoListPoller } from "@/components/video-list-poller";

async function getVideoOrders(): Promise<VideoOrder[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("video_orders")
    .select("*")
    .order("created_at", { ascending: false });
  return (data ?? []) as VideoOrder[];
}

function StatusBadge({ status }: { status: VideoOrder["status"] }) {
  if (status === "ready") return (
    <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
      <CheckCircle2 size={12} /> Klar
    </span>
  );
  if (status === "failed") return (
    <span className="flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600">
      <XCircle size={12} /> Fejlede
    </span>
  );
  if (status === "processing") return (
    <span className="flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
      <Loader2 size={12} className="animate-spin" /> Genereres
    </span>
  );
  return (
    <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
      <Clock size={12} /> Afventer
    </span>
  );
}

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-48">
      <div className="relative rounded-[2.5rem] border-4 border-slate-800 bg-slate-800 shadow-2xl">
        <div className="absolute left-1/2 top-2 h-1.5 w-16 -translate-x-1/2 rounded-full bg-slate-700" />
        <div className="overflow-hidden rounded-[2rem] bg-black aspect-[9/16]">
          {/* Mock video content */}
          <div className="relative h-full w-full" style={{ background: "linear-gradient(160deg, #1B3F7A 0%, #0f2347 40%, #FF6B4A 100%)" }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
              <div className="h-24 w-full rounded-xl bg-white/10 backdrop-blur-sm" />
              <div className="h-16 w-full rounded-xl bg-white/10 backdrop-blur-sm" />
              <div className="h-16 w-full rounded-xl bg-white/10 backdrop-blur-sm" />
            </div>
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg">
                <div className="ml-1 h-0 w-0 border-y-8 border-l-12 border-y-transparent border-l-[#1B3F7A]" style={{ borderLeftWidth: 14, borderTopWidth: 8, borderBottomWidth: 8 }} />
              </div>
            </div>
            {/* Bottom overlay */}
            <div className="absolute bottom-0 left-0 right-0 rounded-b-[2rem] bg-gradient-to-t from-black/70 to-transparent p-4">
              <div className="h-2 w-3/4 rounded bg-white/60 mb-1.5" />
              <div className="h-1.5 w-1/2 rounded bg-white/40" />
            </div>
          </div>
        </div>
      </div>
      {/* Glow */}
      <div className="absolute -inset-4 -z-10 rounded-[3rem] opacity-30 blur-2xl" style={{ background: "linear-gradient(135deg, #FFB36B, #FF6B4A)" }} />
    </div>
  );
}

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-sm">
      <span className="text-2xl font-bold text-white">{value}</span>
      <span className="mt-0.5 text-xs text-blue-200">{label}</span>
    </div>
  );
}

export default async function VideosPage() {
  const orders = await getVideoOrders();

  return (
    <>
      <Topbar
        title="Fremvisningsvideoer"
        description="AI-genererede præsentationsvideoer af dine boliger."
        action={
          orders.length > 0 ? (
            <Link
              href="/videos/new"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
            >
              <Plus size={16} /> Bestil ny video
            </Link>
          ) : null
        }
      />

      <div className="flex-1">
        {orders.length === 0 ? (
          <div className="space-y-0">

            {/* ── Hero ── */}
            <section className="relative overflow-hidden px-8 py-16" style={{ background: "linear-gradient(135deg, #1B3F7A 0%, #14306b 60%, #0f2347 100%)" }}>
              {/* decorative circles */}
              <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #FFB36B, transparent)" }} />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #FF6B4A, transparent)" }} />

              <div className="mx-auto flex max-w-5xl items-center gap-12">
                <div className="flex-1">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1.5 text-xs font-semibold text-orange-300">
                    <Sparkles size={12} /> AI-drevet præsentationsvideo
                  </div>
                  <h1 className="text-4xl font-bold leading-tight text-white">
                    Gør din bolig<br />
                    <span style={{ background: "linear-gradient(90deg, #FFB36B, #FF6B4A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                      uimodståelig
                    </span>
                  </h1>
                  <p className="mt-4 text-lg text-blue-200 leading-relaxed max-w-md">
                    Lad AI'en skabe en professionel præsentationsvideo af din bolig — klar på under 15 minutter, klar til at dele på sociale medier.
                  </p>
                  <div className="mt-6 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-orange-400 text-orange-400" />
                    ))}
                    <span className="ml-2 text-sm text-blue-300">Brugt af hundredvis af udlejere</span>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <PhoneMockup />
                </div>
              </div>

              {/* Interactive demo */}
              <div className="mx-auto mt-10 max-w-5xl">
                <VideoDemo />
              </div>

              {/* Stats bar */}
              <div className="mx-auto mt-8 grid max-w-5xl grid-cols-3 gap-4">
                <StatPill value="3×" label="Flere bookingforespørgsler" />
                <StatPill value="15 min" label="Gennemsnitlig leveringstid" />
                <StatPill value="499 kr" label="Pr. video — ingen abonnement" />
              </div>
            </section>

            {/* ── How it works ── */}
            <section className="bg-white px-8 py-14">
              <div className="mx-auto max-w-5xl">
                <div className="mb-10 text-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B4A]">Sådan fungerer det</span>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">Professionel præsentationsvideo på 3 trin</h2>
                </div>
                <div className="grid grid-cols-3 gap-8">
                  {[
                    {
                      step: "01",
                      icon: Clapperboard,
                      color: "#1B3F7A",
                      bg: "#EEF3FB",
                      title: "Opret din video",
                      text: "Angiv boligens titel og indsæt dit booking-link. Vi klargør alt automatisk — ingen teknisk viden nødvendig.",
                    },
                    {
                      step: "02",
                      icon: Sparkles,
                      color: "#FF6B4A",
                      bg: "#FFF4F1",
                      title: "AI producerer videoen",
                      text: "Vores AI skaber en flydende præsentationsvideo med professionelle kamerabevægelser, overgange og stemningsfuldt udtryk på bare 5-15 minutter.",
                    },
                    {
                      step: "03",
                      icon: Share2,
                      color: "#059669",
                      bg: "#ECFDF5",
                      title: "Del og få flere bookinger",
                      text: "Download videoen og del den direkte på Facebook, Instagram, TikTok og YouTube. Skil dig ud og tiltræk kvalitetslejere.",
                    },
                  ].map((item) => (
                    <div key={item.step} className="relative">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: item.bg }}>
                          <item.icon size={20} style={{ color: item.color }} />
                        </div>
                        <span className="text-3xl font-black text-slate-100">{item.step}</span>
                      </div>
                      <h3 className="font-bold text-slate-900">{item.title}</h3>
                      <p className="mt-2 text-sm text-slate-500 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-10 text-center">
                  <Link
                    href="/videos/new"
                    className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
                  >
                    <Plus size={16} /> Bestil din første video
                  </Link>
                </div>
              </div>
            </section>

            {/* ── Features ── */}
            <section className="bg-[#FAF7F2] px-8 py-14">
              <div className="mx-auto max-w-5xl">
                <div className="mb-10 text-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B4A]">Fordele</span>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">Derfor vælger udlejere Vakanza Video</h2>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  {[
                    {
                      icon: Play,
                      color: "#1B3F7A",
                      bg: "#EEF3FB",
                      title: "Cinematisk præsentationsvideo",
                      text: "AI'en skaber en flydende video med professionelle kamerabevægelser og overgange — samme kvalitet som dyre videoProduktioner, uden den store pris.",
                    },
                    {
                      icon: Zap,
                      color: "#FF6B4A",
                      bg: "#FFF4F1",
                      title: "Klar på 15 minutter",
                      text: "Vakanza Video leverer din færdige præsentationsvideo på bare 5-15 minutter. Du modtager besked direkte i appen, så snart den er klar til download.",
                    },
                    {
                      icon: TrendingUp,
                      color: "#059669",
                      bg: "#ECFDF5",
                      title: "Boost din synlighed",
                      text: "Videoer skiller sig markant ud på sociale medier og driver 3× flere klik og bookingforespørgsler. Præsenter din bolig fra dens absolutte bedste side.",
                    },
                    {
                      icon: Share2,
                      color: "#7C3AED",
                      bg: "#F5F3FF",
                      title: "Del på alle platforme",
                      text: "Download og del din video direkte på Facebook, Instagram, TikTok, YouTube og Snapchat — alt fra ét sted. Maksimal synlighed, minimal indsats.",
                    },
                  ].map((f) => (
                    <div key={f.title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: f.bg }}>
                        <f.icon size={20} style={{ color: f.color }} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{f.title}</h3>
                        <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{f.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── Social proof / testimonial ── */}
            <section className="bg-white px-8 py-14">
              <div className="mx-auto max-w-5xl">
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { quote: "Min booking-rate steg med 40% efter jeg begyndte at dele præsentationsvideoer på Instagram.", name: "Mette L.", role: "Sommerhusudlejer, Skagen" },
                    { quote: "Det tog bogstaveligt talt 2 minutter at bestille. 10 minutter senere havde jeg en professionel video klar til at dele.", name: "Thomas K.", role: "Airbnb-vært, København" },
                    { quote: "Præsentationsvideoerne har gjort en kæmpe forskel. Lejerne kan nu mærke stemningen inden de booker.", name: "Sofie A.", role: "Ferielejlighed, Bornholm" },
                  ].map((t) => (
                    <div key={t.name} className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                      <div className="mb-3 flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={13} className="fill-orange-400 text-orange-400" />
                        ))}
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed italic">"{t.quote}"</p>
                      <div className="mt-4">
                        <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                        <p className="text-xs text-slate-400">{t.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── Final CTA ── */}
            <section className="px-8 py-14" style={{ background: "linear-gradient(135deg, #1B3F7A 0%, #2a5298 100%)" }}>
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold text-white">Klar til at booste dine bookinger?</h2>
                <p className="mt-3 text-blue-200">Bestil din AI-præsentationsvideo i dag og se forskellen.</p>
                <Link
                  href="/videos/new"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold text-[#1B3F7A] shadow-xl transition-opacity hover:opacity-90"
                >
                  <Sparkles size={16} /> Bestil video — kun 499 kr
                </Link>
                <p className="mt-4 text-xs text-blue-300">Ingen abonnement · Leveres på under 15 minutter · Download direkte i appen</p>
              </div>
            </section>

          </div>
        ) : (
          <div className="px-8 py-6 flex flex-col gap-4">
            <VideoListPoller hasProcessing={orders.some((o) => o.status === "processing")} />
            {orders.map((order) => (
              <div key={order.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{order.title ?? "Bolig fremvisning"}</p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Bestilt {new Date(order.created_at).toLocaleDateString("da-DK", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={order.status} />
                    <Link
                      href={`/videos/${order.id}`}
                      className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-700 transition-colors"
                    >
                      Se <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
                {order.status === "ready" && order.video_url && (
                  <div className="mt-4">
                    <video src={order.video_url} controls className="w-full max-w-sm rounded-lg border border-slate-100" />
                    <div className="mt-3 flex gap-3">
                      <a href={order.video_url} download className="inline-flex items-center gap-2 rounded-lg bg-[#1B3F7A] px-4 py-2 text-sm font-medium text-white hover:bg-[#152f5c]">
                        Download video
                      </a>
                      <Link
                        href={`/videos/${order.id}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                      >
                        Del på sociale medier
                      </Link>
                    </div>
                  </div>
                )}
                {order.status === "processing" && (
                  <p className="mt-3 text-sm text-blue-600">
                    Din video genereres af AI — siden tjekker automatisk hvert 10. sekund.
                  </p>
                )}
                {order.image_urls && order.image_urls.length > 0 && (
                  <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                    {order.image_urls.slice(0, 5).map((url, i) => (
                      <img key={i} src={url} alt="" className="h-16 w-24 shrink-0 rounded-lg object-cover" />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
