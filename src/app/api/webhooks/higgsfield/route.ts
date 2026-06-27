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

  await supabase
    .from("video_orders")
    .update({
      status: dbStatus,
      video_url: videoUrl ?? null,
    })
    .eq("higgsfield_job_id", jobId);

  return NextResponse.json({ received: true });
}
