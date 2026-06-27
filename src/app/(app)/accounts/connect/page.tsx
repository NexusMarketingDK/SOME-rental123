"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, User, X } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { connectAccountAction } from "@/services/social-accounts";

const PLATFORMS = [
  {
    value: "facebook",
    label: "Facebook",
    urlPlaceholder: "facebook.com/yourpage",
    urlLabel: "Facebook Side URL",
    namePlaceholder: "Din Facebook Sides navn",
    color: "#1877F2",
    bg: "#E7F0FD",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 fill-[#1877F2]">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
      </svg>
    ),
    smallIcon: (size = 20) => (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="#1877F2">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
      </svg>
    ),
  },
  {
    value: "instagram",
    label: "Instagram",
    urlPlaceholder: "instagram.com/yourprofile",
    urlLabel: "Instagram Profil URL",
    namePlaceholder: "Dit Instagram-brugernavn",
    color: "#E1306C",
    bg: "#FCE4EC",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8">
        <defs>
          <linearGradient id="ig2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFDC80"/>
            <stop offset="50%" stopColor="#F56040"/>
            <stop offset="100%" stopColor="#C13584"/>
          </linearGradient>
        </defs>
        <path fill="url(#ig2)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
    smallIcon: (size = 20) => (
      <svg viewBox="0 0 24 24" width={size} height={size}>
        <defs>
          <linearGradient id="ig3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFDC80"/><stop offset="50%" stopColor="#F56040"/><stop offset="100%" stopColor="#C13584"/>
          </linearGradient>
        </defs>
        <path fill="url(#ig3)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z"/>
      </svg>
    ),
  },
  {
    value: "tiktok",
    label: "TikTok",
    urlPlaceholder: "tiktok.com/@yourprofile",
    urlLabel: "TikTok Profil URL",
    namePlaceholder: "Dit TikTok-brugernavn",
    color: "#010101",
    bg: "#E8E8E8",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 fill-black">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
      </svg>
    ),
    smallIcon: (size = 20) => (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="black">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
      </svg>
    ),
  },
  {
    value: "youtube",
    label: "YouTube",
    urlPlaceholder: "youtube.com/@yourchannel",
    urlLabel: "YouTube Kanal URL",
    namePlaceholder: "Dit YouTube-kanalnavn",
    color: "#FF0000",
    bg: "#FFEBEE",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 fill-[#FF0000]">
        <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
      </svg>
    ),
    smallIcon: (size = 20) => (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="#FF0000">
        <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
      </svg>
    ),
  },
  {
    value: "linkedin",
    label: "LinkedIn",
    urlPlaceholder: "linkedin.com/company/yourpage",
    urlLabel: "LinkedIn Side URL",
    namePlaceholder: "Dit LinkedIn-sidenavn",
    color: "#0A66C2",
    bg: "#E3F2FD",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 fill-[#0A66C2]">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    smallIcon: (size = 20) => (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="#0A66C2">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    value: "snapchat",
    label: "Snapchat",
    urlPlaceholder: "snapchat.com/add/yourprofile",
    urlLabel: "Snapchat Profil URL",
    namePlaceholder: "Dit Snapchat-brugernavn",
    color: "#FFAA00",
    bg: "#FFFDE7",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="#FFAA00">
        <path d="M12.166.8C9.6.8 5.3 2.2 5.3 7.6v.3c0 .5-.3.8-.8.8-.3 0-.6-.1-.9-.1-.5 0-1 .2-1 .7 0 .4.3.7.9 1-.1.3-.2.7-.2 1 0 1.4.9 2.6 2.3 3.4-.1.3-.4.5-.8.7-.6.3-1.5.5-1.5 1.2 0 .6.5 1 1.4 1.3.2.1.4.2.5.4.2.3.2.7.5.9.3.2.7.1 1.1.1.5 0 1.1.1 1.7.4 1.2.6 2.4 1.9 4.5 1.9s3.3-1.3 4.5-1.9c.6-.3 1.2-.4 1.7-.4.4 0 .8.1 1.1-.1.3-.2.3-.6.5-.9.1-.2.3-.3.5-.4.9-.3 1.4-.7 1.4-1.3 0-.7-.9-.9-1.5-1.2-.4-.2-.7-.4-.8-.7 1.4-.8 2.3-2 2.3-3.4 0-.3-.1-.7-.2-1 .6-.3.9-.6.9-1 0-.5-.5-.7-1-.7-.3 0-.6.1-.9.1-.5 0-.8-.3-.8-.8V7.6C18.8 2.2 14.7.8 12.2.8h-.034z"/>
      </svg>
    ),
    smallIcon: (size = 20) => (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="#FFAA00">
        <path d="M12.166.8C9.6.8 5.3 2.2 5.3 7.6v.3c0 .5-.3.8-.8.8-.3 0-.6-.1-.9-.1-.5 0-1 .2-1 .7 0 .4.3.7.9 1-.1.3-.2.7-.2 1 0 1.4.9 2.6 2.3 3.4-.1.3-.4.5-.8.7-.6.3-1.5.5-1.5 1.2 0 .6.5 1 1.4 1.3.2.1.4.2.5.4.2.3.2.7.5.9.3.2.7.1 1.1.1.5 0 1.1.1 1.7.4 1.2.6 2.4 1.9 4.5 1.9s3.3-1.3 4.5-1.9c.6-.3 1.2-.4 1.7-.4.4 0 .8.1 1.1-.1.3-.2.3-.6.5-.9.1-.2.3-.3.5-.4.9-.3 1.4-.7 1.4-1.3 0-.7-.9-.9-1.5-1.2-.4-.2-.7-.4-.8-.7 1.4-.8 2.3-2 2.3-3.4 0-.3-.1-.7-.2-1 .6-.3.9-.6.9-1 0-.5-.5-.7-1-.7-.3 0-.6.1-.9.1-.5 0-.8-.3-.8-.8V7.6C18.8 2.2 14.7.8 12.2.8h-.034z"/>
      </svg>
    ),
  },
];

