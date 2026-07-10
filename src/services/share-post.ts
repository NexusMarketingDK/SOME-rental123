"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { publishPhotoToFacebook, publishPhotoToInstagram } from "@/lib/social-publish";
import type { SocialAccount } from "@/types/database";

export type SharePostResult = {
  success: boolean;
  error?: string;
  published: string[]; // account names that succeeded
  errors: string[]; // "Name: reason" for failures
};

/**
 * Publish an existing post directly to the selected connected accounts
 * (Facebook Pages and/or Instagram Business accounts) via the Graph API.
 */
export async function sharePostToSocial(
  postId: string,
  accountIds: string[]
): Promise<SharePostResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Ikke logget ind.", published: [], errors: [] };
  if (accountIds.length === 0)
    return { success: false, error: "Vælg mindst én side eller konto.", published: [], errors: [] };

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId)
    .eq("user_id", user.id)
    .single();
  if (!post) return { success: false, error: "Opslag ikke fundet.", published: [], errors: [] };

  const { data: accounts } = await supabase
    .from("social_accounts")
    .select("*")
    .in("id", accountIds)
    .eq("user_id", user.id);

  if (!accounts?.length)
    return { success: false, error: "Ingen forbundne konti valgt.", published: [], errors: [] };

  const imageUrl = post.image_urls?.[0] as string | undefined;
  const published: string[] = [];
  const errors: string[] = [];

  for (const acc of accounts as SocialAccount[]) {
    const token = acc.meta?.page_token ?? acc.access_token;
    if (!token || token === "mock_token") {
      errors.push(`${acc.account_name}: mangler gyldig adgang — forbind kontoen igen.`);
      await recordDistribution(supabase, postId, acc.id, false, "Manglende adgangstoken");
      continue;
    }

    let result;
    if (acc.platform === "facebook") {
      result = await publishPhotoToFacebook(acc.account_id, token, post.content, imageUrl);
    } else if (acc.platform === "instagram") {
      if (!imageUrl) {
        errors.push(`${acc.account_name}: Instagram kræver et billede i opslaget.`);
        await recordDistribution(supabase, postId, acc.id, false, "Instagram kræver billede");
        continue;
      }
      result = await publishPhotoToInstagram(acc.account_id, token, post.content, imageUrl);
    } else {
      errors.push(`${acc.account_name}: platformen understøttes ikke til direkte publicering.`);
      continue;
    }

    if (result.success) {
      published.push(acc.account_name);
      await recordDistribution(supabase, postId, acc.id, true);
    } else {
      errors.push(`${acc.account_name}: ${result.error}`);
      await recordDistribution(supabase, postId, acc.id, false, result.error);
    }
  }

  if (published.length > 0) {
    await supabase
      .from("posts")
      .update({ status: "published", published_at: new Date().toISOString() })
      .eq("id", postId);
    revalidatePath("/posts");
  }

  return { success: published.length > 0, published, errors };
}

async function recordDistribution(
  supabase: Awaited<ReturnType<typeof createClient>>,
  postId: string,
  accountId: string,
  ok: boolean,
  error?: string
) {
  await supabase.from("post_distributions").upsert(
    {
      post_id: postId,
      social_account_id: accountId,
      status: ok ? "sent" : "failed",
      sent_at: ok ? new Date().toISOString() : null,
      error_message: ok ? null : error ?? null,
    },
    { onConflict: "post_id,social_account_id" }
  );
}
