'use client';
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, motion } from 'motion/react';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/es';
import { useEffect, useState } from 'react';

import { NeenbyssIcon } from '@/icons/neenbyss';
import { Toaster } from '@/components/ui/toaster';
import { AnalyticsTracker } from '@/components/analytics-tracker';
dayjs.locale('es');
dayjs.extend(localizedFormat);

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoaded, setLoaded] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(false);
    }, 10);
  }, []);
  return (
    // reducedMotion="user": respeta prefers-reduced-motion del SO en todas
    // las animaciones de motion (Fade, header, splash). El CSS ya lo cubre
    // en globals.css para marquee/transiciones.
    <MotionConfig reducedMotion='user'>
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            className='bg-content-1 fixed inset-0 top-0 left-0 z-[999] flex h-screen w-full flex-col items-center justify-center'
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <NeenbyssIcon className='size-20 animate-pulse' />
          </motion.div>
        )}
      </AnimatePresence>
      <LazyMotion features={domAnimation}>{children}</LazyMotion>
      <Toaster />
      <AnalyticsTracker />
    </MotionConfig>
  );
}
