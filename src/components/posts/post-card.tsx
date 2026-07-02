"use client";

import { useState } from "react";
import { Calendar, Pencil, X, Share2, Download, Link2, Check, ExternalLink } from "lucide-react";
import { DeletePostButton } from "@/components/posts/delete-button";
import type { PostWithProperty } from "@/services/posts";
import type { PostStatus } from "@/types/database";

const statusStyles: Record<PostStatus, string> = {
  draft: "bg-slate-100 text-slate-600",
  scheduled: "bg-blue-50 text-blue-700",
  published: "bg-emerald-50 text-emerald-700",
  failed: "bg-red-50 text-red-600",
};

const statusLabels: Record<PostStatus, string> = {
  draft: "Kladde",
  scheduled: "Planlagt",
  published: "Publiceret",
  failed: "Fejlet",
};

function SharePanel({ text, imageUrl }: { text: string; imageUrl?: string }) {
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const encodedText = encodeURIComponent(text.slice(0, 500));

  async function handleNativeShare() {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ text, url: imageUrl });
        return;
      } catch {}
    }
    setShareOpen((o) => !o);
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleNativeShare}
        className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
      >
        <Share2 size={15} />
        Del opslag
      </button>

      {shareOpen && (
        <div className="absolute right-0 bottom-full mb-2 z-50 w-52 rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <span className="text-sm font-semibold text-slate-800">Del på</span>
            <button type="button" onClick={() => setShareOpen(false)} className="text-slate-400 hover:text-slate-600">
              <X size={14} />
            </button>
          </div>
          <div className="p-2 space-y-1">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl ?? window.location.href)}&quote=${encodedText}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
              Facebook
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(imageUrl ?? window.location.href)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
            >
              {copied ? <Check size={16} className="text-emerald-600" /> : <Link2 size={16} />}
              {copied ? "Kopieret!" : "Kopiér tekst"}
            </button>
            {imageUrl && (
              <a
                href={imageUrl}
                download
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
              >
                <Download size={16} />
                Download billede
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function PostCard({ post }: { post: PostWithProperty }) {
  const [expanded, setExpanded] = useState(false);
  const thumbnail = post.image_urls?.[0] ?? null;

  return (
    <>
      <div
        className="flex items-stretch gap-0 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden transition hover:shadow-md cursor-pointer"
        onClick={() => setExpanded(true)}
      >
        {/* Thumbnail */}
        {thumbnail ? (
          <div className="w-20 shrink-0 bg-slate-100">
            <img src={thumbnail} alt="" className="h-full w-full object-cover" />
          </div>
        ) : (
          <div className="w-20 shrink-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
            <span className="text-2xl opacity-30">🖼</span>
          </div>
        )}

        {/* Content */}
        <div className="flex flex-1 min-w-0 items-center gap-4 px-5 py-4">
          <div className="flex-1 min-w-0">
            <p className="line-clamp-2 text-sm text-slate-800">{post.content}</p>
            {post.properties && (
              <p className="mt-1 text-xs text-slate-400">{post.properties.title}</p>
            )}
            {post.scheduled_at && (
              <p className="mt-1.5 flex items-center gap-1 text-xs text-slate-400">
                <Calendar size={11} />
                {new Date(post.scheduled_at).toLocaleDateString("da-DK", {
                  day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
                })}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3 shrink-0" onClick={(e) => e.stopPropagation()}>
            <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[post.status]}`}>
              {statusLabels[post.status]}
            </span>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setExpanded(true); }}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              title="Åbn"
            >
              <Pencil size={14} />
            </button>
            <DeletePostButton id={post.id} />
          </div>
        </div>
      </div>

      {/* Modal */}
      {expanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={() => setExpanded(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[post.status]}`}>
                  {statusLabels[post.status]}
                </span>
                {post.properties && (
                  <span className="text-sm text-slate-500">{post.properties.title}</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
              >
                <X size={16} />
              </button>
            </div>

            {/* Image */}
            {thumbnail && (
              <div className="w-full aspect-video bg-slate-100">
                <img src={thumbnail} alt="" className="h-full w-full object-cover" />
              </div>
            )}

            {/* Content */}
            <div className="px-6 py-5 max-h-64 overflow-y-auto">
              <p className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">{post.content}</p>
              {post.scheduled_at && (
                <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
                  <Calendar size={12} />
                  Planlagt: {new Date(post.scheduled_at).toLocaleDateString("da-DK", {
                    day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
                  })}
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50">
              <div onClick={() => setExpanded(false)}>
                <DeletePostButton id={post.id} />
              </div>
              <div className="flex items-center gap-2">
                <SharePanel text={post.content} imageUrl={thumbnail ?? undefined} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
