"use client";

import { useEffect, useRef, useState } from "react";
import { Languages } from "lucide-react";

const SITE_LANGUAGE = "da";
const COOKIE_NAME = "googtrans";
const STORAGE_KEY = "vakanza_lang_pref";

const LANGUAGES = [
  { code: "da", label: "Dansk" },
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "sv", label: "Svenska" },
  { code: "no", label: "Norsk" },
  { code: "nl", label: "Nederlands" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
] as const;

declare global {
  interface Window {
    google?: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            autoDisplay: boolean;
          },
          elementId: string
        ) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

function setGoogTransCookie(lang: string) {
  const host = window.location.hostname;
  const value = lang === SITE_LANGUAGE ? "" : `/${SITE_LANGUAGE}/${lang}`;
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`;
  document.cookie = `${COOKIE_NAME}=; path=/; domain=.${host}; max-age=0`;
  if (value) {
    document.cookie = `${COOKIE_NAME}=${value}; path=/;`;
    document.cookie = `${COOKIE_NAME}=${value}; path=/; domain=.${host};`;
  }
}

function detectBrowserLanguage(): string {
  const nav = navigator.language || "";
  const short = nav.slice(0, 2).toLowerCase();
  return LANGUAGES.some((l) => l.code === short) ? short : SITE_LANGUAGE;
}

function triggerGoogleTranslate(lang: string, attemptsLeft = 20) {
  const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (combo) {
    combo.value = lang;
    combo.dispatchEvent(new Event("change"));
  } else if (attemptsLeft > 0) {
    setTimeout(() => triggerGoogleTranslate(lang, attemptsLeft - 1), 200);
  }
}

/**
 * Sitewide automatic page translator. Detects the visitor's browser
 * language (or a previously saved manual choice) and translates the
 * entire rendered page — including content added after this widget
 * ships, so nothing needs a manually maintained dictionary.
 */
export function LanguageTranslator() {
  const [current, setCurrent] = useState(SITE_LANGUAGE);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const target = localStorage.getItem(STORAGE_KEY) ?? detectBrowserLanguage();
    setCurrent(target);
    if (target !== SITE_LANGUAGE) setGoogTransCookie(target);

    window.googleTranslateElementInit = () => {
      if (!window.google) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: SITE_LANGUAGE,
          includedLanguages: LANGUAGES.map((l) => l.code).join(","),
          autoDisplay: false,
        },
        "google_translate_element"
      );
      if (target !== SITE_LANGUAGE) triggerGoogleTranslate(target);
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  function handleChange(lang: string) {
    localStorage.setItem(STORAGE_KEY, lang);
    setCurrent(lang);
    setGoogTransCookie(lang);
    if (document.querySelector(".goog-te-combo")) {
      triggerGoogleTranslate(lang === SITE_LANGUAGE ? SITE_LANGUAGE : lang);
    } else {
      window.location.reload();
    }
  }

  return (
    <div className="notranslate fixed bottom-4 right-4 z-50 flex items-center" translate="no">
      <div id="google_translate_element" style={{ display: "none" }} />
      <label className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/95 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-lg backdrop-blur-sm">
        <Languages size={14} className="shrink-0" />
        <select
          aria-label="Choose language / Vælg sprog"
          value={current}
          onChange={(e) => handleChange(e.target.value)}
          className="notranslate bg-transparent text-xs font-medium text-slate-700 focus:outline-none"
        >
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>
              {l.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
