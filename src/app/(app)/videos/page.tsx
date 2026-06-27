import Link from "next/link";
import { Plus, Video, Clock, CheckCircle2, XCircle, Loader2 } from "lucide-react";
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

export default async function VideosPage() {
  const orders = await getVideoOrders();

  return (
    <>
      <Topbar
        title="Fremvisningsvideoer"
        description="AI-genererede præsentationsvideoer af dine boliger."
        action={
          <Link
            href="/videos/new"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
          >
            <Plus size={16} />
            Bestil video
          </Link>
        }
      />

      <div className="flex-1 px-8 py-6">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-20 text-center">
            <Video size={32} className="mb-3 text-slate-300" />
            <p className="text-sm font-medium text-slate-900">Ingen videoer endnu</p>
            <p className="mt-1 text-sm text-slate-500">Bestil en AI-genereret fremvisningsvideo af din bolig.</p>
            <Link
              href="/videos/new"
              className="mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white"
              style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
            >
              <Plus size={16} /> Bestil video — 499 kr
            </Link>
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
                      poster=""
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
