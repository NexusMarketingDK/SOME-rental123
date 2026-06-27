"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Loader2, Clock, XCircle } from "lucide-react";

export function VideoProgressBadge({ status, createdAt }: { status: string; createdAt: string }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (status !== "processing") return;
    const tick = () => {
      const elapsed = (Date.now() - new Date(createdAt).getTime()) / 1000;
      setPct(Math.min(92, Math.round((elapsed / 900) * 100)));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [status, createdAt]);

  if (status === "ready") return (
    <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
      <CheckCircle2 size={10} /> Klar
    </span>
  );
  if (status === "processing") return (
    <span className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
      <Loader2 size={10} className="animate-spin" /> Genereres {pct}%
    </span>
  );
  if (status === "failed") return (
    <span className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-600">
      <XCircle size={10} /> Fejlede
    </span>
  );
  return (
    <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
      <Clock size={10} /> Afventer
    </span>
  );
}
