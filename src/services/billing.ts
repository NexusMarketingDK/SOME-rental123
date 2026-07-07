"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getStripe, subscriptionLineItem } from "@/lib/stripe";
import { getLocale } from "@/lib/locale-server";
import { currencyForLocale, priceAmount } from "@/lib/currency";

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
  const locale = await getLocale();
  const currency = currencyForLocale(locale);

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
    line_items: [subscriptionLineItem(currency)],
    success_url: `${appUrl}/dashboard?payment=success`,
    cancel_url: `${appUrl}/billing`,
    metadata: { user_id: user.id },
    locale,
  });

  redirect(session.url!);
}

export async function createAiCreditCheckout(formData: FormData): Promise<void> {
  const credits = parseInt(String(formData.get("credits") ?? "10"));
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://some-rental123.vercel.app";
  const locale = await getLocale();
  const currency = currencyForLocale(locale);

  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    line_items: [{
      price_data: {
        currency,
        product_data: { name: `${credits} AI opslag credits` },
        unit_amount: priceAmount("aiPost", currency) * credits,
      },
      quantity: 1,
    }],
    success_url: `${appUrl}/billing?payment=success`,
    cancel_url: `${appUrl}/billing`,
    metadata: { user_id: user.id, type: "ai_credits", credits: String(credits) },
    locale,
  });

  redirect(session.url!);
}

export async function createVideoOrderCheckout(formData: FormData): Promise<void> {
  const propertyId = String(formData?.get("property_id") ?? "") || null;
  const title = String(formData?.get("title") ?? "Bolig fremvisning");
  const imageUrls = formData?.getAll("image_urls[]").map(String).filter((u) => u.startsWith("http") || u.startsWith("data:")) ?? [];
  const roomLabels = formData?.getAll("room_labels[]").map(String) ?? [];
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Insert order as pending first
  const { data: order } = await supabase.from("video_orders").insert({
    user_id: user.id,
    property_id: propertyId,
    title,
    image_urls: imageUrls,
    status: "processing",
  }).select("id").single();

  // Start one Google Veo 2 job per image with cinematic per-room prompt
  if (imageUrls.length >= 1 && order?.id) {
    try {
      const { startVideoGeneration } = await import("@/lib/google-video");
      const jobIds = await startVideoGeneration(imageUrls, title, roomLabels.length ? roomLabels : undefined);
      await supabase.from("video_orders").update({
        higgsfield_job_id: jobIds[0] ?? null,
        higgsfield_job_ids: jobIds,
      }).eq("id", order.id);
    } catch (_e) {
      // Generation start failed — order remains in processing state for retry
    }
  }

  redirect(`/videos/${order?.id ?? ""}?started=1`);
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
