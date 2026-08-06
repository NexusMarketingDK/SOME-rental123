"use client";

import { createSubscriptionCheckout, createAiCreditCheckout, createVideoOrderCheckout, createBillingPortalSession } from "@/services/billing";

export function SubscribeButton({
  plan,
  price,
  label,
  perMonth = "/md",
  variant = "primary",
}: {
  plan: "basic" | "pro";
  price: string;
  label?: string;
  perMonth?: string;
  variant?: "primary" | "pro";
}) {
  const cls =
    variant === "pro"
      ? "bg-[#FF6B4A] hover:bg-[#e85c3d]"
      : "bg-[#1B3F7A] hover:bg-[#152f5c]";
  return (
    <form action={createSubscriptionCheckout}>
      <input type="hidden" name="plan" value={plan} />
      <button
        type="submit"
        className={`w-full rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors ${cls}`}
      >
        {label ?? "Vælg plan"} — {price}{perMonth}
      </button>
    </form>
  );
}

export function BuyCreditsButton({ credits, label = "Køb" }: { credits: number; label?: string }) {
  return (
    <form action={createAiCreditCheckout}>
      <input type="hidden" name="credits" value={credits} />
      <button
        type="submit"
        className="w-full rounded-lg border border-purple-200 px-3 py-1.5 text-xs font-medium text-purple-700 hover:bg-purple-50 transition-colors"
      >
        {label}
      </button>
    </form>
  );
}

export function BuyVideoButton({ price, label = "Bestil video" }: { price: string; label?: string }) {
  return (
    <form action={createVideoOrderCheckout}>
      <button
        type="submit"
        className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
      >
        {label} — {price}
      </button>
    </form>
  );
}

export function ManageBillingButton({ label = "Administrer abonnement" }: { label?: string }) {
  return (
    <form action={createBillingPortalSession}>
      <button
        type="submit"
        className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
      >
        {label}
      </button>
    </form>
  );
}
