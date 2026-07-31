import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? "";

export async function GET(request: NextRequest) {
  const uri = request.nextUrl.searchParams.get("uri");
  if (!uri) return NextResponse.json({ error: "Missing uri" }, { status: 400 });

  // The Veo file URI may already carry a query string (e.g. "?alt=media"),
  // so choose the correct separator — otherwise the API key isn't parsed and
  // the download is unauthenticated.
  const sep = uri.includes("?") ? "&" : "?";
  const downloadUrl = `${uri}${sep}key=${GEMINI_API_KEY}&alt=media`;
  const upstream = await fetch(downloadUrl);
  if (!upstream.ok) {
    return NextResponse.json({ error: "Failed to fetch video" }, { status: 502 });
  }

  const contentType = upstream.headers.get("content-type") ?? "video/mp4";
  const body = await upstream.arrayBuffer();

  return new NextResponse(body, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400",
    },
  });
}
