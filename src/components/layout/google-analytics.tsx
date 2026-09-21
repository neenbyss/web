'use client';

import Script from 'next/script';

interface GoogleAnalyticsProps {
  measurementId: string;
}
export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  return (
    <>
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id='google-analytics'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            // page_location SIN query string: los parámetros de URL pueden
            // contener datos personales (p. ej. ?email= del captador del
            // footer) y nunca deben llegar a GA4.
            gtag('config', '${measurementId}', {
              page_title: document.title,
              page_location: window.location.origin + window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
