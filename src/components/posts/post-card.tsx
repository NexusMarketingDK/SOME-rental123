"use client";

import { useState } from "react";
import { Calendar, Pencil, X } from "lucide-react";
import { DeletePostButton } from "@/components/posts/delete-button";
import { PublishPanel, type ConnectedAccount } from "@/components/posts/publish-panel";
import type { PostWithProperty } from "@/services/posts";
import type { PostStatus } from "@/types/database";

const statusStyles: Record<PostStatus, string> = {
  draft: "bg-slate-100 text-slate-600",
  scheduled: "bg-blue-50 text-blue-700",
  published: "bg-emerald-50 text-emerald-700",
  failed: "bg-red-50 text-red-600",
};

const statusLabels: Record<PostStatus, string> = {
  draft: "Kladde",
  scheduled: "Planlagt",
  published: "Publiceret",
  failed: "Fejlet",
};

export function PostCard({ post, accounts = [] }: { post: PostWithProperty; accounts?: ConnectedAccount[] }) {
  const [expanded, setExpanded] = useState(false);
  const thumbnail = post.image_urls?.[0] ?? null;

  return (
    <>
      <div
        className="flex items-stretch gap-0 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden transition hover:shadow-md cursor-pointer"
        onClick={() => setExpanded(true)}
      >
        {/* Thumbnail */}
        {thumbnail ? (
          <div className="w-20 shrink-0 bg-slate-100">
            <img src={thumbnail} alt="" className="h-full w-full object-cover" />
          </div>
        ) : (
          <div className="w-20 shrink-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
            <span className="text-2xl opacity-30">🖼</span>
          </div>
        )}

        {/* Content */}
        <div className="flex flex-1 min-w-0 items-center gap-4 px-5 py-4">
          <div className="flex-1 min-w-0">
            <p className="line-clamp-2 text-sm text-slate-800">{post.content}</p>
            {post.properties && (
              <p className="mt-1 text-xs text-slate-400">{post.properties.title}</p>
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
          <div className="flex items-center gap-3 shrink-0" onClick={(e) => e.stopPropagation()}>
            <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[post.status]}`}>
              {statusLabels[post.status]}
            </span>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setExpanded(true); }}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              title="Åbn"
            >
              <Pencil size={14} />
            </button>
            <DeletePostButton id={post.id} />
          </div>
        </div>
      </div>

      {/* Modal */}
      {expanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={() => setExpanded(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[post.status]}`}>
                  {statusLabels[post.status]}
                </span>
                {post.properties && (
                  <span className="text-sm text-slate-500">{post.properties.title}</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
              >
                <X size={16} />
              </button>
            </div>

            {/* Image */}
            {thumbnail && (
              <div className="w-full aspect-video bg-slate-100">
                <img src={thumbnail} alt="" className="h-full w-full object-cover" />
              </div>
            )}

            {/* Content */}
            <div className="px-6 py-5 max-h-64 overflow-y-auto">
              <p className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">{post.content}</p>
              {post.scheduled_at && (
                <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
                  <Calendar size={12} />
                  Planlagt: {new Date(post.scheduled_at).toLocaleDateString("da-DK", {
                    day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
                  })}
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50">
              <div onClick={() => setExpanded(false)}>
                <DeletePostButton id={post.id} />
              </div>
              <div className="flex items-center gap-2">
                <PublishPanel postId={post.id} text={post.content} imageUrl={thumbnail ?? undefined} accounts={accounts} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
