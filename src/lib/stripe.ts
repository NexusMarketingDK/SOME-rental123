import Stripe from "stripe";
import { priceAmount, PLAN_PRICE_KEY, type Currency, type PlanId } from "./currency";

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

export const PLAN_PRODUCT_NAME: Record<PlanId, string> = {
  basic: "Basic — Social Medie Plan",
  pro: "Pro — Video & Social Medie Plan",
};

/**
 * Build the subscription checkout line item for a plan + currency.
 *
 * If a plan/currency-specific Stripe Price is configured via env we use it;
 * otherwise we fall back to an inline `price_data` price so the plan works
 * without pre-creating a Price in the Stripe dashboard.
 */
export function planLineItem(
  plan: PlanId,
  currency: Currency,
): Stripe.Checkout.SessionCreateParams.LineItem {
  const envKey = `STRIPE_PRICE_${plan.toUpperCase()}_${currency.toUpperCase()}`;
  const priceId = process.env[envKey];

  if (priceId) return { price: priceId, quantity: 1 };

  return {
    price_data: {
      currency,
      product_data: { name: PLAN_PRODUCT_NAME[plan] },
      unit_amount: priceAmount(PLAN_PRICE_KEY[plan], currency),
      recurring: { interval: "month" },
    },
    quantity: 1,
  };
}
