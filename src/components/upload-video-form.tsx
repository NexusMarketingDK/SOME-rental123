"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Link as LinkIcon, UploadCloud, Film, Loader2, AlertCircle, CheckCircle2, X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  createVideoFromLink,
  createSignedVideoUpload,
  finalizeUploadedVideo,
} from "@/services/upload-video";

type Mode = "link" | "file";

const MAX_FILE_BYTES = 300 * 1024 * 1024; // 300 MB

export function UploadVideoForm({ propertyId }: { propertyId?: string }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("link");
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function pickFile(f: File | null) {
    setError("");
    if (!f) { setFile(null); return; }
    if (!f.type.startsWith("video/")) { setError("Vælg en videofil (fx .mp4)"); return; }
    if (f.size > MAX_FILE_BYTES) { setError("Filen er for stor (maks. 300 MB)"); return; }
    setFile(f);
  }

  async function submitLink() {
    const fd = new FormData();
    fd.set("title", title);
    fd.set("video_url", videoUrl.trim());
    if (propertyId) fd.set("property_id", propertyId);
    const res = await createVideoFromLink(fd);
    if (res.error || !res.orderId) throw new Error(res.error ?? "Kunne ikke oprette videoen");
    return res.orderId;
  }

  async function submitFile() {
    if (!file) throw new Error("Vælg en videofil");
    // 1. Get a signed upload URL, 2. upload straight to storage, 3. finalize.
    const signed = await createSignedVideoUpload(file.name);
    if (signed.error || !signed.path || !signed.token) {
      throw new Error(signed.error ?? "Kunne ikke klargøre upload");
    }
    const supabase = createClient();
    const { error: upErr } = await supabase.storage
      .from("videos")
      .uploadToSignedUrl(signed.path, signed.token, file);
    if (upErr) throw new Error(`Upload fejlede: ${upErr.message}`);

    const fd = new FormData();
    fd.set("title", title);
    fd.set("path", signed.path);
    if (propertyId) fd.set("property_id", propertyId);
    const res = await finalizeUploadedVideo(fd);
    if (res.error || !res.orderId) throw new Error(res.error ?? "Kunne ikke oprette videoen");
    return res.orderId;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (mode === "link" && !videoUrl.trim()) { setError("Indsæt linket til din video"); return; }
    if (mode === "file" && !file) { setError("Vælg en videofil"); return; }

    setSubmitting(true);
    try {
      const orderId = mode === "link" ? await submitLink() : await submitFile();
      router.push(`/videos/${orderId}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Noget gik galt — prøv igen");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Mode toggle */}
      <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
        {([
          { key: "link" as Mode, label: "Indsæt link", icon: LinkIcon },
          { key: "file" as Mode, label: "Upload fil", icon: UploadCloud },
        ]).map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => { setMode(t.key); setError(""); }}
            className={`flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition-colors ${
              mode === t.key ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <t.icon size={14} /> {t.label}
          </button>
        ))}
      </div>

      {/* Title */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Titel <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="f.eks. Ferielejlighed Valencia — cinematisk tour"
          required
          className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10"
        />
      </div>

      {/* Link mode */}
      {mode === "link" && (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Link til video</label>
          <div className="relative">
            <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => { setVideoUrl(e.target.value); setError(""); }}
              placeholder="https://…/din-video.mp4"
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10"
            />
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Kopiér download- eller delelinket til den færdige video fra dit Veo3-workspace. Vi gemmer en permanent kopi i appen.
          </p>
        </div>
      )}

      {/* File mode */}
      {mode === "file" && (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Videofil</label>
          {file ? (
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <Film size={20} className="shrink-0 text-[#FF6B4A]" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-800">{file.name}</p>
                <p className="text-xs text-slate-400">{(file.size / (1024 * 1024)).toFixed(1)} MB</p>
              </div>
              <button
                type="button"
                onClick={() => { setFile(null); if (fileRef.current) fileRef.current.value = ""; }}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 py-10 text-sm text-slate-500 hover:border-[#FF6B4A]/40 hover:bg-orange-50/30 transition-colors"
            >
              <UploadCloud size={28} className="text-[#FF6B4A]" />
              <span>Klik for at vælge en videofil (maks. 300 MB)</span>
            </button>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
          />
        </div>
      )}

      {error && (
        <p className="flex items-start gap-2 text-sm text-red-600">
          <AlertCircle size={14} className="mt-0.5 shrink-0" /> {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting || !title.trim() || (mode === "link" ? !videoUrl.trim() : !file)}
        className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
      >
        {submitting ? (
          <><Loader2 size={16} className="animate-spin" /> {mode === "file" ? "Uploader…" : "Gemmer…"}</>
        ) : (
          <><CheckCircle2 size={16} /> Tilføj video til appen</>
        )}
      </button>
    </form>
  );
}
