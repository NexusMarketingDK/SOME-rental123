"use client";

import { useState, useEffect, useCallback } from "react";
import { CheckCircle2, Loader2, XCircle, Download, Share2 } from "lucide-react";
import { pollVideoOrder } from "@/services/video-orders";

type Status = "pending" | "processing" | "ready" | "failed";

type Props = {
  orderId: string;
  initialStatus: Status;
  initialVideoUrl?: string;
  title: string;
  imageUrls: string[];
};

const STEPS = [
  "Analyserer billeder...",
  "Opbygger scenesekvens...",
  "Genererer video med AI...",
  "Tilføjer kamerabevægelser...",
  "Afsluttende touches...",
];

export function VideoStatusClient({ orderId, initialStatus, initialVideoUrl, title, imageUrls }: Props) {
  const [status, setStatus] = useState<Status>(initialStatus);
  const [videoUrl, setVideoUrl] = useState<string | undefined>(initialVideoUrl);
  const [stepIdx, setStepIdx] = useState(0);

  const poll = useCallback(async () => {
    const result = await pollVideoOrder(orderId);
    setStatus(result.status as Status);
    if (result.videoUrl) setVideoUrl(result.videoUrl);
  }, [orderId]);

  useEffect(() => {
    if (status === "ready" || status === "failed") return;

    // Poll every 10 seconds
    const interval = setInterval(poll, 10_000);
    // Also cycle through step labels every 8s for UX
    const stepTimer = setInterval(() => {
      setStepIdx((i) => (i + 1) % STEPS.length);
    }, 8_000);

    return () => {
      clearInterval(interval);
      clearInterval(stepTimer);
    };
  }, [status, poll]);

  if (status === "ready" && videoUrl) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4">
          <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
          <div>
            <p className="font-semibold text-emerald-900">Din video er klar!</p>
            <p className="text-sm text-emerald-700">AI-genereret præsentationsvideo</p>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-black shadow-lg">
          <video
            src={videoUrl}
            controls
            autoPlay
            loop
            className="w-full"
            style={{ maxHeight: "520px" }}
          />
        </div>

        <div className="flex gap-3">
          <a
            href={videoUrl}
            download={`${title}.mp4`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
          >
            <Download size={15} /> Download video
          </a>
          <a
            href={`/posts/new?video_url=${encodeURIComponent(videoUrl)}`}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Share2 size={15} /> Del på sociale medier
          </a>
        </div>
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

  // Processing / pending state
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4">
        <div className="flex items-center gap-3 mb-3">
          <Loader2 size={20} className="text-blue-600 animate-spin shrink-0" />
          <div>
            <p className="font-semibold text-blue-900">AI genererer din video...</p>
            <p className="text-sm text-blue-700">Leveres inden for 5-15 minutter</p>
          </div>
        </div>
        <p className="text-xs text-blue-600 min-h-[1rem]">{STEPS[stepIdx]}</p>
        <div className="mt-3 h-1.5 rounded-full bg-blue-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-blue-500 animate-pulse"
            style={{ width: "60%" }}
          />
        </div>
      </div>

      {imageUrls.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Dine billeder ({imageUrls.length})</p>
          <div className="grid grid-cols-5 gap-2">
            {imageUrls.slice(0, 10).map((url, i) => (
              <div key={i} className="aspect-video rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                {url.startsWith("http") && (
                  <img src={url} alt="" className="h-full w-full object-cover" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-slate-400 text-center">
        Siden opdaterer automatisk hvert 10. sekund
      </p>
    </div>
  );
}
