"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function VideoListPoller({ hasProcessing }: { hasProcessing: boolean }) {
  const router = useRouter();
  const active = useRef(hasProcessing);
  active.current = hasProcessing;

  useEffect(() => {
    if (!hasProcessing) return;

    const tick = async () => {
      if (!active.current) return;
      try {
        const res = await fetch("/api/poll-video-status", { method: "POST" });
        const json = await res.json();
        if (json.updated > 0) router.refresh();
        else router.refresh(); // always refresh to show latest state
      } catch {
        // network error — ignore
      }
    };

    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, [hasProcessing, router]);

  return null;
}
