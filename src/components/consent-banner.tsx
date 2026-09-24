'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Single localStorage key for the visitor's analytics choice.
const STORAGE_KEY = 'nb-analytics-consent';

// Push a consent update. When restoring a stored opt-in on load, the gtag
// stub may not exist yet (the loader injects it async), so retry briefly.
function pushConsentUpdate(state: 'granted' | 'denied', attempts = 0): void {
  if (typeof window === 'undefined' || !measurementId) {
    return;
  }
  if (window.gtag) {
    window.gtag('consent', 'update', { analytics_storage: state });
    return;
  }
  if (attempts < 10) {
    window.setTimeout(() => pushConsentUpdate(state, attempts + 1), 300);
  }
}

function readStoredChoice(): 'granted' | 'denied' | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'granted' || stored === 'denied' ? stored : null;
  } catch {
    return null;
  }
}

/**
 * Basic Consent Mode banner (GA4 only, no ads).
 *
 * Mounted once at providers level. Shows only when the visitor has no
 * stored choice; accept grants `analytics_storage`, reject leaves it
 * denied. The choice persists in localStorage so it does not nag.
 * ad_* storage stays denied always (no ads/remarketing in scope).
 */
export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Env-empty guard: without a measurement ID gtag never loads, so there
    // is nothing to consent to and no gtag call must happen.
    if (!measurementId) {
      return;
    }
    const stored = readStoredChoice();
    if (stored === 'granted') {
      // Restore the previous opt-in; defaults are denied on every load.
      pushConsentUpdate('granted');
      return;
    }
    if (stored === 'denied') {
      return;
    }
    setVisible(true);
  }, []);

  if (!measurementId || !visible) {
    return null;
  }

  const choose = (state: 'granted' | 'denied') => {
    pushConsentUpdate(state);
    try {
      window.localStorage.setItem(STORAGE_KEY, state);
    } catch {
      // Storage unavailable (private mode): the banner shows again next visit.
    }
    setVisible(false);
  };

  return (
    <div
      role='region'
      aria-label='Aviso de cookies'
      className='bg-content-1 fixed inset-x-0 bottom-0 z-50 border-t'
    >
      <div className='container-screen-2xl flex flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between'>
        <p className='text-foreground-2 max-w-2xl text-sm'>
          Usamos Google Analytics para medir el uso del sitio (páginas visitadas y eventos de
          interacción). Sin tu aceptación no se registra ninguna medición; no usamos publicidad ni
          remarketing.{' '}
          <Link href='/privacy' className='text-primary underline'>
            Ver política de privacidad
          </Link>
        </p>
        <div className='flex shrink-0 gap-2'>
          <Button variant='outline' size='sm' onClick={() => choose('denied')}>
            Rechazar
          </Button>
          <Button size='sm' onClick={() => choose('granted')}>
            Aceptar
          </Button>
        </div>
      </div>
    </div>
  );
}
