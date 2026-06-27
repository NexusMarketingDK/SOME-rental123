import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL!;
  const { searchParams } = req.nextUrl;
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    return NextResponse.redirect(`${appUrl}/analytics?error=google_denied`);
  }

  // Exchange code for tokens
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: `${appUrl}/api/google/callback`,
      grant_type: "authorization_code",
    }),
  });

  if (!tokenRes.ok) {
    return NextResponse.redirect(`${appUrl}/analytics?error=token_exchange`);
  }

  const tokens = await tokenRes.json();
  const expiry = new Date(Date.now() + tokens.expires_in * 1000).toISOString();

  // Fetch GA4 properties to get the first one
  const propsRes = await fetch(
    "https://analyticsadmin.googleapis.com/v1beta/properties?filter=parent:accounts/-&pageSize=50",
    { headers: { Authorization: `Bearer ${tokens.access_token}` } }
  );

  let ga4PropertyId = "";
  let propertyName = "";

  if (propsRes.ok) {
    const propsData = await propsRes.json();
    const firstProp = propsData.properties?.[0];
    if (firstProp) {
      // name is like "properties/123456789"
      ga4PropertyId = firstProp.name.replace("properties/", "");
      propertyName = firstProp.displayName ?? "";
    }
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(`${appUrl}/auth/login`);

  await supabase.from("ga4_connections").upsert({
    user_id: user.id,
    ga4_property_id: ga4PropertyId,
    property_name: propertyName,
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token ?? null,
    token_expiry: expiry,
  }, { onConflict: "user_id" });

  // If no property found, redirect to picker
  if (!ga4PropertyId) {
    return NextResponse.redirect(`${appUrl}/analytics/setup`);
  }

  return NextResponse.redirect(`${appUrl}/analytics`);
}
