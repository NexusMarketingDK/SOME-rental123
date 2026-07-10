"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Globe, Loader2 } from "lucide-react";
import { updatePreferences } from "@/services/preferences";
import { LOCALES, LOCALE_FLAGS, LOCALE_LABELS, type Locale } from "@/lib/i18n";
import { CURRENCIES, CURRENCY_LABELS, currencyForLocale, type Currency } from "@/lib/currency";

type Labels = {
  title: string;
  desc: string;
  nameLabel: string;
  languageLabel: string;
  languageHint: string;
  currencyLabel: string;
  save: string;
  saving: string;
  saved: string;
};

export function SettingsForm({
  initialName,
  initialLocale,
  initialCurrency,
  labels,
}: {
  initialName: string;
  initialLocale: Locale;
  initialCurrency: Currency;
  labels: Labels;
}) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [currency, setCurrency] = useState<Currency>(initialCurrency);
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  function onLocaleChange(next: Locale) {
    setLocale(next);
    setCurrency(currencyForLocale(next));
  }

  function handleSave() {
    setSaved(false);
    const fd = new FormData();
    fd.set("name", name);
    fd.set("locale", locale);
    fd.set("currency", currency);
    startTransition(async () => {
      const res = await updatePreferences(fd);
      if (res.ok) {
        setSaved(true);
        // Refresh so the sidebar / app UI re-renders in the new language.
        router.refresh();
        setTimeout(() => setSaved(false), 2500);
      }
    });
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-900">
        <Globe size={15} className="text-[#1B3F7A]" />
        {labels.title}
      </h2>
      <p className="mb-5 text-sm text-slate-500">{labels.desc}</p>

      <div className="flex flex-col gap-5">
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-slate-800">{labels.nameLabel}</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#FF6B4A] focus:ring-1 focus:ring-[#FF6B4A]"
          />
        </div>

        {/* Language — choose the language the app is shown in */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-800">{labels.languageLabel}</label>
          <p className="-mt-0.5 text-xs text-slate-500">{labels.languageHint}</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {LOCALES.map((loc) => {
              const on = locale === loc;
              return (
                <button
                  key={loc}
                  type="button"
                  onClick={() => onLocaleChange(loc)}
                  className={`flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    on
                      ? "border-[#FF6B4A] bg-[#FFF4F1] text-[#FF6B4A]"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <span>{LOCALE_FLAGS[loc]}</span>
                  <span>{LOCALE_LABELS[loc]}</span>
                  {on && <Check size={13} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Currency */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="currency" className="text-sm font-medium text-slate-800">{labels.currencyLabel}</label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#FF6B4A] focus:ring-1 focus:ring-[#FF6B4A] sm:max-w-xs"
          >
            {CURRENCIES.map((cur) => (
              <option key={cur} value={cur}>{CURRENCY_LABELS[cur]}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={pending}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
          >
            {pending ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
            {pending ? labels.saving : labels.save}
          </button>
          {saved && !pending && (
            <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600">
              <Check size={15} /> {labels.saved}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
