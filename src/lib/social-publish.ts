"use server";

type PublishResult = { success: boolean; error?: string; platformPostId?: string };

/**
 * Publish a text/photo post to a Facebook Page.
 * With an image → /{page}/photos (caption + url). Without → /{page}/feed (message).
 */
export async function publishPhotoToFacebook(
  pageId: string,
  pageToken: string,
  message: string,
  imageUrl?: string
): Promise<PublishResult> {
  try {
    const endpoint = imageUrl
      ? `https://graph.facebook.com/v19.0/${pageId}/photos`
      : `https://graph.facebook.com/v19.0/${pageId}/feed`;
    const body: Record<string, string> = { access_token: pageToken };
    if (imageUrl) {
      body.url = imageUrl;
      body.caption = message;
    } else {
      body.message = message;
    }
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.error) return { success: false, error: data.error.message };
    return { success: true, platformPostId: data.post_id ?? data.id };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : String(e) };
  }
}

/**
 * Publish a photo post to an Instagram Business account (2-step container flow).
 * Instagram requires an image — a text-only post is not possible via the API.
 */
export async function publishPhotoToInstagram(
  igUserId: string,
  pageToken: string,
  caption: string,
  imageUrl: string
): Promise<PublishResult> {
  try {
    const containerRes = await fetch(`https://graph.facebook.com/v19.0/${igUserId}/media`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image_url: imageUrl, caption, access_token: pageToken }),
    });
    const container = await containerRes.json();
    if (container.error) return { success: false, error: container.error.message };

    const publishRes = await fetch(`https://graph.facebook.com/v19.0/${igUserId}/media_publish`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ creation_id: container.id, access_token: pageToken }),
    });
    const published = await publishRes.json();
    if (published.error) return { success: false, error: published.error.message };
    return { success: true, platformPostId: published.id };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : String(e) };
  }
}

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
