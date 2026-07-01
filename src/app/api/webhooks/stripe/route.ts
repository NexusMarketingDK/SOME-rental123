import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { startVideoGeneration } from "@/lib/veo";
import { createClient } from "@/lib/supabase/server";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = await createClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.user_id;
      if (!userId) break;

      if (session.mode === "subscription") {
        await supabase.from("subscriptions").upsert({
          user_id: userId,
          stripe_customer_id: String(session.customer),
          stripe_subscription_id: String(session.subscription),
          status: "active",
        }, { onConflict: "user_id" });
      }

      if (session.mode === "payment" && session.metadata?.type === "ai_credits") {
        const credits = parseInt(session.metadata.credits ?? "0");
        const { data: existing } = await supabase
          .from("ai_credits")
          .select("balance")
          .eq("user_id", userId)
          .single();

        await supabase.from("ai_credits").upsert({
          user_id: userId,
          balance: (existing?.balance ?? 0) + credits,
        }, { onConflict: "user_id" });

        await supabase.from("credit_transactions").insert({
          user_id: userId,
          amount: credits,
          description: `Køb af ${credits} AI credits`,
          stripe_payment_id: session.payment_intent as string,
        });
      }

      if (session.mode === "payment" && session.metadata?.type === "video") {
        const propertyId = session.metadata.property_id || null;
        const imageUrls = session.metadata.image_urls
          ? JSON.parse(session.metadata.image_urls)
          : [];
        const title = session.metadata.title ?? "Bolig fremvisning";

        // Insert order first
        const { data: order } = await supabase
          .from("video_orders")
          .insert({
            user_id: userId,
            property_id: propertyId,
            stripe_payment_id: session.payment_intent as string,
            status: "processing",
            image_urls: imageUrls,
            title,
          })
          .select()
          .single();

        // Trigger Veo video generation
        if (order && imageUrls.length > 0) {
          try {
            const jobIds = await startVideoGeneration(imageUrls, title);

            await supabase
              .from("video_orders")
              .update({ video_job_id: jobIds[0] ?? null, video_job_ids: jobIds })
              .eq("id", order.id);
          } catch (err) {
            console.error("Veo video generation error:", err);
            await supabase
              .from("video_orders")
              .update({ status: "failed" })
              .eq("id", order.id);
          }
        }
      }
      break;
    }

    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      await supabase
        .from("subscriptions")
        .update({
          status: sub.status as string,
          current_period_end: new Date((sub as any).current_period_end * 1000).toISOString(),
          cancel_at_period_end: sub.cancel_at_period_end,
        })
        .eq("stripe_subscription_id", sub.id);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
