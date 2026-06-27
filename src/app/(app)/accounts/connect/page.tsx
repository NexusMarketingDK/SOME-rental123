import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { connectAccountAction } from "@/services/social-accounts";

const PLATFORMS = [
  {
    value: "facebook",
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-[#1877F2]">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
      </svg>
    ),
  },
  {
    value: "instagram",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7">
        <defs>
          <linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFDC80"/>
            <stop offset="25%" stopColor="#FCAF45"/>
            <stop offset="50%" stopColor="#F77737"/>
            <stop offset="75%" stopColor="#F56040"/>
            <stop offset="100%" stopColor="#C13584"/>
          </linearGradient>
        </defs>
        <path fill="url(#ig)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    value: "tiktok",
    label: "TikTok",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-black">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
      </svg>
    ),
  },
  {
    value: "snapchat",
    label: "Snapchat",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-[#FFFC00]" style={{filter: "drop-shadow(0 0 1px #ccc)"}}>
        <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.5 1.137.385 3.065.307 4.461l-.009.135c-.005.093.074.172.17.172.233 0 .593-.038.894-.149.259.101.516.161.793.161.342 0 .534-.09.534-.27 0-.162-.121-.308-.356-.429.13-.23.197-.455.197-.668 0-.228-.072-.457-.211-.657a1.46 1.46 0 00-.44-.426c.226-.266.306-.566.306-.833 0-.467-.255-.879-.666-1.07a1.29 1.29 0 00-.558-.124c-.33 0-.637.1-.882.275-.116-.127-.256-.24-.41-.327a3.356 3.356 0 00-.408-.196 5.432 5.432 0 00-.403-1.066A5.432 5.432 0 0015.5 2.5a5.43 5.43 0 00-3.294-1.707zm0 0"/>
      </svg>
    ),
  },
  {
    value: "youtube",
    label: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-[#FF0000]">
        <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
      </svg>
    ),
  },
  {
    value: "linkedin",
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-[#0A66C2]">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

export default function ConnectAccountPage() {
  return (
    <>
      <Topbar title="Tilslut konto" description="Tilføj en social medie-side eller profil." />
      <div className="flex-1 px-8 py-6">
        <div className="mx-auto max-w-lg">
          <Link href="/accounts" className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900">
            <ArrowLeft size={14} /> Tilbage til konti
          </Link>

          <form action={connectAccountAction} className="flex flex-col gap-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div>
              <p className="mb-3 text-sm font-medium text-slate-700">Vælg platform</p>
              <div className="grid grid-cols-3 gap-3">
                {PLATFORMS.map((p) => (
                  <label
                    key={p.value}
                    className="relative flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-slate-200 p-4 transition-colors has-[:checked]:border-[#FF6B4A] has-[:checked]:bg-orange-50"
                  >
                    <input type="radio" name="platform" value={p.value} required className="sr-only" />
                    {p.icon}
                    <span className="text-xs font-medium text-slate-800">{p.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">
                Sidenavn / profilnavn <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="account_name"
                required
                placeholder="Min Feriebolig Udlejning"
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-[#FF6B4A] focus:outline-none focus:ring-2 focus:ring-[#FF6B4A]/20"
              />
              <p className="text-xs text-slate-400">
                I produktion vil dette omdirigere til OAuth-login. Indtast sidenavnet manuelt for nu.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <Link href="/accounts" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                Annuller
              </Link>
              <button
                type="submit"
                className="rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
              >
                Tilslut konto
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
