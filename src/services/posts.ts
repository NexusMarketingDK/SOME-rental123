"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Post } from "@/types/database";

export type PostWithProperty = Post & {
  properties: { title: string } | null;
};

export async function getPosts(): Promise<PostWithProperty[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*, properties(title)")
    .order("created_at", { ascending: false });
  if (error) return [];
  return (data ?? []) as PostWithProperty[];
}

export async function createPostAction(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const content = String(formData.get("content") ?? "").trim();
  const property_id = String(formData.get("property_id") ?? "").trim() || null;
  const scheduled_at = String(formData.get("scheduled_at") ?? "").trim() || null;
  const accountIds = formData.getAll("account_ids[]").map(String);

  if (!content) return;

  const status = scheduled_at ? "scheduled" : "draft";

  const { data: post, error } = await supabase
    .from("posts")
    .insert({ user_id: user.id, content, property_id, scheduled_at, status })
    .select()
    .single();

  if (error) throw error;

  if (accountIds.length > 0) {
    await supabase.from("post_distributions").insert(
      accountIds.map((sid) => ({
        post_id: post.id,
        social_account_id: sid,
        status: "pending",
      }))
    );
  }

  revalidatePath("/posts");
  redirect("/posts");
}

export async function deletePostAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  const supabase = await createClient();
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/posts");
}
