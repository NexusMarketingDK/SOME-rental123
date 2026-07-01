"use client";

import { useState } from "react";
import { Play } from "lucide-react";

export function VideoPlayer({ url, poster, className }: { url: string; poster?: string; className?: string }) {
  const [playing, setPlaying] = useState(false);

  if (!playing) {
    return (
      <button
        type="button"
        onClick={() => setPlaying(true)}
        aria-label="Afspil video"
        className={`group relative block w-full aspect-video overflow-hidden bg-black cursor-pointer ${className ?? ""}`}
      >
        {poster ? (
          <img src={poster} alt="" className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100" />
        ) : (
          <div className="h-full w-full bg-slate-800" />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110">
            <Play size={28} className="ml-1 text-slate-900" fill="currentColor" />
          </div>
        </div>
      </button>
    );
  }

  return <video src={url} controls autoPlay loop className={`w-full ${className ?? ""}`} style={{ maxHeight: "480px" }} />;
}
