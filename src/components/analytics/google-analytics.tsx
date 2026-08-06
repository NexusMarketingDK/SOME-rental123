import Script from "next/script";

/** GA4 measurement ID for somevideopost.com. Overridable via NEXT_PUBLIC_GA_ID. */
const DEFAULT_GA_ID = "G-JYPHV7PKX2";

/**
 * Google Analytics 4 (gtag.js).
 *
 * Uses NEXT_PUBLIC_GA_ID when set, otherwise the site's default ID. To avoid
 * polluting analytics with local dev and Vercel preview traffic, it only loads
 * on the production deployment (VERCEL_ENV / NODE_ENV === "production") — unless
 * an explicit NEXT_PUBLIC_GA_ID is provided, which always enables it.
 * GA4 Enhanced Measurement tracks SPA route changes via History events, so
 * client-side navigations are counted without extra wiring.
 */
export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || DEFAULT_GA_ID;
  const isProduction = (process.env.VERCEL_ENV ?? process.env.NODE_ENV) === "production";
  const enabled = Boolean(gaId) && (Boolean(process.env.NEXT_PUBLIC_GA_ID) || isProduction);
  if (!enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
      </Script>
    </>
  );
}
