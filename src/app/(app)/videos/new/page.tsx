"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Topbar } from "@/components/layout/topbar";
import { createVideoOrderCheckout } from "@/services/billing";
import { Upload, Link as LinkIcon, X, Loader2, Sparkles, CheckCircle2, Clock, Star, ChevronLeft, ChevronRight, Plus, Search, AlertCircle, MapPin, Tag, Maximize2 } from "lucide-react";
import { scrapePropertyUrl, type ScrapedProperty } from "@/services/scrape-property";
import { ScreenshotImporter } from "@/components/screenshot-importer";

const ROOM_LABELS = [
  "Stue", "Køkken", "Soveværelse", "Badeværelse", "Altan/Terrasse",
  "Spisestue", "Entre", "Soveværelse 2", "Badeværelse 2", "Udendørs",
  "Udsigt", "Detaljer", "Soveværelse 3", "Kontor", "Bryggers",
  "Pool", "Have", "Garage", "Kælder", "Loft",
];

const BENEFITS = [
  "Cinematisk præsentationsvideo med AI",
  "Professionelle kamerabevægelser og overgange",
  "Klar på 5-15 minutter — leveres direkte i appen",
  "Del direkte på sociale medier",
];

function PhotoTour({
  images,
  onRemove,
  onAdd,
  fileRef,
  uploading,
}: {
  images: string[];
  onRemove: (i: number) => void;
  onAdd: () => void;
  fileRef: React.RefObject<HTMLInputElement | null>;
  uploading: boolean;
}) {
  const [selected, setSelected] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected >= images.length && images.length > 0) setSelected(images.length - 1);
  }, [images.length, selected]);

  function scrollStrip(dir: "left" | "right") {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -120 : 120, behavior: "smooth" });
  }

  const current = images[selected];
  const label = ROOM_LABELS[selected] ?? `Billede ${selected + 1}`;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-slate-900">Fotorute</p>
          <p className="text-xs text-slate-400 mt-0.5">{images.length} billede{images.length !== 1 ? "r" : ""} valgt til video</p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <Plus size={12} /> Tilføj
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="relative px-4 py-3 border-b border-slate-100 bg-slate-50">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollStrip("left")}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors"
          >
            <ChevronLeft size={13} />
          </button>
          <div ref={scrollRef} className="flex gap-2.5 overflow-x-auto scrollbar-hide flex-1 scroll-smooth">
            {images.map((url, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelected(i)}
                className={`relative flex-shrink-0 flex flex-col items-center gap-1 group focus:outline-none`}
              >
                <div className={`relative h-16 w-24 overflow-hidden rounded-xl border-2 transition-all ${
                  selected === i ? "border-[#FF6B4A] shadow-md" : "border-transparent hover:border-slate-300"
                }`}>
                  <img
                    src={url.startsWith("data:") || url.startsWith("http") ? url : ""}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onRemove(i); }}
                    className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={8} />
                  </button>
                  {selected === i && (
                    <div className="absolute inset-0 rounded-xl ring-2 ring-[#FF6B4A] ring-inset pointer-events-none" />
                  )}
                </div>
                <span className={`text-[9px] font-medium leading-none truncate w-24 text-center ${
                  selected === i ? "text-[#FF6B4A]" : "text-slate-400"
                }`}>
                  {ROOM_LABELS[i] ?? `#${i + 1}`}
                </span>
              </button>
            ))}
            {/* Add more */}
            <button
              type="button"
              onClick={onAdd}
              className="flex-shrink-0 flex flex-col items-center gap-1"
            >
              <div className="flex h-16 w-24 items-center justify-center rounded-xl border-2 border-dashed border-slate-200 hover:border-[#FF6B4A]/40 hover:bg-orange-50/30 transition-colors">
                {uploading ? <Loader2 size={16} className="animate-spin text-[#FF6B4A]" /> : <Plus size={16} className="text-slate-300" />}
              </div>
              <span className="text-[9px] text-slate-300 leading-none">Tilføj</span>
            </button>
          </div>
          <button
            type="button"
            onClick={() => scrollStrip("right")}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors"
          >
            <ChevronRight size={13} />
          </button>
        </div>
      </div>

      {/* Large preview */}
      {current && (
        <div className="relative">
          <div className="aspect-video w-full overflow-hidden bg-slate-100">
            <img
              src={current.startsWith("data:") || current.startsWith("http") ? current : ""}
              alt={label}
              className="h-full w-full object-cover"
            />
          </div>
          {/* Caption overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-5 py-4">
            <p className="text-base font-bold text-white">{label}</p>
            <p className="text-xs text-white/70">{selected + 1} / {images.length}</p>
          </div>
          {/* Prev/Next */}
          <button
            type="button"
            onClick={() => setSelected((s) => Math.max(0, s - 1))}
            disabled={selected === 0}
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 shadow hover:bg-white transition-colors disabled:opacity-30"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => setSelected((s) => Math.min(images.length - 1, s + 1))}
            disabled={selected === images.length - 1}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 shadow hover:bg-white transition-colors disabled:opacity-30"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default function NewVideoPage() {
  const searchParams = useSearchParams();
  const [title, setTitle] = useState("");
  const [bookingUrl, setBookingUrl] = useState("");
  const [propertyInfo, setPropertyInfo] = useState<Pick<ScrapedProperty, "description" | "location" | "price" | "size"> | null>(null);

  useEffect(() => {
    const urlParam = searchParams.get("booking_url");
    if (urlParam) setBookingUrl(urlParam);
  }, [searchParams]);

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // URL import state
  const [importUrl, setImportUrl] = useState("");
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState("");

  async function handleUrlImport() {
    if (!importUrl.trim()) return;
    setImporting(true);
    setImportError("");
    const result = await scrapePropertyUrl(importUrl.trim());
    setImporting(false);
    if (result.error) { setImportError(result.error); return; }
    if (result.data) {
      if (result.data.title && !title) setTitle(result.data.title);
      const { description, location, price, size } = result.data;
      if (description || location || price || size) {
        setPropertyInfo({ description, location, price, size });
      }
      if (result.data.imageUrls.length > 0) {
        setImageUrls((prev) => [...prev, ...result.data!.imageUrls.slice(0, 20 - prev.length)]);
      } else {
        setImportError("Ingen billeder fundet på siden. Upload billeder manuelt.");
      }
    }
  }

  function handleScreenshotImport(urls: string[], detectedTitle?: string) {
    if (detectedTitle && !title) setTitle(detectedTitle);
    setImageUrls((prev) => [...prev, ...urls.slice(0, 20 - prev.length)]);
  }

  function removeImage(i: number) {
    setImageUrls((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    const urls = await Promise.all(
      files.map(async (file) => {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/upload-image", { method: "POST", body: fd });
        if (res.ok) {
          const { url } = await res.json();
          return url as string;
        }
        // Fallback to local preview if upload fails
        return await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      })
    );
    setImageUrls((prev) => [...prev, ...urls]);
    setUploading(false);
    if (e.target) e.target.value = "";
  }

  const canSubmit = title.trim().length > 0;

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
                  Vores AI omdanner dine billeder til en professionel præsentationsvideo med musik og flydende overgange.
                </p>
                <div className="mt-4 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-orange-400 text-orange-400" />
                  ))}
                  <span className="ml-1.5 text-xs text-blue-300">Brugt af hundredvis af udlejere</span>
                </div>
              </div>

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

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <Clock size={20} className="shrink-0 text-[#FF6B4A]" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Leveres inden for 15 minutter</p>
                  <p className="text-xs text-slate-500">Du modtager besked i appen, så snart din video er klar.</p>
                </div>
              </div>
            </div>

            {/* ── Right: order form ── */}
            <div className="col-span-3 space-y-5">

              {/* Import options */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
                <p className="text-sm font-bold text-slate-900">Hent billeder automatisk</p>

                {/* URL import */}
                <div>
                  <p className="text-xs text-slate-500 mb-2">Fra booking-link (Booking.com, VRBO m.fl.)</p>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="url"
                        value={importUrl}
                        onChange={(e) => { setImportUrl(e.target.value); setImportError(""); }}
                        onKeyDown={(e) => e.key === "Enter" && handleUrlImport()}
                        placeholder="https://www.booking.com/hotel/..."
                        className="w-full rounded-lg border border-slate-200 pl-8 pr-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1B3F7A] focus:outline-none focus:ring-2 focus:ring-[#1B3F7A]/10"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleUrlImport}
                      disabled={importing || !importUrl.trim()}
                      className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
                      style={{ background: "linear-gradient(135deg, #1B3F7A 0%, #2a5298 100%)" }}
                    >
                      {importing ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
                      {importing ? "Henter..." : "Hent"}
                    </button>
                  </div>
                  {importError && (
                    <div className="mt-1.5 flex items-start gap-1.5 text-xs text-red-600">
                      <AlertCircle size={12} className="mt-0.5 shrink-0" /> {importError}
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <p className="text-xs text-slate-500 mb-2">Fra screenshot (Airbnb, alle sider)</p>
                  <ScreenshotImporter onImport={handleScreenshotImport} />
                </div>
              </div>

              <form action={createVideoOrderCheckout} className="space-y-5">
                {imageUrls.map((url, i) => (
                  <input key={i} type="hidden" name="image_urls[]" value={url} />
                ))}
                {imageUrls.map((_, i) => (
                  <input key={`label-${i}`} type="hidden" name="room_labels[]" value={ROOM_LABELS[i] ?? `Billede ${i + 1}`} />
                ))}

                {/* Title + URL */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                  <h3 className="text-base font-bold text-slate-900">Oplysninger om din bolig</h3>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Titel <span className="text-red-500">*</span>
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

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Airbnb / Booking.com link
                      <span className="ml-1.5 text-xs font-normal text-slate-400">(valgfrit)</span>
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

                {/* Property info card — shown after URL import */}
                {propertyInfo && (
                  <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Hentet fra link</p>
                      <button
                        type="button"
                        onClick={() => setPropertyInfo(null)}
                        className="text-blue-300 hover:text-blue-500 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {propertyInfo.location && (
                        <span className="flex items-center gap-1.5 rounded-lg bg-white border border-blue-100 px-3 py-1.5 text-xs font-medium text-slate-700">
                          <MapPin size={11} className="text-blue-400 shrink-0" /> {propertyInfo.location}
                        </span>
                      )}
                      {propertyInfo.price && (
                        <span className="flex items-center gap-1.5 rounded-lg bg-white border border-blue-100 px-3 py-1.5 text-xs font-medium text-slate-700">
                          <Tag size={11} className="text-blue-400 shrink-0" /> {propertyInfo.price}
                        </span>
                      )}
                      {propertyInfo.size && (
                        <span className="flex items-center gap-1.5 rounded-lg bg-white border border-blue-100 px-3 py-1.5 text-xs font-medium text-slate-700">
                          <Maximize2 size={11} className="text-blue-400 shrink-0" /> {propertyInfo.size}
                        </span>
                      )}
                    </div>
                    {propertyInfo.description && (
                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-4">{propertyInfo.description}</p>
                    )}
                  </div>
                )}

                {/* Photo tour or upload CTA */}
                {imageUrls.length > 0 ? (
                  <PhotoTour
                    images={imageUrls}
                    onRemove={removeImage}
                    onAdd={() => fileRef.current?.click()}
                    fileRef={fileRef}
                    uploading={uploading}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 py-10 text-sm text-slate-500 hover:border-[#FF6B4A]/40 hover:bg-orange-50/30 transition-colors disabled:opacity-50"
                  >
                    {uploading
                      ? <Loader2 size={18} className="animate-spin text-[#FF6B4A]" />
                      : <Upload size={18} className="text-[#FF6B4A]" />}
                    <span>{uploading ? "Uploader billeder..." : "Klik for at tilføje billeder til din fotorute"}</span>
                  </button>
                )}
                <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full rounded-xl py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
                >
                  {canSubmit ? "Opret video" : "Udfyld titel for at fortsætte"}
                </button>
                <p className="text-center text-xs text-slate-400">Video leveres inden for 15 minutter</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
