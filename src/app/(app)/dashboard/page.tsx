import { Topbar } from "@/components/layout/topbar";
import { StatCard } from "@/components/ui/stat-card";
import { EmptyState } from "@/components/ui/empty-state";
import { createClient } from "@/lib/supabase/server";

async function getDashboardStats() {
  const supabase = await createClient();

  const [propertiesRes, scheduledRes, sentRes, accountsRes] = await Promise.all([
    supabase.from("properties").select("id", { count: "exact", head: true }),
    supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "scheduled"),
    supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "published").gte("published_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
    supabase.from("social_accounts").select("id", { count: "exact", head: true }),
  ]);

  return {
    properties: propertiesRes.count ?? 0,
    scheduled: scheduledRes.count ?? 0,
    sent: sentRes.count ?? 0,
    accounts: accountsRes.count ?? 0,
  };
}

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <>
      <Topbar
        title="Dashboard"
        description="An overview of your properties and social activity."
      />

      <div className="flex-1 px-8 py-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Properties" value={stats.properties} />
          <StatCard label="Scheduled posts" value={stats.scheduled} />
          <StatCard label="Posts sent" value={stats.sent} hint="Last 30 days" />
          <StatCard label="Connected accounts" value={stats.accounts} />
        </div>

        {stats.properties === 0 && (
          <div className="mt-6">
            <EmptyState
              title="No posts yet"
              description="Add a property and connect a social account to start scheduling posts."
            />
          </div>
        )}
      </div>
    </>
  );
}
