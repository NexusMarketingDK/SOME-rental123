"use client";

import { createSubscriptionCheckout, createAiCreditCheckout, createVideoOrderCheckout, createBillingPortalSession } from "@/services/billing";

export function SubscribeButton({
  plan,
  price,
  label,
  variant = "primary",
}: {
  plan: "basic" | "pro";
  price: string;
  label?: string;
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
        {label ?? "Vælg plan"} — {price}/md
      </button>
    </form>
  );
}

export function BuyCreditsButton({ credits }: { credits: number }) {
  return (
    <form action={createAiCreditCheckout}>
      <input type="hidden" name="credits" value={credits} />
      <button
        type="submit"
        className="w-full rounded-lg border border-purple-200 px-3 py-1.5 text-xs font-medium text-purple-700 hover:bg-purple-50 transition-colors"
      >
        Køb
      </button>
    </form>
  );
}

export function BuyVideoButton({ price }: { price: string }) {
  return (
    <form action={createVideoOrderCheckout}>
      <button
        type="submit"
        className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
      >
        Bestil video — {price}
      </button>
    </form>
  );
}

export function ManageBillingButton() {
  return (
    <form action={createBillingPortalSession}>
      <button
        type="submit"
        className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
      >
        Administrer abonnement
      </button>
    </form>
  );
}
