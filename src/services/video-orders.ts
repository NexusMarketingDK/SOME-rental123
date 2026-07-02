"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getVideoJobsStatus, startVideoGeneration } from "@/lib/google-video";

export async function deleteVideoOrder(orderId: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Ikke logget ind" };
  const { error } = await supabase
    .from("video_orders")
    .delete()
    .eq("id", orderId)
    .eq("user_id", user.id);
  if (error) return { error: error.message };
  revalidatePath("/videos");
  revalidatePath("/dashboard");
  return {};
}

export async function pollVideoOrder(orderId: string): Promise<{
  status: string;
  videoUrl?: string;
  videoUrls?: string[];
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

  if (order.status === "ready") {
    const urls: string[] = order.video_urls?.length ? order.video_urls : order.video_url ? [order.video_url] : [];
    return { status: "ready", videoUrl: urls[0], videoUrls: urls };
  }

  // Use multi-job IDs if available, else fall back to single job
  const jobIds: string[] = order.higgsfield_job_ids?.length
    ? order.higgsfield_job_ids
    : order.higgsfield_job_id
    ? [order.higgsfield_job_id]
    : [];

  if (!jobIds.length) return { status: order.status };

  const result = await getVideoJobsStatus(jobIds, orderId);

  if (result.status === "completed" && result.videoUrls?.length) {
    await supabase.from("video_orders").update({
      status: "ready",
      video_url: result.videoUrls[0],
      video_urls: result.videoUrls,
    }).eq("id", orderId);
    return { status: "ready", videoUrl: result.videoUrls[0], videoUrls: result.videoUrls };
  }

  if (result.status === "failed") {
    await supabase.from("video_orders").update({ status: "failed" }).eq("id", orderId);
    return { status: "failed" };
  }

  return { status: "processing" };
}

export async function restartVideoOrder(orderId: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Ikke logget ind" };

  const { data: order } = await supabase
    .from("video_orders")
    .select("image_urls, title")
    .eq("id", orderId)
    .eq("user_id", user.id)
    .single();

  if (!order) return { error: "Ordre ikke fundet" };

  const imageUrls: string[] = order.image_urls ?? [];
  if (!imageUrls.length) return { error: "Ingen billeder på ordren" };

  await supabase.from("video_orders").update({
    status: "processing",
    higgsfield_job_id: null,
    higgsfield_job_ids: [],
    video_url: null,
    video_urls: [],
  }).eq("id", orderId);

  try {
    const jobIds = await startVideoGeneration(imageUrls, order.title ?? "Bolig fremvisning");
    await supabase.from("video_orders").update({
      higgsfield_job_id: jobIds[0] ?? null,
      higgsfield_job_ids: jobIds,
    }).eq("id", orderId);
  } catch {
    // Generation start failed — stays in processing for poll-based retry
  }

  revalidatePath("/videos");
  revalidatePath(`/videos/${orderId}`);
  return {};
}
