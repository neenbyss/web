'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * SPA page_view tracker (GA4, PII-safe).
 *
 * Fires `gtag('config', id, { page_path, page_location })` on client-side
 * route changes using `usePathname()` only — never href/query, which may
 * carry personal data (e.g. ?email= from the footer lead form).
 *
 * No double-count: the gtag loader (`GoogleAnalytics`) already sends the
 * initial page_view via its inline `gtag('config', …)`, so the first render
 * is skipped and only subsequent pathname changes are reported here.
 */
export function PageViewTracker() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (typeof window === 'undefined' || !window.gtag || !measurementId || !pathname) {
      return;
    }
    window.gtag('config', measurementId, {
      page_path: pathname,
      page_location: window.location.origin + pathname,
    });
  }, [pathname]);

  return null;
}
