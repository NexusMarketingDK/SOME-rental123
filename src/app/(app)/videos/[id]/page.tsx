import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Topbar } from "@/components/layout/topbar";
import { VideoStatusClient } from "@/components/video-status-client";
import type { SocialAccount } from "@/types/database";

export default async function VideoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) notFound();

  const [{ data: order }, { data: accounts }] = await Promise.all([
    supabase.from("video_orders").select("*").eq("id", id).eq("user_id", user.id).single(),
    supabase.from("social_accounts").select("*").eq("user_id", user.id).order("created_at"),
  ]);

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
          initialVideoUrls={(order as any).video_urls ?? undefined}
          title={order.title ?? ""}
          imageUrls={order.image_urls ?? []}
          accounts={(accounts ?? []) as SocialAccount[]}
        />
      </div>
    </>
  );
}
