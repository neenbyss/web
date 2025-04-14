import React from 'react';
import type { SVGProps } from 'react';

export function WebIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={48} height={48} viewBox='0 0 48 48' {...props}>
      <defs>
        <mask id='ipSWebPage0'>
          <g fill='none'>
            <rect
              width={40}
              height={32}
              x={4}
              y={8}
              stroke='#fff'
              strokeLinejoin='round'
              strokeWidth={4}
              rx={3}
            ></rect>
            <path
              fill='#fff'
              stroke='#fff'
              strokeWidth={4}
              d='M4 11a3 3 0 0 1 3-3h34a3 3 0 0 1 3 3v9H4z'
            ></path>
            <circle r={2} fill='#000' transform='matrix(0 -1 -1 0 10 14)'></circle>
            <circle r={2} fill='#000' transform='matrix(0 -1 -1 0 16 14)'></circle>
          </g>
        </mask>
      </defs>
      <path fill='currentColor' d='M0 0h48v48H0z' mask='url(#ipSWebPage0)'></path>
    </svg>
  );
}
