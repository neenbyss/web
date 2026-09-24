'use client';
declare global {
  interface Window {
    gtag: (
      // 'consent' covers gtag('consent', 'default'|'update', {...}) from the
      // loader and the consent banner; targetId carries 'default'/'update'.
      command: 'config' | 'event' | 'js' | 'consent',
      targetId: string | Date,
      config?: {
        [key: string]: any;
      },
    ) => void;
  }
}

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// PII-safe: only the pathname may ever reach GA4. Query strings and hashes
// can carry personal data (e.g. ?email= from the footer lead form), so any
// caller input is defensively stripped down to a normalized pathname.
const toSafePathname = (input: string): string => {
  const trimmed = input.trim();
  if (!trimmed) {
    return '/';
  }
  try {
    const parsed = new URL(trimmed, 'http://localhost');
    const pathname = parsed.pathname || '/';
    return pathname.startsWith('/') ? pathname : `/${pathname}`;
  } catch {
    const cut = trimmed.split(/[?#]/)[0]?.trim() || '/';
    return cut.startsWith('/') ? cut : `/${cut}`;
  }
};

export const useAnalytics = () => {
  const trackEvent = (eventName: string, parameters?: { [key: string]: any }) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        ...parameters,
      });
    }
  };

  const trackPageView = (url: string) => {
    if (typeof window !== 'undefined' && window.gtag && measurementId) {
      const pagePath = toSafePathname(url);
      window.gtag('config', measurementId, {
        page_path: pagePath,
        page_location: window.location.origin + pagePath,
      });
    }
  };

  return {
    trackEvent,
    trackPageView,
  };
};
