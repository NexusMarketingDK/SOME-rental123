import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { createPostAction } from "@/services/posts";
import { getProperties } from "@/services/properties";
import { getSocialAccounts } from "@/services/social-accounts";
import { FormField } from "@/components/ui/form-field";

export default async function NewPostPage() {
  const [properties, accounts] = await Promise.all([getProperties(), getSocialAccounts()]);

  return (
    <>
      <Topbar title="New post" description="Write and schedule a social media post." />
      <div className="flex-1 px-8 py-6">
        <div className="mx-auto max-w-2xl">
          <Link href="/posts" className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900">
            <ArrowLeft size={14} /> Back to posts
          </Link>

          <form action={createPostAction} className="flex flex-col gap-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* Content */}
            <FormField label="Caption" name="content" placeholder="Write your post…" textarea required />

            {/* Property (optional) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">Property (optional)</label>
              <select
                name="property_id"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-[#FF6B4A] focus:outline-none focus:ring-2 focus:ring-[#FF6B4A]/20"
              >
                <option value="">No property</option>
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </div>

            {/* Social accounts */}
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-slate-700">Publish to</p>
              {accounts.length === 0 ? (
                <p className="text-sm text-slate-400">
                  No accounts connected. <Link href="/accounts/connect" className="underline text-[#FF6B4A]">Connect one first.</Link>
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  {accounts.map((a) => (
                    <label key={a.id} className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 hover:bg-slate-50 has-[:checked]:border-[#FF6B4A] has-[:checked]:bg-orange-50">
                      <input type="checkbox" name="account_ids[]" value={a.id} className="accent-[#FF6B4A]" />
                      <span className="text-sm text-slate-800">{a.account_name}</span>
                      <span className="ml-auto text-xs capitalize text-slate-400">{a.platform}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Schedule */}
            <FormField label="Schedule for (optional)" name="scheduled_at" type="datetime-local" />

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <Link href="/posts" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                Cancel
              </Link>
              <button
                type="submit"
                className="rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
              >
                Save post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
