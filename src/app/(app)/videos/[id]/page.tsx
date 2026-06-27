import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Topbar } from "@/components/layout/topbar";
import { VideoStatusClient } from "@/components/video-status-client";

export default async function VideoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) notFound();

  const { data: order } = await supabase
    .from("video_orders")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!order) notFound();

  return (
    <>
      <Topbar
        title={order.title ?? "Video"}
        description="AI-genereret præsentationsvideo"
      />
      <div className="flex-1 px-8 py-8 max-w-3xl">
        <VideoStatusClient
          orderId={id}
          initialStatus={order.status}
          initialVideoUrl={order.video_url ?? undefined}
          title={order.title ?? ""}
          imageUrls={order.image_urls ?? []}
        />
      </div>
    </>
  );
}
