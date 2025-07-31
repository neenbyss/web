import React from 'react';
import type { SVGProps } from 'react';

export function ItalicIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24' {...props}>
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M11 5h6M7 19h6m1-14l-4 14'
      ></path>
    </svg>
  );
}
