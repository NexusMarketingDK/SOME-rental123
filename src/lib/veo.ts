import { GoogleGenAI, type GenerateVideosOperation } from "@google/genai";
import { readFile, unlink } from "fs/promises";
import { tmpdir } from "os";
import path from "path";
import { randomUUID } from "crypto";
import { createAdminClient } from "@/lib/supabase/admin";

let _client: GoogleGenAI | null = null;

function getClient(): GoogleGenAI {
  if (!_client) {
    _client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return _client;
}

// Google AI Studio (aistudio.google.com) Veo model used for image-to-video generation.
const VEO_MODEL = process.env.VEO_MODEL ?? "veo-3.0-generate-001";

type RoomPromptDef = {
  camera: string;
  angle: string;
  lens: string;
  lighting: string;
  mood: string;
  transition: string;
  duration: string;
  focus: string;
  style: string;
};

const ROOM_PROMPT_DEFS: Record<string, RoomPromptDef> = {
  Stue: {
    camera: "Smooth Steadicam dolly push forward",
    angle: "Eye-level tracking shot",
    lens: "35mm wide-angle",
    lighting: "Warm golden hour light streaming through floor-to-ceiling windows",
    mood: "Inviting, relaxed luxury",
    transition: "Gentle cross-dissolve",
    duration: "6 seconds",
    focus: "Open-plan living space, statement sofa, fireplace or art wall",
    style: "Scandinavian minimalist with warm organic accents",
  },
  Køkken: {
    camera: "Slow lateral dolly from island to countertop",
    angle: "Slightly low angle to emphasise countertop surfaces",
    lens: "28mm wide",
    lighting: "Crisp daylight through skylight, subtle under-cabinet warm fill",
    mood: "Clean, modern, aspirational",
    transition: "Wipe left",
    duration: "5 seconds",
    focus: "Kitchen island, integrated appliances, marble or stone surfaces",
    style: "Contemporary chef's kitchen",
  },
  Soveværelse: {
    camera: "Slow arc around bed from foot to side",
    angle: "Low angle, bed at one-third height",
    lens: "50mm cinematic",
    lighting: "Soft diffused morning light, linen curtains, warm bedside glow",
    mood: "Calm, intimate, hotel-suite luxury",
    transition: "Slow fade",
    duration: "7 seconds",
    focus: "Linen bedding, layered cushions, bedside art, soft rug",
    style: "Boutique hotel Scandinavian",
  },
  Badeværelse: {
    camera: "Slow push toward freestanding bathtub or walk-in shower",
    angle: "Slightly elevated overhead tilt-down",
    lens: "35mm",
    lighting: "Soft ambient light with candle glow on marble surfaces",
    mood: "Spa-like serenity, five-star retreat",
    transition: "Dissolve",
    duration: "5 seconds",
    focus: "Freestanding tub, terrazzo or marble tiles, brass fixtures",
    style: "Nordic spa minimalism",
  },
  "Altan/Terrasse": {
    camera: "Drone reveal from below terrace rail rising to panoramic",
    angle: "Low drone ascending to eye-level",
    lens: "24mm drone wide",
    lighting: "Golden sunset backlight, warm ambient",
    mood: "Expansive, aspirational, outdoor luxury",
    transition: "Drone pull-back",
    duration: "8 seconds",
    focus: "Outdoor furniture, view, railing detail, planters",
    style: "Luxury outdoor living",
  },
  Spisestue: {
    camera: "Slow push toward dining table from entrance",
    angle: "Eye-level centred on table",
    lens: "35mm",
    lighting: "Pendant lighting over table, soft diffused natural fill",
    mood: "Elegant, social, warm",
    transition: "Cross-dissolve",
    duration: "6 seconds",
    focus: "Long dining table, designer chairs, pendant light, art wall",
    style: "Contemporary Scandinavian dining",
  },
  Entre: {
    camera: "Smooth Steadicam push through entrance door",
    angle: "Low angle looking inward",
    lens: "28mm wide",
    lighting: "Backlight from interior flooding through entrance",
    mood: "First impression, arrival luxury",
    transition: "Push forward",
    duration: "5 seconds",
    focus: "Entry hallway, flooring material, coat hooks, art piece",
    style: "Modern Nordic entrance",
  },
  Udendørs: {
    camera: "Aerial drone orbit around property",
    angle: "45-degree bird's-eye descending",
    lens: "24mm drone wide",
    lighting: "Blue-hour ambient twilight or golden hour",
    mood: "Grand reveal, property prestige",
    transition: "Drone arc cut",
    duration: "8 seconds",
    focus: "Exterior facade, garden, pool area, surrounding landscape",
    style: "Luxury holiday home exterior",
  },
  Udsigt: {
    camera: "Slow push toward window or viewpoint",
    angle: "Eye-level looking outward",
    lens: "85mm telephoto compression",
    lighting: "Natural backlight, lens flare allowed",
    mood: "Dreamy, aspirational, breathtaking",
    transition: "Fade through white",
    duration: "7 seconds",
    focus: "Window frame, view beyond — sea, mountains, or forest",
    style: "Cinematic lifestyle",
  },
  Detaljer: {
    camera: "Macro dolly reveal on texture or object",
    angle: "Close-up 45 degrees",
    lens: "85mm macro",
    lighting: "Raking side light to reveal texture",
    mood: "Luxurious craftsmanship",
    transition: "Cut to wide",
    duration: "5 seconds",
    focus: "Materials, textiles, art objects, architectural details",
    style: "Editorial luxury detail shot",
  },
  Pool: {
    camera: "Low drone skim over water surface",
    angle: "Nearly water-level drone forward",
    lens: "24mm drone",
    lighting: "Dappled water reflection, bright summer sun",
    mood: "Resort luxury, leisure, escape",
    transition: "Water reflection dissolve",
    duration: "8 seconds",
    focus: "Pool surface, pool edge, surrounding loungers and landscaping",
    style: "Five-star resort",
  },
  Have: {
    camera: "Steadicam walk through garden path",
    angle: "Eye-level following path",
    lens: "35mm",
    lighting: "Warm late afternoon sun, golden bokeh through leaves",
    mood: "Peaceful, natural, private",
    transition: "Nature reveal",
    duration: "7 seconds",
    focus: "Landscaping, garden furniture, flower beds, mature trees",
    style: "Luxury private garden",
  },
};

function getRoomDef(roomLabel: string): RoomPromptDef {
  return (
    ROOM_PROMPT_DEFS[roomLabel] ??
    ROOM_PROMPT_DEFS["Stue"] // sensible default
  );
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
    `Ultra-high quality, photorealistic, 4K cinematic real estate film.`
  );
}

