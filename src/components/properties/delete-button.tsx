"use client";

import { Trash2 } from "lucide-react";
import { deletePropertyAction } from "@/services/properties";

export function DeletePropertyButton({ id }: { id: string }) {
  return (
    <form action={deletePropertyAction}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        onClick={(e) => {
          if (!confirm("Delete this property?")) e.preventDefault();
        }}
        className="flex items-center gap-1 rounded-lg border border-red-100 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50"
      >
        <Trash2 size={11} /> Delete
      </button>
    </form>
  );
}
