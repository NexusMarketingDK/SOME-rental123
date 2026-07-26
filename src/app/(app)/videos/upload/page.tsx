import Link from "next/link";
import { ArrowLeft, Film, ShieldCheck, Share2 } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { UploadVideoForm } from "@/components/upload-video-form";
import { getProperties } from "@/services/properties";

export default async function UploadVideoPage({
  searchParams,
}: {
  searchParams: Promise<{ property_id?: string }>;
}) {
  const [{ property_id }, properties] = await Promise.all([searchParams, getProperties()]);
  const propertyOptions = properties.map((p) => ({ id: p.id, title: p.title, location: p.location }));

  return (
    <>
      <Topbar
        title="Tilføj færdig video"
        description="Har du allerede lavet en video i Veo3? Læg den ind i appen her."
      />

      <div className="flex flex-1 px-4 py-6 md:px-8 md:py-8">
        <div className="mx-auto w-full max-w-3xl">
          <Link
            href="/videos"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft size={14} /> Tilbage til videoer
          </Link>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
            {/* Form */}
            <div className="md:col-span-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-1 text-base font-bold text-slate-900">Din video</h2>
                <p className="mb-5 text-sm text-slate-500">
                  Indsæt linket til den færdige video — eller upload filen direkte. Den bliver klar til download og deling med det samme.
                </p>
                <UploadVideoForm propertyId={property_id} properties={propertyOptions} />
              </div>
            </div>

            {/* Side info */}
            <div className="space-y-4 md:col-span-2">
              <div className="rounded-2xl p-6 text-white" style={{ background: "linear-gradient(135deg, #1B3F7A 0%, #14306b 100%)" }}>
                <Film size={22} className="text-orange-300" />
                <h3 className="mt-3 text-lg font-bold leading-snug">Fra Veo3 til dit workspace</h3>
                <p className="mt-2 text-sm leading-relaxed text-blue-200">
                  Lav videoen i Veo3, kopiér delelinket (eller hent MP4-filen), og læg den ind her. Så samler du alle dine præsentationsvideoer ét sted.
                </p>
              </div>

              <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                {[
                  { icon: ShieldCheck, color: "#059669", title: "Permanent kopi", text: "Vi gemmer en kopi i appen, så linket ikke udløber." },
                  { icon: Share2, color: "#FF6B4A", title: "Klar til deling", text: "Download og del direkte på Facebook, Instagram, TikTok og YouTube." },
                ].map((f) => (
                  <div key={f.title} className="flex items-start gap-3">
                    <f.icon size={18} className="mt-0.5 shrink-0" style={{ color: f.color }} />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{f.title}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{f.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
