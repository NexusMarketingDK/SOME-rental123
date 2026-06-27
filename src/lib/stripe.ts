import Stripe from "stripe";

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

export const PLANS = {
  social: {
    name: "Social Medie Plan",
    priceId: process.env.STRIPE_PRICE_SOCIAL_MONTHLY ?? "",
    amount: 29900,
    currency: "dkk",
  },
} as const;

export const PRICES = {
  aiPost: 500,   // 5 DKK in øre
  video: 49900,  // 499 DKK in øre
} as const;