function parseDurationSeconds(def: RoomPromptDef): number {
  const match = def.duration.match(/(\d+)/);
  const seconds = match ? parseInt(match[1], 10) : 6;
  return Math.min(8, Math.max(4, seconds));
}

async function toInlineImage(url: string): Promise<{ imageBytes: string; mimeType: string }> {
  if (url.startsWith("data:")) {
    const [header, base64] = url.split(",");
    const mimeMatch = header.match(/:(.*?);/);
    return { imageBytes: base64, mimeType: mimeMatch?.[1] ?? "image/jpeg" };
  }
  const res = await fetch(url);
  const buffer = Buffer.from(await res.arrayBuffer());
  return { imageBytes: buffer.toString("base64"), mimeType: res.headers.get("content-type") ?? "image/jpeg" };
}

export async function startVideoGeneration(
  imageUrls: string[],
  title: string,
  roomLabels?: string[]
): Promise<string[]> {
  const ai = getClient();

  const operationNames = await Promise.all(
    imageUrls.map(async (url, i) => {
      const room = roomLabels?.[i] ?? `Image ${i + 1}`;
      const def = getRoomDef(room);
      const prompt = buildCinematicPrompt(room, title, i);
      const image = await toInlineImage(url);

      const operation = await ai.models.generateVideos({
        model: VEO_MODEL,
        prompt,
        image,
        config: {
          numberOfVideos: 1,
          aspectRatio: "16:9",
          durationSeconds: parseDurationSeconds(def),
        },
      });

      return operation.name ?? "";
    })
  );

  return operationNames;
}

type JobStatusResult = { status: "in_progress" | "completed" | "failed"; videoUrl?: string; error?: string };

// Veo-hosted video files expire ~2 days after generation, so we download and
// re-host the result in our own storage as soon as the operation completes.
async function persistVideo(operationName: string, video: { uri?: string }): Promise<string | undefined> {
  const ai = getClient();
  const tmpPath = path.join(tmpdir(), `${randomUUID()}.mp4`);
  try {
    await ai.files.download({ file: video, downloadPath: tmpPath });
    const buffer = await readFile(tmpPath);

    const supabase = createAdminClient();
    const objectPath = `${operationName.replace(/[^a-zA-Z0-9]/g, "_")}.mp4`;
    const { error } = await supabase.storage
      .from("video-outputs")
      .upload(objectPath, buffer, { contentType: "video/mp4", upsert: true });
    if (error) return undefined;

    const { data } = supabase.storage.from("video-outputs").getPublicUrl(objectPath);
    return data.publicUrl;
  } catch {
    return undefined;
  } finally {
    await unlink(tmpPath).catch(() => {});
  }
}

async function checkOperation(name: string): Promise<JobStatusResult> {
  const ai = getClient();

  let operation: GenerateVideosOperation;
  try {
    operation = await ai.operations.getVideosOperation({
      operation: { name } as GenerateVideosOperation,
    });
  } catch {
    // Transient error — treat as still running so the caller retries later.
    return { status: "in_progress" };
  }

  if (!operation.done) return { status: "in_progress" };
  if (operation.error) {
    const message = typeof operation.error.message === "string" ? operation.error.message : JSON.stringify(operation.error);
    return { status: "failed", error: message };
  }

  const video = operation.response?.generatedVideos?.[0]?.video;
  if (!video) return { status: "failed", error: "Veo returned no video in the completed operation." };

  const videoUrl = await persistVideo(name, video);
  // Persisting failed transiently (e.g. network hiccup) — retry on next poll.
  return videoUrl ? { status: "completed", videoUrl } : { status: "in_progress" };
}

export async function getVideoJobsStatus(jobSetIds: string[]): Promise<{
  status: "queued" | "in_progress" | "completed" | "failed";
  videoUrls?: string[];
  error?: string;
}> {
  const results = await Promise.all(jobSetIds.map(checkOperation));

  const failedResult = results.find((r) => r.status === "failed");
  if (failedResult) return { status: "failed", error: failedResult.error };

  const allDone = results.every((r) => r.status === "completed");
  if (allDone) {
    return {
      status: "completed",
      videoUrls: results.map((r) => r.videoUrl).filter(Boolean) as string[],
    };
  }

  return { status: "in_progress" };
}

// Legacy single-job fallback
export async function getVideoJobStatus(jobSetId: string): Promise<{
  status: "queued" | "in_progress" | "completed" | "failed";
  videoUrl?: string;
}> {
  const result = await getVideoJobsStatus([jobSetId]);
  return {
    status: result.status,
    videoUrl: result.videoUrls?.[0],
  };
}
