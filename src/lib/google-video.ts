import axios from "axios";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? "";
const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta";

// ── Veo 3 configuration ────────────────────────────────────────────────────
// Model + render settings are env-driven so we can switch quality/cost tier
// (e.g. veo-3.0-fast-generate-001) or bump to a newer Veo without a redeploy.
const VEO_MODEL = process.env.VEO_MODEL || "veo-3.1-generate-preview";
// 16:9 (landscape) or 9:16 (portrait — better for Reels/TikTok/Stories).
const VEO_ASPECT_RATIO = process.env.VEO_ASPECT_RATIO || "16:9";
// Veo 3 supports "720p" and "1080p" (1080p is 16:9 only).
const VEO_RESOLUTION = process.env.VEO_RESOLUTION || "720p";
// Keeps Veo 3's native audio clean for a property walkthrough: no talking
// heads, captions, watermarks or warped rooms.
const VEO_NEGATIVE_PROMPT =
  process.env.VEO_NEGATIVE_PROMPT ||
  "spoken words, voiceover, people talking, on-screen text, subtitles, captions, watermark, logo, distorted architecture, warped walls, blurry, low quality";
// Max clips per order — one Veo 3 generation per image. Veo 3 is slower and
// pricier than Veo 2, so we cap this to stay within function limits/budget.
const MAX_CLIPS = Number(process.env.VEO_MAX_CLIPS || "3");

// ── Cinematic prompt definitions (same logic as before) ───────────────────

type RoomPromptDef = {
  camera: string; angle: string; lens: string; lighting: string;
  mood: string; transition: string; duration: string; focus: string; style: string;
};

const ROOM_PROMPT_DEFS: Record<string, RoomPromptDef> = {
  Stue: { camera: "Smooth Steadicam dolly push forward", angle: "Eye-level tracking shot", lens: "35mm wide-angle", lighting: "Warm golden hour light streaming through floor-to-ceiling windows", mood: "Inviting, relaxed luxury", transition: "Gentle cross-dissolve", duration: "6 seconds", focus: "Open-plan living space, statement sofa, fireplace or art wall", style: "Scandinavian minimalist with warm organic accents" },
  Køkken: { camera: "Slow lateral dolly from island to countertop", angle: "Slightly low angle to emphasise countertop surfaces", lens: "28mm wide", lighting: "Crisp daylight through skylight, subtle under-cabinet warm fill", mood: "Clean, modern, aspirational", transition: "Wipe left", duration: "5 seconds", focus: "Kitchen island, integrated appliances, marble or stone surfaces", style: "Contemporary chef's kitchen" },
  Soveværelse: { camera: "Slow arc around bed from foot to side", angle: "Low angle, bed at one-third height", lens: "50mm cinematic", lighting: "Soft diffused morning light, linen curtains, warm bedside glow", mood: "Calm, intimate, hotel-suite luxury", transition: "Slow fade", duration: "7 seconds", focus: "Linen bedding, layered cushions, bedside art, soft rug", style: "Boutique hotel Scandinavian" },
  Badeværelse: { camera: "Slow push toward freestanding bathtub or walk-in shower", angle: "Slightly elevated overhead tilt-down", lens: "35mm", lighting: "Soft ambient light with candle glow on marble surfaces", mood: "Spa-like serenity, five-star retreat", transition: "Dissolve", duration: "5 seconds", focus: "Freestanding tub, terrazzo or marble tiles, brass fixtures", style: "Nordic spa minimalism" },
  "Altan/Terrasse": { camera: "Drone reveal from below terrace rail rising to panoramic", angle: "Low drone ascending to eye-level", lens: "24mm drone wide", lighting: "Golden sunset backlight, warm ambient", mood: "Expansive, aspirational, outdoor luxury", transition: "Drone pull-back", duration: "8 seconds", focus: "Outdoor furniture, view, railing detail, planters", style: "Luxury outdoor living" },
  Spisestue: { camera: "Slow push toward dining table from entrance", angle: "Eye-level centred on table", lens: "35mm", lighting: "Pendant lighting over table, soft diffused natural fill", mood: "Elegant, social, warm", transition: "Cross-dissolve", duration: "6 seconds", focus: "Long dining table, designer chairs, pendant light, art wall", style: "Contemporary Scandinavian dining" },
  Entre: { camera: "Smooth Steadicam push through entrance door", angle: "Low angle looking inward", lens: "28mm wide", lighting: "Backlight from interior flooding through entrance", mood: "First impression, arrival luxury", transition: "Push forward", duration: "5 seconds", focus: "Entry hallway, flooring material, coat hooks, art piece", style: "Modern Nordic entrance" },
  Udendørs: { camera: "Aerial drone orbit around property", angle: "45-degree bird's-eye descending", lens: "24mm drone wide", lighting: "Blue-hour ambient twilight or golden hour", mood: "Grand reveal, property prestige", transition: "Drone arc cut", duration: "8 seconds", focus: "Exterior facade, garden, pool area, surrounding landscape", style: "Luxury holiday home exterior" },
  Udsigt: { camera: "Slow push toward window or viewpoint", angle: "Eye-level looking outward", lens: "85mm telephoto compression", lighting: "Natural backlight, lens flare allowed", mood: "Dreamy, aspirational, breathtaking", transition: "Fade through white", duration: "7 seconds", focus: "Window frame, view beyond — sea, mountains, or forest", style: "Cinematic lifestyle" },
  Detaljer: { camera: "Macro dolly reveal on texture or object", angle: "Close-up 45 degrees", lens: "85mm macro", lighting: "Raking side light to reveal texture", mood: "Luxurious craftsmanship", transition: "Cut to wide", duration: "5 seconds", focus: "Materials, textiles, art objects, architectural details", style: "Editorial luxury detail shot" },
  Pool: { camera: "Low drone skim over water surface", angle: "Nearly water-level drone forward", lens: "24mm drone", lighting: "Dappled water reflection, bright summer sun", mood: "Resort luxury, leisure, escape", transition: "Water reflection dissolve", duration: "8 seconds", focus: "Pool surface, pool edge, surrounding loungers and landscaping", style: "Five-star resort" },
  Have: { camera: "Steadicam walk through garden path", angle: "Eye-level following path", lens: "35mm", lighting: "Warm late afternoon sun, golden bokeh through leaves", mood: "Peaceful, natural, private", transition: "Nature reveal", duration: "7 seconds", focus: "Landscaping, garden furniture, flower beds, mature trees", style: "Luxury private garden" },
};

