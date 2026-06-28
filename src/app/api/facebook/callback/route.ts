import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://some-rental123.vercel.app";
  const code = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");

  if (error || !code) {
    return NextResponse.redirect(`${appUrl}/accounts/connect?error=facebook_denied`);
  }

  const clientId = process.env.FACEBOOK_APP_ID!;
  const clientSecret = process.env.FACEBOOK_APP_SECRET!;
  const redirectUri = `${appUrl}/api/facebook/callback`;

  // Exchange code for short-lived token
  const tokenRes = await fetch(
    `https://graph.facebook.com/v19.0/oauth/access_token?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&client_secret=${clientSecret}&code=${code}`
  );
  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) {
    return NextResponse.redirect(`${appUrl}/accounts/connect?error=facebook_token`);
  }

  // Exchange for long-lived user token
  const longRes = await fetch(
    `https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${clientId}&client_secret=${clientSecret}&fb_exchange_token=${tokenData.access_token}`
  );
  const longData = await longRes.json();
  const userToken = longData.access_token ?? tokenData.access_token;

  // Verify user is logged in
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(`${appUrl}/login`);

  // Fetch pages the user manages
  const pagesRes = await fetch(
    `https://graph.facebook.com/v19.0/me/accounts?access_token=${userToken}&fields=id,name,access_token,instagram_business_account,fan_count,picture`
  );
  const pagesData = await pagesRes.json();

  const pages: Array<{
    id: string;
    name: string;
    access_token: string;
    fan_count?: number;
    picture?: { data?: { url?: string } };
    instagram_business_account?: { id: string };
  }> = pagesData.data ?? [];

  // Fetch groups the user is admin of
  let groups: Array<{ id: string; name: string; privacy?: string }> = [];
  try {
    const groupsRes = await fetch(
      `https://graph.facebook.com/v19.0/me/groups?fields=id,name,privacy&filter=owner&access_token=${userToken}`
    );
    const groupsData = await groupsRes.json();
    groups = groupsData.data ?? [];
  } catch {
    // groups permission not granted — continue without
  }

  // Fetch Instagram usernames for linked accounts
  const pagesWithIg = await Promise.all(
    pages.map(async (page) => {
      let igUsername: string | null = null;
      if (page.instagram_business_account?.id) {
        try {
          const igRes = await fetch(
            `https://graph.facebook.com/v19.0/${page.instagram_business_account.id}?fields=username&access_token=${page.access_token}`
          );
          const igData = await igRes.json();
          igUsername = igData.username ?? null;
        } catch {
          // ignore
        }
      }
      return { ...page, igUsername };
    })
  );

  // Store data in a short-lived cookie for the selection page
  const payload = {
    userToken,
    pages: pagesWithIg,
    groups,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64");

  const res = NextResponse.redirect(`${appUrl}/accounts/facebook-select`);
  res.cookies.set("fb_connect", encoded, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 300, // 5 minutes
    path: "/",
  });
  return res;
}
