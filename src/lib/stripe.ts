import Stripe from "stripe";
import { PRICES, type Currency } from "./currency";

// Lazy-initialize so missing env vars don't crash the build
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-06-24.dahlia",
    });
  }
  return _stripe;
}

export const SUBSCRIPTION_PRODUCT_NAME = "Social Medie Plan";

/**
 * Build the subscription checkout line item for a given currency.
 *
 * If a currency-specific Stripe Price is configured via env we use it;
 * otherwise we fall back to an inline `price_data` price so a new currency
 * works without pre-creating a Price in the Stripe dashboard.
 */
export function subscriptionLineItem(
  currency: Currency,
): Stripe.Checkout.SessionCreateParams.LineItem {
  const priceId =
    currency === "dkk"
      ? process.env.STRIPE_PRICE_SOCIAL_MONTHLY
      : process.env.STRIPE_PRICE_SOCIAL_MONTHLY_EUR;

  if (priceId) return { price: priceId, quantity: 1 };

  return {
    price_data: {
      currency,
      product_data: { name: SUBSCRIPTION_PRODUCT_NAME },
      unit_amount: PRICES.subscription[currency],
      recurring: { interval: "month" },
    },
    quantity: 1,
  };
}
