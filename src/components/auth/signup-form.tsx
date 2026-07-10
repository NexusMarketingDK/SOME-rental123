"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Check, Sparkles, Gift } from "lucide-react";
import type { AuthFormState } from "@/types/auth";
import { signUpAction } from "@/services/auth";
import { LOCALES, LOCALE_FLAGS, LOCALE_LABELS, type Locale } from "@/lib/i18n";
import { CURRENCIES, CURRENCY_LABELS, currencyForLocale, type Currency } from "@/lib/currency";

const initialState: AuthFormState = {};

const fieldClass =
  "rounded-lg border border-[#E7E2D9] bg-white px-3 py-2 text-sm text-[#1B1B1F] outline-none focus:border-[#FF6B4A] focus:ring-1 focus:ring-[#FF6B4A]";

const POSTS_PER_WEEK = [
  { value: "1-2", label: "1–2 opslag" },
  { value: "3-5", label: "3–5 opslag" },
  { value: "6-10", label: "6–10 opslag" },
  { value: "10+", label: "10+ opslag" },
];

const CHANNELS = [
  { value: "facebook", label: "Facebook", color: "#1877F2" },
  { value: "instagram", label: "Instagram", color: "#E1306C" },
  { value: "tiktok", label: "TikTok", color: "#010101" },
  { value: "linkedin", label: "LinkedIn", color: "#0A66C2" },
  { value: "youtube", label: "YouTube", color: "#FF0000" },
];

export function SignupForm() {
  const [state, formAction, isPending] = useActionState(signUpAction, initialState);

  const [locale, setLocale] = useState<Locale>("da");
  const [currency, setCurrency] = useState<Currency>("dkk");
  const [postsPerWeek, setPostsPerWeek] = useState("3-5");
  const [channels, setChannels] = useState<Set<string>>(new Set(["facebook", "instagram"]));

  function onLocaleChange(next: Locale) {
    setLocale(next);
    setCurrency(currencyForLocale(next));
  }

  function toggleChannel(value: string) {
    setChannels((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }

  return (
    <div>
      {/* Free-to-start banner */}
      <div className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-white">
          <Gift size={15} />
        </div>
        <div>
          <p className="text-sm font-bold text-emerald-800">Gratis at komme i gang</p>
          <p className="text-xs leading-relaxed text-emerald-700">
            Opret din konto uden kreditkort og test alle funktioner gratis — generér opslag og videoer med det samme.
          </p>
        </div>
      </div>

      <h1 className="text-2xl text-[#1B1B1F]" style={{ fontFamily: "var(--font-fraunces)" }}>
        Opret din gratis konto
      </h1>
      <p className="mt-1 text-sm text-[#6B6B76]">
        Fortæl os lidt om dig, så tilpasser vi din oplevelse.
      </p>

      <form action={formAction} className="mt-6 flex flex-col gap-4">
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-[#1B1B1F]">Navn</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Dit navn"
            className={fieldClass}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-[#1B1B1F]">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium text-[#1B1B1F]">Adgangskode</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="Mindst 8 tegn"
            className={fieldClass}
          />
        </div>

        {/* Posts per week */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="posts_per_week" className="text-sm font-medium text-[#1B1B1F]">
            Hvor mange opslag forventer du at lave om ugen?
          </label>
          <div className="grid grid-cols-2 gap-2">
            {POSTS_PER_WEEK.map((opt) => {
              const on = postsPerWeek === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setPostsPerWeek(opt.value)}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    on
                      ? "border-[#FF6B4A] bg-[#FFF4F1] text-[#FF6B4A]"
                      : "border-[#E7E2D9] bg-white text-[#6B6B76] hover:border-[#d9d2c6]"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
          <input type="hidden" name="posts_per_week" value={postsPerWeek} />
        </div>

        {/* Channels */}
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-[#1B1B1F]">
            Hvilke kanaler vil du dele på?
          </span>
          <div className="flex flex-wrap gap-2">
            {CHANNELS.map((ch) => {
              const on = channels.has(ch.value);
              return (
                <button
                  key={ch.value}
                  type="button"
                  onClick={() => toggleChannel(ch.value)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                    on
                      ? "border-transparent text-white"
                      : "border-[#E7E2D9] bg-white text-[#6B6B76] hover:border-[#d9d2c6]"
                  }`}
                  style={on ? { background: ch.color } : undefined}
                >
                  {on && <Check size={13} />}
                  {ch.label}
                </button>
              );
            })}
          </div>
          {[...channels].map((c) => (
            <input key={c} type="hidden" name="channels" value={c} />
          ))}
        </div>

        {/* Language + currency */}
        <div className="flex gap-3">
          <div className="flex flex-1 flex-col gap-1.5">
            <label htmlFor="locale" className="text-sm font-medium text-[#1B1B1F]">Sprog</label>
            <select
              id="locale"
              name="locale"
              value={locale}
              onChange={(e) => onLocaleChange(e.target.value as Locale)}
              className={fieldClass}
            >
              {LOCALES.map((loc) => (
                <option key={loc} value={loc}>
                  {LOCALE_FLAGS[loc]} {LOCALE_LABELS[loc]}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            <label htmlFor="currency" className="text-sm font-medium text-[#1B1B1F]">Valuta</label>
            <select
              id="currency"
              name="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className={fieldClass}
            >
              {CURRENCIES.map((cur) => (
                <option key={cur} value={cur}>{CURRENCY_LABELS[cur]}</option>
              ))}
            </select>
          </div>
        </div>

        {state?.error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="mt-1 flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
        >
          <Sparkles size={15} />
          {isPending ? "Opretter konto…" : "Opret gratis konto"}
        </button>

        {/* Reassurance row */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-[#6B6B76]">
          <span className="inline-flex items-center gap-1"><Check size={12} className="text-emerald-500" /> Intet kreditkort</span>
          <span className="inline-flex items-center gap-1"><Check size={12} className="text-emerald-500" /> Test gratis</span>
          <span className="inline-flex items-center gap-1"><Check size={12} className="text-emerald-500" /> Ingen binding</span>
        </div>
      </form>

      <p className="mt-6 text-sm text-[#6B6B76]">
        Har du allerede en konto?{" "}
        <Link href="/login" className="font-medium text-[#FF6B4A]">Log ind</Link>
      </p>
    </div>
  );
}
