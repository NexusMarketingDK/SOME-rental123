import Link from "next/link";
import { Plus } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { getSocialAccounts } from "@/services/social-accounts";
import { DisconnectAccountButton } from "@/components/accounts/disconnect-button";
import type { SocialAccount } from "@/types/database";

function PlatformIcon({ platform }: { platform: SocialAccount["platform"] }) {
  const styles = platform === "facebook"
    ? "bg-blue-600 text-white"
    : "bg-sky-700 text-white";
  return (
    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${styles}`}>
      {platform === "facebook" ? "fb" : "in"}
    </span>
  );
}

function platformLabel(platform: SocialAccount["platform"]) {
  return platform === "facebook" ? "Facebook Page" : "LinkedIn Page";
}

export default async function AccountsPage() {
  const accounts = await getSocialAccounts();

  return (
    <>
      <Topbar
        title="Social accounts"
        description="Connect your Facebook and LinkedIn pages to start posting."
        action={
          <Link
            href="/accounts/connect"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
          >
            <Plus size={16} />
            Connect account
          </Link>
        }
      />

      <div className="flex-1 px-8 py-6">
        {accounts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-20 text-center">
            <p className="text-sm font-medium text-slate-900">No accounts connected</p>
            <p className="mt-1 text-sm text-slate-500">Connect a Facebook or LinkedIn page to publish posts.</p>
            <Link
              href="/accounts/connect"
              className="mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white"
              style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
            >
              <Plus size={16} />
              Connect account
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {accounts.map((account) => (
              <div key={account.id} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                  <PlatformIcon platform={account.platform} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{account.account_name}</p>
                  <p className="text-xs text-slate-500">{platformLabel(account.platform)}</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                  Connected
                </span>
                <DisconnectAccountButton id={account.id} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
