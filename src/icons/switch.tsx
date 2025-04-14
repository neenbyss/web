import React from 'react';
import type { SVGProps } from 'react';

export function SwitchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={48} height={48} viewBox='0 0 48 48' {...props}>
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={4}
        d='M42 19H6M30 7l12 12M6.799 29h36m-36 0l12 12'
      ></path>
    </svg>
  );
}
