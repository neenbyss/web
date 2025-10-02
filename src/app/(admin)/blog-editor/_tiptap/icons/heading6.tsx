import React from 'react';
import type { SVGProps } from 'react';

export default function Heading6Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24' {...props}>
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
        d='M3.5 5v14m10-14v14m3-2a2 2 0 1 0 4 0a2 2 0 0 0-4 0m0 0v-4a2 2 0 1 1 4 0m-17-1h10'
      ></path>
    </svg>
  );
}
