'use client';

import React, { RefObject, useMemo } from 'react';
import { motion, type Variants } from 'motion/react';
import * as m from 'motion/react-m';
import { cn } from '@/lib/utils';

type MotionComponent = keyof typeof m;

type FadeProps<T extends MotionComponent> = {
  className?: string;
  textClassName?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  framerProps?: Variants;
  text?: string; // Ahora es opcional
  children?: React.ReactNode; // Children opcional
  scroll?: boolean;
  initTranslate?: number;
  delay?: number;
  duration?: number;
  blur?: number | string;
  exitBlur?: number | string;
  as?: T;
  viewport?: {
    root?: RefObject<Element | null>;
    once?: boolean;
    margin?: string;
    amount?: 'some' | 'all' | number;
  };
} & (T extends keyof React.JSX.IntrinsicElements
  ? Omit<React.JSX.IntrinsicElements[T], keyof React.HTMLAttributes<HTMLElement>> // Solo propiedades de eventos HTML válidas
  : object);

export function Fade<T extends MotionComponent>({
  direction = 'left',
  className,
  textClassName,
  delay = 0,
  duration = 1,
  blur = '10px',
  exitBlur = '0px',
  initTranslate = 10,
  framerProps = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        delay: delay,
        duration: duration,
        ease: [0.18, 0.62, 0.08, 1.28],
      },
    },
  },
  text,
  as: Component = 'div' as T,
  scroll = true,
  children,
  viewport = {
    once: true,
  },
  ...props
}: FadeProps<T>) {
  const directionOffset = useMemo(() => {
    const map = {
      up: initTranslate,
      down: -initTranslate,
      left: -initTranslate,
      right: initTranslate,
    };
    return map[direction];
  }, [direction, initTranslate]);

  const axis = direction === 'up' || direction === 'down' ? 'y' : 'x';

  const FADE_ANIMATION_VARIANTS = useMemo(() => {
    const { hidden, show, ...rest } = framerProps as {
      [name: string]: { [name: string]: number; opacity: number };
    };

    return {
      ...rest,
      hidden: {
        ...(hidden ?? {}),
        opacity: hidden?.opacity ?? 0,
        filter: blur ? `blur(${blur})` : '',
        [axis]: hidden?.[axis] ?? directionOffset,
      },
      show: {
        ...(show ?? {}),
        opacity: show?.opacity ?? 1,
        filter: blur ? `blur(${exitBlur})` : '0px',
        [axis]: show?.[axis] ?? 0,
      },
    };
  }, [framerProps, blur, axis, directionOffset, exitBlur]);

  const Emotion = m[Component] as unknown as React.ComponentType<any>;

  return (
    <Emotion
      initial='hidden'
      {...(scroll ? { whileInView: 'show' } : { animate: 'show' })}
      variants={FADE_ANIMATION_VARIANTS}
      className={cn(className)}
      viewport={viewport}
      {...props}
    >
      {text && <motion.span className={cn(textClassName)}>{text}</motion.span>}
      {children}
    </Emotion>
  );
}
