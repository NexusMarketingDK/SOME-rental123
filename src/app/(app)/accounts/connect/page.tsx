import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { connectAccountAction } from "@/services/social-accounts";

export default function ConnectAccountPage() {
  return (
    <>
      <Topbar title="Connect account" description="Add a Facebook or LinkedIn page." />
      <div className="flex-1 px-8 py-6">
        <div className="mx-auto max-w-lg">
          <Link href="/accounts" className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900">
            <ArrowLeft size={14} /> Back to accounts
          </Link>

          {/* Platform picker + mock connect form */}
          <form action={connectAccountAction} className="flex flex-col gap-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div>
              <p className="mb-3 text-sm font-medium text-slate-700">Choose platform</p>
              <div className="grid grid-cols-2 gap-3">
                <label className="relative flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-slate-200 p-4 transition-colors has-[:checked]:border-[#FF6B4A] has-[:checked]:bg-orange-50">
                  <input type="radio" name="platform" value="facebook" required className="sr-only" />
                  <span className="text-2xl font-bold text-blue-600">f</span>
                  <span className="text-sm font-medium text-slate-800">Facebook Page</span>
                </label>
                <label className="relative flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-slate-200 p-4 transition-colors has-[:checked]:border-[#FF6B4A] has-[:checked]:bg-orange-50">
                  <input type="radio" name="platform" value="linkedin" className="sr-only" />
                  <span className="text-2xl font-bold text-sky-700">in</span>
                  <span className="text-sm font-medium text-slate-800">LinkedIn Page</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">
                Page name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="account_name"
                required
                placeholder="My Holiday Rentals"
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-[#FF6B4A] focus:outline-none focus:ring-2 focus:ring-[#FF6B4A]/20"
              />
              <p className="text-xs text-slate-400">
                In production this would redirect to OAuth. For now, enter the page name manually.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <Link href="/accounts" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                Cancel
              </Link>
              <button
                type="submit"
                className="rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
              >
                Connect account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
