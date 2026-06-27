import Link from "next/link";
import { Plus, Video, Clock, CheckCircle2, XCircle, Loader2, Sparkles, ImageDown, Share2, TrendingUp } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { createClient } from "@/lib/supabase/server";
import type { VideoOrder } from "@/types/database";

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

const FEATURES = [
  {
    icon: ImageDown,
    title: "Automatisk billedhentning",
    text: "Indsæt dit link fra Airbnb, Booking.com eller en anden platform — vi henter billederne automatisk. Ingen manuel upload nødvendig.",
  },
  {
    icon: Sparkles,
    title: "AI-genereret på minutter",
    text: "Vores AI sammensætter dine billeder til en professionel præsentationsvideo med musik og flydende overgange — klar på 5-15 minutter.",
  },
  {
    icon: Share2,
    title: "Del på alle platforme",
    text: "Videoen leveres direkte i appen. Download den og del den på Facebook, Instagram, TikTok og YouTube for maksimal synlighed.",
  },
  {
    icon: TrendingUp,
    title: "Flere bookinger",
    text: "Videoer får op til 3x mere engagement end billeder på sociale medier. Vis din bolig fra dens bedste side og tiltræk flere lejere.",
  },
];

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
              <Plus size={16} />
              Bestil ny video
            </Link>
          ) : null
        }
      />

      <div className="flex-1 px-8 py-6">
        {orders.length === 0 ? (
          <div className="mx-auto max-w-3xl space-y-8">

            {/* Hero CTA */}
            <div className="rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg, #1B3F7A 0%, #2a5298 100%)" }}>
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <Video size={28} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Gør din bolig uimodståelig</h2>
              <p className="mt-2 text-base text-blue-100 max-w-lg mx-auto">
                En professionel præsentationsvideo øger din synlighed på sociale medier markant og hjælper dig med at få flere bookinger — AI klarer alt arbejdet.
              </p>
              <Link
                href="/videos/new"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#1B3F7A] transition-opacity hover:opacity-90"
              >
                <Sparkles size={16} />
                Bestil din første video — kun 499 kr
              </Link>
              <p className="mt-3 text-xs text-blue-200">Leveres direkte i appen inden for 5-15 minutter</p>
            </div>

            {/* Feature grid */}
            <div className="grid grid-cols-2 gap-4">
              {FEATURES.map((f) => (
                <div key={f.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50">
                    <f.icon size={18} className="text-[#FF6B4A]" />
                  </div>
                  <p className="font-semibold text-slate-900">{f.title}</p>
                  <p className="mt-1 text-sm text-slate-500 leading-relaxed">{f.text}</p>
                </div>
              ))}
            </div>

            {/* How it works */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-4">Sådan fungerer det</h3>
              <div className="flex flex-col gap-4">
                {[
                  { step: "1", title: "Indsæt dit Airbnb- eller Booking.com-link", text: "Vi henter automatisk billeder fra din annonce — eller upload egne billeder." },
                  { step: "2", title: "AI genererer din video", text: "Vores AI sammensætter en professionel video med flydende overgange og musik." },
                  { step: "3", title: "Del og få flere bookinger", text: "Download videoen og del den direkte på Facebook, Instagram, TikTok og YouTube." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}>
                      {item.step}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link
                  href="/videos/new"
                  className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
                >
                  <Plus size={16} /> Bestil video — 499 kr
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <div key={order.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{order.title ?? "Bolig fremvisning"}</p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Bestilt {new Date(order.created_at).toLocaleDateString("da-DK", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>

                {order.status === "ready" && order.video_url && (
                  <div className="mt-4">
                    <video
                      src={order.video_url}
                      controls
                      className="w-full max-w-sm rounded-lg border border-slate-100"
                    />
                    <div className="mt-3 flex gap-2">
                      <a
                        href={order.video_url}
                        download
                        className="inline-flex items-center gap-2 rounded-lg bg-[#1B3F7A] px-4 py-2 text-sm font-medium text-white hover:bg-[#152f5c]"
                      >
                        Download video
                      </a>
                    </div>
                  </div>
                )}

                {order.status === "processing" && (
                  <p className="mt-3 text-sm text-slate-500">
                    Din video genereres af AI — du modtager en notifikation når den er klar (typisk 5-15 minutter).
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
