import Link from "next/link";
import { Plus, Calendar, Clock } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { getPosts } from "@/services/posts";
import { DeletePostButton } from "@/components/posts/delete-button";
import type { PostStatus } from "@/types/database";

const statusStyles: Record<PostStatus, string> = {
  draft: "bg-slate-100 text-slate-600",
  scheduled: "bg-blue-50 text-blue-700",
  published: "bg-emerald-50 text-emerald-700",
  failed: "bg-red-50 text-red-600",
};

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <>
      <Topbar
        title="Posts"
        description="Create and manage your social media posts."
        action={
          <Link
            href="/posts/new"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
          >
            <Plus size={16} />
            New post
          </Link>
        }
      />

      <div className="flex-1 px-8 py-6">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-20 text-center">
            <p className="text-sm font-medium text-slate-900">No posts yet</p>
            <p className="mt-1 text-sm text-slate-500">Create your first post to get started.</p>
            <Link
              href="/posts/new"
              className="mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white"
              style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
            >
              <Plus size={16} />
              New post
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {posts.map((post) => (
              <div key={post.id} className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                <div className="flex-1 min-w-0">
                  <p className="line-clamp-2 text-sm text-slate-800">{post.content}</p>
                  {post.properties && (
                    <p className="mt-1 text-xs text-slate-500">{post.properties.title}</p>
                  )}
                  {post.scheduled_at && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-slate-400">
                      <Calendar size={11} />
                      {new Date(post.scheduled_at).toLocaleDateString("da-DK", {
                        day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
                      })}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusStyles[post.status]}`}>
                    {post.status}
                  </span>
                  <DeletePostButton id={post.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
