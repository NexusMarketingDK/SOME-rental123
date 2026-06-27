"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Topbar } from "@/components/layout/topbar";
import { createVideoOrderCheckout } from "@/services/billing";
import { Upload, Link as LinkIcon, X, Image as ImageIcon, Loader2, Sparkles, CheckCircle2, Clock, Star } from "lucide-react";

const BENEFITS = [
  "Henter automatisk billeder fra Airbnb & Booking.com",
  "Professionel video med flydende overgange og musik",
  "Klar på 5-15 minutter — leveres direkte i appen",
  "Op til 3× mere engagement end statiske billeder",
];

export default function NewVideoPage() {
  const searchParams = useSearchParams();
  const [title, setTitle] = useState("");
  const [bookingUrl, setBookingUrl] = useState("");

  useEffect(() => {
    const urlParam = searchParams.get("booking_url");
    if (urlParam) setBookingUrl(urlParam);
  }, [searchParams]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function addUrlImage() {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    setImageUrls((prev) => [...prev, trimmed]);
    setUrlInput("");
  }

  function removeImage(i: number) {
    setImageUrls((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    const urls = await Promise.all(files.map((f) => new Promise<string>((res) => {
      const reader = new FileReader();
      reader.onload = () => res(reader.result as string);
      reader.readAsDataURL(f);
    })));
    setImageUrls((prev) => [...prev, ...urls]);
    setUploading(false);
  }

  const canSubmit = imageUrls.length >= 2 && title.trim().length > 0;

  return (
    <>
      <Topbar
        title="Bestil præsentationsvideo"
        description="AI-genereret video af din bolig — klar på minutter."
      />

      <div className="flex-1 px-8 py-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-5 gap-8">

            {/* ── Left: sales content ── */}
            <div className="col-span-2 space-y-6">

              {/* Hero card */}
              <div className="rounded-2xl p-6 text-white" style={{ background: "linear-gradient(135deg, #1B3F7A 0%, #14306b 100%)" }}>
                <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-orange-400/30 bg-orange-400/10 px-2.5 py-1 text-xs font-semibold text-orange-300">
                  <Sparkles size={11} /> AI-drevet
                </div>
                <h2 className="text-xl font-bold leading-snug">
                  Gør din bolig<br />
                  <span style={{ background: "linear-gradient(90deg, #FFB36B, #FF6B4A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    uimodståelig
                  </span>
                </h2>
                <p className="mt-2 text-sm text-blue-200 leading-relaxed">
                  Vores AI omdanner dine billeder til en professionel præsentationsvideo med musik og flydende overgange — uden at du behøver løfte en finger.
                </p>

                {/* Stars */}
                <div className="mt-4 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-orange-400 text-orange-400" />
                  ))}
                  <span className="ml-1.5 text-xs text-blue-300">Brugt af hundredvis af udlejere</span>
                </div>
              </div>

              {/* Benefits */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-4">Hvad du får</h3>
                <ul className="space-y-3">
                  {BENEFITS.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                      <span className="text-sm text-slate-600">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How it works */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-4">Sådan fungerer det</h3>
                <ol className="space-y-4">
                  {[
                    { n: "1", title: "Indsæt dit Airbnb- eller Booking.com-link", text: "Vi henter billederne automatisk — eller upload egne fotos." },
                    { n: "2", title: "AI genererer din video", text: "Professionelle overgange, musik og 9:16 format til sociale medier." },
                    { n: "3", title: "Download og del", text: "Videoen leveres direkte i appen inden for 5-15 minutter." },
                  ].map((s) => (
                    <li key={s.n} className="flex gap-3">
                      <div
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                        style={{ background: "linear-gradient(135deg, #FFB36B, #FF6B4A)" }}
                      >
                        {s.n}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{s.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{s.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Delivery promise */}
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <Clock size={20} className="shrink-0 text-[#FF6B4A]" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Leveres inden for 15 minutter</p>
                  <p className="text-xs text-slate-500">Du modtager besked i appen, så snart din video er klar.</p>
                </div>
              </div>
            </div>

            {/* ── Right: order form ── */}
            <div className="col-span-3">
              <form action={createVideoOrderCheckout} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm space-y-6">
                {imageUrls.map((url, i) => (
                  <input key={i} type="hidden" name="image_urls[]" value={url} />
                ))}

                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-5">Oplysninger om din bolig</h3>

                  {/* Title */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Titel på boligen <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="f.eks. Charmerende sommerhus ved havet"
                      required
                      className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1B3F7A] focus:outline-none focus:ring-2 focus:ring-[#1B3F7A]/10"
                    />
                  </div>

                  {/* Booking URL */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Link til Airbnb / Booking.com
                      <span className="ml-1.5 text-xs font-normal text-slate-400">(valgfrit — vi henter billeder automatisk)</span>
                    </label>
                    <div className="relative">
                      <LinkIcon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="url"
                        name="booking_url"
                        value={bookingUrl}
                        onChange={(e) => setBookingUrl(e.target.value)}
                        placeholder="https://www.airbnb.com/rooms/..."
                        className="w-full rounded-lg border border-slate-200 pl-9 pr-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1B3F7A] focus:outline-none focus:ring-2 focus:ring-[#1B3F7A]/10"
                      />
                    </div>
                  </div>
                </div>

                {/* Images */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Billeder <span className="text-red-500">*</span>
                    <span className="ml-1.5 text-xs font-normal text-slate-400">(mindst 2 påkrævet — jo flere, jo bedre video)</span>
                  </label>

                  {/* URL input */}
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addUrlImage())}
                      placeholder="Indsæt billed-URL og tryk Tilføj..."
                      className="flex-1 rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1B3F7A] focus:outline-none focus:ring-2 focus:ring-[#1B3F7A]/10"
                    />
                    <button
                      type="button"
                      onClick={addUrlImage}
                      className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      Tilføj
                    </button>
                  </div>

                  {/* File upload */}
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 py-7 text-sm text-slate-500 hover:border-[#FF6B4A]/40 hover:bg-orange-50/30 transition-colors disabled:opacity-50"
                  >
                    {uploading ? <Loader2 size={18} className="animate-spin text-[#FF6B4A]" /> : <Upload size={18} className="text-[#FF6B4A]" />}
                    <span>{uploading ? "Uploader billeder..." : "Klik for at uploade billeder fra din computer"}</span>
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />

                  {/* Preview */}
                  {imageUrls.length > 0 && (
                    <div className="mt-3 grid grid-cols-5 gap-2">
                      {imageUrls.map((url, i) => (
                        <div key={i} className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                          {url.startsWith("data:") || url.startsWith("http") ? (
                            <img src={url} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <ImageIcon size={16} className="text-slate-300" />
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => removeImage(i)}
                            className="absolute right-0.5 top-0.5 rounded-full bg-black/60 p-0.5 text-white hover:bg-black/80"
                          >
                            <X size={9} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {imageUrls.length > 0 && (
                    <p className="mt-2 text-xs text-slate-400">{imageUrls.length} billede{imageUrls.length !== 1 ? "r" : ""} tilføjet — anbefalet: 5-15 billeder for bedste resultat</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full rounded-xl py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
                >
                  {canSubmit ? "Opret video" : "Udfyld titel og tilføj mindst 2 billeder"}
                </button>
                <p className="text-center text-xs text-slate-400">
                  Video leveres inden for 15 minutter
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
