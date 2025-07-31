import React from 'react';
import type { SVGProps } from 'react';

export function SeparatorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={512}
      height={512}
      viewBox='0 0 512 512'
      {...props}
    >
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M469.333 277.333H42.666v-42.666h426.667z'
        clipRule='evenodd'
      ></path>
    </svg>
  );
}
