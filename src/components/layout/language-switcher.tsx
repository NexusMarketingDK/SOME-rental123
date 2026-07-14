import { Globe } from "lucide-react";
import { LOCALE_FLAGS, LOCALE_LABELS, LOCALE_PATHS, LOCALES, type Locale } from "@/lib/i18n";

/** Dark-themed language switcher used across the marketing header. */
export function LanguageSwitcher({ current }: { current: Locale }) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-blue-400/40 hover:text-white transition-colors">
        <Globe size={12} />
        <span>{LOCALE_FLAGS[current]} {LOCALE_LABELS[current]}</span>
        <span className="text-slate-500">▾</span>
      </button>
      <div className="absolute right-0 top-full mt-1 hidden group-hover:block z-50 min-w-[140px] rounded-xl border border-white/10 bg-[#0a1430] shadow-xl shadow-black/40 py-1">
        {LOCALES.map((loc) => (
          <a
            key={loc}
            href={LOCALE_PATHS[loc]}
            className={`flex items-center gap-2 px-3 py-2 text-xs hover:bg-white/5 transition-colors ${loc === current ? "font-semibold text-blue-300" : "text-slate-300"}`}
          >
            <span>{LOCALE_FLAGS[loc]}</span>
            <span>{LOCALE_LABELS[loc]}</span>
            {loc === current && <span className="ml-auto text-blue-300">✓</span>}
          </a>
        ))}
      </div>
    </div>
  );
}
