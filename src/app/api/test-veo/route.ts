import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? "";
const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta";

// Simple test: list available models to verify API key works
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: "GEMINI_API_KEY not set" }, { status: 500 });
  }

  try {
    const res = await fetch(
      `${GEMINI_BASE}/models?key=${GEMINI_API_KEY}&pageSize=50`
    );
    const data = await res.json();

    const models: string[] = (data.models ?? []).map((m: { name?: string }) => m.name ?? "");
    const veoModels = models.filter((m) => m.toLowerCase().includes("veo"));

    return NextResponse.json({
      apiKeySet: true,
      apiKeyPrefix: GEMINI_API_KEY.slice(0, 8) + "...",
      veoModels,
      allModelCount: models.length,
      rawResponse: veoModels.length === 0 ? data : undefined,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
