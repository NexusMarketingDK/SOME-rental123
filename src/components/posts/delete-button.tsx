"use client";

import { Trash2 } from "lucide-react";
import { deletePostAction } from "@/services/posts";

export function DeletePostButton({ id }: { id: string }) {
  return (
    <form action={deletePostAction}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        onClick={(e) => {
          if (!confirm("Delete this post?")) e.preventDefault();
        }}
        className="flex items-center gap-1 rounded-lg border border-red-100 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50"
      >
        <Trash2 size={11} />
      </button>
    </form>
  );
}
