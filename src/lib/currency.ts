import type { Locale } from "./i18n";

// ── Currency ────────────────────────────────────────────────────────────────
export type Currency = "dkk" | "eur";

/**
 * Which currency a visitor is billed & shown prices in, based on their language.
 * Danish users use DKK; everyone else uses EUR.
 */
export const LOCALE_CURRENCY: Record<Locale, Currency> = {
  da: "dkk",
  en: "eur",
  es: "eur",
  de: "eur",
};

export function currencyForLocale(locale: Locale): Currency {
  return LOCALE_CURRENCY[locale] ?? "eur";
}

// ── Prices ──────────────────────────────────────────────────────────────────
/**
 * Single source of truth for every amount we charge or display.
 * Amounts are in the currency's minor unit (øre for DKK, cents for EUR).
 */
export const PRICES = {
  subscription: { dkk: 29900, eur: 4000 },  // 299 kr. / €40 per month
  aiPost:       { dkk: 500,   eur: 67 },     // 5 kr. / €0.67 per AI post/image
  video:        { dkk: 49900, eur: 6700 },   // 499 kr. / €67 per video
  // Marketing tiers shown on /priser
  starter:      { dkk: 19900, eur: 2700 },   // 199 kr. / €27
  pro:          { dkk: 79900, eur: 10700 },  // 799 kr. / €107
  businessMin:  { dkk: 99900, eur: 13400 },  // 999 kr. / €134
  businessMax:  { dkk: 299900, eur: 40200 }, // 2.999 kr. / €402
} as const;

export type PriceKey = keyof typeof PRICES;

export function priceAmount(key: PriceKey, currency: Currency): number {
  return PRICES[key][currency];
}

// ── Formatting ──────────────────────────────────────────────────────────────
const INTL_LOCALE: Record<Currency, string> = {
  dkk: "da-DK", // → "299 kr."
  eur: "en-IE", // → "€40"
};

/**
 * Format a minor-unit amount as a localized currency string.
 * Decimals are hidden for whole amounts unless `decimals` is forced.
 */
export function formatPrice(
  minor: number,
  currency: Currency,
  opts: { decimals?: boolean } = {},
): string {
  const showDecimals = opts.decimals ?? minor % 100 !== 0;
  const digits = showDecimals ? 2 : 0;
  return new Intl.NumberFormat(INTL_LOCALE[currency], {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(minor / 100);
}

/** Convenience: format a known price key for a currency. */
export function formatPriceKey(
  key: PriceKey,
  currency: Currency,
  opts?: { decimals?: boolean },
): string {
  return formatPrice(priceAmount(key, currency), currency, opts);
}
