import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const ADMIN_EMAILS = ["mail@somevideopost.com"];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user || !ADMIN_EMAILS.includes(data.user.email ?? "")) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Top bar */}
      <header className="flex h-14 items-center gap-4 border-b border-white/10 px-8">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-lg text-white font-bold text-sm"
          style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
        >
          S
        </span>
        <span className="text-sm font-bold uppercase text-white tracking-tight">SOME VIDEO POST</span>
        <span className="rounded-full bg-orange-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-orange-400">Admin</span>
        <nav className="ml-6 flex items-center gap-1">
          <a href="/admin" className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors">Oversigt</a>
          <a href="/dashboard" className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-500 hover:bg-white/5 hover:text-slate-300 transition-colors">← Tilbage til app</a>
        </nav>
      </header>
      <main className="px-8 py-8">{children}</main>
    </div>
  );
}
