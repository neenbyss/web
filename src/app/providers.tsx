'use client';
import { AnimatePresence, LazyMotion, domAnimation, motion } from 'motion/react';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/es';
import { useEffect, useState } from 'react';

import { NeenbyssIcon } from '@/icons/neenbyss';
import { Toaster } from '@/components/ui/toaster';
import Image from 'next/image';
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
    <>
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            className='bg-content-1 fixed inset-0 top-0 left-0 z-[999] flex h-screen w-full flex-col items-center justify-center'
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Image
              alt='Neenbyss'
              src='/nb-icon.png'
              width={250}
              height={250}
              className='size-30 animate-pulse object-contain'
            />
          </motion.div>
        )}
      </AnimatePresence>
      <LazyMotion features={domAnimation}>{children}</LazyMotion>
      <Toaster />
    </>
  );
}
