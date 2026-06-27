"use client";

import { useState, useRef } from "react";
import { Camera, Loader2, AlertCircle, CheckCircle2, X } from "lucide-react";
import { extractImagesFromScreenshot, type DetectedImage } from "@/services/extract-screenshot-images";

type Props = {
  onImport: (imageUrls: string[], title?: string) => void;
};

async function cropImageFromCanvas(
  screenshotDataUrl: string,
  region: DetectedImage,
  screenshotW: number,
  screenshotH: number
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const sx = region.x * screenshotW;
      const sy = region.y * screenshotH;
      const sw = region.width * screenshotW;
      const sh = region.height * screenshotH;
      // Output at max 1200px wide to keep file size reasonable
      const scale = Math.min(1, 1200 / sw);
      canvas.width = Math.round(sw * scale);
      canvas.height = Math.round(sh * scale);
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.88));
    };
    img.src = screenshotDataUrl;
  });
}

export function ScreenshotImporter({ onImport }: Props) {
  const [step, setStep] = useState<"idle" | "analyzing" | "preview" | "cropping" | "done">("idle");
  const [error, setError] = useState("");
  const [screenshotUrl, setScreenshotUrl] = useState("");
  const [screenshotSize, setScreenshotSize] = useState({ w: 0, h: 0 });
  const [detected, setDetected] = useState<DetectedImage[]>([]);
  const [detectedTitle, setDetectedTitle] = useState("");
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");

    // Read as data URL for display + cropping
    const dataUrl = await new Promise<string>((res) => {
      const reader = new FileReader();
      reader.onload = () => res(reader.result as string);
      reader.readAsDataURL(file);
    });

    // Get natural dimensions
    const { w, h } = await new Promise<{ w: number; h: number }>((res) => {
      const img = new Image();
      img.onload = () => res({ w: img.naturalWidth, h: img.naturalHeight });
      img.src = dataUrl;
    });

    setScreenshotUrl(dataUrl);
    setScreenshotSize({ w, h });
    setStep("analyzing");

    // Extract base64 without data: prefix
    const base64 = dataUrl.split(",")[1];
    const mime = (file.type === "image/png" ? "image/png" : file.type === "image/webp" ? "image/webp" : "image/jpeg") as "image/jpeg" | "image/png" | "image/webp";

    const result = await extractImagesFromScreenshot(base64, mime);

    if (result.error || !result.images?.length) {
      setError(result.error ?? "Ingen billeder fundet.");
      setStep("idle");
      return;
    }

    setDetected(result.images);
    setDetectedTitle(result.title ?? "");
    setSelected(new Set(result.images.map((_, i) => i)));
    setStep("preview");
    if (e.target) e.target.value = "";
  }

  async function handleConfirm() {
    setStep("cropping");
    const toProcess = detected.filter((_, i) => selected.has(i));
    const crops = await Promise.all(
      toProcess.map((region) => cropImageFromCanvas(screenshotUrl, region, screenshotSize.w, screenshotSize.h))
    );
    const title = detectedTitle || undefined;
    onImport(crops, title);
    setStep("done");
  }

  function toggleSelect(i: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  function reset() {
    setStep("idle");
    setError("");
    setScreenshotUrl("");
    setDetected([]);
    setSelected(new Set());
  }

  if (step === "done") {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
        <CheckCircle2 size={15} /> Billeder importeret fra screenshot!
        <button type="button" onClick={reset} className="ml-auto text-xs text-emerald-600 underline">Nulstil</button>
      </div>
    );
  }

  if (step === "preview" && detected.length > 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-900">AI fandt {detected.length} billeder</p>
            <p className="text-xs text-slate-400">Vælg hvilke du vil bruge til videoen</p>
          </div>
          <button type="button" onClick={reset} className="text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        </div>

        {/* Screenshot with overlay boxes */}
        <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
          <img src={screenshotUrl} alt="Screenshot" className="w-full object-contain max-h-72" />
          {/* Overlay bounding boxes */}
          {detected.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => toggleSelect(i)}
              className="absolute border-2 transition-all"
              style={{
                left: `${img.x * 100}%`,
                top: `${img.y * 100}%`,
                width: `${img.width * 100}%`,
                height: `${img.height * 100}%`,
                borderColor: selected.has(i) ? "#FF6B4A" : "#94a3b8",
                backgroundColor: selected.has(i) ? "rgba(255,107,74,0.15)" : "transparent",
              }}
            >
              <span className="absolute left-1 top-1 rounded px-1 py-0.5 text-[10px] font-bold"
                style={{ background: selected.has(i) ? "#FF6B4A" : "#94a3b8", color: "white" }}>
                {i + 1}
              </span>
            </button>
          ))}
        </div>

        {/* Thumbnail grid */}
        <div className="grid grid-cols-5 gap-2 max-h-40 overflow-y-auto">
          {detected.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => toggleSelect(i)}
              className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                selected.has(i) ? "border-[#FF6B4A]" : "border-slate-200 opacity-50"
              }`}
            >
              <div className="aspect-video bg-slate-200 relative">
                <div className="absolute inset-0 flex items-end p-1">
                  <span className="text-[9px] font-medium text-white bg-black/50 rounded px-1 truncate w-full text-center">
                    {img.room}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">{selected.size} billeder valgt</p>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={selected.size === 0}
            className="rounded-xl px-5 py-2 text-sm font-bold text-white disabled:opacity-40 hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
          >
            Brug {selected.size} billeder til video
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-bold text-slate-900 mb-1">Upload screenshot af billedgalleri</p>
      <p className="text-xs text-slate-400 mb-3">
        Tag et screenshot af f.eks. Airbnb eller Booking.com — AI finder og udskærer automatisk hvert enkelt rum-billede.
      </p>

      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={step === "analyzing"}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 py-6 text-sm text-slate-500 hover:border-[#FF6B4A]/40 hover:bg-orange-50/30 transition-colors disabled:opacity-50"
      >
        {step === "analyzing" ? (
          <>
            <Loader2 size={18} className="animate-spin text-[#FF6B4A]" />
            <span>AI analyserer screenshot...</span>
          </>
        ) : (
          <>
            <Camera size={18} className="text-[#FF6B4A]" />
            <span>Vælg screenshot (PNG, JPG)</span>
          </>
        )}
      </button>

      {error && (
        <div className="mt-3 flex items-start gap-2 text-xs text-red-600">
          <AlertCircle size={13} className="mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      {step === "cropping" && (
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
          <Loader2 size={13} className="animate-spin" /> Udskærer billeder...
        </div>
      )}

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}
