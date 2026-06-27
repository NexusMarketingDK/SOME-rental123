"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { primaryNav, secondaryNav } from "@/modules/navigation";
import type { NavItem } from "@/types/navigation";

function NavLink({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(item.href);
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
        isActive
          ? "bg-white/10 text-white"
          : "text-slate-300/80 hover:bg-white/5 hover:text-white"
      }`}
    >
      {isActive && (
        <span
          aria-hidden
          className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full"
          style={{
            background: "linear-gradient(180deg, #FFB36B 0%, #FF6B4A 100%)",
          }}
        />
      )}
      <Icon size={18} strokeWidth={2} className="shrink-0" />
      <span>{item.label}</span>
    </Link>
  );
}

export function Sidebar() {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col bg-[#14213D] px-4 py-6">
      <div className="mb-8 flex items-center gap-2 px-2">
        <span
          aria-hidden
          className="h-7 w-7 rounded-md"
          style={{
            background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)",
          }}
        />
        <span
          className="text-lg leading-none text-white"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          Vakanza
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {primaryNav.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}

        <div className="my-4 h-px bg-white/10" />

        {secondaryNav.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </nav>

      <button
        type="button"
        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300/80 transition-colors hover:bg-white/5 hover:text-white"
      >
        <LogOut size={18} strokeWidth={2} />
        <span>Log out</span>
      </button>
    </aside>
  );
}
