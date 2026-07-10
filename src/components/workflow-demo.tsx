"use client";

import { useEffect, useRef, useState } from "react";
import { Link2, Sparkles, Share2, CheckCircle2 } from "lucide-react";

const STEPS = [
  { id: 1, icon: Link2, label: "Indsæt link", color: "#1B3F7A" },
  { id: 2, icon: Sparkles, label: "AI genererer", color: "#FF6B4A" },
  { id: 3, icon: CheckCircle2, label: "Klar!", color: "#22c55e" },
  { id: 4, icon: Share2, label: "Del", color: "#7C3AED" },
];

const PLATFORMS = [
  { name: "Facebook", color: "#1877F2", letter: "f" },
  { name: "Instagram", color: "#E1306C", letter: "IG" },
  { name: "LinkedIn", color: "#0A66C2", letter: "in" },
];

const SAMPLE_URL = "ferieboliger.dk/feriebolig-90-4813";
const SAMPLE_TEXT = "🏖️ Strandnær villa i Alicante — 3 soveværelser, privat pool og havudsigt. Perfekt til 6 gæster. Book dit sommereventyr nu! 🌊";

// Real property photos (Unsplash fallback — same as the cinematic walkthrough)
const ROOM_PHOTOS = [
  { label: "Facade", src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=300&q=80" },
  { label: "Stue",   src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=300&q=80" },
  { label: "Soveværelse", src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=300&q=80" },
  { label: "Terrasse", src: "https://images.unsplash.com/photo-1601084881623-cbe9425f1297?auto=format&fit=crop&w=300&q=80" },
];

// Ken Burns keyframes for the video preview in step 2
const KB_TRANSFORMS = [
  "scale(1.12) translate(-2%, -2%)",
  "scale(1.10) translate(2%, 1%)",
  "scale(1.08) translate(-1%, 2%)",
  "scale(1.14) translate(1%, -1%)",
];

export function WorkflowDemo() {
  const [step, setStep] = useState(0);
  const [typedUrl, setTypedUrl] = useState("");
  const [typedText, setTypedText] = useState("");
  const [sharedPlatforms, setSharedPlatforms] = useState<number[]>([]);
  const [dots, setDots] = useState("");
  const [visiblePhotos, setVisiblePhotos] = useState(0);
  const [videoPhotoIdx, setVideoPhotoIdx] = useState(0);
  const videoInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // Step timing: 0=URL, 1=generating, 2=result, 3=sharing
  useEffect(() => {
    setTypedUrl("");
    setTypedText("");
    setSharedPlatforms([]);
    setVisiblePhotos(0);
    setVideoPhotoIdx(0);

    if (step === 0) {
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setTypedUrl(SAMPLE_URL.slice(0, i));
        if (i >= SAMPLE_URL.length) {
          clearInterval(iv);
          setTimeout(() => setStep(1), 700);
        }
      }, 55);
      return () => clearInterval(iv);
    }

    if (step === 1) {
      let d = 0;
      const dotsIv = setInterval(() => { d = (d + 1) % 4; setDots(".".repeat(d)); }, 400);
      // Reveal room photos one by one
      const photoTimers = ROOM_PHOTOS.map((_, i) =>
        setTimeout(() => setVisiblePhotos(i + 1), 400 + i * 550)
      );
      const advance = setTimeout(() => { clearInterval(dotsIv); setStep(2); }, 3200);
      return () => { clearInterval(dotsIv); photoTimers.forEach(clearTimeout); clearTimeout(advance); };
    }

    if (step === 2) {
      // Cycle through photos with Ken Burns timing
      videoInterval.current = setInterval(() => {
        setVideoPhotoIdx((p) => (p + 1) % ROOM_PHOTOS.length);
      }, 1800);
      // Type the caption
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setTypedText(SAMPLE_TEXT.slice(0, i));
        if (i >= SAMPLE_TEXT.length) {
          clearInterval(iv);
          setTimeout(() => setStep(3), 1000);
        }
      }, 26);
      return () => {
        clearInterval(iv);
        if (videoInterval.current) clearInterval(videoInterval.current);
      };
    }

    if (step === 3) {
      if (videoInterval.current) clearInterval(videoInterval.current);
      const timers = PLATFORMS.map((_, i) =>
        setTimeout(() => setSharedPlatforms((p) => [...p, i]), 400 + i * 500)
      );
      const reset = setTimeout(() => setStep(0), 3800);
      return () => { timers.forEach(clearTimeout); clearTimeout(reset); };
    }
  }, [step]);

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#0e1f3d] p-4 shadow-2xl">
      {/* Step indicator */}
      <div className="mb-4 flex items-center justify-between gap-2">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const active = step === i;
          const done = step > i;
          return (
            <div key={s.id} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full transition-all duration-500"
                style={{
                  background: active || done ? s.color : "rgba(255,255,255,0.08)",
                  transform: active ? "scale(1.15)" : "scale(1)",
                }}
              >
                <Icon size={13} className="text-white" />
              </div>
              <span
                className="text-[9px] font-semibold transition-colors duration-300"
                style={{ color: active || done ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)" }}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Content area */}
      <div className="min-h-[150px] transition-all duration-300">

        {/* Step 0: URL input */}
        {step === 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold text-white/70">Indsæt dit boliglink</p>
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5">
              <Link2 size={13} className="shrink-0 text-blue-400" />
              <span className="flex-1 font-mono text-xs text-white">
                {typedUrl}
                <span className="animate-pulse text-orange-400">|</span>
              </span>
            </div>
            <div className="mt-1 flex gap-2">
              {["Airbnb", "Booking.com", "Novasol", "VRBO"].map((p) => (
                <span key={p} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/50">{p}</span>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: AI generating — shows real property photos appearing */}
        {step === 1 && (
          <div className="flex flex-col items-center justify-center gap-3 py-2">
            <div className="relative flex h-12 w-12 items-center justify-center">
              <div className="absolute inset-0 animate-ping rounded-full bg-orange-500/20" />
              <div className="absolute inset-1 animate-spin rounded-full border-2 border-transparent border-t-orange-400" />
              <Sparkles size={18} className="text-orange-400" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-white">AI analyserer annoncen{dots}</p>
              <p className="mt-0.5 text-[11px] text-white/40">Henter billeder · Skriver tekst · Genererer video</p>
            </div>
            {/* Real room photos appearing one by one */}
            <div className="flex gap-1.5">
              {ROOM_PHOTOS.map((room, i) => (
                <div
                  key={room.label}
                  className="relative h-12 w-12 overflow-hidden rounded-lg border border-white/10 transition-all duration-500"
                  style={{
                    opacity: visiblePhotos > i ? 1 : 0,
                    transform: visiblePhotos > i ? "scale(1)" : "scale(0.8)",
                  }}
                >
                  {visiblePhotos > i ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={room.src}
                      alt={room.label}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-white/10" />
                  )}
                  {visiblePhotos > i && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-0.5 text-center text-[7px] text-white/80">
                      {room.label}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Result ready — real photo in 9:16 + AI text */}
        {step === 2 && (
          <div className="flex gap-3">
            {/* 9:16 Video preview with Ken Burns photo */}
            <div className="relative h-[130px] w-[73px] shrink-0 overflow-hidden rounded-xl border border-white/20 shadow-lg">
              {ROOM_PHOTOS.map((room, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={room.src}
                  src={room.src}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
                  style={{
                    opacity: videoPhotoIdx === i ? 1 : 0,
                    transform: KB_TRANSFORMS[i],
                    transition: "opacity 0.7s ease-in-out, transform 7s ease-in-out",
                  }}
                />
              ))}
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/25 backdrop-blur-sm ring-1 ring-white/30">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="white"><polygon points="2,1 9,5 2,9" /></svg>
                </div>
              </div>
              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 p-1.5">
                <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/20">
                  <div className="h-full rounded-full" style={{ width: "62%", background: "linear-gradient(90deg, #FFB36B, #FF6B4A)" }} />
                </div>
                <p className="mt-0.5 text-[8px] text-white/70">0:28</p>
              </div>
              <div className="absolute left-1 top-1 rounded bg-orange-500 px-1 py-0.5 text-[7px] font-bold text-white">VIDEO</div>
            </div>
            {/* Generated text */}
            <div className="flex-1 rounded-xl border border-white/10 bg-white/5 p-2.5">
              <div className="mb-1.5 flex items-center gap-1">
                <Sparkles size={9} className="text-orange-400" />
                <span className="text-[9px] font-bold text-orange-400">AI OPSLAG</span>
              </div>
              <p className="text-[10px] leading-relaxed text-white/80">
                {typedText}
                {typedText.length < SAMPLE_TEXT.length && (
                  <span className="animate-pulse text-orange-400">|</span>
                )}
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Sharing */}
        {step === 3 && (
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold text-white/70">Del med ét klik</p>
            <div className="flex flex-col gap-2">
              {PLATFORMS.map((p, i) => {
                const shared = sharedPlatforms.includes(i);
                return (
                  <div
                    key={p.name}
                    className="flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-all duration-500"
                    style={{
                      borderColor: shared ? p.color + "60" : "rgba(255,255,255,0.08)",
                      background: shared ? p.color + "18" : "rgba(255,255,255,0.04)",
                    }}
                  >
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
                      style={{ backgroundColor: p.color }}
                    >
                      {p.letter}
                    </div>
                    <span className="flex-1 text-xs font-medium text-white">{p.name}</span>
                    {shared ? (
                      <div className="flex items-center gap-1">
                        <CheckCircle2 size={13} className="text-emerald-400" />
                        <span className="text-[10px] font-semibold text-emerald-400">Delt!</span>
                      </div>
                    ) : (
                      <div className="h-2 w-2 animate-pulse rounded-full bg-white/20" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
