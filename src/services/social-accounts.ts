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

export async function disconnectAccountAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  const supabase = await createClient();

  const { error } = await supabase.from("social_accounts").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/accounts");
}
