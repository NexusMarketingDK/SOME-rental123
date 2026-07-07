import { cookies } from "next/headers";
import { coerceLocale, type Locale } from "./i18n";
import { coerceCurrency, currencyForLocale, isCurrency, type Currency } from "./currency";

/**
 * Read the visitor's chosen language from the `locale` cookie
 * (set at signup/login or by the middleware in proxy.ts). Falls back to Danish.
 */
export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  return coerceLocale(store.get("locale")?.value);
}

/**
 * The currency the visitor is billed & shown prices in.
 *
 * An explicit account choice (the `currency` cookie) wins; otherwise we derive
 * it from the chosen language (Danish → DKK, everyone else → EUR).
 */
export async function getCurrency(): Promise<Currency> {
  const store = await cookies();
  const explicit = store.get("currency")?.value;
  if (isCurrency(explicit)) return explicit;
  return coerceCurrency(
    currencyForLocale(coerceLocale(store.get("locale")?.value)),
  );
}
