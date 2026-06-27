"use server";

type PublishResult = { success: boolean; error?: string; platformPostId?: string };

export async function publishToFacebook(
  pageId: string,
  pageToken: string,
  message: string,
  videoUrl: string
): Promise<PublishResult> {
  try {
    const res = await fetch(`https://graph.facebook.com/v19.0/${pageId}/videos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        file_url: videoUrl,
        description: message,
        access_token: pageToken,
      }),
    });
    const data = await res.json();
    if (data.error) return { success: false, error: data.error.message };
    return { success: true, platformPostId: data.id };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export async function publishToInstagram(
  igUserId: string,
  pageToken: string,
  caption: string,
  videoUrl: string
): Promise<PublishResult> {
  try {
    // Step 1: Create media container
    const containerRes = await fetch(`https://graph.facebook.com/v19.0/${igUserId}/media`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        media_type: "REELS",
        video_url: videoUrl,
        caption,
        access_token: pageToken,
      }),
    });
    const container = await containerRes.json();
    if (container.error) return { success: false, error: container.error.message };

    // Step 2: Publish the container
    const publishRes = await fetch(`https://graph.facebook.com/v19.0/${igUserId}/media_publish`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        creation_id: container.id,
        access_token: pageToken,
      }),
    });
    const published = await publishRes.json();
    if (published.error) return { success: false, error: published.error.message };
    return { success: true, platformPostId: published.id };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : String(e) };
  }
}
