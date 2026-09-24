'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Scroll-depth attention tracker (GA4, PII-safe).
 *
 * Fires ONE `scroll_depth` event per page (per pathname) when the user
 * reaches 90% scroll depth, with `page_location` = pathname only — never
 * href/query, which may carry personal data.
 *
 * Fire-once semantics: the guard resets on SPA navigation (pathname
 * change) so each page can fire once; the listener is removed after
 * firing, so there is no repeat spam on the same page. Scroll handling
 * is rAF-throttled to avoid perf issues.
 */
export function ScrollDepthTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined' || !window.gtag || !pathname) {
      return;
    }

    let fired = false;
    let ticking = false;

    const fire = () => {
      if (fired) return;
      fired = true;
      window.gtag('event', 'scroll_depth', { page_location: pathname });
      window.removeEventListener('scroll', onScroll);
    };

    const check = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      // Short page with nothing to scroll: the whole content is visible.
      if (scrollable <= 0) {
        fire();
        return;
      }
      const depth = (window.scrollY + window.innerHeight) / doc.scrollHeight;
      if (depth >= 0.9) {
        fire();
      }
    };

    const onScroll = () => {
      if (ticking || fired) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        check();
      });
    };

    // In case the page loads already past 90% (short pages, restored scroll).
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  return null;
}