function getRoomDef(roomLabel: string): RoomPromptDef {
  return ROOM_PROMPT_DEFS[roomLabel] ?? ROOM_PROMPT_DEFS["Stue"];
}

function buildCinematicPrompt(roomLabel: string, title: string, index: number): string {
  const def = getRoomDef(roomLabel);
  return (
    `${def.camera}. ${def.angle}. Lens: ${def.lens}. ` +
    `Lighting: ${def.lighting}. ` +
    `Mood: ${def.mood}. ` +
    `Architectural focus: ${def.focus}. ` +
    `Interior design style: ${def.style}. ` +
    `Transition: ${def.transition}. Duration: ${def.duration}. ` +
    `Property: ${title}. Scene ${index + 1} of a seamless luxury walkthrough filmed by a professional drone and Steadicam operator. ` +
    `Ultra-high quality, photorealistic, 4K cinematic real estate film. ` +
    // Veo 3 generates native audio — steer it toward subtle ambient sound only.
    `Audio: soft cinematic ambient score with gentle room tone, no narration, no voices.`
  );
}

// ── Image helpers ─────────────────────────────────────────────────────────

async function imageToBase64(url: string): Promise<{ data: string; mimeType: string }> {
  if (url.startsWith("data:")) {
    const [header, data] = url.split(",");
    const mimeType = header.match(/:(.*?);/)?.[1] ?? "image/jpeg";
    return { data, mimeType };
  }
  const res = await axios.get(url, { responseType: "arraybuffer" });
  const mimeType = (String(res.headers["content-type"] ?? "image/jpeg")).split(";")[0];
  const data = Buffer.from(res.data as ArrayBuffer).toString("base64");
  return { data, mimeType };
}

// ── Upload completed video to Supabase Storage ─────────────────────────────

async function uploadVideoToStorage(googleFileUri: string, orderId: string, clipIndex: number): Promise<string> {
  // The Veo file URI may already include a query string (e.g. "?alt=media"),
  // so append the key with the correct separator — a second "?" would make the
  // key part of an unparsed value and the download would be unauthenticated.
  const sep = googleFileUri.includes("?") ? "&" : "?";
  const downloadUrl = `${googleFileUri}${sep}key=${GEMINI_API_KEY}&alt=media`;
  const res = await axios.get<ArrayBuffer>(downloadUrl, { responseType: "arraybuffer" });
  const buffer = Buffer.from(res.data);

  const { createAdminClient } = await import("@/lib/supabase/admin");
  const supabase = createAdminClient();

  const path = `${orderId}/clip-${clipIndex}-${Date.now()}.mp4`;
  const { error } = await supabase.storage.from("videos").upload(path, buffer, {
    contentType: "video/mp4",
    upsert: true,
  });
  if (error) throw new Error(`Storage upload failed: ${error.message}`);

  const { data } = supabase.storage.from("videos").getPublicUrl(path);
  return data.publicUrl;
}

// ── Public API ────────────────────────────────────────────────────────────

/**
 * Start image-to-video generation for each image URL via Google Veo 3.
 *
 * Uses the Gemini API long-running `:predictLongRunning` endpoint (the correct
 * shape for Veo — `instances` + `parameters`, not chat `contents`). Returns the
 * operation names, which are polled later by {@link getVideoJobsStatus}.
 */
