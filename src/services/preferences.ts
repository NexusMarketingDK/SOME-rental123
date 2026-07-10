"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { coerceLocale } from "@/lib/i18n";
import { coerceCurrency, currencyForLocale } from "@/lib/currency";

const PREF_COOKIE = { path: "/", maxAge: 31536000, sameSite: "lax" as const };

/**
 * Update the logged-in user's basic preferences (app language, currency, name).
 * Persists to cookies (drives the UI immediately) and to Supabase user metadata.
 */
export async function updatePreferences(
  formData: FormData
): Promise<{ ok?: boolean; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Ikke logget ind." };

  const locale = coerceLocale(formData.get("locale"));
  const currency = coerceCurrency(formData.get("currency"), currencyForLocale(locale));
  const name = String(formData.get("name") ?? "").trim().slice(0, 120);

  const store = await cookies();
  store.set("locale", locale, PREF_COOKIE);
  store.set("currency", currency, PREF_COOKIE);

  await supabase.auth.updateUser({
    data: { locale, currency, ...(name ? { name } : {}) },
  });

  revalidatePath("/", "layout");
  return { ok: true };
}
