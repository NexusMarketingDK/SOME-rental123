import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

type Locale = "da" | "en" | "es" | "de";

const LOCALE_PATHS: Record<Locale, string> = {
  da: "/",
  en: "/en",
  es: "/es",
  de: "/de",
};

function detectLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get("locale")?.value as Locale | undefined;
  if (cookieLocale && cookieLocale in LOCALE_PATHS) return cookieLocale;

  const acceptLang = request.headers.get("accept-language") ?? "";
  for (const part of acceptLang.split(",")) {
    const tag = part.split(";")[0].trim().toLowerCase();
    if (tag === "da" || tag.startsWith("da-")) return "da";
    if (tag.startsWith("en")) return "en";
    if (tag === "es" || tag.startsWith("es-")) return "es";
    if (tag === "de" || tag.startsWith("de-")) return "de";
  }
  return "da";
}

function setLocaleCookie(res: NextResponse, locale: Locale) {
  res.cookies.set("locale", locale, { path: "/", maxAge: 31536000, sameSite: "lax" });
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Explicit language choice via ?lang=xx from the language switcher. Danish
  // lives at "/", which has no locale prefix, so without this the stale
  // `locale` cookie would immediately redirect "/" back to the previously
  // chosen language — making it impossible to switch back to Danish. Persist
  // the new choice and redirect to the clean locale path.
  const langParam = request.nextUrl.searchParams.get("lang");
  if (langParam && langParam in LOCALE_PATHS) {
    const locale = langParam as Locale;
    const url = request.nextUrl.clone();
    url.pathname = LOCALE_PATHS[locale];
    url.searchParams.delete("lang");
    const redirect = NextResponse.redirect(url);
    setLocaleCookie(redirect, locale);
    return redirect;
  }

  // Explicit locale routes — persist cookie and continue
  for (const [locale, prefix] of Object.entries(LOCALE_PATHS) as [Locale, string][]) {
    if (prefix !== "/" && (pathname === prefix || pathname.startsWith(prefix + "/"))) {
      const res = await updateSession(request);
      setLocaleCookie(res, locale);
      return res;
    }
  }

  const locale = detectLocale(request);

  // Redirect non-Danish users to their localized landing page. Only the root
  // "/" has locale variants (/en, /es, /de) — the auth pages (/login, /signup)
  // and everything else live at a single path, so they must NOT be locale-
  // prefixed. Prefixing /login would send it to /es/login, which redirects
  // back to /login (next.config) and loops infinitely (ERR_TOO_MANY_REDIRECTS).
  if (locale !== "da" && pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = LOCALE_PATHS[locale];
    const redirect = NextResponse.redirect(url);
    setLocaleCookie(redirect, locale);
    return redirect;
  }

  const res = await updateSession(request);
  setLocaleCookie(res, locale);
  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
