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
    url.searchParams.delete("lang");
    // On the landing page (which has locale-prefixed variants /en, /es, /de),
    // switch to that locale's landing path. On every other page — priser, blog,
    // etc. — stay on the current page; the locale cookie makes it render in the
    // chosen language. This keeps the visitor on the page they were viewing
    // instead of bouncing them to the front page.
    const landingPaths = Object.values(LOCALE_PATHS);
    if (landingPaths.includes(pathname)) {
      url.pathname = LOCALE_PATHS[locale];
    }
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
  // Only persist the detected locale on navigations (GET). Server actions
  // (signup / login / saving preferences) are POSTs that set the `locale`
  // cookie themselves to the language the user just chose. `detectLocale`
  // above reads the *previous* cookie, so overwriting it here would clobber
  // that fresh choice — landing e.g. a newly created Spanish user on Danish.
  if (request.method === "GET") {
    setLocaleCookie(res, locale);
  }
  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
