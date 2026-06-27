"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { publishToFacebook, publishToInstagram } from "@/lib/social-publish";
import type { SocialAccount } from "@/types/database";

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

  // Fetch selected accounts
  const { data: accounts } = await supabase
    .from("social_accounts")
    .select("*")
    .in("id", accountIds)
    .eq("user_id", user.id);

  const isImmediate = !scheduledAt;
  const publishErrors: string[] = [];

  // Publish immediately if no schedule and real token exists
  if (isImmediate && accounts?.length) {
    for (const account of accounts as SocialAccount[]) {
      if (!account.access_token || account.access_token === "mock_token") continue;

      if (account.platform === "facebook") {
        const res = await publishToFacebook(account.account_id, account.access_token, content, videoUrl);
        if (!res.success) publishErrors.push(`Facebook (${account.account_name}): ${res.error}`);
      } else if (account.platform === "instagram") {
        const meta = account.meta as Record<string, string> | null;
        const igId = account.account_id;
        const token = meta?.page_token ?? account.access_token;
        const res = await publishToInstagram(igId, token, content, videoUrl);
        if (!res.success) publishErrors.push(`Instagram (${account.account_name}): ${res.error}`);
      }
    }
  }

  // Create post record for tracking / future scheduled posts
  const { data: post, error } = await supabase
    .from("posts")
    .insert({
      user_id: user.id,
      content,
      image_urls: [videoUrl],
      status: isImmediate ? "published" : "scheduled",
      scheduled_at: scheduledAt ?? new Date().toISOString(),
    })
    .select()
    .single();

  if (error || !post) return { error: "Kunne ikke oprette opslag." };

  await supabase.from("post_distributions").insert(
    accountIds.map((sid) => ({
      post_id: post.id,
      social_account_id: sid,
      status: isImmediate ? "published" : "pending",
    }))
  );

  revalidatePath("/posts");

  if (publishErrors.length > 0) {
    return { error: publishErrors.join("; ") };
  }

  return {};
}

export async function getConnectedAccounts() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  const { data } = await supabase.from("social_accounts").select("*").eq("user_id", user.id).order("created_at");
  return data ?? [];
}
