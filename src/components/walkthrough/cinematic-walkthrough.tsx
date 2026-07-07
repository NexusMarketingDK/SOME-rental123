"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, Pause, Loader2, SlidersHorizontal } from "lucide-react";
import type { Locale } from "@/lib/i18n";

// ── Types ───────────────────────────────────────────────────────────────────
export type RoomKey =
  | "facade" | "entrance" | "kitchen" | "living"
  | "bedroom" | "bathroom" | "terrace";

export type Scene = { src: string; roomKey: RoomKey };

type LoadedScene = { img: HTMLImageElement; roomKey: RoomKey };

// ── Room labels per language ────────────────────────────────────────────────
const ROOM_LABELS: Record<Locale, Record<RoomKey, string>> = {
  da: { facade: "Facade", entrance: "Entré", kitchen: "Køkken", living: "Stue", bedroom: "Soveværelse", bathroom: "Badeværelse", terrace: "Terrasse" },
  en: { facade: "Exterior", entrance: "Entrance", kitchen: "Kitchen", living: "Living room", bedroom: "Bedroom", bathroom: "Bathroom", terrace: "Terrace" },
  es: { facade: "Fachada", entrance: "Entrada", kitchen: "Cocina", living: "Salón", bedroom: "Dormitorio", bathroom: "Baño", terrace: "Terraza" },
  de: { facade: "Fassade", entrance: "Eingang", kitchen: "Küche", living: "Wohnzimmer", bedroom: "Schlafzimmer", bathroom: "Badezimmer", terrace: "Terrasse" },
};

// ── Color-grade filters (CSS filters on the canvas — GPU-accelerated) ──────
type FilterKey = "none" | "cinematic" | "warm" | "cool" | "vivid" | "vintage" | "mono";

const FILTERS: { key: FilterKey; css: string; label: Record<Locale, string> }[] = [
  { key: "none", css: "", label: { da: "Ingen", en: "None", es: "Ninguno", de: "Ohne" } },
  { key: "cinematic", css: "contrast(1.1) saturate(1.18) brightness(1.03)", label: { da: "Cinematic", en: "Cinematic", es: "Cinematic", de: "Cinematic" } },
  { key: "warm", css: "sepia(0.22) saturate(1.35) contrast(1.06) brightness(1.04)", label: { da: "Varm", en: "Warm", es: "Cálido", de: "Warm" } },
  { key: "cool", css: "hue-rotate(-10deg) saturate(1.12) contrast(1.08) brightness(1.02)", label: { da: "Kølig", en: "Cool", es: "Frío", de: "Kühl" } },
  { key: "vivid", css: "saturate(1.5) contrast(1.12)", label: { da: "Levende", en: "Vivid", es: "Vívido", de: "Lebendig" } },
  { key: "vintage", css: "sepia(0.35) contrast(0.98) brightness(1.06) saturate(1.15)", label: { da: "Vintage", en: "Vintage", es: "Vintage", de: "Vintage" } },
  { key: "mono", css: "grayscale(1) contrast(1.12) brightness(1.05)", label: { da: "S/H", en: "B/W", es: "B/N", de: "S/W" } },
];

// The default tour: bundled placeholder art that always works offline.
// Upgraded at runtime with real listing photos from /api/walkthrough-images.
const DEFAULT_SCENES: Scene[] = [
  { src: "/walkthrough/01-facade.svg", roomKey: "facade" },
  { src: "/walkthrough/02-entrance.svg", roomKey: "entrance" },
  { src: "/walkthrough/03-kitchen.svg", roomKey: "kitchen" },
  { src: "/walkthrough/04-living.svg", roomKey: "living" },
  { src: "/walkthrough/05-bedroom.svg", roomKey: "bedroom" },
  { src: "/walkthrough/06-bathroom.svg", roomKey: "bathroom" },
  { src: "/walkthrough/07-terrace.svg", roomKey: "terrace" },
];

// ── Timeline constants ──────────────────────────────────────────────────────
const SCENE_DUR = 6;   // seconds each room is on screen
const FADE = 1.2;      // crossfade overlap between rooms

