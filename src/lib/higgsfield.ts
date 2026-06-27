import { HiggsfieldClient } from "@higgsfield/client";

let _client: HiggsfieldClient | null = null;

function getClient(): HiggsfieldClient {
  if (!_client) {
    _client = new HiggsfieldClient({
      apiKey: process.env.HIGGSFIELD_API_KEY_ID,
      apiSecret: process.env.HIGGSFIELD_API_SECRET,
    });
  }
  return _client;
}

export async function startVideoGeneration(
  imageUrls: string[],
  title: string
): Promise<string> {
  const client = getClient();
  const prompt = `Professional real estate showcase video for: ${title}. Smooth cinematic camera movements, warm inviting atmosphere.`;

  const jobSet = await client.generate("/v1/image2video/dop", {
    model: "dop-turbo",
    prompt,
    input_images: imageUrls.map((url) => ({
      type: "image_url",
      image_url: url,
    })),
  });

  return jobSet.id;
}

export async function getVideoJobStatus(jobSetId: string): Promise<{
  status: "queued" | "in_progress" | "completed" | "failed";
  videoUrl?: string;
}> {
  const client = getClient();

  // Use the internal axios client to hit the polling endpoint directly
  // @ts-expect-error accessing private field
  const axiosClient = client.client;
  const res = await axiosClient.get(`/v1/job-sets/${jobSetId}`);
  const jobs: Array<{ status: string; results?: { raw?: { url: string }; min?: { url: string } } }> = res.data.jobs ?? [];

  const job = jobs[0];
  if (!job) return { status: "queued" };

  const s = job.status;
  const status =
    s === "completed" ? "completed"
    : s === "failed" || s === "nsfw" ? "failed"
    : s === "in_progress" ? "in_progress"
    : "queued";

  const videoUrl = job.results?.raw?.url ?? job.results?.min?.url;
  return { status, videoUrl };
}
