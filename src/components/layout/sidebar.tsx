"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Plus } from "lucide-react";
import { primaryNav, secondaryNav } from "@/modules/navigation";
import { signOutAction } from "@/services/auth";
import type { NavItem } from "@/types/navigation";
import type { SocialAccount } from "@/types/database";

function NavLink({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={`group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
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
      <span>{item.label}</span>
    </Link>
  );
}

const PLATFORM_COLORS: Record<string, string> = {
  facebook: "#1877F2",
  instagram: "#E1306C",
  tiktok: "#000000",
  snapchat: "#FFFC00",
  youtube: "#FF0000",
  linkedin: "#0A66C2",
};

const PLATFORM_LETTERS: Record<string, string> = {
  facebook: "f",
  instagram: "in",
  tiktok: "tt",
  snapchat: "sc",
  youtube: "yt",
  linkedin: "in",
};

function AccountDot({ account }: { account: SocialAccount }) {
  const color = PLATFORM_COLORS[account.platform] ?? "#64748b";
  const letter = PLATFORM_LETTERS[account.platform] ?? account.platform[0].toUpperCase();
  return (
    <div className="flex items-center gap-2.5 rounded-lg px-3 py-1.5 hover:bg-white/5 transition-colors cursor-default">
      <div
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
        style={{ backgroundColor: color }}
      >
        {letter}
      </div>
      <span className="truncate text-sm text-slate-300/80">{account.account_name}</span>
    </div>
  );
}

interface SidebarProps {
  accounts?: SocialAccount[];
  userEmail?: string;
}

export function Sidebar({ accounts = [], userEmail }: SidebarProps) {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col bg-[#14213D] px-3 py-5">
      {/* Logo */}
      <div className="mb-6 flex items-center gap-2 px-2">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-lg text-white font-bold text-sm"
          style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
        >
          V
        </span>
        <span className="text-lg font-semibold leading-none text-white tracking-tight">
          Vakanza
        </span>
      </div>

      {/* Primary nav */}
      <nav className="flex flex-col gap-0.5">
        {primaryNav.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </nav>

      {/* Connected channels */}
      <div className="mt-5">
        <div className="flex items-center justify-between px-3 mb-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Kanaler</span>
          <Link href="/accounts/connect" className="text-slate-400 hover:text-white transition-colors">
            <Plus size={14} />
          </Link>
        </div>
        {accounts.length === 0 ? (
          <Link
            href="/accounts/connect"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <Plus size={15} />
            Tilslut kanal
          </Link>
        ) : (
          <div className="flex flex-col gap-0.5">
            {accounts.map((a) => (
              <AccountDot key={a.id} account={a} />
            ))}
            <Link
              href="/accounts/connect"
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-slate-400 hover:bg-white/5 hover:text-white transition-colors mt-1"
            >
              <Plus size={13} /> Tilslut kanal
            </Link>
          </div>
        )}
      </div>

      <div className="my-4 h-px bg-white/10" />

      {/* Secondary nav */}
      <nav className="flex flex-col gap-0.5">
        {secondaryNav.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </nav>

      {/* User + logout */}
      <div className="mt-auto pt-4 border-t border-white/10">
        {userEmail && (
          <p className="px-3 mb-2 text-xs text-slate-400 truncate">{userEmail}</p>
        )}
        <form action={signOutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-300/80 transition-colors hover:bg-white/5 hover:text-white"
          >
            <LogOut size={17} strokeWidth={2} />
            <span>Log ud</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
