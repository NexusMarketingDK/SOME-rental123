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

  // Exchange for long-lived token
  const longRes = await fetch(
    `https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${clientId}&client_secret=${clientSecret}&fb_exchange_token=${tokenData.access_token}`
  );
  const longData = await longRes.json();
  const userToken = longData.access_token ?? tokenData.access_token;

  // Get user's pages
  const pagesRes = await fetch(
    `https://graph.facebook.com/v19.0/me/accounts?access_token=${userToken}&fields=id,name,access_token,instagram_business_account`
  );
  const pagesData = await pagesRes.json();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(`${appUrl}/login`);

  const pages: Array<{
    id: string; name: string; access_token: string;
    instagram_business_account?: { id: string };
  }> = pagesData.data ?? [];

  for (const page of pages) {
    // Upsert Facebook page
    await supabase.from("social_accounts").upsert(
      {
        user_id: user.id,
        platform: "facebook",
        account_id: page.id,
        account_name: page.name,
        access_token: page.access_token,
      },
      { onConflict: "user_id,account_id" }
    );

    // If page has linked Instagram business account
    if (page.instagram_business_account?.id) {
      const igId = page.instagram_business_account.id;
      const igRes = await fetch(
        `https://graph.facebook.com/v19.0/${igId}?fields=username&access_token=${page.access_token}`
      );
      const igData = await igRes.json();

      await supabase.from("social_accounts").upsert(
        {
          user_id: user.id,
          platform: "instagram",
          account_id: igId,
          account_name: igData.username ?? page.name,
          access_token: page.access_token,
          meta: { page_id: page.id },
        },
        { onConflict: "user_id,account_id" }
      );
    }
  }

  return NextResponse.redirect(`${appUrl}/accounts?connected=facebook`);
}
