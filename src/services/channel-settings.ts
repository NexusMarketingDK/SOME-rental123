"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type PostingSlot = {
  day: number;
  enabled: boolean;
  times: string[];
};

export type ChannelSettingsInput = {
  accountId: string;
  timezone: string;
  posting_goal: number;
  posting_slots: PostingSlot[];
};

export async function saveChannelSettings(input: ChannelSettingsInput) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  await supabase.from("channel_settings").upsert(
    {
      social_account_id: input.accountId,
      user_id: user.id,
      timezone: input.timezone,
      posting_goal: input.posting_goal,
      posting_slots: input.posting_slots,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "social_account_id" }
  );

  revalidatePath(`/accounts/${input.accountId}`);
}
