"use client";

import { useState, useRef } from "react";
import { Topbar } from "@/components/layout/topbar";
import { createVideoOrderCheckout } from "@/services/billing";
import { Upload, Link as LinkIcon, X, Image as ImageIcon, Loader2 } from "lucide-react";

export default function NewVideoPage() {
  const [title, setTitle] = useState("");
  const [bookingUrl, setBookingUrl] = useState("");
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
    // For MVP: convert to data URLs for preview — in production these would upload to Supabase Storage
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
        description="Upload billeder eller hent fra Airbnb/Booking.com — AI genererer en professionel video."
      />

      <div className="flex-1 px-8 py-6">
        <form
          action={createVideoOrderCheckout}
          className="mx-auto max-w-2xl space-y-6"
        >
          {/* Hidden fields for image URLs */}
          {imageUrls.map((url, i) => (
            <input key={i} type="hidden" name="image_urls[]" value={url} />
          ))}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Titel på boligen
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
              Link til Airbnb / Booking.com annonce (valgfrit)
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
            <p className="mt-1 text-xs text-slate-400">Brug linket til automatisk at hente billeder fra din annonce.</p>
          </div>

          {/* Image upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Billeder <span className="text-slate-400 font-normal">(mindst 2 påkrævet)</span>
            </label>

            {/* URL input */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addUrlImage())}
                placeholder="Indsæt billed-URL..."
                className="flex-1 rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1B3F7A] focus:outline-none focus:ring-2 focus:ring-[#1B3F7A]/10"
              />
              <button
                type="button"
                onClick={addUrlImage}
                className="rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Tilføj
              </button>
            </div>

            {/* File upload */}
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-200 py-6 text-sm text-slate-500 hover:border-slate-300 hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              {uploading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Upload size={16} />
              )}
              {uploading ? "Uploader..." : "Upload billeder fra din computer"}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Preview grid */}
            {imageUrls.length > 0 && (
              <div className="mt-3 grid grid-cols-4 gap-2">
                {imageUrls.map((url, i) => (
                  <div key={i} className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                    {url.startsWith("data:") || url.startsWith("http") ? (
                      <img src={url} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <ImageIcon size={20} className="text-slate-300" />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute right-1 top-1 rounded-full bg-black/50 p-0.5 text-white hover:bg-black/70"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Price + submit */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900">AI-præsentationsvideo</p>
                <p className="text-xs text-slate-500 mt-0.5">Leveres i appen inden for 5-15 minutter</p>
              </div>
              <p className="text-lg font-semibold text-slate-900">499 kr</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full rounded-lg py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
          >
            Gå til betaling — 499 kr
          </button>
          {!canSubmit && (
            <p className="text-center text-xs text-slate-400">
              {title.trim().length === 0 ? "Tilføj en titel for at fortsætte" : "Tilføj mindst 2 billeder for at fortsætte"}
            </p>
          )}
        </form>
      </div>
    </>
  );
}
