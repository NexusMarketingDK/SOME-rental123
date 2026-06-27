// Higgsfield.ai API client
// Docs: https://higgsfield.ai/docs

const HIGGSFIELD_API_URL = "https://api.higgsfield.ai/v1";

export async function generateVideo({
  imageUrls,
  title,
  webhookUrl,
}: {
  imageUrls: string[];
  title: string;
  webhookUrl: string;
}): Promise<{ jobId: string }> {
  const apiKey = process.env.HIGGSFIELD_API_KEY;
  if (!apiKey) throw new Error("HIGGSFIELD_API_KEY is not set");

  const res = await fetch(`${HIGGSFIELD_API_URL}/slideshow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      images: imageUrls,
      title,
      style: "real_estate",
      aspect_ratio: "9:16", // vertical for Reels/TikTok
      duration: 30,
      webhook_url: webhookUrl,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Higgsfield API error: ${err}`);
  }

  const data = await res.json();
  return { jobId: data.job_id ?? data.id };
}

export async function getVideoStatus(jobId: string): Promise<{
  status: "pending" | "processing" | "ready" | "failed";
  videoUrl?: string;
}> {
  const apiKey = process.env.HIGGSFIELD_API_KEY;
  if (!apiKey) throw new Error("HIGGSFIELD_API_KEY is not set");

  const res = await fetch(`${HIGGSFIELD_API_URL}/jobs/${jobId}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!res.ok) return { status: "failed" };

  const data = await res.json();
  return {
    status: data.status,
    videoUrl: data.output_url ?? data.video_url,
  };
}
