'use client';

import * as React from 'react';
import { Accordion } from '@/components/ui/accordion';

type TrackedAccordionProps = {
  location: string;
  className?: string;
  collapsible?: boolean;
  children?: React.ReactNode;
  onValueChange?: (value: string) => void;
};

/**
 * Accordion (modo single) que emite `faq_expand` (GA4) al abrir una pregunta.
 * Sin datos personales: solo question_id (= value del item) y location.
 */
export function TrackedAccordion({ location, onValueChange, ...props }: TrackedAccordionProps) {
  return (
    <Accordion
      type='single'
      {...props}
      onValueChange={(value: string) => {
        if (value && typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'faq_expand', { question_id: value, location });
        }
        onValueChange?.(value);
      }}
    />
  );
}