const sceneStart = (i: number) => i * (SCENE_DUR - FADE);
const totalDuration = (n: number) => (n > 0 ? n * (SCENE_DUR - FADE) + FADE : 0);

// Ken Burns variants: zoom from→to and pan across the image's slack space.
const KB_VARIANTS = [
  { z0: 1.08, z1: 1.24, p0: [0.25, 0.4], p1: [0.75, 0.6] },
  { z0: 1.26, z1: 1.08, p0: [0.7, 0.35], p1: [0.3, 0.6] },
  { z0: 1.08, z1: 1.22, p0: [0.5, 0.25], p1: [0.5, 0.75] },
  { z0: 1.22, z1: 1.08, p0: [0.35, 0.65], p1: [0.65, 0.35] },
] as const;

const easeInOut = (u: number) => 0.5 - 0.5 * Math.cos(Math.PI * u);
const lerp = (a: number, b: number, u: number) => a + (b - a) * u;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
}

/** Preload images; silently drops any that fail so a dead URL never breaks the tour. */
function preloadScenes(scenes: Scene[]): Promise<LoadedScene[]> {
  return Promise.all(
    scenes.map(
      (s) =>
        new Promise<LoadedScene | null>((resolve) => {
          const img = new Image();
          img.onload = () => resolve({ img, roomKey: s.roomKey });
          img.onerror = () => resolve(null);
          img.src = s.src;
        }),
    ),
  ).then((all) => all.filter((x): x is LoadedScene => x !== null));
}

