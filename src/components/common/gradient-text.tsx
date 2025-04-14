import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}

export default function GradientText({
  children,
  className = '',
  colors = ['#ffaa40', '#9c40ff', '#ffaa40'],
  animationSpeed = 8,
  showBorder = false,
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <div
      className={cn(
        `relative flex max-w-fit flex-row items-center justify-center overflow-hidden rounded-[1.25rem] font-medium transition-shadow duration-500`,
        className,
      )}
    >
      {showBorder && (
        <div
          className='animate-gradient pointer-events-none absolute inset-0 z-0 bg-cover'
          style={{
            ...gradientStyle,
            backgroundSize: '300% 100%',
          }}
        >
          <div
            className='bg-background absolute inset-0 z-[-1] rounded-[1.25rem]'
            style={{
              width: 'calc(100% - 4px)',
              height: 'calc(100% - 4px)',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          ></div>
        </div>
      )}
      <div
        className='animate-gradient relative z-2 inline-block bg-cover text-transparent'
        style={{
          ...gradientStyle,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          backgroundSize: '300% 100%',
        }}
      >
        {children}
      </div>
    </div>
  );
}
