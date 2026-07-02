"use client";

import { useState, useRef, useEffect } from "react";
import {
  Share2, Download, Link2, Facebook, Twitter, Linkedin,
  Check, X as XIcon,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ShareButtonProps = {
  title: string;
  text?: string;
  imageUrl?: string;
  videoUrl?: string;
  pageUrl?: string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function canUseWebShare(): boolean {
  return typeof navigator !== "undefined" && "share" in navigator;
}

function canShareFiles(): boolean {
  return (
    typeof navigator !== "undefined" &&
    "canShare" in navigator &&
    navigator.canShare({ files: [new File([], "test")] })
  );
}

/** Fetch a remote URL and return it as a File object for Web Share API */
async function urlToFile(url: string, filename: string): Promise<File> {
  const res = await fetch(url);
  const blob = await res.blob();
  return new File([blob], filename, { type: blob.type });
}

/** Trigger a browser download for a given URL */
function triggerDownload(url: string, filename: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ShareButton({
  title,
  text,
  imageUrl,
  videoUrl,
  pageUrl,
}: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const mediaUrl = videoUrl ?? imageUrl;
  const isVideo = !!videoUrl;
  const shareUrl = pageUrl ?? (typeof window !== "undefined" ? window.location.href : "");
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  // ── Main share handler ─────────────────────────────────────────────────────

  async function handleShare() {
    if (!canUseWebShare()) {
      // Fallback: show manual options panel
      setOpen((o) => !o);
      return;
    }

    setSharing(true);
    try {
      if (mediaUrl && canShareFiles()) {
        // Mobile with file-sharing support: share the actual file
        const ext = isVideo ? "mp4" : "jpg";
        const filename = `${title.replace(/\s+/g, "-")}.${ext}`;
        const file = await urlToFile(mediaUrl, filename);

        await navigator.share({
          title,
          text,
          files: [file],
          url: shareUrl,
        });
      } else if (mediaUrl) {
        // Web Share supported but no file sharing — download first, then share URL
        const ext = isVideo ? "mp4" : "jpg";
        triggerDownload(mediaUrl, `${title.replace(/\s+/g, "-")}.${ext}`);
        await navigator.share({ title, text, url: shareUrl });
      } else {
        // No media — share URL only
        await navigator.share({ title, text, url: shareUrl });
      }
    } catch (err) {
      // User cancelled or share failed — fall back to manual panel
      if ((err as DOMException)?.name !== "AbortError") {
        setOpen(true);
      }
    } finally {
      setSharing(false);
    }
  }

  // ── Copy link ──────────────────────────────────────────────────────────────

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available — do nothing
    }
  }

  // ── Download ───────────────────────────────────────────────────────────────

  function handleDownload() {
    if (!mediaUrl) return;
    const ext = isVideo ? "mp4" : "jpg";
    triggerDownload(mediaUrl, `${title.replace(/\s+/g, "-")}.${ext}`);
    setOpen(false);
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="relative inline-block" ref={panelRef}>
      {/* Primary share button */}
      <button
        type="button"
        onClick={handleShare}
        disabled={sharing}
        aria-label="Del"
        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:shadow disabled:opacity-50"
      >
        <Share2 size={16} className={sharing ? "animate-pulse" : ""} />
        Del
      </button>

      {/* Fallback panel — shown when Web Share API is unavailable or fails */}
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-56 rounded-2xl border border-slate-200 bg-white shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <span className="text-sm font-semibold text-slate-800">Del</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
            >
              <XIcon size={14} />
            </button>
          </div>

          <div className="p-2 space-y-1">
            {/* Download — only shown when media is present */}
            {mediaUrl && (
              <FallbackItem
                icon={<Download size={15} />}
                label="Download"
                onClick={handleDownload}
              />
            )}

            {/* Copy link */}
            <FallbackItem
              icon={copied ? <Check size={15} className="text-emerald-600" /> : <Link2 size={15} />}
              label={copied ? "Kopieret!" : "Kopiér link"}
              onClick={handleCopyLink}
              highlight={copied}
            />

            {/* Facebook */}
            <FallbackItem
              icon={<Facebook size={15} className="text-[#1877F2]" />}
              label="Facebook"
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            />

            {/* X / Twitter */}
            <FallbackItem
              icon={<Twitter size={15} />}
              label="X (Twitter)"
              href={`https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
            />

            {/* LinkedIn */}
            <FallbackItem
              icon={<Linkedin size={15} className="text-[#0A66C2]" />}
              label="LinkedIn"
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Internal item component ──────────────────────────────────────────────────

type FallbackItemProps = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
  highlight?: boolean;
};

function FallbackItem({ icon, label, onClick, href, highlight }: FallbackItemProps) {
  const cls = `flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition
    ${highlight ? "text-emerald-700 bg-emerald-50" : "text-slate-700 hover:bg-slate-100"}`;

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {icon}
        {label}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cls}>
      {icon}
      {label}
    </button>
  );
}
