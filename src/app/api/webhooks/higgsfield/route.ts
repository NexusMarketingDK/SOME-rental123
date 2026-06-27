import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Higgsfield sends: { job_id, status, output_url }
  const jobId = body.job_id ?? body.id;
  const status = body.status;
  const videoUrl = body.output_url ?? body.video_url;

  if (!jobId) {
    return NextResponse.json({ error: "Missing job_id" }, { status: 400 });
  }

  const supabase = await createClient();

  const dbStatus =
    status === "completed" || status === "ready" ? "ready"
    : status === "failed" ? "failed"
    : "processing";

  // Try single-job match first
  await supabase
    .from("video_orders")
    .update({ status: dbStatus, video_url: videoUrl ?? null })
    .eq("higgsfield_job_id", jobId);

  // Also try multi-job match — find orders where this job_id is in the array
  if (dbStatus === "ready" && videoUrl) {
    const { data: orders } = await supabase
      .from("video_orders")
      .select("id, video_urls, higgsfield_job_ids")
      .contains("higgsfield_job_ids", [jobId]);

    for (const order of orders ?? []) {
      const existing: string[] = order.video_urls ?? [];
      const updated = [...existing];
      if (!updated.includes(videoUrl)) updated.push(videoUrl);

      const allJobIds: string[] = order.higgsfield_job_ids ?? [];
      // Mark ready only when we have as many videos as jobs
      const isComplete = updated.length >= allJobIds.length;

      await supabase
        .from("video_orders")
        .update({
          video_urls: updated,
          video_url: updated[0],
          ...(isComplete ? { status: "ready" } : {}),
        })
        .eq("id", order.id);
    }
  }

  return NextResponse.json({ received: true });
}
