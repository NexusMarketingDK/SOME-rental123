"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface MobileNavProps {
  links: { href: string; label: string; external?: boolean }[];
  /** Dark (midnight blue) styling used on the marketing landing page */
  dark?: boolean;
}

export function MobileNav({ links, dark = false }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  const buttonCls = dark
    ? "flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-slate-300 hover:border-blue-400/40 hover:text-white transition-colors"
    : "flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:border-slate-300 transition-colors";
  const drawerCls = dark
    ? "absolute left-0 right-0 top-full z-50 border-b border-white/10 bg-[#0a1430] px-6 py-4 shadow-xl shadow-black/40"
    : "absolute left-0 right-0 top-full z-50 border-b border-slate-200 bg-white px-6 py-4 shadow-lg";
  const linkCls = dark
    ? "rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
    : "rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#1B3F7A] transition-colors";

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Luk menu" : "Åbn menu"}
        className={buttonCls}
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          {/* Drawer */}
          <div className={drawerCls}>
            <nav className="flex flex-col gap-1">
              {links.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={linkCls}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={linkCls}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
