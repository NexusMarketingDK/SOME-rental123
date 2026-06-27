"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Plus, ExternalLink, BarChart2, Users, CalendarDays, Video, Home, Settings, CreditCard, Building2 } from "lucide-react";
import { signOutAction } from "@/services/auth";
import type { SocialAccount } from "@/types/database";

const PLATFORM_COLORS: Record<string, string> = {
  facebook: "#1877F2",
  instagram: "#E1306C",
  tiktok: "#010101",
  snapchat: "#FFFC00",
  youtube: "#FF0000",
  linkedin: "#0A66C2",
};

const PLATFORM_BG: Record<string, string> = {
  facebook: "#E7F0FD",
  instagram: "#FCE4EC",
  tiktok: "#E8E8E8",
  snapchat: "#FFFDE7",
  youtube: "#FFEBEE",
  linkedin: "#E3F2FD",
};

const SUGGESTED_PLATFORMS = [
  { label: "YouTube", icon: Video, color: "#FF0000", bg: "#FFEBEE" },
  { label: "Mere kanaler", icon: Plus, color: "#64748b", bg: "#F1F5F9" },
];

interface SidebarProps {
  accounts?: SocialAccount[];
  userEmail?: string;
}

function NavItem({
  href,
  icon: Icon,
  label,
  badge,
  external,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  badge?: number;
  external?: boolean;
}) {
  const pathname = usePathname();
  const isActive =
    pathname === href ||
    (href !== "/dashboard" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        isActive
          ? "bg-white/10 text-white"
          : "text-slate-300/80 hover:bg-white/5 hover:text-white"
      }`}
    >
      {isActive && (
        <span
          aria-hidden
          className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full"
          style={{ background: "linear-gradient(180deg, #FFB36B 0%, #FF6B4A 100%)" }}
        />
      )}
      <Icon size={17} strokeWidth={2} className="shrink-0" />
      <span className="flex-1">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] font-bold text-slate-300">
          {badge}
        </span>
      )}
      {external && <ExternalLink size={11} className="text-slate-500" />}
    </Link>
  );
}

export function Sidebar({ accounts = [], userEmail }: SidebarProps) {
  const firstName = userEmail?.split("@")[0] ?? "";
  const maxChannels = 3;
  const connectedCount = accounts.length;

  return (
    <aside className="relative flex h-full w-60 shrink-0 flex-col bg-[#14213D] py-4">

      {/* Logo */}
      <div className="mb-4 flex items-center gap-2 px-4">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-lg text-white font-bold text-sm shrink-0"
          style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
        >
          V
        </span>
        <span className="text-base font-bold leading-none text-white tracking-tight">Vakanza</span>
      </div>

      {/* + New button */}
      <div className="px-3 mb-4">
        <Link
          href="/posts/new"
          className="flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-bold text-white transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
        >
          <Plus size={16} strokeWidth={2.5} /> Nyt opslag
        </Link>
      </div>

      {/* Primary nav */}
      <nav className="relative flex flex-col gap-0.5 px-2">
        <NavItem href="/dashboard" icon={Home} label="Hjem" />
        <NavItem href="/posts/new" icon={Plus} label="Opret" />
        <NavItem href="/posts" icon={CalendarDays} label="Planlæg" badge={0} />
        <NavItem href="/accounts" icon={Users} label="Kanaler" />
        <NavItem href="/videos" icon={Video} label="Videoer" />
        <NavItem href="/properties" icon={Building2} label="Boliger" />
      </nav>

      <div className="my-3 h-px bg-white/10 mx-3" />

      {/* Analytics */}
      <nav className="relative flex flex-col gap-0.5 px-2">
        <NavItem href="/billing" icon={BarChart2} label="Analytics" external />
      </nav>

      {/* Connected channels */}
      <div className="mt-3 px-2">
        {accounts.map((a) => {
          const color = PLATFORM_COLORS[a.platform] ?? "#64748b";
          const bg = PLATFORM_BG[a.platform] ?? "#F1F5F9";
          return (
            <Link
              key={a.id}
              href={`/accounts/${a.id}`}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 hover:bg-white/5 transition-colors group"
            >
              <div
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold"
                style={{ backgroundColor: color, color: "#fff" }}
              >
                {a.platform[0].toUpperCase()}
              </div>
              <span className="truncate text-sm text-slate-300/80 group-hover:text-white flex-1">{a.account_name}</span>
              <span className="text-[10px] text-slate-500 group-hover:text-slate-300">0</span>
            </Link>
          );
        })}
      </div>

      {/* Connect channels suggestions */}
      <div className="mt-2 px-3">
        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 px-1">Tilslut kanal</p>
        {SUGGESTED_PLATFORMS.map((p) => (
          <Link
            key={p.label}
            href="/accounts/connect"
            className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-white/5 transition-colors group"
          >
            <div
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: p.bg }}
            >
              <p.icon size={11} style={{ color: p.color }} />
            </div>
            <span className="text-xs text-slate-400 group-hover:text-white">{p.label}</span>
          </Link>
        ))}
      </div>

      {/* Channel progress bar */}
      {connectedCount > 0 && (
        <div className="mx-3 mt-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-medium text-slate-300">
              {connectedCount}/{maxChannels} kanaler tilkoblet
            </span>
            <button className="text-slate-500 hover:text-white">
              <span className="text-[11px]">×</span>
            </button>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: maxChannels }).map((_, i) => (
              <div
                key={i}
                className="h-1.5 flex-1 rounded-full"
                style={{
                  backgroundColor: i < connectedCount ? "#22c55e" : "rgba(255,255,255,0.1)",
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto">
        <div className="mx-3 mb-2 h-px bg-white/10" />

        {/* Secondary nav */}
        <nav className="relative flex flex-col gap-0.5 px-2">
          <NavItem href="/billing" icon={CreditCard} label="Fakturering" />
          <NavItem href="/settings" icon={Settings} label="Indstillinger" />
        </nav>

        {/* User / org footer */}
        <div className="mx-3 mt-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
            >
              {firstName[0]?.toUpperCase() ?? "?"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate capitalize">{firstName}</p>
              <p className="text-[10px] text-slate-400">Free Plan</p>
            </div>
            <form action={signOutAction}>
              <button
                type="submit"
                title="Log ud"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <LogOut size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </aside>
  );
}
