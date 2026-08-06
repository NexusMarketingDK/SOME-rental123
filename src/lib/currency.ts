import type { Locale } from "./i18n";

// ── Currency ────────────────────────────────────────────────────────────────
export type Currency = "dkk" | "eur";

export const CURRENCIES: Currency[] = ["dkk", "eur"];

export const CURRENCY_LABELS: Record<Currency, string> = {
  dkk: "DKK (kr.)",
  eur: "EUR (€)",
};

export function isCurrency(value: unknown): value is Currency {
  return value === "dkk" || value === "eur";
}

/** Validate a raw value to a Currency, falling back when it's not one. */
export function coerceCurrency(value: unknown, fallback: Currency = "eur"): Currency {
  return isCurrency(value) ? value : fallback;
}

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
  // Subscription plans (shown on /priser, the landing page and /billing)
  basic: { dkk: 14900, eur: 2000 },   // 149 kr. / €20 per month — 10 SoMe posts/mo
  pro:   { dkk: 73900, eur: 9900 },   // 739 kr. / €99 per month — 2 videos + 20 posts/mo
  // Pay-per-use presentation video (charged when generation reaches 80%)
  video: { dkk: 14900, eur: 2000 },   // 149 kr. / €20 per video
  aiPost: { dkk: 500,  eur: 67 },     // 5 kr. / €0.67 — 1 credit = 1 post
  // Meta advertising connection — included in Pro, else a monthly add-on.
  metaAds: { dkk: 7500, eur: 1000 },  // 75 kr. / €10 per month
} as const;

export type PriceKey = keyof typeof PRICES;

// ── Subscription plans ────────────────────────────────────────────────────
export type PlanId = "basic" | "pro";

export const PLAN_IDS: PlanId[] = ["basic", "pro"];

export function isPlanId(value: unknown): value is PlanId {
  return value === "basic" || value === "pro";
}

/** Post-credits granted each month the plan is paid (1 credit = 1 post). */
export const PLAN_POST_CREDITS: Record<PlanId, number> = {
  basic: 10,
  pro: 20,
};

/**
 * Free posts every new (free "test") account starts with — 1 credit = 1 post.
 * Granted on signup by the `grant_free_credits` trigger; keep this in sync with
 * that migration and with the pricing copy that advertises the free posts.
 */
export const FREE_POST_CREDITS = 2;

/** Presentation videos included per month (display only for now). */
export const PLAN_INCLUDED_VIDEOS: Record<PlanId, number> = {
  basic: 0,
  pro: 2,
};

/** Whether the Meta advertising connection is included in the plan. */
export const PLAN_INCLUDES_META_ADS: Record<PlanId, boolean> = {
  basic: false,
  pro: true,
};

/** Which price key each plan is billed at. */
export const PLAN_PRICE_KEY: Record<PlanId, PriceKey> = {
  basic: "basic",
  pro: "pro",
};

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
