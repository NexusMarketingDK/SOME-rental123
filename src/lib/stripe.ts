import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-06-24.dahlia",
});

export const PLANS = {
  social: {
    name: "Social Medie Plan",
    priceId: process.env.STRIPE_PRICE_SOCIAL_MONTHLY!,
    amount: 29900, // 299 DKK in øre
    currency: "dkk",
  },
} as const;

export const PRICES = {
  aiPost: 500,    // 5 DKK per AI post (in øre)
  video: 49900,   // 499 DKK per video (in øre)
} as const;
