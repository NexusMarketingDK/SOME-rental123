"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { coerceLocale, type Locale } from "@/lib/i18n";
import { coerceCurrency, currencyForLocale, isCurrency, type Currency } from "@/lib/currency";
import type { AuthFormState } from "@/types/auth";

const PREF_COOKIE = { path: "/", maxAge: 31536000, sameSite: "lax" as const };

/** Persist the account's language & currency choice to cookies for this session. */
async function applyPreferenceCookies(locale: Locale, currency: Currency) {
  const store = await cookies();
  store.set("locale", locale, PREF_COOKIE);
  store.set("currency", currency, PREF_COOKIE);
}

export async function signUpAction(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const locale = coerceLocale(formData.get("locale"));
  // Default currency follows the language unless the user picked one explicitly.
  const currency = coerceCurrency(formData.get("currency"), currencyForLocale(locale));

  // Onboarding profile fields (optional — improve personalisation & admin stats).
  const name = String(formData.get("name") ?? "").trim().slice(0, 120);
  const postsPerWeek = String(formData.get("posts_per_week") ?? "").trim().slice(0, 20);
  const videosPerWeek = String(formData.get("videos_per_week") ?? "").trim().slice(0, 20);
  const country = String(formData.get("country") ?? "").trim().slice(0, 60);
  const channels = formData
    .getAll("channels")
    .map(String)
    .filter(Boolean)
    .slice(0, 10);

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        locale,
        currency,
        ...(name ? { name } : {}),
        ...(postsPerWeek ? { posts_per_week: postsPerWeek } : {}),
        ...(videosPerWeek ? { videos_per_week: videosPerWeek } : {}),
        ...(country ? { country } : {}),
        ...(channels.length ? { channels } : {}),
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  await applyPreferenceCookies(locale, currency);
  redirect("/dashboard");
}

export async function signInAction(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "Incorrect email or password." };
  }

  // Re-apply the account's saved language & currency for this session.
  const meta = data.user?.user_metadata ?? {};
  const locale = coerceLocale(meta.locale);
  const currency = isCurrency(meta.currency) ? meta.currency : currencyForLocale(locale);
  await applyPreferenceCookies(locale, currency);

  redirect("/dashboard");
}

export async function signOutAction(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
