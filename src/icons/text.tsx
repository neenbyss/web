import React from 'react';
import type { SVGProps } from 'react';

export function TextIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24' {...props}>
      <path fill='currentColor' d='M21 6v2H3V6zM3 18h9v-2H3zm0-5h18v-2H3z'></path>
    </svg>
  );
}
