import { AllIcon } from '@/icons/all';
import { DesignIcon } from '@/icons/design';
import { FiveMIcon } from '@/icons/fivem';
import { WebIcon } from '@/icons/web';

export const categories = [
  {
    slug: 'all',
    label: 'Todos',
    icon: <AllIcon />,
  },
  {
    slug: 'web',
    label: 'Proyectos Web',
    icon: <WebIcon />,
  },
  {
    slug: 'design',
    label: 'Diseños UI/UX',
    icon: <DesignIcon />,
  },
  {
    slug: 'fivem',
    label: 'FiveM',
    icon: <FiveMIcon />,
  },
];
