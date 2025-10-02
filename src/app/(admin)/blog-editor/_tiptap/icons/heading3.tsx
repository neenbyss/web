import React from 'react';
import type { SVGProps } from 'react';

export default function Heading3Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24' {...props}>
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
        d='M3.5 5v14m10-14v14m3-2a2 2 0 1 0 2-2a2 2 0 1 0-2-2m-13-1h10'
      ></path>
    </svg>
  );
}
