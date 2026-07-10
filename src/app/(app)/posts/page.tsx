import Link from "next/link";
import { Plus } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { getPosts } from "@/services/posts";
import { getSocialAccounts } from "@/services/social-accounts";
import { PostCard } from "@/components/posts/post-card";
import type { ConnectedAccount } from "@/components/posts/publish-panel";

export default async function PostsPage() {
  const [posts, allAccounts] = await Promise.all([getPosts(), getSocialAccounts()]);

  // Only Facebook Pages and Instagram accounts support direct publishing.
  const accounts: ConnectedAccount[] = allAccounts
    .filter((a) => a.platform === "facebook" || a.platform === "instagram")
    .map((a) => ({ id: a.id, platform: a.platform as "facebook" | "instagram", name: a.account_name }));

  return (
    <>
      <Topbar
        title="Opslag"
        description="Opret og administrer dine sociale medie-opslag."
        action={
          <Link
            href="/posts/new"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
          >
            <Plus size={16} />
            Nyt opslag
          </Link>
        }
      />

      <div className="flex-1 px-8 py-6">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-20 text-center">
            <p className="text-sm font-medium text-slate-900">Ingen opslag endnu</p>
            <p className="mt-1 text-sm text-slate-500">Opret dit første opslag for at komme i gang.</p>
            <Link
              href="/posts/new"
              className="mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white"
              style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
            >
              <Plus size={16} />
              Nyt opslag
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} accounts={accounts} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
