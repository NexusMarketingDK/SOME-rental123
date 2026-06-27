import Link from "next/link";
import { Plus, CalendarClock, Send, Video, Sparkles, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Post, SocialAccount } from "@/types/database";

async function getDashboardData() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const prevWeekAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString();

  const [
    propertiesRes,
    scheduledRes,
    sentThisWeekRes,
    sentLastWeekRes,
    accountsRes,
    upcomingRes,
  ] = await Promise.all([
    supabase.from("properties").select("id", { count: "exact", head: true }),
    supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "scheduled"),
    supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "published").gte("published_at", weekAgo),
    supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "published").gte("published_at", prevWeekAgo).lt("published_at", weekAgo),
    supabase.from("social_accounts").select("*").order("created_at"),
    supabase.from("posts").select("*").eq("status", "scheduled").order("scheduled_at").limit(3),
  ]);

  return {
    properties: propertiesRes.count ?? 0,
    scheduled: scheduledRes.count ?? 0,
    sentThisWeek: sentThisWeekRes.count ?? 0,
    sentLastWeek: sentLastWeekRes.count ?? 0,
    accounts: (accountsRes.data ?? []) as SocialAccount[],
    upcoming: (upcomingRes.data ?? []) as Post[],
    userEmail: user?.email ?? "",
  };
}

function StatCard({ label, value, sub }: { label: string; value: number; sub?: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
      {sub && <p className="mt-1 text-xs text-slate-400">{sub}</p>}
    </div>
  );
}

const PLATFORM_COLORS: Record<string, string> = {
  facebook: "#1877F2", instagram: "#E1306C", tiktok: "#000000",
  snapchat: "#F7C600", youtube: "#FF0000", linkedin: "#0A66C2",
};

export default async function DashboardPage() {
  const data = await getDashboardData();
  const firstName = data.userEmail.split("@")[0];
  const now = new Date();
  const dateStr = now.toLocaleDateString("da-DK", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const trend = data.sentThisWeek - data.sentLastWeek;

  return (
    <div className="flex-1 px-8 py-7 max-w-5xl mx-auto w-full">

      {/* Greeting */}
      <div className="mb-7">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full text-xl" style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}>
            👋
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Goddag, {firstName}!</h1>
            <p className="text-sm text-slate-400 capitalize">{dateStr}</p>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard label="Opslag denne uge" value={data.sentThisWeek} sub={trend >= 0 ? `+${trend} fra sidste uge` : `${trend} fra sidste uge`} />
        <StatCard label="Planlagte opslag" value={data.scheduled} sub="Klar til publicering" />
        <StatCard label="Tilkoblede konti" value={data.accounts.length} sub={data.accounts.length === 0 ? "Tilslut din første kanal" : undefined} />
      </div>

      <div className="grid grid-cols-3 gap-6">

        {/* Up next */}
        <div className="col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Kommende opslag</h2>
            <Link href="/posts/new" className="flex items-center gap-1.5 text-sm font-medium text-[#FF6B4A] hover:opacity-80">
              <Plus size={14} /> Nyt opslag
            </Link>
          </div>

          {data.upcoming.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center">
              <CalendarClock size={28} className="mx-auto mb-3 text-slate-200" />
              <p className="text-sm font-medium text-slate-700">Ingen planlagte opslag</p>
              <p className="mt-1 text-sm text-slate-400">Planlæg dit næste opslag til sociale medier.</p>
              <Link
                href="/posts/new"
                className="mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white"
                style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
              >
                <Plus size={14} /> Opret opslag
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {data.upcoming.map((post) => (
                <div key={post.id} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                    <Send size={14} className="text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="line-clamp-2 text-sm text-slate-800">{post.content}</p>
                    {post.scheduled_at && (
                      <p className="mt-1 text-xs text-slate-400">
                        {new Date(post.scheduled_at).toLocaleDateString("da-DK", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              <Link href="/posts" className="flex items-center justify-center gap-1 text-sm text-slate-400 hover:text-slate-700 py-1">
                Se alle opslag <ArrowRight size={13} />
              </Link>
            </div>
          )}

          {/* Connected channels */}
          {data.accounts.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-slate-900">Tilkoblede kanaler</h2>
                <Link href="/accounts" className="text-sm text-slate-400 hover:text-slate-700">Se alle</Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.accounts.map((a) => (
                  <div key={a.id} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
                    <div
                      className="h-5 w-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0"
                      style={{ backgroundColor: PLATFORM_COLORS[a.platform] ?? "#64748b" }}
                    >
                      {a.platform[0].toUpperCase()}
                    </div>
                    <span className="text-sm text-slate-700">{a.account_name}</span>
                  </div>
                ))}
                <Link
                  href="/accounts/connect"
                  className="flex items-center gap-2 rounded-lg border border-dashed border-slate-200 bg-white px-3 py-2 text-sm text-slate-400 hover:border-slate-300 hover:text-slate-600 transition-colors"
                >
                  <Plus size={13} /> Tilslut
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Quick actions */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Hurtige handlinger</h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/posts/new"
                className="flex items-center gap-2.5 rounded-lg p-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-50">
                  <Send size={14} className="text-blue-600" />
                </div>
                Opret opslag
              </Link>
              <Link
                href="/videos/new"
                className="flex items-center gap-2.5 rounded-lg p-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-orange-50">
                  <Video size={14} className="text-[#FF6B4A]" />
                </div>
                Bestil præsentationsvideo
              </Link>
              <Link
                href="/properties/new"
                className="flex items-center gap-2.5 rounded-lg p-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-50">
                  <Plus size={14} className="text-emerald-600" />
                </div>
                Tilføj bolig
              </Link>
            </div>
          </div>

          {/* Video upsell */}
          <div className="rounded-xl p-4 text-white" style={{ background: "linear-gradient(135deg, #1B3F7A 0%, #2a5298 100%)" }}>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-orange-300" />
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-300">AI Video</span>
            </div>
            <p className="text-sm font-semibold leading-snug mb-1">Præsentationsvideo fra dine billeder</p>
            <p className="text-xs text-blue-200 mb-3">Henter automatisk billeder fra Airbnb & Booking.com. Klar på 5-15 min.</p>
            <Link
              href="/videos/new"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-[#1B3F7A] hover:opacity-90 transition-opacity"
            >
              Bestil — 499 kr <ArrowRight size={11} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
