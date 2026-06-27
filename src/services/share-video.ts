"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function shareVideoToSocial(formData: FormData): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const content = String(formData.get("content") ?? "").trim();
  const videoUrl = String(formData.get("video_url") ?? "").trim();
  const accountIds = formData.getAll("account_ids[]").map(String).filter(Boolean);
  const scheduledAt = String(formData.get("scheduled_at") ?? "").trim() || null;

  if (!content || !videoUrl || accountIds.length === 0) {
    return { error: "Udfyld billedtekst og vælg mindst én kanal." };
  }

  const status = scheduledAt ? "scheduled" : "scheduled";

  const { data: post, error } = await supabase
    .from("posts")
    .insert({
      user_id: user.id,
      content,
      image_urls: [videoUrl],
      status,
      scheduled_at: scheduledAt ?? new Date().toISOString(),
    })
    .select()
    .single();

  if (error || !post) return { error: "Kunne ikke oprette opslag." };

  await supabase.from("post_distributions").insert(
    accountIds.map((sid) => ({
      post_id: post.id,
      social_account_id: sid,
      status: "pending",
    }))
  );

  revalidatePath("/posts");
  return {};
}

export async function getConnectedAccounts() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  const { data } = await supabase.from("social_accounts").select("*").eq("user_id", user.id).order("created_at");
  return data ?? [];
}
