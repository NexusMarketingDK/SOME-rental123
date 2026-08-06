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

// ── Localized copy (follows the language selector / browser language) ────────
type T = {
  bannerTitle: string; bannerBody: string;
  heading: string; subheading: string;
  langSettings: string; siteLang: string; siteLangHint: string; currencyAria: string;
  postLang: string; postLangHint: string;
  name: string; namePlaceholder: string; email: string; password: string; passwordPlaceholder: string;
  postsQ: string; videosQ: string; postsWord: string; videosWord: string; noneYet: string;
  country: string; channelsQ: string;
  submitIdle: string; submitPending: string;
  reassure1: string; reassure2: string; reassure3: string;
  haveAccount: string; login: string;
};

const STRINGS: Record<Locale, T> = {
  da: {
    bannerTitle: "Kom i gang på få minutter",
    bannerBody: "Opret din konto og få adgang til studiet — generér opslag og lav præsentationsvideoer af din bolig.",
    heading: "Opret din konto", subheading: "Fortæl os lidt om dig, så tilpasser vi din oplevelse.",
    langSettings: "Sprogindstillinger", siteLang: "Sprog til siden", siteLangHint: "Hele appen vises på det valgte sprog, når du er logget ind.", currencyAria: "Valuta",
    postLang: "Sprog til opslag", postLangHint: "Sproget dine AI-genererede opslag skrives på — kan afvige fra sidens sprog.",
    name: "Navn", namePlaceholder: "Dit navn", email: "Email", password: "Adgangskode", passwordPlaceholder: "Mindst 8 tegn",
    postsQ: "Hvor mange opslag forventer du at lave om ugen?", videosQ: "Hvor mange nye videoer forventer du om ugen?", postsWord: "opslag", videosWord: "videoer", noneYet: "Ingen endnu",
    country: "Land", channelsQ: "Hvilke kanaler vil du dele på?",
    submitIdle: "Opret konto", submitPending: "Opretter konto…",
    reassure1: "Klar på få minutter", reassure2: "Opsig når som helst", reassure3: "Ingen binding",
    haveAccount: "Har du allerede en konto?", login: "Log ind",
  },
  en: {
    bannerTitle: "Get started in minutes",
    bannerBody: "Create your account and access the studio — generate posts and make presentation videos of your property.",
    heading: "Create your account", subheading: "Tell us a bit about you and we'll tailor your experience.",
    langSettings: "Language settings", siteLang: "Site language", siteLangHint: "The whole app is shown in the selected language once you're logged in.", currencyAria: "Currency",
    postLang: "Post language", postLangHint: "The language your AI-generated posts are written in — can differ from the site language.",
    name: "Name", namePlaceholder: "Your name", email: "Email", password: "Password", passwordPlaceholder: "At least 8 characters",
    postsQ: "How many posts do you expect to make per week?", videosQ: "How many new videos do you expect per week?", postsWord: "posts", videosWord: "videos", noneYet: "None yet",
    country: "Country", channelsQ: "Which channels do you want to share on?",
    submitIdle: "Create account", submitPending: "Creating account…",
    reassure1: "Ready in minutes", reassure2: "Cancel anytime", reassure3: "No commitment",
    haveAccount: "Already have an account?", login: "Log in",
  },
  es: {
    bannerTitle: "Empieza en minutos",
    bannerBody: "Crea tu cuenta y accede al estudio — genera publicaciones y crea vídeos de presentación de tu propiedad.",
    heading: "Crea tu cuenta", subheading: "Cuéntanos un poco sobre ti y personalizaremos tu experiencia.",
    langSettings: "Configuración de idioma", siteLang: "Idioma del sitio", siteLangHint: "Toda la app se muestra en el idioma seleccionado una vez que inicias sesión.", currencyAria: "Moneda",
    postLang: "Idioma de las publicaciones", postLangHint: "El idioma en el que se escriben tus publicaciones generadas por IA — puede diferir del idioma del sitio.",
    name: "Nombre", namePlaceholder: "Tu nombre", email: "Email", password: "Contraseña", passwordPlaceholder: "Al menos 8 caracteres",
    postsQ: "¿Cuántas publicaciones esperas hacer por semana?", videosQ: "¿Cuántos vídeos nuevos esperas por semana?", postsWord: "publicaciones", videosWord: "vídeos", noneYet: "Ninguno aún",
    country: "País", channelsQ: "¿En qué canales quieres compartir?",
    submitIdle: "Crear cuenta", submitPending: "Creando cuenta…",
    reassure1: "Listo en minutos", reassure2: "Cancela cuando quieras", reassure3: "Sin compromiso",
    haveAccount: "¿Ya tienes una cuenta?", login: "Iniciar sesión",
  },
  de: {
    bannerTitle: "In wenigen Minuten loslegen",
    bannerBody: "Erstelle dein Konto und erhalte Zugang zum Studio — generiere Beiträge und erstelle Präsentationsvideos deiner Immobilie.",
    heading: "Konto erstellen", subheading: "Erzähl uns kurz von dir, dann passen wir dein Erlebnis an.",
    langSettings: "Spracheinstellungen", siteLang: "Sprache der Seite", siteLangHint: "Die gesamte App wird nach dem Login in der gewählten Sprache angezeigt.", currencyAria: "Währung",
    postLang: "Sprache der Beiträge", postLangHint: "Die Sprache, in der deine KI-generierten Beiträge geschrieben werden — kann von der Seitensprache abweichen.",
    name: "Name", namePlaceholder: "Dein Name", email: "E-Mail", password: "Passwort", passwordPlaceholder: "Mindestens 8 Zeichen",
    postsQ: "Wie viele Beiträge willst du pro Woche erstellen?", videosQ: "Wie viele neue Videos erwartest du pro Woche?", postsWord: "Beiträge", videosWord: "Videos", noneYet: "Noch keine",
    country: "Land", channelsQ: "Auf welchen Kanälen möchtest du teilen?",
    submitIdle: "Konto erstellen", submitPending: "Konto wird erstellt…",
    reassure1: "In Minuten bereit", reassure2: "Jederzeit kündbar", reassure3: "Keine Bindung",
    haveAccount: "Hast du schon ein Konto?", login: "Anmelden",
  },
};

