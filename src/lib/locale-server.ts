import { cookies } from "next/headers";
import { LOCALES, type Locale } from "./i18n";
import { currencyForLocale, type Currency } from "./currency";

/**
 * Read the visitor's chosen language from the `locale` cookie
 * (set by the middleware in proxy.ts). Falls back to Danish.
 */
export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const raw = store.get("locale")?.value;
  return (LOCALES.includes(raw as Locale) ? (raw as Locale) : "da");
}

/** The currency the visitor should be billed & shown prices in. */
export async function getCurrency(): Promise<Currency> {
  return currencyForLocale(await getLocale());
}
