"use client";

import { disconnectAccountAction } from "@/services/social-accounts";

export function DisconnectAccountButton({ id }: { id: string }) {
  return (
    <form action={disconnectAccountAction}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        onClick={(e) => {
          if (!confirm("Disconnect this account?")) e.preventDefault();
        }}
        className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-red-200 hover:text-red-600"
      >
        Disconnect
      </button>
    </form>
  );
}
