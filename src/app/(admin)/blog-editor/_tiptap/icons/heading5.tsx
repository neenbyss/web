import React from 'react';
import type { SVGProps } from 'react';

export default function Heading5Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24' {...props}>
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
        d='M3.5 5v14m10-14v14m3-2.5v.5a2 2 0 1 0 4 0v-.5A2.5 2.5 0 0 0 18 14h-1.5v-3h4m-17 1h10'
      ></path>
    </svg>
  );
}
