import { createAdminClient } from "@/lib/supabase/admin";
import { Users, FileText, Video, Building2, Share2, TrendingUp, Activity, CreditCard, Globe } from "lucide-react";

const PLATFORM_COLORS: Record<string, string> = {
  facebook: "#1877F2",
  instagram: "#E1306C",
  tiktok: "#010101",
  youtube: "#FF0000",
  linkedin: "#0A66C2",
  snapchat: "#FFAA00",
};

async function getAdminStats() {
  const admin = createAdminClient();

  const [
    usersRes,
    postsRes,
    videosRes,
    propertiesRes,
    accountsRes,
    subsRes,
  ] = await Promise.all([
    admin.auth.admin.listUsers({ perPage: 1000 }),
    admin.from("posts").select("id, user_id, status, created_at, image_urls").order("created_at", { ascending: false }),
    admin.from("video_orders").select("id, user_id, status, created_at").order("created_at", { ascending: false }),
    admin.from("properties").select("id, user_id, title, created_at"),
    admin.from("social_accounts").select("id, user_id, platform, account_name, created_at"),
    admin.from("subscriptions").select("user_id, status, created_at, current_period_end, cancel_at_period_end"),
  ]);

  type PostRow = { id: string; user_id: string; status: string; created_at: string; image_urls: string[] };
  type VideoRow = { id: string; user_id: string; status: string; created_at: string };
  type PropertyRow = { id: string; user_id: string; title: string; created_at: string };
  type AccountRow = { id: string; user_id: string; platform: string; account_name: string; created_at: string };
  type SubRow = { user_id: string; status: string; created_at: string; current_period_end: string | null; cancel_at_period_end: boolean };

  const users = usersRes.data?.users ?? [];
  const posts = (postsRes.data ?? []) as PostRow[];
  const videos = (videosRes.data ?? []) as VideoRow[];
  const properties = (propertiesRes.data ?? []) as PropertyRow[];
  const accounts = (accountsRes.data ?? []) as AccountRow[];
  const subs = (subsRes.data ?? []) as SubRow[];
  const subByUser = new Map(subs.map((s) => [s.user_id, s]));

  // Derive a plan label + "since" date from the subscription (Stripe is inactive,
  // so most users are on the free plan — no subscription row).
  function derivePlan(userId: string, userCreatedAt: string) {
    const sub = subByUser.get(userId);
    if (!sub) return { plan: "Gratis", planColor: "#94a3b8", since: userCreatedAt };
    switch (sub.status) {
      case "active":
        return { plan: "Pro", planColor: "#34D399", since: sub.created_at };
      case "trialing":
        return { plan: "Prøve", planColor: "#FBBF24", since: sub.created_at };
      case "past_due":
        return { plan: "Forfalden", planColor: "#F87171", since: sub.created_at };
      case "canceled":
        return { plan: "Opsagt", planColor: "#64748b", since: sub.created_at };
      default:
        return { plan: "Gratis", planColor: "#94a3b8", since: userCreatedAt };
    }
  }

  // Per-user aggregation

  const userStats = users.map((u) => {
    const userPosts = posts.filter((p) => p.user_id === u.id);
    const userVideos = videos.filter((v) => v.user_id === u.id);
    const userProperties = properties.filter((p) => p.user_id === u.id);
    const userAccounts = accounts.filter((a) => a.user_id === u.id);

    const platformCounts: Record<string, number> = {};
    userAccounts.forEach((a) => {
      platformCounts[a.platform] = (platformCounts[a.platform] ?? 0) + 1;
    });

    const publishedPosts = userPosts.filter((p) => p.status === "published").length;
    const scheduledPosts = userPosts.filter((p) => p.status === "scheduled").length;

    const meta = (u.user_metadata ?? {}) as Record<string, unknown>;
    const { plan, planColor, since } = derivePlan(u.id, u.created_at);
    const planDays = Math.max(0, Math.floor((Date.now() - new Date(since).getTime()) / 86400000));

    return {
      id: u.id,
      email: u.email ?? "—",
      name: (meta.name as string) ?? "",
      country: (meta.country as string) ?? "—",
      expectedPosts: (meta.posts_per_week as string) ?? "—",
      expectedVideos: (meta.videos_per_week as string) ?? "—",
      plannedChannels: Array.isArray(meta.channels) ? (meta.channels as string[]) : [],
      locale: (meta.locale as string) ?? "—",
      plan,
      planColor,
      planSince: since,
      planDays,
      createdAt: u.created_at,
      lastSignIn: u.last_sign_in_at,
      totalPosts: userPosts.length,
      publishedPosts,
      scheduledPosts,
      totalVideos: userVideos.length,
      readyVideos: userVideos.filter((v) => v.status === "ready").length,
      totalProperties: userProperties.length,
      connectedChannels: userAccounts.length,
      platformCounts,
    };
  }).sort((a, b) => b.totalPosts - a.totalPosts);

  // Plan & country breakdowns for stats
  const planBreakdown: Record<string, number> = {};
  const countryBreakdown: Record<string, number> = {};
  userStats.forEach((u) => {
    planBreakdown[u.plan] = (planBreakdown[u.plan] ?? 0) + 1;
    countryBreakdown[u.country] = (countryBreakdown[u.country] ?? 0) + 1;
  });

  // Platform totals
  const platformTotals: Record<string, number> = {};
  accounts.forEach((a) => {
    platformTotals[a.platform] = (platformTotals[a.platform] ?? 0) + 1;
  });

  // Posts last 7 days per day
  const now = new Date();
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().slice(0, 10);
  });
  const postsByDay = last7.map((day) => ({
    day,
    count: posts.filter((p) => p.created_at.slice(0, 10) === day).length,
  }));

  // New users last 7 days
  const newUsersLast7 = users.filter(
    (u) => new Date(u.created_at) > new Date(now.getTime() - 7 * 86400000)
  ).length;

  return {
    totalUsers: users.length,
    totalPosts: posts.length,
    totalVideos: videos.length,
    totalProperties: properties.length,
    totalAccounts: accounts.length,
    newUsersLast7,
    platformTotals,
    postsByDay,
    userStats,
    planBreakdown,
    countryBreakdown,
  };
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-start justify-between">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${color}22` }}
        >
          <Icon size={20} style={{ color }} />
        </div>
      </div>
      <p className="mt-4 text-3xl font-bold text-white">{value}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-400">{label}</p>
      {sub && <p className="mt-1 text-xs text-slate-600">{sub}</p>}
    </div>
  );
}

function MiniBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 rounded-full bg-white/10">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="w-5 text-right text-xs text-slate-500">{value}</span>
    </div>
  );
}

function SparkLine({ data }: { data: { day: string; count: number }[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  const w = 200;
  const h = 48;
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - (d.count / max) * h;
    return `${x},${y}`;
  });

  const dayLabels = ["Ma", "Ti", "On", "To", "Fr", "Lø", "Sø"];

  return (
    <div>
      <svg width={w} height={h} className="overflow-visible">
        <polyline
          points={pts.join(" ")}
          fill="none"
          stroke="#FF6B4A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * w;
          const y = h - (d.count / max) * h;
          return <circle key={i} cx={x} cy={y} r="3" fill="#FF6B4A" />;
        })}
      </svg>
      <div className="mt-1 flex justify-between">
        {data.map((d, i) => (
          <span key={i} className="text-[9px] text-slate-600">{dayLabels[i]}</span>
        ))}
      </div>
    </div>
  );
}

export default async function AdminPage() {
  const stats = await getAdminStats();
  const maxPosts = Math.max(...stats.userStats.map((u) => u.totalPosts), 1);

  return (
    <div className="mx-auto max-w-7xl space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Realtidsoverblik over alle brugere og aktivitet</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
        <StatCard icon={Users} label="Brugere i alt" value={stats.totalUsers} sub={`+${stats.newUsersLast7} seneste 7 dage`} color="#818CF8" />
        <StatCard icon={FileText} label="Opslag i alt" value={stats.totalPosts} color="#FF6B4A" />
        <StatCard icon={Video} label="Videoer i alt" value={stats.totalVideos} color="#FFB36B" />
        <StatCard icon={Building2} label="Boliger i alt" value={stats.totalProperties} color="#34D399" />
        <StatCard icon={Share2} label="Kanaler tilsluttet" value={stats.totalAccounts} color="#60A5FA" />
        <StatCard icon={Activity} label="Ny brugere (7d)" value={stats.newUsersLast7} color="#F472B6" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-3 gap-5">

        {/* Opslag seneste 7 dage */}
        <div className="col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-[#FF6B4A]" />
            <p className="text-sm font-bold text-white">Opslag seneste 7 dage</p>
          </div>
          <SparkLine data={stats.postsByDay} />
          <div className="mt-4 flex gap-6">
            {stats.postsByDay.map((d) => (
              <div key={d.day} className="text-center">
                <p className="text-base font-bold text-white">{d.count}</p>
                <p className="text-[10px] text-slate-600">{new Date(d.day).toLocaleDateString("da", { weekday: "short" })}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Platform fordeling */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Share2 size={16} className="text-[#60A5FA]" />
            <p className="text-sm font-bold text-white">Kanaler pr. platform</p>
          </div>
          <div className="space-y-3">
            {Object.entries(stats.platformTotals)
              .sort((a, b) => b[1] - a[1])
              .map(([platform, count]) => (
                <div key={platform}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs font-medium capitalize" style={{ color: PLATFORM_COLORS[platform] ?? "#94a3b8" }}>
                      {platform}
                    </span>
                    <span className="text-xs text-slate-400">{count}</span>
                  </div>
                  <MiniBar
                    value={count}
                    max={Math.max(...Object.values(stats.platformTotals))}
                    color={PLATFORM_COLORS[platform] ?? "#94a3b8"}
                  />
                </div>
              ))}
            {Object.keys(stats.platformTotals).length === 0 && (
              <p className="text-xs text-slate-600">Ingen kanaler endnu</p>
            )}
          </div>
        </div>
      </div>

      {/* Plan & country breakdown */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="mb-4 flex items-center gap-2">
            <CreditCard size={16} className="text-[#34D399]" />
            <p className="text-sm font-bold text-white">Fordeling på plan</p>
          </div>
          <div className="space-y-3">
            {Object.entries(stats.planBreakdown).sort((a, b) => b[1] - a[1]).map(([plan, count]) => (
              <div key={plan}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-300">{plan}</span>
                  <span className="text-xs text-slate-400">{count}</span>
                </div>
                <MiniBar value={count} max={Math.max(...Object.values(stats.planBreakdown))} color="#34D399" />
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Globe size={16} className="text-[#60A5FA]" />
            <p className="text-sm font-bold text-white">Fordeling på land</p>
          </div>
          <div className="space-y-3">
            {Object.entries(stats.countryBreakdown).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([country, count]) => (
              <div key={country}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-300">{country}</span>
                  <span className="text-xs text-slate-400">{count}</span>
                </div>
                <MiniBar value={count} max={Math.max(...Object.values(stats.countryBreakdown))} color="#60A5FA" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User table */}
      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="flex items-center gap-3 border-b border-white/10 px-6 py-4">
          <Users size={16} className="text-slate-400" />
          <p className="text-sm font-bold text-white">Alle brugere</p>
          <span className="ml-auto rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-bold text-slate-300">{stats.totalUsers}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">Bruger</th>
                <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">Plan</th>
                <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">Land</th>
                <th className="px-4 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-slate-500">Forv. opslag/uge</th>
                <th className="px-4 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-slate-500">Forv. videoer/uge</th>
                <th className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500">Opslag</th>
                <th className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500">Publiceret</th>
                <th className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500">Planlagt</th>
                <th className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500">Videoer</th>
                <th className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500">Boliger</th>
                <th className="px-4 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-slate-500">Kanaler</th>
                <th className="px-6 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500">Oprettet</th>
                <th className="px-6 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500">Senest aktiv</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {stats.userStats.map((u) => (
                <tr key={u.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                        style={{ background: "linear-gradient(135deg, #818CF8, #6366F1)" }}
                      >
                        {u.email[0].toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-slate-300 font-medium">{u.name || u.email}</span>
                        {u.name && <span className="text-[11px] text-slate-500">{u.email}</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex flex-col gap-0.5">
                      <span
                        className="w-fit rounded-full px-2 py-0.5 text-[10px] font-bold"
                        style={{ backgroundColor: u.planColor + "22", color: u.planColor }}
                      >
                        {u.plan}
                      </span>
                      <span className="text-[10px] text-slate-500">{u.planDays} dage</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-slate-400 text-xs">{u.country}</td>
                  <td className="px-4 py-3.5 text-center text-slate-400 text-xs">{u.expectedPosts}</td>
                  <td className="px-4 py-3.5 text-center text-slate-400 text-xs">{u.expectedVideos}</td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex flex-col items-end gap-1">
                      <span className="font-bold text-white">{u.totalPosts}</span>
                      <div className="w-16">
                        <MiniBar value={u.totalPosts} max={maxPosts} color="#FF6B4A" />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <span className={`font-medium ${u.publishedPosts > 0 ? "text-emerald-400" : "text-slate-600"}`}>{u.publishedPosts}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <span className={`font-medium ${u.scheduledPosts > 0 ? "text-blue-400" : "text-slate-600"}`}>{u.scheduledPosts}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <span className={`font-medium ${u.totalVideos > 0 ? "text-amber-400" : "text-slate-600"}`}>{u.totalVideos}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <span className={`font-medium ${u.totalProperties > 0 ? "text-teal-400" : "text-slate-600"}`}>{u.totalProperties}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex flex-wrap justify-center gap-1">
                      {Object.entries(u.platformCounts).map(([p, n]) => (
                        <span
                          key={p}
                          className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
                          style={{ backgroundColor: (PLATFORM_COLORS[p] ?? "#64748b") + "33", color: PLATFORM_COLORS[p] ?? "#94a3b8" }}
                        >
                          {p.slice(0, 2).toUpperCase()} {n > 1 ? `×${n}` : ""}
                        </span>
                      ))}
                      {u.connectedChannels === 0 && <span className="text-xs text-slate-700">—</span>}
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-right text-xs text-slate-500">
                    {new Date(u.createdAt).toLocaleDateString("da", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-6 py-3.5 text-right text-xs text-slate-500">
                    {u.lastSignIn
                      ? new Date(u.lastSignIn).toLocaleDateString("da", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })
                      : "—"}
                  </td>
                </tr>
              ))}
              {stats.userStats.length === 0 && (
                <tr>
                  <td colSpan={13} className="px-6 py-10 text-center text-sm text-slate-600">Ingen brugere endnu</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
