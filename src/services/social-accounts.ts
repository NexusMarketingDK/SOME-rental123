"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { SocialAccount } from "@/types/database";

export async function getSocialAccounts(): Promise<SocialAccount[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("social_accounts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return [];
  if (error) throw error;
  return data ?? [];
}

// Mock OAuth connect — in production this would redirect to the platform's OAuth flow
export async function connectAccountAction(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const platform = String(formData.get("platform") ?? "");
  const account_name = String(formData.get("account_name") ?? "").trim();
  const account_id = String(formData.get("account_id") ?? "").trim() || `mock_${Date.now()}`;

  if (!platform || !account_name) return;

  const { error } = await supabase.from("social_accounts").insert({
    user_id: user.id,
    platform,
    account_name,
    account_id,
    access_token: "mock_token",
  });

  if (error) redirect("/accounts/connect?error=db");
  revalidatePath("/accounts");
  redirect("/accounts");
}

type FbPageInput = {
  id: string;
  name: string;
  instagram_business_account?: { id: string };
  igUsername?: string | null;
};
type FbGroupInput = { id: string; name: string };

export async function saveFacebookSelection(input: {
  userToken: string;
  pages: FbPageInput[];
  groups: FbGroupInput[];
}): Promise<{ error?: string } | void> {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const raw = cookieStore.get("fb_connect")?.value;
  if (!raw) return { error: "Sessionen er udløbet. Start forbindelsen igen." };

  let payload: { userToken: string; pages: Array<FbPageInput & { access_token: string }>; groups: FbGroupInput[] };
  try {
    payload = JSON.parse(Buffer.from(raw, "base64").toString("utf-8"));
  } catch {
    return { error: "Ugyldig sessionsdata." };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Ikke logget ind." };

  // Build a lookup for page tokens from cookie (never trust client for tokens)
  const pageTokenMap = new Map(payload.pages.map((p) => [p.id, p.access_token]));

  for (const page of input.pages) {
    const pageToken = pageTokenMap.get(page.id);
    if (!pageToken) continue;

    await supabase.from("social_accounts").upsert(
      {
        user_id: user.id,
        platform: "facebook",
        account_id: page.id,
        account_name: page.name,
        access_token: pageToken,
      },
      { onConflict: "user_id,account_id" }
    );

    if (page.instagram_business_account?.id) {
      await supabase.from("social_accounts").upsert(
        {
          user_id: user.id,
          platform: "instagram",
          account_id: page.instagram_business_account.id,
          account_name: page.igUsername ?? page.name,
          access_token: pageToken,
          meta: { page_id: page.id },
        },
        { onConflict: "user_id,account_id" }
      );
    }
  }

  for (const group of input.groups) {
    await supabase.from("social_accounts").upsert(
      {
        user_id: user.id,
        platform: "facebook",
        account_id: group.id,
        account_name: group.name,
        access_token: payload.userToken,
        meta: { type: "group" },
      },
      { onConflict: "user_id,account_id" }
    );
  }

  // Clear the cookie
  cookieStore.delete("fb_connect");
  revalidatePath("/accounts");
}

export async function disconnectAccountAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  const supabase = await createClient();

  const { error } = await supabase.from("social_accounts").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/accounts");
}
