'use client';
import * as React from 'react';
import { useLinkStatus } from 'next/link';
export const ProgressBar = () => {
  const { pending } = useLinkStatus();
  const barRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    console.log(pending);
    const bar = barRef.current;

    if (!bar) return;

    if (pending) {
      bar.style.transition = 'width 2s ease-out';
      bar.style.width = '70%'; // empieza animación de carga
      bar.style.opacity = '1';
    } else {
      bar.style.transition = 'width 0.3s ease-in, opacity 0.5s ease-in 0.3s';
      bar.style.width = '100%'; // completa
      bar.style.opacity = '0'; // desaparece

      // Reinicia la barra para el próximo cambio
      setTimeout(() => {
        if (bar) {
          bar.style.transition = 'none';
          bar.style.width = '0%';
        }
      }, 1000);
    }
  }, [pending]);

  return (
    <div
      ref={barRef}
      className='from-primary to-secondary fixed top-0 left-0 mt-px h-0.5 w-0 bg-gradient-to-r'
      style={{
        opacity: 0,
      }}
    />
  );
};
