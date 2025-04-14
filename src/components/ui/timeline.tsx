'use client';

import { useScroll, useTransform, motion } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';
import { Fade } from './fade';

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  icon?: React.JSX.Element;
}

interface TimelineProps {
  data: TimelineEntry[];
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}

export const Timeline = ({ data, as, className, children }: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 50%'],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const Comp = as ?? 'div';

  return (
    <Comp ref={containerRef}>
      <div className={className}>
        {children}
        <div ref={ref} className='relative'>
          {data.map((item, index) => (
            <div key={index} className='flex pt-10 lg:gap-10 lg:pt-40'>
              <Fade
                delay={0.2}
                className='sticky top-40 z-40 hidden flex-col items-center self-start min-[550px]:flex lg:w-full lg:max-w-xl lg:flex-row'
              >
                <div className='bg-primary absolute left-3 flex size-10 shrink-0 items-center justify-center rounded-xl shadow-[0_0_1rem_rgba(93,69,253,.25))] md:left-3 lg:size-14 [&_svg]:!size-6.5'>
                  {item.icon ? item.icon : <div className='size-4 rounded-full bg-white' />}
                </div>

                <h3 className='hidden text-lg font-medium md:text-4xl lg:block lg:pl-20'>
                  {item.title}
                </h3>
              </Fade>

              <Fade
                direction='right'
                delay={0.2}
                className='relative w-full min-[550px]:pl-20 lg:max-w-4xl lg:pr-4 lg:pl-4'
              >
                <div className='mb-4 flex items-center gap-4 border-b pb-2'>
                  <div className='bg-primary hidden size-8 shrink-0 flex-col items-center justify-center rounded-lg max-[550px]:flex'>
                    <div className='size-4 rounded-full bg-white' />
                  </div>
                  <h3 className='block text-left text-2xl font-medium lg:hidden'>{item.title}</h3>
                </div>
                {item.content}
              </Fade>
            </div>
          ))}
          <div
            style={{
              height: height + 'px',
            }}
            className='absolute top-0 left-8 hidden w-1 overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] min-[550px]:block md:left-8 dark:via-neutral-700'
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className='from-secondary via-primary absolute inset-x-0 top-0 w-1 rounded-full bg-gradient-to-t from-[0%] via-[10%] to-transparent'
            />
          </div>
        </div>
      </div>
    </Comp>
  );
};
