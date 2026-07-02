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

  // Optional: base64 image chosen by the user (1 credit deducted below)
  const imageData = String(formData.get("image_data") ?? "").trim();
  const imageMime = String(formData.get("image_mime") ?? "image/png").trim();

  if (!content) return;

  const status = scheduled_at ? "scheduled" : "draft";

  // Upload AI-generated image to storage if provided
  let imageUrls: string[] = [];
  if (imageData) {
    try {
      const base64 = imageData.replace(/^data:[^;]+;base64,/, "");
      const buffer = Buffer.from(base64, "base64");
      const ext = imageMime.includes("png") ? "png" : "jpg";
      const path = `${user.id}/${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("post-images")
        .upload(path, buffer, { contentType: imageMime, upsert: true });

      if (!uploadError) {
        const { data: urlData } = supabase.storage.from("post-images").getPublicUrl(path);
        imageUrls = [urlData.publicUrl];

        // Deduct 1 credit for the chosen image
        const { data: credits } = await supabase
          .from("ai_credits")
          .select("balance")
          .eq("user_id", user.id)
          .single();

        if (credits && credits.balance >= 1) {
          await supabase
            .from("ai_credits")
            .update({ balance: credits.balance - 1 })
            .eq("user_id", user.id);
        }
      }
    } catch {
      // Image upload failed — continue without image
    }
  }

  const { data: post, error } = await supabase
    .from("posts")
    .insert({ user_id: user.id, content, property_id, scheduled_at, status, image_urls: imageUrls })
    .select()
    .single();

  if (error) redirect("/posts/new?error=db");

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
