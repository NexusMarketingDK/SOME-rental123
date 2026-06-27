"use client";

import { useState, useTransition, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Link2, Loader2, CheckCircle2, AlertCircle, X } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { createPropertyAction } from "@/services/properties";
import { scrapePropertyUrl, type ScrapedProperty } from "@/services/scrape-property";

function Field({
  label, name, value, onChange, placeholder, textarea, required, type,
}: {
  label: string; name: string; value: string; onChange: (v: string) => void;
  placeholder?: string; textarea?: boolean; required?: boolean; type?: string;
}) {
  const cls = "w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#FF6B4A] focus:outline-none focus:ring-2 focus:ring-[#FF6B4A]/10";
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700">
        {label}{required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      {textarea ? (
        <textarea className={cls} name={name} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={4} />
      ) : (
        <input className={cls} name={name} type={type ?? "text"} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required} />
      )}
    </div>
  );
}

export default function NewPropertyPage() {
  const router = useRouter();
  const [importUrl, setImportUrl] = useState("");
  const [importing, startImport] = useTransition();
  const [importResult, setImportResult] = useState<{ ok?: ScrapedProperty; error?: string } | null>(null);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [bookingUrl, setBookingUrl] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [conditions, setConditions] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const formRef = useRef<HTMLFormElement>(null);

  function handleImport() {
    setImportResult(null);
    startImport(async () => {
      const res = await scrapePropertyUrl(importUrl);
      if (res.error) { setImportResult({ error: res.error }); return; }
      const d = res.data!;
      if (d.title) setTitle(d.title);
      if (d.description) setDescription(d.description);
      if (d.location) setLocation(d.location);
      if (d.price) setPrice(d.price);
      if (d.size) setSize(d.size);
      if (d.conditions) setConditions(d.conditions);
      if (d.imageUrls.length > 0) setImages(d.imageUrls);
      setBookingUrl(importUrl);
      setImportResult({ ok: d });
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);
    const fd = new FormData();
    fd.set("title", title);
    fd.set("location", location);
    fd.set("description", [description, size && `Størrelse: ${size}`, price && `Pris: ${price}`, conditions && `Betingelser: ${conditions}`].filter(Boolean).join("\n\n"));
    fd.set("booking_url", bookingUrl);
    images.forEach((url) => fd.append("image_urls[]", url));
    try {
      const result = await createPropertyAction(fd);
      if (result?.error) {
        setSubmitError(result.error);
        setSubmitting(false);
      } else {
        router.push("/properties");
      }
    } catch {
      // redirect() throws — means success, navigate
      router.push("/properties");
    }
  }

  return (
    <>
      <Topbar title="Tilføj bolig" description="Udfyld dine boligoplysninger." />
      <div className="flex-1 px-8 py-6">
        <div className="mx-auto max-w-xl">
          <Link href="/properties" className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900">
            <ArrowLeft size={14} /> Tilbage til boliger
          </Link>

          {/* URL Import */}
          <div className="mb-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="mb-3 text-sm font-semibold text-slate-800 flex items-center gap-2">
              <Link2 size={15} className="text-[#FF6B4A]" />
              Hent oplysninger fra booking-link
            </p>
            <p className="mb-3 text-xs text-slate-500">Indsæt et Airbnb-, Booking.com- eller andet booking-link, og vi henter automatisk:</p>
            <ul className="mb-4 grid grid-cols-2 gap-1 text-xs text-slate-500">
              {["m²", "Beskrivelse", "Billeder", "Pris", "Betingelser"].map((f) => (
                <li key={f} className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B4A]" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="flex gap-2">
              <input
                type="url"
                value={importUrl}
                onChange={(e) => setImportUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleImport())}
                placeholder="https://airbnb.com/rooms/…"
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#FF6B4A] focus:outline-none focus:ring-2 focus:ring-[#FF6B4A]/10"
              />
              <button
                type="button"
                onClick={handleImport}
                disabled={importing || !importUrl.startsWith("http")}
                className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
                style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
              >
                {importing ? <Loader2 size={14} className="animate-spin" /> : <Link2 size={14} />}
                Hent info
              </button>
            </div>

            {importResult?.error && (
              <div className="mt-3 flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-700">
                <AlertCircle size={13} className="shrink-0" /> {importResult.error}
              </div>
            )}

            {importResult?.ok && (
              <div className="mt-3 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2">
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-800">
                  <CheckCircle2 size={13} className="shrink-0" />
                  Oplysninger hentet! Ret nedenstående felter efter behov.
                </div>
                {importResult.ok.imageUrls.length > 0 && (
                  <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
                    {importResult.ok.imageUrls.slice(0, 6).map((url, i) => (
                      <img key={i} src={url} alt="" className="h-12 w-20 shrink-0 rounded object-cover border border-emerald-200" />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <Field label="Titel" name="title" value={title} onChange={setTitle} placeholder="Strandvilla, Lejlighed i København…" required />
            <Field label="Placering" name="location" value={location} onChange={setLocation} placeholder="By, Land" />

            <div className="grid grid-cols-2 gap-4">
              <Field label="Størrelse (m²)" name="size" value={size} onChange={setSize} placeholder="f.eks. 85 m²" />
              <Field label="Pris" name="price" value={price} onChange={setPrice} placeholder="f.eks. 1.200 kr./nat" />
            </div>

            <Field label="Beskrivelse" name="description" value={description} onChange={setDescription} placeholder="Beskriv din bolig…" textarea />
            <Field label="Betingelser / Husregler" name="conditions" value={conditions} onChange={setConditions} placeholder="Husregler, afbestillingspolitik…" textarea />
            <Field label="Booking URL" name="booking_url" type="url" value={bookingUrl} onChange={setBookingUrl} placeholder="https://airbnb.com/…" />

            {images.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-medium text-slate-700">Billeder ({images.length} hentet)</p>
                <div className="grid grid-cols-4 gap-2">
                  {images.slice(0, 8).map((url, i) => (
                    <div key={i} className="relative aspect-video overflow-hidden rounded-lg border border-slate-200">
                      <img src={url} alt="" className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setImages((prev) => prev.filter((_, j) => j !== i))}
                        className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                      >
                        <X size={9} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {submitError && (
              <div className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-700">
                <AlertCircle size={13} className="shrink-0" /> {submitError}
              </div>
            )}
            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <Link href="/properties" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                Annuller
              </Link>
              <button
                type="submit"
                disabled={!title.trim() || submitting}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
                style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
              >
                {submitting && <Loader2 size={14} className="animate-spin" />}
                {submitting ? "Gemmer..." : "Tilføj bolig"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
