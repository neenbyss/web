import React from 'react';
import type { SVGProps } from 'react';

export default function Heading4Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24' {...props}>
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
        d='M3.5 5v14m10-14v14m3-8v4h4m0 0v4m0-4v-4m-17 1h10'
      ></path>
    </svg>
  );
}
