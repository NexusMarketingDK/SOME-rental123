import { HiggsfieldClient } from "@higgsfield/client";
import { createHiggsfieldClient } from "@higgsfield/client/v2";

let _client: HiggsfieldClient | null = null;
let _v2: ReturnType<typeof createHiggsfieldClient> | null = null;

function getClient(): HiggsfieldClient {
  if (!_client) {
    _client = new HiggsfieldClient({
      apiKey: process.env.HIGGSFIELD_API_KEY_ID,
      apiSecret: process.env.HIGGSFIELD_API_SECRET,
    });
  }
  return _client;
}

function getV2Client() {
  if (!_v2) {
    _v2 = createHiggsfieldClient({
      apiKey: process.env.HIGGSFIELD_API_KEY_ID,
      apiSecret: process.env.HIGGSFIELD_API_SECRET,
    });
  }
  return _v2;
}

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

export async function startVideoGeneration(
  imageUrls: string[],
  title: string,
  roomLabels?: string[]
): Promise<string[]> {
  const client = getClient();

  const jobIds = await Promise.all(
    imageUrls.map(async (url, i) => {
      const room = roomLabels?.[i] ?? `Image ${i + 1}`;
      const prompt = buildCinematicPrompt(room, title, i);

      const imageUrl = url.startsWith("data:")
        ? await uploadBase64ToHiggsfield(client, url)
        : url;

      const inputImage = { type: "image_url" as const, image_url: imageUrl };

      const v2 = getV2Client();
      const response = await v2.subscribe("/v1/image2video/dop", {
        input: { model: "dop-turbo", prompt, input_images: [inputImage] },
        withPolling: false,
      }) as { request_id?: string; id?: string };

      return response.request_id ?? response.id ?? "";
    })
  );

  return jobIds;
}

async function uploadBase64ToHiggsfield(client: HiggsfieldClient, dataUrl: string): Promise<string> {
  const [header, base64] = dataUrl.split(",");
  const mimeMatch = header.match(/:(.*?);/);
  const mime = mimeMatch?.[1] ?? "image/jpeg";
  const buffer = Buffer.from(base64, "base64");
  const format = mime.includes("png") ? "png" : mime.includes("webp") ? "webp" : "jpeg";
  return client.uploadImage(buffer, format);
}

type V2StatusResponse = {
  status: string;
  request_id?: string;
  video?: { url: string };
  images?: { url: string }[];
};

export async function getVideoJobsStatus(jobSetIds: string[]): Promise<{
  status: "queued" | "in_progress" | "completed" | "failed";
  videoUrls?: string[];
}> {
  const client = getClient();
  type JobResult = { status: string; results?: { raw?: { url: string }; min?: { url: string } } };
  type JobSetData = { jobs?: JobResult[] };
  const axiosClient = (client as unknown as { client: { get: (url: string) => Promise<{ data: JobSetData | V2StatusResponse }> } }).client;

  const results = await Promise.all(
    jobSetIds.map(async (id) => {
      // Try v2 endpoint first (/requests/{id}/status)
      try {
        const res = await axiosClient.get(`/requests/${id}/status`);
        const data = res.data as V2StatusResponse;
        if (data.status) {
          const videoUrl = data.video?.url ?? data.images?.[0]?.url;
          return { status: data.status, videoUrl };
        }
      } catch {
        // fall through to v1
      }

      // Fallback: v1 job-sets endpoint
      const res = await axiosClient.get(`/v1/job-sets/${id}`);
      const v1Data = res.data as JobSetData;
      const jobs: JobResult[] = v1Data.jobs ?? [];
      const job = jobs[0];
      const s = job?.status ?? "queued";
      const videoUrl = job?.results?.raw?.url ?? job?.results?.min?.url;
      return { status: s, videoUrl };
    })
  );

  const anyFailed = results.some((r) => r.status === "failed" || r.status === "nsfw");
  if (anyFailed) return { status: "failed" };

  const allDone = results.every((r) => r.status === "completed");
  if (allDone) {
    return {
      status: "completed",
      videoUrls: results.map((r) => r.videoUrl).filter(Boolean) as string[],
    };
  }

  const anyInProgress = results.some((r) => r.status === "in_progress" || r.status === "completed");
  return { status: anyInProgress ? "in_progress" : "queued" };
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
