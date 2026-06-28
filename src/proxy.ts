import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

type Locale = "da" | "en";

function detectLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get("locale")?.value;
  if (cookieLocale === "en" || cookieLocale === "da") return cookieLocale;
  const acceptLang = request.headers.get("accept-language") ?? "";
  for (const part of acceptLang.split(",")) {
    const tag = part.split(";")[0].trim().toLowerCase();
    if (tag === "da" || tag.startsWith("da-")) return "da";
    if (tag.startsWith("en")) return "en";
  }
  return "da";
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /en/* routes are explicit English — just persist cookie and continue
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const res = await updateSession(request);
    res.cookies.set("locale", "en", { path: "/", maxAge: 31536000, sameSite: "lax" });
    return res;
  }

  const locale = detectLocale(request);

  // Redirect English-detected users to /en equivalent (only for public pages)
  const isPublicPage =
    pathname === "/" || pathname.startsWith("/login") || pathname.startsWith("/signup");

  if (locale === "en" && isPublicPage) {
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname === "/" ? "" : pathname}`;
    const redirect = NextResponse.redirect(url);
    redirect.cookies.set("locale", "en", { path: "/", maxAge: 31536000, sameSite: "lax" });
    return redirect;
  }

  const res = await updateSession(request);
  res.cookies.set("locale", locale, { path: "/", maxAge: 31536000, sameSite: "lax" });
  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