// Country options — stable canonical value (Danish) with a localized label.
const COUNTRIES: { value: string; labels: Record<Locale, string> }[] = [
  { value: "Danmark", labels: { da: "Danmark", en: "Denmark", es: "Dinamarca", de: "Dänemark" } },
  { value: "Spanien", labels: { da: "Spanien", en: "Spain", es: "España", de: "Spanien" } },
  { value: "Tyskland", labels: { da: "Tyskland", en: "Germany", es: "Alemania", de: "Deutschland" } },
  { value: "Sverige", labels: { da: "Sverige", en: "Sweden", es: "Suecia", de: "Schweden" } },
  { value: "Norge", labels: { da: "Norge", en: "Norway", es: "Noruega", de: "Norwegen" } },
  { value: "Storbritannien", labels: { da: "Storbritannien", en: "United Kingdom", es: "Reino Unido", de: "Vereinigtes Königreich" } },
  { value: "Frankrig", labels: { da: "Frankrig", en: "France", es: "Francia", de: "Frankreich" } },
  { value: "Italien", labels: { da: "Italien", en: "Italy", es: "Italia", de: "Italien" } },
  { value: "Holland", labels: { da: "Holland", en: "Netherlands", es: "Países Bajos", de: "Niederlande" } },
  { value: "Portugal", labels: { da: "Portugal", en: "Portugal", es: "Portugal", de: "Portugal" } },
  { value: "USA", labels: { da: "USA", en: "USA", es: "EE. UU.", de: "USA" } },
  { value: "Andet", labels: { da: "Andet", en: "Other", es: "Otro", de: "Andere" } },
];

const CHANNELS = [
  { value: "facebook", label: "Facebook", color: "#1877F2" },
  { value: "instagram", label: "Instagram", color: "#E1306C" },
  { value: "tiktok", label: "TikTok", color: "#010101" },
  { value: "linkedin", label: "LinkedIn", color: "#0A66C2" },
  { value: "youtube", label: "YouTube", color: "#FF0000" },
];

// Language used for the AI-generated posts (can differ from the app language,
// e.g. a Danish host writing English posts for international guests).
const POST_LANGUAGES: { value: string; label: string }[] = [
  { value: "da", label: "🇩🇰 Dansk" },
  { value: "en", label: "🇬🇧 English" },
  { value: "de", label: "🇩🇪 Deutsch" },
  { value: "es", label: "🇪🇸 Español" },
  { value: "fr", label: "🇫🇷 Français" },
  { value: "it", label: "🇮🇹 Italiano" },
  { value: "nl", label: "🇳🇱 Nederlands" },
  { value: "sv", label: "🇸🇪 Svenska" },
  { value: "no", label: "🇳🇴 Norsk" },
  { value: "pt", label: "🇵🇹 Português" },
];

