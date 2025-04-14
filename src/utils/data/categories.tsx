import type { ProjectCategory } from '@/types/project';
import React from 'react';

export const categories: Record<ProjectCategory, { name: string; icon: React.JSX.Element }> = {
  web: {
    name: 'Páginas Web',
    icon: <></>,
  },
  design: {
    name: 'Diseños',
    icon: <></>,
  },
  fivem: {
    name: 'Desarrollo de FiveM',
    icon: <></>,
  },
  it: {
    name: 'Mantenimiento IT',
    icon: <></>,
  },
  other: {
    name: 'Otro',
    icon: <></>,
  },
};
