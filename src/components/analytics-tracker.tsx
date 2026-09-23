'use client';

import { useEffect } from 'react';

/**
 * Delegación global de clics analíticos (GA4, sin remarketing).
 *
 * Cualquier elemento con `data-event="<nombre>"` dispara `gtag('event', …)`
 * con parámetros derivados de `data-*`. Solo se envían identificadores
 * controlados (location, plan_uid, question_id…): NUNCA datos personales,
 * contenido del formulario ni URLs privadas.
 *
 * Eventos contemplados: click_discord, click_email, click_agenda, plan_click.
 * (contact_start/submit, service_preselect, faq_expand y 404_view se emiten
 * desde sus componentes dedicados para evitar duplicados por renders.)
 */
const ALLOWED_EVENTS = new Set(['click_discord', 'click_email', 'click_agenda', 'plan_click']);

export function AnalyticsTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest?.('[data-event]') as HTMLElement | null;
      if (!el) return;

      const eventName = el.getAttribute('data-event') ?? '';
      if (!ALLOWED_EVENTS.has(eventName) || typeof window === 'undefined' || !window.gtag) {
        return;
      }

      const params: Record<string, string> = {};
      const location = el.getAttribute('data-location');
      if (location) params.location = location;
      for (const key of ['plan_uid', 'question_id']) {
        const value = el.getAttribute(`data-${key.replace('_', '-')}`);
        if (value) params[key] = value;
      }
      // Compatibilidad con data-plan-uid="…" usado en las cards de planes.
      const planUid = el.getAttribute('data-plan-uid');
      if (planUid) params.plan_uid = planUid;

      window.gtag('event', eventName, params);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
