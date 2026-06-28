"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Topbar } from "@/components/layout/topbar";
import { CheckCircle2, Circle, Users, FileText, ArrowRight, Loader2 } from "lucide-react";
import { saveFacebookSelection } from "@/services/social-accounts";

type FbPage = {
  id: string;
  name: string;
  access_token: string;
  fan_count?: number;
  picture?: { data?: { url?: string } };
  instagram_business_account?: { id: string };
  igUsername?: string | null;
};

type FbGroup = {
  id: string;
  name: string;
  privacy?: string;
};

type ConnectPayload = {
  userToken: string;
  pages: FbPage[];
  groups: FbGroup[];
};

export default function FacebookSelectPage() {
  const router = useRouter();
  const [payload, setPayload] = useState<ConnectPayload | null>(null);
  const [selectedPages, setSelectedPages] = useState<Set<string>>(new Set());
  const [selectedGroups, setSelectedGroups] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/facebook/connect-data")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) { setError(data.error); return; }
        setPayload(data);
        // Pre-select all pages by default
        setSelectedPages(new Set(data.pages.map((p: FbPage) => p.id)));
      })
      .catch(() => setError("Kunne ikke indlæse forbindelsesdata."));
  }, []);

  function togglePage(id: string) {
    setSelectedPages((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function toggleGroup(id: string) {
    setSelectedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function handleSubmit() {
    if (!payload) return;
    setError("");
    startTransition(async () => {
      const selectedPageObjects = payload.pages.filter((p) => selectedPages.has(p.id));
      const selectedGroupObjects = payload.groups.filter((g) => selectedGroups.has(g.id));
      const result = await saveFacebookSelection({
        userToken: payload.userToken,
        pages: selectedPageObjects,
        groups: selectedGroupObjects,
      });
      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/accounts?connected=facebook");
      }
    });
  }

  const hasSelection = selectedPages.size > 0 || selectedGroups.size > 0;

  return (
    <>
      <Topbar
        title="Tilslut Facebook"
        description="Vælg hvilke sider og grupper du vil tilslutte."
      />

      <div className="flex-1 flex items-start justify-center px-8 py-10">
        <div className="w-full max-w-lg space-y-5">

          {!payload && !error && (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={28} className="animate-spin text-slate-300" />
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {payload && (
            <>
              {/* Pages */}
              {payload.pages.length > 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                  <div className="flex items-center gap-2.5 border-b border-slate-100 px-5 py-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                      <FileText size={16} className="text-[#1877F2]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Dine Facebook-sider</p>
                      <p className="text-xs text-slate-400">Opslag publiceres direkte på siden</p>
                    </div>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {payload.pages.map((page) => {
                      const checked = selectedPages.has(page.id);
                      return (
                        <button
                          key={page.id}
                          type="button"
                          onClick={() => togglePage(page.id)}
                          className="flex w-full items-center gap-3.5 px-5 py-4 text-left hover:bg-slate-50 transition-colors"
                        >
                          {/* Avatar */}
                          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-blue-100">
                            {page.picture?.data?.url ? (
                              <img src={page.picture.data.url} alt={page.name} className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-[#1877F2] text-xs font-bold">
                                {page.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate">{page.name}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              {page.fan_count != null && (
                                <span className="text-xs text-slate-400">{page.fan_count.toLocaleString("da")} følgere</span>
                              )}
                              {page.igUsername && (
                                <span className="text-xs text-pink-500">
                                  IG: @{page.igUsername}
                                </span>
                              )}
                            </div>
                          </div>
                          {checked
                            ? <CheckCircle2 size={20} className="shrink-0 text-[#1877F2]" />
                            : <Circle size={20} className="shrink-0 text-slate-200" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Groups */}
              {payload.groups.length > 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                  <div className="flex items-center gap-2.5 border-b border-slate-100 px-5 py-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50">
                      <Users size={16} className="text-[#FF6B4A]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Dine Facebook-grupper</p>
                      <p className="text-xs text-slate-400">Opslag deles direkte i gruppen</p>
                    </div>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {payload.groups.map((group) => {
                      const checked = selectedGroups.has(group.id);
                      return (
                        <button
                          key={group.id}
                          type="button"
                          onClick={() => toggleGroup(group.id)}
                          className="flex w-full items-center gap-3.5 px-5 py-4 text-left hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50">
                            <Users size={16} className="text-[#FF6B4A]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate">{group.name}</p>
                            {group.privacy && (
                              <p className="text-xs text-slate-400 mt-0.5">{group.privacy === "OPEN" ? "Offentlig gruppe" : group.privacy === "CLOSED" ? "Lukket gruppe" : "Hemmelig gruppe"}</p>
                            )}
                          </div>
                          {checked
                            ? <CheckCircle2 size={20} className="shrink-0 text-[#FF6B4A]" />
                            : <Circle size={20} className="shrink-0 text-slate-200" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {payload.pages.length === 0 && payload.groups.length === 0 && (
                <div className="rounded-xl border border-amber-100 bg-amber-50 px-5 py-4 text-sm text-amber-800">
                  Vi fandt ingen Facebook-sider du administrerer. Sørg for at du er administrator på den ønskede side og prøv igen.
                </div>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!hasSelection || isPending}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
              >
                {isPending ? (
                  <><Loader2 size={16} className="animate-spin" /> Gemmer...</>
                ) : (
                  <>Tilslut valgte ({selectedPages.size + selectedGroups.size}) <ArrowRight size={16} /></>
                )}
              </button>
              <p className="text-center text-xs text-slate-400">Du kan altid tilslutte eller fjerne sider og grupper senere</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
