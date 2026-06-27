import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getVideoJobsStatus } from "@/lib/higgsfield";

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: orders } = await supabase
    .from("video_orders")
    .select("id, higgsfield_job_id, higgsfield_job_ids, status")
    .eq("user_id", user.id)
    .eq("status", "processing");

  if (!orders?.length) return NextResponse.json({ updated: 0 });

  let updated = 0;
  await Promise.all(
    orders.map(async (order) => {
      const jobIds: string[] = (order as any).higgsfield_job_ids?.length
        ? (order as any).higgsfield_job_ids
        : order.higgsfield_job_id
        ? [order.higgsfield_job_id]
        : [];

      if (!jobIds.length) return;

      try {
        const result = await getVideoJobsStatus(jobIds);
        if (result.status === "completed" && result.videoUrls?.length) {
          await supabase.from("video_orders").update({
            status: "ready",
            video_url: result.videoUrls[0],
            video_urls: result.videoUrls,
          }).eq("id", order.id);
          updated++;
        } else if (result.status === "failed") {
          await supabase.from("video_orders").update({ status: "failed" }).eq("id", order.id);
          updated++;
        }
      } catch {
        // Higgsfield unavailable — skip silently
      }
    })
  );

  return NextResponse.json({ updated });
}
