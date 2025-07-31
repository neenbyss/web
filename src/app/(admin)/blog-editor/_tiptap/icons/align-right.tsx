import React from 'react';
import type { SVGProps } from 'react';

export function AlignRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24' {...props}>
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M4 6h16m-10 6h10M6 18h14'
      ></path>
    </svg>
  );
}
