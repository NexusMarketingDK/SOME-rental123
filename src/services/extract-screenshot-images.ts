"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export type DetectedImage = {
  x: number;       // 0-1 relative to screenshot width
  y: number;       // 0-1 relative to screenshot height
  width: number;   // 0-1
  height: number;  // 0-1
  room: string;    // e.g. "Stue", "Køkken"
  description: string;
};

export type ScreenshotExtractResult = {
  images?: DetectedImage[];
  title?: string;
  error?: string;
};

export async function extractImagesFromScreenshot(
  base64Image: string,
  mimeType: "image/jpeg" | "image/png" | "image/webp" = "image/jpeg"
): Promise<ScreenshotExtractResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return { error: "GEMINI_API_KEY ikke konfigureret." };

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `This is a screenshot of a holiday rental property listing (e.g. Airbnb, Booking.com, or similar site).

Your task: identify every distinct property photo visible in this screenshot.

For each photo area you can see (ignore UI elements, navigation, text, buttons — only actual property/room photos):
- Estimate its bounding box as fractions of the total screenshot dimensions (x, y, width, height where 0,0 is top-left and 1,1 is bottom-right)
- Identify the room type in Danish: Stue, Køkken, Soveværelse, Badeværelse, Altan/Terrasse, Spisestue, Entre, Udendørs, Udsigt, Pool, Have, or "Rum" if unclear
- Write a short description in Danish of what you see

Also extract the property title if visible.

Return ONLY valid JSON, no markdown, no explanation:
{
  "title": "property name or null",
  "images": [
    {"x": 0.0, "y": 0.1, "width": 0.5, "height": 0.4, "room": "Stue", "description": "Lys stue med sofa og gulvtæppe"},
    ...
  ]
}

Be generous — include every property photo you can see, even small thumbnails. Aim to find 5-15 images if present.`;

  try {
    const result = await model.generateContent([
      { inlineData: { mimeType, data: base64Image } },
      prompt,
    ]);

    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return { error: "Kunne ikke fortolke svar fra AI." };

    const parsed = JSON.parse(jsonMatch[0]);
    const images: DetectedImage[] = (parsed.images ?? []).filter(
      (img: DetectedImage) =>
        typeof img.x === "number" &&
        typeof img.y === "number" &&
        typeof img.width === "number" &&
        typeof img.height === "number" &&
        img.width > 0.02 &&
        img.height > 0.02
    );

    if (images.length === 0) {
      return { error: "Ingen boligbilleder fundet i screenshottet. Prøv et screenshot der viser fotogalleriet tydeligt." };
    }

    return { images, title: parsed.title ?? undefined };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { error: `AI-analyse fejlede: ${msg}` };
  }
}
