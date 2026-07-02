"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Link2, Loader2, Sparkles, RefreshCw,
  CheckCircle2, AlertCircle, ShoppingCart,
} from "lucide-react";
import { getSocialAccounts } from "@/services/social-accounts";
import { createPostAction } from "@/services/posts";
import { scrapePropertyUrl } from "@/services/scrape-property";

// ── Types ─────────────────────────────────────────────────────────────────────

type ScrapedData = {
  title?: string;
  description?: string;
  location?: string;
  price?: string;
  size?: string;
};

type Account = Awaited<ReturnType<typeof getSocialAccounts>>[number];

const PLATFORMS = [
  { id: "facebook", label: "Facebook", color: "#1877F2", icon: "f" },
  { id: "instagram", label: "Instagram", color: "#E1306C", icon: "ig" },
  { id: "linkedin", label: "LinkedIn", color: "#0A66C2", icon: "in" },
] as const;

// ── Step indicator ─────────────────────────────────────────────────────────────

function Steps({ current }: { current: 1 | 2 | 3 }) {
  const steps = ["Hent annonce", "Generer tekst", "Udgiv"];
  return (
    <div className="mb-8 flex items-center gap-0">
      {steps.map((label, i) => {
        const n = i + 1;
        const done = current > n;
        const active = current === n;
        return (
          <div key={n} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold
                ${done ? "bg-emerald-500 text-white" : active ? "text-white" : "bg-slate-100 text-slate-400"}
              `} style={active ? { background: "linear-gradient(135deg,#FFB36B,#FF6B4A)" } : {}}>
                {done ? <CheckCircle2 size={14} /> : n}
              </div>
              <span className={`text-[10px] font-medium ${active ? "text-[#FF6B4A]" : done ? "text-emerald-600" : "text-slate-400"}`}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`mb-4 h-px w-12 mx-1 ${done ? "bg-emerald-300" : "bg-slate-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function GeneratePostPage() {

  // Step 1
  const [url, setUrl] = useState("");
  const [scraping, setScraping] = useState(false);
  const [scrapeError, setScrapeError] = useState("");
  const [scraped, setScraped] = useState<ScrapedData | null>(null);
  const [listingUrl, setListingUrl] = useState("");

  // Step 2
  const [platform, setPlatform] = useState<"facebook" | "instagram" | "linkedin">("facebook");
  const [generating, setGenerating] = useState(false);
  const [generateError, setGenerateError] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [noCredits, setNoCredits] = useState(false);

  // Step 3
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [scheduledAt, setScheduledAt] = useState("");
  const [saving, setSaving] = useState(false);

  const step: 1 | 2 | 3 = generatedText ? 3 : scraped ? 2 : 1;

  // ── Step 1: scrape ──────────────────────────────────────────────────────────

  async function handleScrape() {
    if (!url.trim()) return;
    setScraping(true);
    setScrapeError("");
    setScraped(null);

    const res = await fetch("/api/scrape-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url.trim() }),
    });
    const json = await res.json() as { data?: ScrapedData; error?: string };

    setScraping(false);
    if (json.error || !json.data) {
      setScrapeError(json.error ?? "Kunne ikke hente annoncen.");
      return;
    }
    setScraped(json.data);
    setListingUrl(url.trim());

    // Pre-load accounts for step 3
    const accs = await getSocialAccounts();
    setAccounts(accs);
  }

  // ── Step 2: generate ────────────────────────────────────────────────────────

  async function handleGenerate() {
    setGenerating(true);
    setGenerateError("");
    setNoCredits(false);

    const res = await fetch("/api/generate-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        platform,
        title: scraped?.title,
        description: scraped?.description,
        location: scraped?.location,
        price: scraped?.price,
        size: scraped?.size,
        listingUrl,
      }),
    });
    const json = await res.json() as { text?: string; error?: string };

    setGenerating(false);
    if (json.error === "no_credits") {
      setNoCredits(true);
      return;
    }
    if (json.error || !json.text) {
      setGenerateError(json.error ?? "Generering fejlede.");
      return;
    }
    setGeneratedText(json.text);
  }

  // ── Step 3: save post ───────────────────────────────────────────────────────

  async function handleSave() {
    setSaving(true);
    const formData = new FormData();
    formData.append("content", generatedText);
    for (const id of selectedAccounts) formData.append("account_ids[]", id);
    if (scheduledAt) formData.append("scheduled_at", scheduledAt);
    // createPostAction calls redirect("/posts") internally
    await createPostAction(formData);
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <>
      <div className="border-b border-slate-200 bg-white px-8 py-4">
        <p className="text-lg font-semibold text-slate-900">Generer SOME opslag</p>
        <p className="text-sm text-slate-500">AI genererer et sælgende opslag til dine sociale medier — 5 kr. pr. opslag.</p>
      </div>

      <div className="flex-1 px-8 py-6">
        <div className="mx-auto max-w-2xl">
          <Link href="/posts" className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900">
            <ArrowLeft size={14} /> Tilbage til opslag
          </Link>

          <Steps current={step} />

          {/* ── Step 1: URL input ── */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-base font-semibold text-slate-900">Indsæt link til annonce</h2>
            <p className="mb-4 text-sm text-slate-500">
              Indsæt et link til f.eks. Airbnb, Booking.com, Novasol, eller din egen hjemmeside. AI henter automatisk titel, pris, størrelse og beliggenhed.
            </p>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <Link2 size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleScrape()}
                  placeholder="https://www.airbnb.dk/rooms/…"
                  className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder-slate-400 focus:border-[#FF6B4A] focus:outline-none focus:ring-2 focus:ring-[#FF6B4A]/20"
                />
              </div>
              <button
                onClick={handleScrape}
                disabled={scraping || !url.trim()}
                className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition disabled:opacity-50"
                style={{ background: "linear-gradient(135deg,#FFB36B,#FF6B4A)" }}
              >
                {scraping ? <Loader2 size={14} className="animate-spin" /> : null}
                {scraping ? "Henter…" : "Hent"}
              </button>
            </div>

            {scrapeError && (
              <p className="mt-3 flex items-start gap-2 text-sm text-red-600">
                <AlertCircle size={14} className="mt-0.5 shrink-0" /> {scrapeError}
              </p>
            )}

            {scraped && (
              <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                <p className="flex items-center gap-1.5 text-sm font-semibold text-emerald-800">
                  <CheckCircle2 size={14} /> Annonce hentet
                </p>
                <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-emerald-700">
                  {scraped.title && <><dt className="font-medium">Titel</dt><dd className="truncate">{scraped.title}</dd></>}
                  {scraped.location && <><dt className="font-medium">Beliggenhed</dt><dd>{scraped.location}</dd></>}
                  {scraped.price && <><dt className="font-medium">Pris</dt><dd>{scraped.price}</dd></>}
                  {scraped.size && <><dt className="font-medium">Størrelse</dt><dd>{scraped.size}</dd></>}
                </dl>
                <div className="mt-3">
                  <label className="mb-1 block text-xs font-medium text-emerald-800">Link til annoncen (vises i opslaget)</label>
                  <input
                    type="url"
                    value={listingUrl}
                    onChange={(e) => setListingUrl(e.target.value)}
                    className="w-full rounded-md border border-emerald-300 bg-white px-2.5 py-1.5 text-xs text-slate-800 focus:border-[#FF6B4A] focus:outline-none"
                  />
                </div>
              </div>
            )}
          </section>

          {/* ── Step 2: Platform + generate ── */}
          {scraped && (
            <section className="mt-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-1 text-base font-semibold text-slate-900">Vælg platform og generer tekst</h2>
              <p className="mb-4 text-sm text-slate-500">
                AI tilpasser tekst, længde, emojis og hashtags til den valgte platform. Koster 1 credit (5 kr.).
              </p>

              {/* Platform picker */}
              <div className="mb-5 flex gap-3">
                {PLATFORMS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPlatform(p.id)}
                    className={`flex flex-1 flex-col items-center gap-1.5 rounded-xl border-2 py-3 text-xs font-semibold transition
                      ${platform === p.id ? "border-current shadow-sm" : "border-slate-200 text-slate-500 hover:border-slate-300"}`}
                    style={platform === p.id ? { color: p.color, borderColor: p.color, background: `${p.color}10` } : {}}
                  >
                    <span className="text-base font-black">{p.icon.toUpperCase()}</span>
                    {p.label}
                  </button>
                ))}
              </div>

              {noCredits && (
                <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <p className="text-sm font-semibold text-amber-800">Du har ingen credits tilbage</p>
                  <p className="mt-0.5 text-xs text-amber-700">Køb credits for at generere opslag. 10 opslag koster 50 kr.</p>
                  <Link
                    href="/billing"
                    className="mt-3 inline-flex items-center gap-2 rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold text-amber-800 hover:bg-amber-50"
                  >
                    <ShoppingCart size={12} /> Køb credits
                  </Link>
                </div>
              )}

              {generateError && (
                <p className="mb-3 flex items-start gap-2 text-sm text-red-600">
                  <AlertCircle size={14} className="mt-0.5 shrink-0" /> {generateError}
                </p>
              )}

              <button
                onClick={handleGenerate}
                disabled={generating}
                className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition disabled:opacity-50"
                style={{ background: "linear-gradient(135deg,#FFB36B,#FF6B4A)" }}
              >
                {generating ? <Loader2 size={15} className="animate-spin" /> : <Sparkles size={15} />}
                {generating ? "Genererer opslag…" : "Generer opslag — 5 kr."}
              </button>
            </section>
          )}

          {/* ── Step 3: Edit + publish ── */}
          {generatedText && (
            <section className="mt-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-slate-900">Rediger og udgiv</h2>
                <button
                  onClick={handleGenerate}
                  disabled={generating}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                >
                  {generating ? <Loader2 size={11} className="animate-spin" /> : <RefreshCw size={11} />}
                  Regenerer
                </button>
              </div>

              <div className="mb-4">
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Opslag tekst</label>
                <textarea
                  value={generatedText}
                  onChange={(e) => setGeneratedText(e.target.value)}
                  rows={10}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 focus:border-[#FF6B4A] focus:outline-none focus:ring-2 focus:ring-[#FF6B4A]/20"
                />
                <p className="mt-1 text-right text-xs text-slate-400">{generatedText.length} tegn</p>
              </div>

              {/* Accounts */}
              <div className="mb-4">
                <p className="mb-2 text-sm font-medium text-slate-700">Udgiv til</p>
                {accounts.length === 0 ? (
                  <p className="text-sm text-slate-400">
                    Ingen konti tilsluttet. <Link href="/accounts/connect" className="underline text-[#FF6B4A]">Tilslut en konto.</Link>
                  </p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {accounts.map((a) => (
                      <label key={a.id} className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition hover:bg-slate-50
                        ${selectedAccounts.includes(a.id) ? "border-[#FF6B4A] bg-orange-50" : "border-slate-200"}`}>
                        <input
                          type="checkbox"
                          checked={selectedAccounts.includes(a.id)}
                          onChange={(e) => setSelectedAccounts((prev) =>
                            e.target.checked ? [...prev, a.id] : prev.filter((id) => id !== a.id)
                          )}
                          className="accent-[#FF6B4A]"
                        />
                        <span className="text-sm text-slate-800">{a.account_name}</span>
                        <span className="ml-auto text-xs capitalize text-slate-400">{a.platform}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Schedule */}
              <div className="mb-6">
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Planlæg (valgfrit)</label>
                <input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 focus:border-[#FF6B4A] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
                <Link href="/posts" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Annuller
                </Link>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
                  style={{ background: "linear-gradient(135deg,#FFB36B,#FF6B4A)" }}
                >
                  {saving ? <Loader2 size={13} className="animate-spin" /> : null}
                  {saving ? "Gemmer…" : "Gem opslag"}
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
