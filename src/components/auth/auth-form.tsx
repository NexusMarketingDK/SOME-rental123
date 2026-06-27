"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { AuthFormState } from "@/types/auth";

interface AuthFormProps {
  action: (
    state: AuthFormState,
    formData: FormData
  ) => Promise<AuthFormState>;
  submitLabel: string;
  pendingLabel: string;
  title: string;
  description: string;
  footer: { text: string; linkLabel: string; href: string };
}

const initialState: AuthFormState = {};

export function AuthForm({
  action,
  submitLabel,
  pendingLabel,
  title,
  description,
  footer,
}: AuthFormProps) {
  const [state, formAction, isPending] = useActionState(
    action,
    initialState
  );

  return (
    <div>
      <h1
        className="text-2xl text-[#1B1B1F]"
        style={{ fontFamily: "var(--font-fraunces)" }}
      >
        {title}
      </h1>
      <p className="mt-1 text-sm text-[#6B6B76]">{description}</p>

      <form action={formAction} className="mt-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-sm font-medium text-[#1B1B1F]"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="rounded-lg border border-[#E7E2D9] bg-white px-3 py-2 text-sm text-[#1B1B1F] outline-none focus:border-[#FF6B4A] focus:ring-1 focus:ring-[#FF6B4A]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="text-sm font-medium text-[#1B1B1F]"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="current-password"
            className="rounded-lg border border-[#E7E2D9] bg-white px-3 py-2 text-sm text-[#1B1B1F] outline-none focus:border-[#FF6B4A] focus:ring-1 focus:ring-[#FF6B4A]"
          />
        </div>

        {state?.error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="mt-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
          style={{
            background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)",
          }}
        >
          {isPending ? pendingLabel : submitLabel}
        </button>
      </form>

      <p className="mt-6 text-sm text-[#6B6B76]">
        {footer.text}{" "}
        <Link href={footer.href} className="font-medium text-[#FF6B4A]">
          {footer.linkLabel}
        </Link>
      </p>
    </div>
  );
}
