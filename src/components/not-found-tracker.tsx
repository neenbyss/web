'use client';

import { useEffect } from 'react';

/**
 * Emite `404_view` una sola vez al renderizar la página 404.
 * La ruta se lee en el cliente para no romper el prerender estático.
 * Sin datos personales.
 */
export function NotFoundTracker() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', '404_view', { path: window.location.pathname });
    }
  }, []);

  return null;
}
