import Script from "next/script";

/**
 * Google Analytics 4 (gtag.js).
 *
 * Renders nothing unless NEXT_PUBLIC_GA_ID is set (e.g. "G-XXXXXXXXXX"), so
 * analytics stays off in local/dev and preview until the ID is configured.
 * GA4 Enhanced Measurement tracks SPA route changes via History events, so
 * client-side navigations are counted without extra wiring.
 */
export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return null;

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
