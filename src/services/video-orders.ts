"use server";

import { createClient } from "@/lib/supabase/server";
import { getVideoJobStatus } from "@/lib/higgsfield";

export async function pollVideoOrder(orderId: string): Promise<{
  status: string;
  videoUrl?: string;
}> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { status: "failed" };

  const { data: order } = await supabase
    .from("video_orders")
    .select("*")
    .eq("id", orderId)
    .eq("user_id", user.id)
    .single();

  if (!order) return { status: "failed" };
  if (order.status === "ready") return { status: "ready", videoUrl: order.video_url };
  if (!order.higgsfield_job_id) return { status: order.status };

  // Check Higgsfield status
  const result = await getVideoJobStatus(order.higgsfield_job_id);

  if (result.status === "completed" && result.videoUrl) {
    await supabase.from("video_orders").update({
      status: "ready",
      video_url: result.videoUrl,
    }).eq("id", orderId);
    return { status: "ready", videoUrl: result.videoUrl };
  }

  if (result.status === "failed") {
    await supabase.from("video_orders").update({ status: "failed" }).eq("id", orderId);
    return { status: "failed" };
  }

  return { status: "processing" };
}
