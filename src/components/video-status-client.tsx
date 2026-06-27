"use client";

import { useState, useEffect, useCallback, useTransition, useRef } from "react";
import { CheckCircle2, Loader2, XCircle, Download, Share2, Send } from "lucide-react";
import { pollVideoOrder } from "@/services/video-orders";
import { shareVideoToSocial } from "@/services/share-video";
import type { SocialAccount } from "@/types/database";

const PLATFORM_COLORS: Record<string, string> = {
  facebook: "#1877F2", instagram: "#E1306C", tiktok: "#000000",
  snapchat: "#F7C600", youtube: "#FF0000", linkedin: "#0A66C2",
};

type Status = "pending" | "processing" | "ready" | "failed";

type Props = {
  orderId: string;
  initialStatus: Status;
  initialVideoUrl?: string;
  initialVideoUrls?: string[];
  title: string;
  imageUrls: string[];
  accounts: SocialAccount[];
};

const STEPS = [
  "Analyserer billeder...",
  "Opbygger scenesekvens...",
  "Genererer video med AI...",
  "Tilføjer kamerabevægelser...",
  "Afsluttende touches...",
];

function SharePanel({ videoUrl, accounts }: { videoUrl: string; accounts: SocialAccount[] }) {
  const [open, setOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [scheduledAt, setScheduledAt] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function toggleAccount(id: string) {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }

  function handleShare() {
    const fd = new FormData();
    fd.append("content", caption);
    fd.append("video_url", videoUrl);
    fd.append("scheduled_at", scheduledAt);
    selected.forEach((id) => fd.append("account_ids[]", id));
    startTransition(async () => {
      const res = await shareVideoToSocial(fd);
      if (res.error) { setError(res.error); return; }
      setDone(true);
    });
  }

  if (done) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
        <CheckCircle2 size={15} /> Opslag oprettet og planlagt!
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Share2 size={16} className="text-slate-500" />
          <span className="font-semibold text-slate-900">Del på sociale medier</span>
        </div>
        <span className="text-xs text-slate-400">{open ? "Luk" : "Åbn"}</span>
      </button>

      {open && (
        <div className="border-t border-slate-100 px-5 pb-5 pt-4 space-y-4">
          {accounts.length === 0 ? (
            <p className="text-sm text-slate-500">
              Ingen kanaler tilkoblet.{" "}
              <a href="/accounts/connect" className="text-[#FF6B4A] underline">Tilslut en kanal</a>
            </p>
          ) : (
            <>
              {/* Channel picker */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Vælg kanaler</p>
                <div className="flex flex-wrap gap-2">
                  {accounts.map((a) => {
                    const active = selected.includes(a.id);
                    return (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => toggleAccount(a.id)}
                        className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                          active
                            ? "border-[#FF6B4A] bg-orange-50 text-[#FF6B4A]"
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        <span
                          className="inline-block h-3 w-3 rounded-full shrink-0"
                          style={{ backgroundColor: PLATFORM_COLORS[a.platform] ?? "#64748b" }}
                        />
                        {a.account_name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Caption */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Billedtekst
                </label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  rows={3}
                  placeholder="Skriv din besked til opslaget..."
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#FF6B4A] focus:outline-none focus:ring-2 focus:ring-[#FF6B4A]/10 resize-none"
                />
              </div>

              {/* Optional schedule */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Planlæg til (valgfrit)
                </label>
                <input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-[#FF6B4A] focus:outline-none"
                />
              </div>

              {error && <p className="text-xs text-red-500">{error}</p>}

              <button
                onClick={handleShare}
                disabled={isPending || !caption.trim() || selected.length === 0}
                className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
              >
                {isPending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                {scheduledAt ? "Planlæg opslag" : "Del nu"}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export function VideoStatusClient({ orderId, initialStatus, initialVideoUrl, initialVideoUrls, title, imageUrls, accounts }: Props) {
  const [status, setStatus] = useState<Status>(initialStatus);
  const [videoUrl, setVideoUrl] = useState<string | undefined>(initialVideoUrl);
  const [videoUrls, setVideoUrls] = useState<string[]>(initialVideoUrls ?? (initialVideoUrl ? [initialVideoUrl] : []));
  const [stepIdx, setStepIdx] = useState(0);
  const [elapsedSec, setElapsedSec] = useState(0);
  const startRef = useRef<number>(Date.now());

  const poll = useCallback(async () => {
    const result = await pollVideoOrder(orderId);
    setStatus(result.status as Status);
    if (result.videoUrl) setVideoUrl(result.videoUrl);
    if (result.videoUrls?.length) setVideoUrls(result.videoUrls);
  }, [orderId]);

  useEffect(() => {
    if (status === "ready" || status === "failed") return;
    startRef.current = Date.now();
    const interval = setInterval(poll, 10_000);
    const stepTimer = setInterval(() => setStepIdx((i) => (i + 1) % STEPS.length), 8_000);
    const ticker = setInterval(() => setElapsedSec(Math.floor((Date.now() - startRef.current) / 1000)), 1_000);
    return () => { clearInterval(interval); clearInterval(stepTimer); clearInterval(ticker); };
  }, [status, poll]);

  if (status === "ready" && videoUrl) {
    const clips = videoUrls.length > 0 ? videoUrls : [videoUrl];
    return (
      <div className="space-y-5">
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4">
          <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
          <div>
            <p className="font-semibold text-emerald-900">
              {clips.length > 1 ? `${clips.length} videoklip er klar!` : "Din video er klar!"}
            </p>
            <p className="text-sm text-emerald-700">AI-genereret cinematisk præsentationsvideo</p>
          </div>
        </div>

        {clips.map((url, i) => (
          <div key={i} className="space-y-2">
            {clips.length > 1 && (
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Klip {i + 1} / {clips.length}
              </p>
            )}
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-black shadow-lg">
              <video src={url} controls autoPlay={i === 0} loop className="w-full" style={{ maxHeight: "480px" }} />
            </div>
            <a
              href={url}
              download={`${title}-klip-${i + 1}.mp4`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Download size={13} /> Download klip {i + 1}
            </a>
          </div>
        ))}

        <SharePanel videoUrl={videoUrl} accounts={accounts} />
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
        <XCircle size={20} className="text-red-500 shrink-0" />
        <div>
          <p className="font-semibold text-red-900">Video generering fejlede</p>
          <p className="text-sm text-red-700">Prøv igen eller kontakt support.</p>
        </div>
      </div>
    );
  }

  // Max expected duration: 15 min = 900s. Cap visible progress at 92% until done.
  const progressPct = Math.min(92, Math.round((elapsedSec / 900) * 100));
  const isDelayed = elapsedSec > 600; // >10 min → show extra message

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-blue-100 bg-blue-50 px-5 py-5">
        <div className="flex items-center gap-3 mb-4">
          <Loader2 size={20} className="text-blue-600 animate-spin shrink-0" />
          <div>
            <p className="font-semibold text-blue-900">AI genererer din video...</p>
            <p className="text-sm text-blue-700">Leveres inden for 5-15 minutter</p>
          </div>
        </div>

        {/* Step label */}
        <p className="text-xs text-blue-600 min-h-[1rem] mb-2">{STEPS[stepIdx]}</p>

        {/* Real progress bar */}
        <div className="h-2 rounded-full bg-blue-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-blue-500 transition-all duration-[3000ms] ease-linear"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="mt-2 flex justify-between items-center">
          <span className="text-xs text-blue-400">
            {Math.floor(elapsedSec / 60)}:{String(elapsedSec % 60).padStart(2, "0")} forløbet
          </span>
          <span className="text-xs text-blue-400">{progressPct}%</span>
        </div>

        {isDelayed && (
          <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
            Dette tager lidt længere end normalt — AI'en arbejder stadig. Du behøver ikke vente her; siden tjekker automatisk og vi sender dig besked, når videoen er klar.
          </div>
        )}
      </div>

      {imageUrls.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Dine billeder ({imageUrls.length})</p>
          <div className="grid grid-cols-5 gap-2">
            {imageUrls.slice(0, 10).map((url, i) => (
              <div key={i} className="aspect-video rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                {url.startsWith("http") && <img src={url} alt="" className="h-full w-full object-cover" />}
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-slate-400 text-center">Siden tjekker for opdateringer hvert 10. sekund</p>
    </div>
  );
}
