"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getStripe, planLineItem } from "@/lib/stripe";
import { getLocale, getCurrency } from "@/lib/locale-server";
import { priceAmount, isPlanId, type PlanId } from "@/lib/currency";

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

export async function createSubscriptionCheckout(formData?: FormData): Promise<void> {
  const plan: PlanId = isPlanId(formData?.get("plan")) ? (formData!.get("plan") as PlanId) : "basic";
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.somevideopost.com";
  const [locale, currency] = await Promise.all([getLocale(), getCurrency()]);

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
    line_items: [planLineItem(plan, currency)],
    // Carry the plan on the subscription so webhook renewals grant the right
    // number of monthly post credits (Basic = 10, Pro = 20).
    subscription_data: { metadata: { plan, user_id: user.id } },
    success_url: `${appUrl}/dashboard?payment=success`,
    cancel_url: `${appUrl}/billing`,
    metadata: { user_id: user.id, plan },
    locale,
  });

  redirect(session.url!);
}

export async function createAiCreditCheckout(formData: FormData): Promise<void> {
  const credits = parseInt(String(formData.get("credits") ?? "10"));
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.somevideopost.com";
  const [locale, currency] = await Promise.all([getLocale(), getCurrency()]);

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

  // Start one Google Veo 3 job per image with cinematic per-room prompt
  if (imageUrls.length >= 1 && order?.id) {
    try {
      const { startVideoGeneration } = await import("@/lib/google-video");
      const jobIds = await startVideoGeneration(imageUrls, title, roomLabels.length ? roomLabels : undefined);
      if (!jobIds.length) throw new Error("Ingen videojobs blev startet");
      // If storing the job IDs fails (e.g. a schema mismatch), the order could
      // never be polled — surface it instead of leaving it stuck "processing".
      const { error: saveErr } = await supabase.from("video_orders").update({
        video_job_id: jobIds[0] ?? null,
        video_job_ids: jobIds,
      }).eq("id", order.id);
      if (saveErr) throw new Error(`Kunne ikke gemme video-job: ${saveErr.message}`);
    } catch (e) {
      // Mark failed immediately so the user sees a clear error instead of a
      // progress bar that spins for hours. The real cause (missing
      // GEMINI_API_KEY, no Veo 3 access, quota, etc.) is logged server-side.
      console.error("Video generation start failed:", e);
      const msg = e instanceof Error ? e.message : String(e);
      await supabase.from("video_orders").update({
        status: "failed",
        error_message: msg.slice(0, 500),
      }).eq("id", order.id);
    }
  }

  redirect(`/videos/${order?.id ?? ""}?started=1`);
}

export async function createVideoPaymentCheckout(formData: FormData): Promise<void> {
  const orderId = String(formData.get("order_id") ?? "");
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Verify the order belongs to the user and isn't already paid.
  const { data: order } = await supabase
    .from("video_orders")
    .select("id, paid, title")
    .eq("id", orderId)
    .eq("user_id", user.id)
    .single();
  if (!order) redirect("/videos");
  if (order.paid) redirect(`/videos/${orderId}`);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.somevideopost.com";
  const [locale, currency] = await Promise.all([getLocale(), getCurrency()]);

  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    customer_email: user.email,
    line_items: [{
      price_data: {
        currency,
        product_data: { name: `Præsentationsvideo — ${order.title ?? "bolig"}` },
        unit_amount: priceAmount("video", currency),
      },
      quantity: 1,
    }],
    success_url: `${appUrl}/videos/${orderId}?paid=1`,
    cancel_url: `${appUrl}/videos/${orderId}`,
    metadata: { user_id: user.id, type: "video_payment", order_id: orderId },
    locale,
  });

  redirect(session.url!);
}

export async function createBillingPortalSession(): Promise<void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.somevideopost.com";

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
