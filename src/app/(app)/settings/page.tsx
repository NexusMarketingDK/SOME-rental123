import { Topbar } from "@/components/layout/topbar";
import { createClient } from "@/lib/supabase/server";
import { getLocale, getCurrency } from "@/lib/locale-server";
import { SettingsForm } from "@/components/settings/settings-form";
import type { Locale } from "@/lib/i18n";
import { Mail, User } from "lucide-react";

const T: Record<Locale, {
  pageTitle: string; pageDesc: string;
  account: string; loggedIn: string;
  prefsTitle: string; prefsDesc: string;
  name: string; language: string; languageHint: string; currency: string;
  save: string; saving: string; saved: string;
  support: string; supportDesc: string;
}> = {
  da: {
    pageTitle: "Indstillinger", pageDesc: "Administrer din konto og indstillinger",
    account: "Konto", loggedIn: "Logget ind",
    prefsTitle: "Sprog & indstillinger", prefsDesc: "Vælg sproget som brugersiden vises på, og dine basale indstillinger.",
    name: "Navn", language: "Sprog på brugersiden", languageHint: "Hele appen vises på det valgte sprog, når du er logget ind.", currency: "Valuta",
    save: "Gem", saving: "Gemmer…", saved: "Gemt",
    support: "Support", supportDesc: "Har du spørgsmål? Skriv til os.",
  },
  en: {
    pageTitle: "Settings", pageDesc: "Manage your account and preferences",
    account: "Account", loggedIn: "Logged in",
    prefsTitle: "Language & preferences", prefsDesc: "Choose the language the app is shown in and your basic preferences.",
    name: "Name", language: "App language", languageHint: "The whole app is shown in the selected language when you're logged in.", currency: "Currency",
    save: "Save", saving: "Saving…", saved: "Saved",
    support: "Support", supportDesc: "Got questions? Write to us.",
  },
  es: {
    pageTitle: "Ajustes", pageDesc: "Administra tu cuenta y preferencias",
    account: "Cuenta", loggedIn: "Sesión iniciada",
    prefsTitle: "Idioma y preferencias", prefsDesc: "Elige el idioma en que se muestra la app y tus preferencias básicas.",
    name: "Nombre", language: "Idioma de la app", languageHint: "Toda la app se muestra en el idioma seleccionado cuando inicias sesión.", currency: "Moneda",
    save: "Guardar", saving: "Guardando…", saved: "Guardado",
    support: "Soporte", supportDesc: "¿Tienes preguntas? Escríbenos.",
  },
  de: {
    pageTitle: "Einstellungen", pageDesc: "Verwalte dein Konto und deine Einstellungen",
    account: "Konto", loggedIn: "Angemeldet",
    prefsTitle: "Sprache & Einstellungen", prefsDesc: "Wähle die Sprache, in der die App angezeigt wird, und deine Grundeinstellungen.",
    name: "Name", language: "App-Sprache", languageHint: "Die gesamte App wird in der gewählten Sprache angezeigt, wenn du angemeldet bist.", currency: "Währung",
    save: "Speichern", saving: "Speichern…", saved: "Gespeichert",
    support: "Support", supportDesc: "Fragen? Schreib uns.",
  },
};

export default async function SettingsPage() {
  const supabase = await createClient();
  const [{ data }, locale, currency] = await Promise.all([
    supabase.auth.getUser(),
    getLocale(),
    getCurrency(),
  ]);
  const t = T[locale];
  const name = (data.user?.user_metadata?.name as string | undefined) ?? "";

  return (
    <div className="flex flex-col">
      <Topbar title={t.pageTitle} description={t.pageDesc} />
      <div className="mx-auto w-full max-w-2xl px-6 py-8 space-y-6">
        {/* Account */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-sm font-semibold text-slate-900">{t.account}</h2>
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1B3F7A]/10">
              <User size={16} className="text-[#1B3F7A]" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">{name || data.user?.email}</p>
              <p className="text-xs text-slate-500">{data.user?.email} · {t.loggedIn}</p>
            </div>
          </div>
        </div>

        {/* Language & preferences */}
        <SettingsForm
          initialName={name}
          initialLocale={locale}
          initialCurrency={currency}
          labels={{
            title: t.prefsTitle,
            desc: t.prefsDesc,
            nameLabel: t.name,
            languageLabel: t.language,
            languageHint: t.languageHint,
            currencyLabel: t.currency,
            save: t.save,
            saving: t.saving,
            saved: t.saved,
          }}
        />

        {/* Support */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-1 text-sm font-semibold text-slate-900">{t.support}</h2>
          <p className="mb-3 text-sm text-slate-500">{t.supportDesc}</p>
          <a
            href="mailto:mail@somevideopost.com"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1B3F7A] hover:underline"
          >
            <Mail size={14} />
            mail@somevideopost.com
          </a>
        </div>
      </div>
    </div>
  );
}