const OAUTH_PLATFORMS = new Set(["facebook", "instagram"]);

export default function ConnectAccountPage() {
  const [step, setStep] = useState<"pick" | "details">("pick");
  const [selected, setSelected] = useState<typeof PLATFORMS[0] | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const avatarRef = useRef<HTMLInputElement>(null);

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarUrl(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handlePickPlatform(p: typeof PLATFORMS[0]) {
    if (OAUTH_PLATFORMS.has(p.value)) {
      // Redirect to real OAuth — Facebook handles both FB + Instagram pages
      window.location.href = "/api/facebook/auth";
      return;
    }
    setSelected(p);
    setStep("details");
  }

  return (
    <>
      <Topbar title="Tilslut kanal" description="Tilføj en social medie-side eller profil." />
      <div className="flex-1 flex items-start justify-center px-8 py-10">
        <div className="w-full max-w-md">

          {/* Back link */}
          <button
            type="button"
            onClick={() => step === "details" ? setStep("pick") : window.history.back()}
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={14} />
            {step === "details" ? "Vælg anden platform" : "Tilbage til konti"}
          </button>

          {/* Step: Pick platform */}
          {step === "pick" && (
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900">Vælg platform</h2>
                <p className="text-sm text-slate-500 mt-0.5">Hvilken social medie-kanal vil du tilslutte?</p>
              </div>
              <div className="p-4 grid grid-cols-2 gap-3">
                {PLATFORMS.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => handlePickPlatform(p)}
                    className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3.5 text-left hover:border-slate-200 hover:bg-white hover:shadow-sm transition-all group"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: p.bg }}>
                      {p.icon}
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">{p.label}</span>
                      {OAUTH_PLATFORMS.has(p.value) && (
                        <p className="text-[10px] text-emerald-600 font-medium">OAuth tilslutning</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step: Details */}
          {step === "details" && selected && (
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: selected.bg }}>
                    {selected.icon}
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Tilslut {selected.label}</h2>
                    <p className="text-xs text-slate-400">Udfyld dine kanaloplysninger</p>
                  </div>
                </div>
                <Link href="/accounts" className="text-slate-300 hover:text-slate-500 transition-colors">
                  <X size={18} />
                </Link>
              </div>

              <form action={connectAccountAction} className="px-6 py-5 space-y-5">
                <input type="hidden" name="platform" value={selected.value} />

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                    Navn <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="account_name"
                    required
                    placeholder={selected.namePlaceholder}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  />
                </div>

                {/* URL */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                    {selected.urlLabel}
                  </label>
                  <input
                    type="text"
                    name="profile_url"
                    placeholder={selected.urlPlaceholder}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  />
                </div>

                {/* Avatar */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                    Avatar <span className="text-xs font-normal text-slate-400">(valgfrit)</span>
                  </label>
                  <div className="flex items-center gap-4 rounded-xl border border-slate-200 p-3">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-100 overflow-hidden">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
                      ) : (
                        <User size={24} className="text-slate-300" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-slate-500 mb-2">Minimum 180×180 px, maks. 2 MB</p>
                      <button
                        type="button"
                        onClick={() => avatarRef.current?.click()}
                        className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
                      >
                        <Upload size={12} /> Upload billede
                      </button>
                    </div>
                    {avatarUrl && (
                      <button type="button" onClick={() => setAvatarUrl(null)} className="text-slate-300 hover:text-slate-500">
                        <X size={14} />
                      </button>
                    )}
                  </div>
                  <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                  {avatarUrl && <input type="hidden" name="avatar_url" value={avatarUrl} />}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <Link href="/accounts" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
                    Annuller
                  </Link>
                  <button
                    type="submit"
                    className="rounded-xl px-6 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
                  >
                    Fortsæt
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