export async function startVideoGeneration(
  imageUrls: string[],
  title: string,
  roomLabels?: string[]
): Promise<string[]> {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured on the server");
  }

  // One Veo 3 clip per image, capped to stay within function limits/budget.
  const limitedUrls = imageUrls.slice(0, MAX_CLIPS);

  const operations = await Promise.all(
    limitedUrls.map(async (url, i) => {
      const room = roomLabels?.[i] ?? `Image ${i + 1}`;
      const prompt = buildCinematicPrompt(room, title, i);
      const image = await imageToBase64(url);

      try {
        const res = await axios.post<{ name?: string }>(
          `${GEMINI_BASE}/models/${VEO_MODEL}:predictLongRunning?key=${GEMINI_API_KEY}`,
          {
            instances: [
              {
                prompt,
                image: {
                  bytesBase64Encoded: image.data,
                  mimeType: image.mimeType,
                },
              },
            ],
            parameters: {
              aspectRatio: VEO_ASPECT_RATIO,
              resolution: VEO_RESOLUTION,
              negativePrompt: VEO_NEGATIVE_PROMPT,
              sampleCount: 1,
            },
          }
        );
        return res.data.name ?? "";
      } catch (err: unknown) {
        const status = (err as { response?: { status?: number } })?.response?.status;
        const detail = (err as { response?: { data?: unknown } })?.response?.data;
        // Surface the real reason (bad key, model not allow-listed, quota) so
        // it can be shown to the user instead of a silent failure.
        throw new Error(
          `Google Veo API error ${status ?? "?"} for model ${VEO_MODEL}: ${JSON.stringify(detail ?? String(err)).slice(0, 300)}`
        );
      }
    })
  );

  return operations.filter(Boolean);
}

type OperationResult =
  | { status: "queued" | "in_progress" | "failed"; videoUrl?: undefined }
  | { status: "completed"; videoUrl: string };

/**
 * Poll Google LRO operations. When all complete, downloads videos and
 * uploads them to Supabase Storage, returning permanent public URLs.
 */
export async function getVideoJobsStatus(
  operationIds: string[],
  orderId?: string
): Promise<{
  status: "queued" | "in_progress" | "completed" | "failed";
  videoUrls?: string[];
}> {
  const results: OperationResult[] = await Promise.all(
    operationIds.map(async (id, clipIdx): Promise<OperationResult> => {
      try {
        // Operation names may be like "operations/xyz" or a full URL
        const pollUrl = id.startsWith("http")
          ? `${id}?key=${GEMINI_API_KEY}`
          : `${GEMINI_BASE}/${id}?key=${GEMINI_API_KEY}`;

        const res = await axios.get<{
          done?: boolean;
          error?: { message: string };
          response?: {
            // Veo 3 (predictLongRunning) wraps samples under generateVideoResponse
            generateVideoResponse?: { generatedSamples?: Array<{ video?: { uri?: string } }> };
            generatedSamples?: Array<{ video?: { uri?: string } }>;
            candidates?: Array<{ content?: { parts?: Array<{ fileData?: { fileUri?: string; mimeType?: string } }> } }>;
          };
        }>(pollUrl);

        const data = res.data;

        if (!data.done) return { status: "in_progress" };
        if (data.error) return { status: "failed" };

        // Try the response shapes Google may use (Veo 3 nests under
        // generateVideoResponse; older shapes expose it directly).
        const googleUri =
          data.response?.generateVideoResponse?.generatedSamples?.[0]?.video?.uri ??
          data.response?.generatedSamples?.[0]?.video?.uri ??
          data.response?.candidates?.[0]?.content?.parts?.find(
            (p) => p.fileData?.mimeType?.startsWith("video")
          )?.fileData?.fileUri;

        if (!googleUri) return { status: "failed" };

        // Upload to Supabase Storage for a permanent public URL
        if (orderId) {
          try {
            const publicUrl = await uploadVideoToStorage(googleUri, orderId, clipIdx);
            return { status: "completed", videoUrl: publicUrl };
          } catch {
            // Fallback: serve via proxy if upload fails
            return { status: "completed", videoUrl: `/api/video-proxy?uri=${encodeURIComponent(googleUri)}` };
          }
        }

        return { status: "completed", videoUrl: `/api/video-proxy?uri=${encodeURIComponent(googleUri)}` };
      } catch (err: unknown) {
        // 404/400 = invalid operation ID (e.g. old Higgsfield job ID) → mark failed
        const status = (err as { response?: { status?: number } })?.response?.status;
        if (status === 404 || status === 400) return { status: "failed" };
        return { status: "in_progress" }; // transient error — retry next poll
      }
    })
  );

  if (results.some((r) => r.status === "failed")) return { status: "failed" };
  if (results.every((r) => r.status === "completed")) {
    return {
      status: "completed",
      videoUrls: results.map((r) => r.videoUrl).filter(Boolean) as string[],
    };
  }
  const anyActive = results.some(
    (r) => r.status === "in_progress" || r.status === "completed"
  );
  return { status: anyActive ? "in_progress" : "queued" };
}

// Legacy single-job fallback
export async function getVideoJobStatus(jobSetId: string): Promise<{
  status: "queued" | "in_progress" | "completed" | "failed";
  videoUrl?: string;
}> {
  const result = await getVideoJobsStatus([jobSetId]);
  return { status: result.status, videoUrl: result.videoUrls?.[0] };
}
