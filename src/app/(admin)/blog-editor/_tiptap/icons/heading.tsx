import React from 'react';
import type { SVGProps } from 'react';

export default function HeadingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24' {...props}>
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
        d='M6 3.75v8.249m0 0v8.251M6 12h12m0-8.249V12m0 0v8.25'
      ></path>
    </svg>
  );
}