export function SignupForm({ initialLocale = "da" }: { initialLocale?: Locale }) {
  const [state, formAction, isPending] = useActionState(signUpAction, initialState);

  // Start from the language the visitor already chose on the site (passed in
  // from the server via the `locale` cookie). This cookie is set by the
  // language switcher and the middleware — which already falls back to the
  // browser's Accept-Language — so it's the authoritative site-language choice.
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [currency, setCurrency] = useState<Currency>(currencyForLocale(initialLocale));
  const [postLanguage, setPostLanguage] = useState<string>(initialLocale);
  const [postLanguageTouched, setPostLanguageTouched] = useState(false);
  const [postsPerWeek, setPostsPerWeek] = useState("3-5");
  const [videosPerWeek, setVideosPerWeek] = useState("1-2");
  const [channels, setChannels] = useState<Set<string>>(new Set(["facebook", "instagram"]));

  const t = STRINGS[locale] ?? STRINGS.da;

  function onLocaleChange(next: Locale) {
    setLocale(next);
    setCurrency(currencyForLocale(next));
    // Keep the post language in sync with the site language until the user
    // explicitly picks a different one.
    if (!postLanguageTouched) setPostLanguage(next);
  }

  function toggleChannel(value: string) {
    setChannels((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }

  const postsOptions = [
    { value: "1-2", label: `1–2 ${t.postsWord}` },
    { value: "3-5", label: `3–5 ${t.postsWord}` },
    { value: "6-10", label: `6–10 ${t.postsWord}` },
    { value: "10+", label: `10+ ${t.postsWord}` },
  ];
  const videosOptions = [
    { value: "0", label: t.noneYet },
    { value: "1-2", label: `1–2 ${t.videosWord}` },
    { value: "3-5", label: `3–5 ${t.videosWord}` },
    { value: "6+", label: `6+ ${t.videosWord}` },
  ];

  return (
    <div>
      {/* Get-started banner */}
      <div className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-white">
          <Gift size={15} />
        </div>
        <div>
          <p className="text-sm font-bold text-emerald-800">{t.bannerTitle}</p>
          <p className="text-xs leading-relaxed text-emerald-700">{t.bannerBody}</p>
        </div>
      </div>

      <h1 className="text-2xl text-[#1B1B1F]" style={{ fontFamily: "var(--font-fraunces)" }}>
        {t.heading}
      </h1>
      <p className="mt-1 text-sm text-[#6B6B76]">{t.subheading}</p>

      <form action={formAction} className="mt-6 flex flex-col gap-4">
        {/* Language settings — first choice on the page */}
        <div className="flex flex-col gap-3 rounded-xl border border-[#E7E2D9] bg-[#FBF9F5] p-4">
          <p className="text-sm font-semibold text-[#1B1B1F]">{t.langSettings}</p>

          {/* Site language + currency */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="locale" className="text-sm font-medium text-[#1B1B1F]">{t.siteLang}</label>
            <div className="flex gap-3">
              <select
                id="locale"
                name="locale"
                value={locale}
                onChange={(e) => onLocaleChange(e.target.value as Locale)}
                className={`${fieldClass} flex-1`}
              >
                {LOCALES.map((loc) => (
                  <option key={loc} value={loc}>
                    {LOCALE_FLAGS[loc]} {LOCALE_LABELS[loc]}
                  </option>
                ))}
              </select>
              <select
                id="currency"
                name="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                aria-label={t.currencyAria}
                className={`${fieldClass} w-32`}
              >
                {CURRENCIES.map((cur) => (
                  <option key={cur} value={cur}>{CURRENCY_LABELS[cur]}</option>
                ))}
              </select>
            </div>
            <p className="text-xs text-[#6B6B76]">{t.siteLangHint}</p>
          </div>

          {/* Post language */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="post_language" className="text-sm font-medium text-[#1B1B1F]">{t.postLang}</label>
            <select
              id="post_language"
              name="post_language"
              value={postLanguage}
              onChange={(e) => { setPostLanguage(e.target.value); setPostLanguageTouched(true); }}
              className={fieldClass}
            >
              {POST_LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value}>{lang.label}</option>
              ))}
            </select>
            <p className="text-xs text-[#6B6B76]">{t.postLangHint}</p>
          </div>
        </div>

        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-[#1B1B1F]">{t.name}</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={t.namePlaceholder}
            className={fieldClass}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-[#1B1B1F]">{t.email}</label>
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
          <label htmlFor="password" className="text-sm font-medium text-[#1B1B1F]">{t.password}</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            placeholder={t.passwordPlaceholder}
            className={fieldClass}
          />
        </div>

        {/* Posts per week */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="posts_per_week" className="text-sm font-medium text-[#1B1B1F]">{t.postsQ}</label>
          <div className="grid grid-cols-2 gap-2">
            {postsOptions.map((opt) => {
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

        {/* Videos per week */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#1B1B1F]">{t.videosQ}</label>
          <div className="grid grid-cols-2 gap-2">
            {videosOptions.map((opt) => {
              const on = videosPerWeek === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setVideosPerWeek(opt.value)}
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
          <input type="hidden" name="videos_per_week" value={videosPerWeek} />
        </div>

        {/* Country */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="country" className="text-sm font-medium text-[#1B1B1F]">{t.country}</label>
          <select id="country" name="country" defaultValue="Danmark" className={fieldClass}>
            {COUNTRIES.map((c) => (
              <option key={c.value} value={c.value}>{c.labels[locale] ?? c.value}</option>
            ))}
          </select>
        </div>

        {/* Channels */}
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-[#1B1B1F]">{t.channelsQ}</span>
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
          {isPending ? t.submitPending : t.submitIdle}
        </button>

        {/* Reassurance row */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-[#6B6B76]">
          <span className="inline-flex items-center gap-1"><Check size={12} className="text-emerald-500" /> {t.reassure1}</span>
          <span className="inline-flex items-center gap-1"><Check size={12} className="text-emerald-500" /> {t.reassure2}</span>
          <span className="inline-flex items-center gap-1"><Check size={12} className="text-emerald-500" /> {t.reassure3}</span>
        </div>
      </form>

      <p className="mt-6 text-sm text-[#6B6B76]">
        {t.haveAccount}{" "}
        <Link href="/login" className="font-medium text-[#FF6B4A]">{t.login}</Link>
      </p>
    </div>
  );
}
