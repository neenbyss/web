import React from 'react';
import type { SVGProps } from 'react';

export function BulletListIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M10 4h10a1 1 0 0 1 0 2H10a1 1 0 1 1 0-2m0 7h10a1 1 0 0 1 0 2H10a1 1 0 0 1 0-2m0 7h10a1 1 0 0 1 0 2H10a1 1 0 0 1 0-2M5 7a2 2 0 1 1 0-4a2 2 0 0 1 0 4m0 7a2 2 0 1 1 0-4a2 2 0 0 1 0 4m0 7a2 2 0 1 1 0-4a2 2 0 0 1 0 4'
      ></path>
    </svg>
  );
}