// ── Component ───────────────────────────────────────────────────────────────
export function CinematicWalkthrough({ locale = "da" }: { locale?: Locale }) {
  const labels = ROOM_LABELS[locale] ?? ROOM_LABELS.da;

  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);

  const [scenes, setScenes] = useState<LoadedScene[]>([]);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [title, setTitle] = useState("Villa · Valencia, Spanien");
  const [filterKey, setFilterKey] = useState<FilterKey>("none");

  const activeFilter = FILTERS.find((f) => f.key === filterKey) ?? FILTERS[0];

  // Mutable playback state, read inside the rAF loop.
  const tRef = useRef(0);
  const playingRef = useRef(false);
  const scenesRef = useRef<LoadedScene[]>([]);
  const dirtyRef = useRef(true);
  const seekingRef = useRef(false);

  useEffect(() => { scenesRef.current = scenes; }, [scenes]);
  useEffect(() => { playingRef.current = playing; }, [playing]);

  // ── Load the default (bundled) tour, then try to upgrade to listing photos ──
  useEffect(() => {
    let cancelled = false;

    preloadScenes(DEFAULT_SCENES).then((loaded) => {
      if (cancelled || loaded.length < 2) return;
      setScenes(loaded);
      setReady(true);
      dirtyRef.current = true;
    });

    // Progressive enhancement: real photos scraped from the listing (or curated
    // photo placeholders) — only swapped in once fully preloaded.
    fetch("/api/walkthrough-images")
      .then((r) => (r.ok ? r.json() : null))
      .then(async (data: { title?: string; scenes?: Scene[] } | null) => {
        if (cancelled || !data?.scenes || data.scenes.length < 4) return;
        const loaded = await preloadScenes(data.scenes);
        if (cancelled || loaded.length < 4) return;
        setScenes(loaded);
        setReady(true);
        if (data.title) setTitle(data.title.slice(0, 60));
        tRef.current = Math.min(tRef.current, totalDuration(loaded.length) - 0.01);
        dirtyRef.current = true;
      })
      .catch(() => { /* offline or blocked — bundled tour keeps working */ });

    return () => { cancelled = true; };
  }, []);

  // ── Canvas sizing (device-pixel-ratio aware) ──────────────────────────────
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ro = new ResizeObserver(() => {
      // Supersample: render at ≥2× CSS size (up to 3×) so the tour stays
      // crisp even on 1× displays; the browser downscales for extra sharpness.
      const scale = Math.min(Math.max(window.devicePixelRatio || 1, 2), 3);
      canvas.width = Math.round(wrap.clientWidth * scale);
      canvas.height = Math.round(wrap.clientHeight * scale);
      dirtyRef.current = true;
    });
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  // ── Autoplay when scrolled into view, pause when scrolled away ────────────
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || !ready) return;
    const io = new IntersectionObserver(
      ([entry]) => setPlaying(entry.isIntersecting),
      { threshold: 0.35 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [ready]);

  // ── Render loop ───────────────────────────────────────────────────────────
  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const drawScene = (
      ctx: CanvasRenderingContext2D,
      scene: LoadedScene,
      idx: number,
      t: number,
      alpha: number,
      cw: number,
      ch: number,
    ) => {
      const { img } = scene;
      const u = easeInOut(clamp((t - sceneStart(idx)) / SCENE_DUR, 0, 1));
      const kb = KB_VARIANTS[idx % KB_VARIANTS.length];
      const zoom = lerp(kb.z0, kb.z1, u);
      const px = lerp(kb.p0[0], kb.p1[0], u);
      const py = lerp(kb.p0[1], kb.p1[1], u);

      const base = Math.max(cw / img.width, ch / img.height);
      const scale = base * zoom;
      const dw = img.width * scale;
      const dh = img.height * scale;
      const x = -(dw - cw) * px;
      const y = -(dh - ch) * py;

      ctx.globalAlpha = alpha;
      ctx.drawImage(img, x, y, dw, dh);
      ctx.globalAlpha = 1;
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = (now - last) / 1000;
      last = now;

      const list = scenesRef.current;
      const canvas = canvasRef.current;
      if (!canvas || list.length === 0) return;

      const total = totalDuration(list.length);
      if (playingRef.current && !seekingRef.current) {
        tRef.current = (tRef.current + dt) % total; // loop the tour
        dirtyRef.current = true;
      }
      if (!dirtyRef.current) return;
      dirtyRef.current = false;

      const t = tRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      const cw = canvas.width;
      const ch = canvas.height;

      // Which scene(s) are on screen — at most two during a crossfade.
      const idx = clamp(Math.floor(t / (SCENE_DUR - FADE)), 0, list.length - 1);
      const nextIdx = idx + 1;
      const nextT = nextIdx < list.length ? t - sceneStart(nextIdx) : -1;

      ctx.clearRect(0, 0, cw, ch);
      drawScene(ctx, list[idx], idx, t, 1, cw, ch);
      if (nextT >= 0) {
        drawScene(ctx, list[nextIdx], nextIdx, t, clamp(nextT / FADE, 0, 1), cw, ch);
      }

      // Soft vignette at the bottom so overlaid controls stay readable.
      const grad = ctx.createLinearGradient(0, ch * 0.72, 0, ch);
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(1, "rgba(0,0,0,0.55)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, ch * 0.72, cw, ch * 0.28);

      // Update lightweight UI directly (no React re-render at 60 fps).
      const visIdx = nextT >= 0 && nextT / FADE > 0.5 ? nextIdx : idx;
      setActiveIdx((prev) => (prev === visIdx ? prev : visIdx));
      if (fillRef.current) fillRef.current.style.width = `${(t / total) * 100}%`;
      if (timeRef.current) timeRef.current.textContent = `${formatTime(t)} / ${formatTime(total)}`;
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ── Seeking ───────────────────────────────────────────────────────────────
  const seekToFraction = useCallback((clientX: number, track: HTMLDivElement) => {
    const rect = track.getBoundingClientRect();
    const frac = clamp((clientX - rect.left) / rect.width, 0, 1);
    const total = totalDuration(scenesRef.current.length);
    tRef.current = clamp(frac * total, 0, total - 0.01);
    dirtyRef.current = true;
  }, []);

  const onTrackPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const track = e.currentTarget;
      track.setPointerCapture(e.pointerId);
      seekingRef.current = true;
      seekToFraction(e.clientX, track);
    },
    [seekToFraction],
  );

  const onTrackPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (seekingRef.current) seekToFraction(e.clientX, e.currentTarget);
    },
    [seekToFraction],
  );

  const onTrackPointerUp = useCallback(() => { seekingRef.current = false; }, []);

  const jumpToScene = useCallback((i: number) => {
    tRef.current = sceneStart(i) + 0.01;
    dirtyRef.current = true;
    setPlaying(true);
  }, []);

  const currentRoom = scenes[activeIdx] ? labels[scenes[activeIdx].roomKey] : "";

  return (
    <div className="flex w-full flex-col items-center gap-4">
      {/* ── Phone frame with 9:16 video canvas ── */}
      <div className="relative w-full overflow-hidden rounded-[2.5rem] border-4 border-white/10 bg-black shadow-2xl">
        <div className="pointer-events-none absolute left-1/2 top-3 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
        <div
          ref={wrapRef}
          className="relative w-full select-none overflow-hidden bg-[#0a1428]"
          style={{ aspectRatio: "9 / 16" }}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full"
            style={activeFilter.css ? { filter: activeFilter.css } : undefined}
          />

        {/* Top overlay: title + current room (below the phone notch) */}
        <div className="pointer-events-none absolute left-0 right-0 top-0 bg-gradient-to-b from-black/60 to-transparent p-3 pt-9">
          <p className="truncate text-[11px] font-semibold text-white">{title}</p>
          <span className="mt-1 inline-block rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            {currentRoom}
          </span>
        </div>

        {/* Loading state */}
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 size={28} className="animate-spin text-orange-300" />
          </div>
        )}

        {/* Center play button when paused */}
        {ready && !playing && (
          <button
            type="button"
            aria-label="Play"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm transition-transform hover:scale-105"
          >
            <Play size={22} className="ml-0.5 text-white" fill="white" />
          </button>
        )}

        {/* Bottom controls: play/pause + scrubber + time */}
        {ready && (
          <div className="absolute bottom-0 left-0 right-0 flex items-center gap-2 p-3">
            <button
              type="button"
              aria-label={playing ? "Pause" : "Play"}
              onClick={() => setPlaying((p) => !p)}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
            >
              {playing ? <Pause size={12} fill="white" /> : <Play size={12} className="ml-0.5" fill="white" />}
            </button>
            <div
              role="slider"
              aria-label="Progress"
              aria-valuemin={0}
              aria-valuemax={scenes.length}
              aria-valuenow={activeIdx}
              onPointerDown={onTrackPointerDown}
              onPointerMove={onTrackPointerMove}
              onPointerUp={onTrackPointerUp}
              className="group flex h-6 flex-1 cursor-pointer touch-none items-center"
            >
              <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/25 transition-all group-hover:h-1.5">
                <div
                  ref={fillRef}
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{ width: "0%", background: "linear-gradient(90deg, #FFB36B, #FF6B4A)" }}
                />
              </div>
            </div>
            <span ref={timeRef} className="shrink-0 text-[9px] font-medium tabular-nums text-white/80">
              0:00 / 0:00
            </span>
          </div>
        )}
        </div>
      </div>

      {/* ── Room chips: click to jump to that part of the tour ── */}
      <div className="flex max-w-[320px] flex-wrap justify-center gap-1.5">
        {scenes.map((s, i) => (
          <button
            key={`${s.roomKey}-${i}`}
            type="button"
            onClick={() => jumpToScene(i)}
            className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-all ${
              i === activeIdx
                ? "text-white shadow-lg"
                : "border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
            }`}
            style={i === activeIdx ? { background: "linear-gradient(135deg, #FFB36B, #FF6B4A)" } : undefined}
          >
            {labels[s.roomKey]}
          </button>
        ))}
      </div>

      {/* ── Filter picker: try different color grades on the tour ── */}
      <div className="flex max-w-[320px] flex-wrap items-center justify-center gap-1.5">
        <SlidersHorizontal size={12} className="shrink-0 text-slate-500" aria-hidden />
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            aria-pressed={f.key === filterKey}
            onClick={() => setFilterKey(f.key)}
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold transition-all ${
              f.key === filterKey
                ? "border border-orange-400/60 bg-orange-500/15 text-orange-300"
                : "border border-white/10 bg-white/5 text-slate-500 hover:bg-white/10 hover:text-white"
            }`}
          >
            {f.label[locale] ?? f.label.da}
          </button>
        ))}
      </div>
    </div>
  );
}
