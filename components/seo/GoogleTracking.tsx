import Script from "next/script";

interface GoogleTrackingProps {
  gtmId?: string;
  gaId?: string;
  googleAdsId?: string;
}

export function GoogleTracking({ gtmId, gaId, googleAdsId }: GoogleTrackingProps) {
  const effectiveGtmId = gtmId || process.env.NEXT_PUBLIC_GTM_ID || "GTM-526Z6DN7";
  const effectiveGaId = gaId || process.env.NEXT_PUBLIC_GA4_ID;
  const effectiveAdsId = googleAdsId || process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

  return (
    <>
      {/* Google Tag Manager Script */}
      {effectiveGtmId && (
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${effectiveGtmId}');`,
          }}
        />
      )}

      {/* Direct GA4 & Google Ads gtag.js fallback */}
      {!effectiveGtmId && (effectiveGaId || effectiveAdsId) && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${effectiveGaId || effectiveAdsId}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                ${effectiveGaId ? `gtag('config', '${effectiveGaId}', { page_path: window.location.pathname });` : ""}
                ${effectiveAdsId ? `gtag('config', '${effectiveAdsId}');` : ""}
              `,
            }}
          />
        </>
      )}

      {/* GTM noscript iframe */}
      {effectiveGtmId && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${effectiveGtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
      )}
    </>
  );
}
