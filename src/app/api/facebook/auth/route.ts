import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.FACEBOOK_APP_ID;
  if (!clientId) {
    return NextResponse.json({ error: "FACEBOOK_APP_ID ikke konfigureret" }, { status: 500 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://some-rental123.vercel.app";
  const redirectUri = `${appUrl}/api/facebook/callback`;

  const scope = [
    "pages_manage_posts",
    "pages_read_engagement",
    "instagram_basic",
    "instagram_content_publish",
    "pages_show_list",
  ].join(",");

  const url = new URL("https://www.facebook.com/v19.0/dialog/oauth");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", scope);
  url.searchParams.set("response_type", "code");

  return NextResponse.redirect(url.toString());
}
