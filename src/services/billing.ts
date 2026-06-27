"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getStripe, PLANS, PRICES } from "@/lib/stripe";

export async function getSubscription() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .single();
  return data;
}

export async function getCredits(): Promise<number> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return 0;

  const { data } = await supabase
    .from("ai_credits")
    .select("balance")
    .eq("user_id", user.id)
    .single();
  return data?.balance ?? 0;
}

export async function hasActiveSubscription(): Promise<boolean> {
  const sub = await getSubscription();
  return sub?.status === "active" || sub?.status === "trialing";
}

export async function createSubscriptionCheckout(): Promise<void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://some-rental123.vercel.app";

  // Get or create Stripe customer
  let customerId: string;
  const { data: sub } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .single();

  if (sub?.stripe_customer_id) {
    customerId = sub.stripe_customer_id;
  } else {
    const customer = await getStripe().customers.create({ email: user.email });
    customerId = customer.id;
  }

  const session = await getStripe().checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: PLANS.social.priceId, quantity: 1 }],
    success_url: `${appUrl}/dashboard?payment=success`,
    cancel_url: `${appUrl}/billing`,
    metadata: { user_id: user.id },
    locale: "da",
    currency: "dkk",
  });

  redirect(session.url!);
}

export async function createAiCreditCheckout(formData: FormData): Promise<void> {
  const credits = parseInt(String(formData.get("credits") ?? "10"));
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://some-rental123.vercel.app";

  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    line_items: [{
      price_data: {
        currency: "dkk",
        product_data: { name: `${credits} AI opslag credits` },
        unit_amount: PRICES.aiPost * credits,
      },
      quantity: 1,
    }],
    success_url: `${appUrl}/billing?payment=success`,
    cancel_url: `${appUrl}/billing`,
    metadata: { user_id: user.id, type: "ai_credits", credits: String(credits) },
    locale: "da",
  });

  redirect(session.url!);
}

export async function createVideoOrderCheckout(formData: FormData): Promise<void> {
  const propertyId = String(formData?.get("property_id") ?? "");
  const title = String(formData?.get("title") ?? "Bolig fremvisning");
  const imageUrls = formData?.getAll("image_urls[]").map(String) ?? [];
  const bookingUrl = String(formData?.get("booking_url") ?? "");
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://some-rental123.vercel.app";

  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    line_items: [{
      price_data: {
        currency: "dkk",
        product_data: {
          name: "Bolig-fremvisningsvideo",
          description: "AI-genereret præsentationsvideo fra dine billeder",
        },
        unit_amount: PRICES.video,
      },
      quantity: 1,
    }],
    success_url: `${appUrl}/billing?payment=success`,
    cancel_url: `${appUrl}/billing`,
    metadata: {
      user_id: user.id,
      type: "video",
      property_id: propertyId,
      title,
      image_urls: JSON.stringify(imageUrls),
      booking_url: bookingUrl,
    },
    locale: "da",
  });

  redirect(session.url!);
}

export async function createBillingPortalSession(): Promise<void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://some-rental123.vercel.app";

  const { data: sub } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .single();

  if (!sub?.stripe_customer_id) redirect("/billing");

  const session = await getStripe().billingPortal.sessions.create({
    customer: sub.stripe_customer_id,
    return_url: `${appUrl}/billing`,
  });

  redirect(session.url);
}
