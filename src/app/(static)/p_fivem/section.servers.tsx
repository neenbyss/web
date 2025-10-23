'use client';

import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from '@/icons/arrow-right';
import { cn } from '@/lib/utils';
import { useState, useRef, useEffect } from 'react';

export function Servers() {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const initialScroll = 0;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -500, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 500, behavior: 'smooth' });
    }
  };

  return (
    <section className='py-20'>
      <h2 className='container-screen-xl mb-20 text-5xl font-medium capitalize'>
        {' '}
        Servidores en los que participamos{' '}
      </h2>

      <div
        ref={containerRef}
        onScroll={checkScrollability}
        className='flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth [scrollbar-width:none]'
      >
        <div
          className={cn(
            'to-background pointer-events-none absolute right-0 z-10 size-full w-1/3 overflow-hidden bg-gradient-to-r from-0%',
          )}
        />

        <div className='container-screen-2xl flex gap-8 pr-20'>
          {Array.from({ length: 5 }).map((_, i) => {
            return (
              <div
                key={i}
                className='group relative h-150 max-w-md shrink-0 overflow-hidden rounded-3xl border'
              >
                <img
                  alt='Image'
                  className='size-full object-cover'
                  src='https://www.exitlag.com/blog/wp-content/uploads/2024/12/pasted-image-0.webp'
                />
                <div className='ease-soft-spring to-background from-background/0 absolute top-0 left-0 flex size-full flex-col justify-end bg-gradient-to-b p-6 opacity-0 duration-300 group-hover:opacity-100'>
                  <h3 className='ease-soft-spring mb-4 -translate-y-8 text-3xl duration-300 group-hover:translate-y-0'>
                    Servidor Name
                  </h3>
                  <p className='ease-soft-spring -translate-y-8 opacity-0 duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-100'>
                    {' '}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, expedita nulla
                    ipsam, voluptatem animi obcaecati iure eum voluptas tempora, quam assumenda
                    dolor laborum! Amet officia id nostrum iure recusandae nihil.
                  </p>
                </div>
              </div>
            );
          })}
          <div className='w-[30%] shrink-0' />
        </div>
      </div>
      <div className='container-screen-xl relative z-20 mt-12 flex justify-end gap-2'>
        <Button onClick={scrollLeft} variant={'outline'} size='icon' disabled={!canScrollLeft}>
          <ArrowRightIcon className='size-6 -rotate-180' />
        </Button>
        <Button onClick={scrollRight} variant={'outline'} disabled={!canScrollRight} size='icon'>
          <ArrowRightIcon className='size-6' />
        </Button>
      </div>
    </section>
  );
}
