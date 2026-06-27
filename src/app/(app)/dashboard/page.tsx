import { Topbar } from "@/components/layout/topbar";
import { StatCard } from "@/components/ui/stat-card";
import { EmptyState } from "@/components/ui/empty-state";

export default function DashboardPage() {
  return (
    <>
      <Topbar
        title="Dashboard"
        description="An overview of your properties and social activity."
      />

      <div className="flex-1 px-8 py-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Properties" value={0} />
          <StatCard label="Scheduled posts" value={0} />
          <StatCard label="Posts sent" value={0} hint="Last 30 days" />
          <StatCard label="Connected accounts" value={0} />
        </div>

        <div className="mt-6">
          <EmptyState
            title="No posts yet"
            description="Add a property and connect a social account to start scheduling posts."
          />
        </div>
      </div>
    </>
  );
}
