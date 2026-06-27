import { Topbar } from "@/components/layout/topbar";
import { getGa4Stats } from "@/services/ga4";
import { BarChart2, Users, Eye, Clock, TrendingUp, ExternalLink, AlertCircle } from "lucide-react";
import { AnalyticsChart } from "@/components/analytics-chart";
import { Ga4ConnectButton, Ga4DisconnectButton } from "@/components/ga4-buttons";

function StatCard({ label, value, sub, icon: Icon, color }: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm text-slate-500">{label}</p>
        <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${color}`}>
          <Icon size={15} />
        </div>
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      {sub && <p className="mt-1 text-xs text-slate-400">{sub}</p>}
    </div>
  );
}

function formatDuration(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return `${m}m ${s}s`;
}

function formatNum(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error: urlError } = await searchParams;
  const result = await getGa4Stats(28);

  if (result.notConnected) {
    return (
      <>
        <Topbar title="Analytics" description="Få indsigt i din Google Analytics data" />
        <div className="flex-1 px-8 py-8">
          <div className="mx-auto max-w-xl">
            {urlError && (
              <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <AlertCircle size={15} className="shrink-0" />
                {urlError === "google_denied"
                  ? "Du afviste Google-adgang. Prøv igen."
                  : "Noget gik galt. Prøv igen."}
              </div>
            )}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <BarChart2 size={24} className="text-slate-500" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Forbind Google Analytics</h2>
              <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">
                Tilslut din GA4-property for at se sessioner, sidevisninger og brugerdata direkte her i appen.
              </p>
              <Ga4ConnectButton />
              <p className="mt-4 text-xs text-slate-400">
                Vi henter kun læse-adgang til din Analytics-data.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (result.error || !result.data) {
    return (
      <>
        <Topbar title="Analytics" description="Google Analytics data" />
        <div className="flex-1 px-8 py-8">
          <div className="mx-auto max-w-xl">
            <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
              <AlertCircle size={18} className="text-red-500 shrink-0" />
              <div>
                <p className="font-semibold text-red-900">Fejl ved hentning af data</p>
                <p className="text-sm text-red-700">{result.error}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <Ga4ConnectButton label="Tilslut igen" />
              <Ga4DisconnectButton />
            </div>
          </div>
        </div>
      </>
    );
  }

  const { data } = result;

  return (
    <>
      <Topbar
        title="Analytics"
        description={`Google Analytics · ${data.propertyName}`}
      />
      <div className="flex-1 px-8 py-8">
        <div className="mx-auto max-w-5xl space-y-6">

          {/* Header row */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Seneste 28 dage</p>
            <div className="flex items-center gap-3">
              <a
                href={`https://analytics.google.com/analytics/web/#/p${data.propertyName}/reports/`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <ExternalLink size={12} /> Åbn i Google Analytics
              </a>
              <Ga4DisconnectButton />
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-4">
            <StatCard
              label="Sessioner"
              value={formatNum(data.sessions)}
              icon={TrendingUp}
              color="bg-blue-50 text-blue-600"
            />
            <StatCard
              label="Sidevisninger"
              value={formatNum(data.pageViews)}
              icon={Eye}
              color="bg-purple-50 text-purple-600"
            />
            <StatCard
              label="Aktive brugere"
              value={formatNum(data.activeUsers)}
              icon={Users}
              color="bg-emerald-50 text-emerald-600"
            />
            <StatCard
              label="Gns. sessionlængde"
              value={formatDuration(data.avgSessionDuration)}
              icon={Clock}
              color="bg-orange-50 text-orange-600"
            />
          </div>

          {/* Chart */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-5">Sessioner over tid</h3>
            <AnalyticsChart data={data.dailySessions} />
          </div>

          {/* Top pages */}
          {data.topPages.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-4">Mest besøgte sider</h3>
              <div className="space-y-3">
                {data.topPages.map((p, i) => {
                  const maxViews = data.topPages[0].views;
                  const pct = Math.round((p.views / maxViews) * 100);
                  return (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-slate-700 truncate max-w-xs">{p.page}</span>
                        <span className="text-sm font-semibold text-slate-900 ml-4">{formatNum(p.views)}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-blue-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
