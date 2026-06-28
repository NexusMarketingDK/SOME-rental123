import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const raw = cookieStore.get("fb_connect")?.value;
  if (!raw) {
    return NextResponse.json({ error: "Forbindelsesdata udløbet. Start venligst OAuth-flowet igen." }, { status: 400 });
  }
  try {
    const payload = JSON.parse(Buffer.from(raw, "base64").toString("utf-8"));
    // Strip access tokens from the response — client only needs display data
    return NextResponse.json({
      pages: (payload.pages ?? []).map((p: Record<string, unknown>) => ({
        id: p.id,
        name: p.name,
        fan_count: p.fan_count,
        picture: p.picture,
        instagram_business_account: p.instagram_business_account,
        igUsername: p.igUsername,
        // access_token deliberately omitted from client response
      })),
      groups: payload.groups ?? [],
      // userToken deliberately omitted — server action reads from cookie directly
    });
  } catch {
    return NextResponse.json({ error: "Ugyldig forbindelsesdata." }, { status: 400 });
  }
}
