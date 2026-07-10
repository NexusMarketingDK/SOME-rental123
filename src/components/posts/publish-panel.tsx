"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Send, Check, X, Loader2, Download, Copy, Link2, CircleAlert } from "lucide-react";
import { sharePostToSocial, type SharePostResult } from "@/services/share-post";

export type ConnectedAccount = {
  id: string;
  platform: "facebook" | "instagram";
  name: string;
};

function IconFacebook() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2" aria-hidden>
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E1306C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="#E1306C" stroke="none" />
    </svg>
  );
}

export function PublishPanel({
  postId,
  text,
  imageUrl,
  accounts,
}: {
  postId: string;
  text: string;
  imageUrl?: string;
  accounts: ConnectedAccount[];
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set(accounts.map((a) => a.id)));
  const [result, setResult] = useState<SharePostResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [pending, startTransition] = useTransition();

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handlePublish() {
    setResult(null);
    startTransition(async () => {
      const res = await sharePostToSocial(postId, [...selected]);
      setResult(res);
    });
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => { setOpen((o) => !o); setResult(null); }}
        className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
        style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
      >
        <Send size={15} />
        Del opslag
      </button>

      {open && (
        <div className="absolute right-0 bottom-full mb-2 z-50 w-72 rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <span className="text-sm font-semibold text-slate-800">Publicér til</span>
            <button type="button" onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-600">
              <X size={14} />
            </button>
          </div>

          <div className="max-h-72 overflow-y-auto p-2">
            {accounts.length === 0 ? (
              <div className="rounded-xl bg-slate-50 px-3 py-4 text-center">
                <p className="text-sm font-medium text-slate-700">Ingen konti forbundet</p>
                <p className="mt-1 text-xs text-slate-500">
                  Forbind en Facebook-side eller Instagram-konto under{" "}
                  <Link href="/accounts" className="font-medium text-[#1B3F7A] hover:underline">Kanaler</Link>.
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {accounts.map((acc) => {
                  const isOn = selected.has(acc.id);
                  return (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => toggle(acc.id)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-slate-50"
                    >
                      {acc.platform === "facebook" ? <IconFacebook /> : <IconInstagram />}
                      <span className="flex-1 truncate text-sm font-medium text-slate-700">{acc.name}</span>
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-md border transition ${
                          isOn ? "border-transparent bg-emerald-500 text-white" : "border-slate-300 bg-white"
                        }`}
                      >
                        {isOn && <Check size={13} />}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Result feedback */}
            {result && (
              <div className="mt-2 space-y-1.5 px-1">
                {result.published.length > 0 && (
                  <p className="flex items-start gap-1.5 text-xs font-medium text-emerald-700">
                    <Check size={13} className="mt-0.5 shrink-0" />
                    Publiceret til: {result.published.join(", ")}
                  </p>
                )}
                {result.error && (
                  <p className="flex items-start gap-1.5 text-xs font-medium text-red-600">
                    <CircleAlert size={13} className="mt-0.5 shrink-0" />
                    {result.error}
                  </p>
                )}
                {result.errors.map((e, i) => (
                  <p key={i} className="flex items-start gap-1.5 text-xs text-red-600">
                    <CircleAlert size={13} className="mt-0.5 shrink-0" />
                    {e}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Publish action */}
          {accounts.length > 0 && (
            <div className="border-t border-slate-100 p-2">
              <button
                type="button"
                onClick={handlePublish}
                disabled={pending || selected.size === 0}
                className="flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #1B3F7A, #2a5298)" }}
              >
                {pending ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                {pending ? "Publicerer…" : `Publicér${selected.size ? ` (${selected.size})` : ""}`}
              </button>
            </div>
          )}

          {/* Manual options — groups & other platforms are shared manually */}
          <div className="border-t border-slate-100 p-2">
            <p className="px-2 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Manuel deling (fx grupper)
            </p>
            <button
              type="button"
              onClick={handleCopy}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              {copied ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
              {copied ? "Kopieret!" : "Kopiér tekst"}
            </button>
            {imageUrl && (
              <a
                href={imageUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                <Download size={15} />
                Download billede
              </a>
            )}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl ?? (typeof window !== "undefined" ? window.location.href : ""))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              <Link2 size={15} />
              Åbn Facebook-deling
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
