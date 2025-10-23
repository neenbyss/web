import { DesignIcon } from '@/icons/design';
import { DiscordIcon } from '@/icons/discord';
import { FiveMIcon } from '@/icons/fivem';
import { MaintenanceIcon } from '@/icons/maintenance';
import { MobileIcon } from '@/icons/mobile';
import { WebIcon } from '@/icons/web';

export const serviceCategories = [
  {
    title: 'Desarrollo Web',
    icon: <WebIcon />,
    uid: 'website',
    color: [126, 106, 255],
    description:
      'Webs rápidas y seguras que cargan en segundos y atraen clientes incluso mientras duermes',
    href: true,
  },
  {
    title: 'Diseño UI/UX',
    icon: <DesignIcon />,
    uid: 'ui-ux-design',
    color: [237, 37, 255],
    description: 'Interfaces limpias y fluidas que guían al usuario a comprar sin fricciones',
    href: true,
  },
  {
    title: 'FiveM',
    icon: <FiveMIcon />,
    uid: 'fivem',
    color: [255, 120, 37],
    plans: true,
    description:
      'Servidores FiveM estables con sistemas únicos que mantienen a tu comunidad conectada más tiempo',
    href: true,
  },
  {
    title: 'Discord',
    icon: <DiscordIcon />,
    uid: 'discord-apps',
    color: [114, 137, 218],
    description:
      'Bots y configuraciones que convierten tu servidor de Discord en una comunidad activa y ordenada',
  },
  {
    title: 'Mantenimiento & Consultoría',
    icon: <MaintenanceIcon />,
    uid: 'it',
    color: [66, 242, 227],
    description:
      'Prevención y soporte técnico que evitan caídas y mantienen tu negocio funcionando sin interrupciones',
  },
  /** 
  {
    title: 'Aplicaciones Móviles',
    icon: <MobileIcon />,
    uid: 'mobile-apps',
    color: [155, 255, 78],
    description: 'Apps ligeras y atractivas que tus clientes disfrutan usar en iOS y Android',
  },
  */
];

type ServiceProps = {
  title: string;
  description: string;
  icon: React.JSX.Element;
  uid: string;
  category?: string;
  plans?: { uid: string; label: string }[];
  cta?: {
    label: string;
    href: string;
    section: string;
  };
};

export const serviceDetails: Record<
  string,
  { uid: string; label: string; description: string; image: string }[]
> = {
  website: [
    {
      uid: 'landing-pages',
      label: 'Landing Pages',
      description: 'Páginas diseñadas para convertir visitantes en clientes.',
      image: '/images/services/landing-pages.webp',
    },
    {
      uid: 'sitios-corporativos',
      label: 'Sitios Corporativos',
      description: 'Presencia profesional en línea para tu empresa.',
      image: '/images/services/sitios-corporativos.webp',
    },
    {
      uid: 'ecommerce',
      label: 'E-Commerce',
      description: 'Tiendas online personalizadas y escalables.',
      image: '/images/services/ecommerce.webp',
    },
    {
      uid: 'admin-panels',
      label: 'Paneles Administrativos',
      description: 'Control total de tu negocio con dashboards personalizados.',
      image: '/images/services/admin-panels.webp',
    },
    {
      uid: 'web-maintenance',
      label: 'Mantenimiento de Páginas Web',
      description: 'Actualizaciones, backups y soporte continuo.',
      image: '/images/services/web-maintenance.webp',
    },
  ],

  'ui-ux-design': [
    {
      uid: 'diseno-web-movil',
      label: 'Diseño Web & Móvil',
      description: 'Interfaces modernas, intuitivas y funcionales.',
      image: '/images/services/diseno-web-movil.webp',
    },
    {
      uid: 'rediseño',
      label: 'Rediseño de aplicaciones (Web & Móvil)',
      description: 'Actualiza tu app para destacar frente a la competencia.',
      image: '/images/services/rediseño.webp',
    },
    {
      uid: 'prototipos',
      label: 'Prototipos Interactivos',
      description: 'Simulaciones navegables para validar ideas.',
      image: '/images/services/prototipos.webp',
    },
  ],

  fivem: [
    {
      uid: 'setup-servidor',
      label: 'Configuración desde Cero',
      description: 'Instalación y configuración inicial de tu servidor RP.',
      image: '/images/services/fivem-setup-inicial.webp',
    },
    {
      uid: 'setup-produccion',
      label: 'Ajuste para Producción',
      description: 'Optimización y estructura para servidores estables.',
      image: '/images/services/fivem-produccion.webp',
    },
    {
      uid: 'scripts',
      label: 'Creación de Scripts',
      description: 'Sistemas únicos adaptados a la temática de tu servidor.',
      image: '/images/services/fivem-scripts.webp',
    },
    {
      uid: 'optimizacion',
      label: 'Optimización de Servidor',
      description: 'Reduce el lag y mejora el rendimiento general.',
      image: '/images/services/fivem-optimizacion.webp',
    },
  ],

  'discord-apps': [
    {
      uid: 'bots',
      label: 'Bots Personalizados',
      description: 'Automatiza tu comunidad con bots a medida.',
      image: '/images/services/discord-bots.webp',
    },
    {
      uid: 'servidores',
      label: 'Organización de servidores',
      description: 'Canales, roles y permisos bien estructurados.',
      image: '/images/services/discord-servidores.webp',
    },
    {
      uid: 'tickets',
      label: 'Administración de discord',
      description: 'Sistemas de soporte, moderación y logs.',
      image: '/images/services/discord-admin.webp',
    },
  ],

  it: [
    {
      uid: 'mantenimiento',
      label: 'Mantenimiento',
      description: 'Prevención, soporte y resolución de fallos técnicos.',
      image: '/images/services/it-mantenimiento.webp',
    },
    {
      uid: 'consultoria',
      label: 'Consultoría Técnica',
      description: 'Asesoría especializada para decisiones tecnológicas.',
      image: '/images/services/it-consultoria.webp',
    },
    {
      uid: 'auditoria',
      label: 'Auditoría de Código',
      description: 'Revisión detallada para encontrar errores y malas prácticas.',
      image: '/images/services/it-auditoria.webp',
    },
  ],
  /** 
  'mobile-apps': [
    {
      uid: 'nativas',
      label: 'Apps Nativas',
      description: 'Aplicaciones móviles optimizadas por plataforma (Android/iOS).',
      image: '/images/services/mobile-nativas.webp',
    },
    {
      uid: 'multiplataforma',
      label: 'Apps Multiplataforma',
      description: 'Una sola base de código para todas las plataformas.',
      image: '/images/services/mobile-cross.webp',
    },
    {
      uid: 'integracion-api',
      label: 'Integración de APIs',
      description: 'Conecta tu app con servicios externos.',
      image: '/images/services/mobile-api.webp',
    },
    {
      uid: 'ux-movil',
      label: 'UX para Móviles',
      description: 'Experiencias optimizadas para pantallas pequeñas.',
      image: '/images/services/mobile-ux.webp',
    },
    {
      uid: 'soporte',
      label: 'Soporte & Actualizaciones',
      description: 'Mantenimiento y nuevas versiones bajo demanda.',
      image: '/images/services/mobile-soporte.webp',
    },
  ],
  */
};

export const serviceDetailsFeatured: ServiceProps[] = [
  {
    title: 'Landing Pages',
    description:
      'Diseño y desarrollo de páginas de aterrizaje modernas y efectivas para captar leads, presentar productos o servicios de manera clara y atractiva.',
    icon: <></>,
    uid: 'landing_pages',
    category: 'web_development',
  },
  {
    title: 'Sitios Corporativos',
    description:
      'Creación de sitios web completos que incluyen información sobre la empresa, servicios, portafolio y contacto, con diseño profesional y responsive.',
    icon: <></>,
    uid: 'corporate_websites',
    category: 'web_development',
  },
  {
    title: 'E-Commerce',
    description:
      'Desarrollo de tiendas en línea con sistemas de pagos integrados, carrito de compras, gestión de inventario y seguimiento de pedidos.',
    icon: <></>,
    uid: 'e_commerce',
    category: 'web_development',
  },
  {
    title: 'Dashboards & Paneles Administrativos',
    description:
      'Construcción de herramientas personalizadas para gestionar datos, visualizar métricas y monitorear actividades en tiempo real.',
    icon: <></>,
    uid: 'dashboards',
    category: 'web_development',
  },
  {
    title: 'Diseño de Aplicaciones Web & Móviles',
    description:
      'Diseño de interfaces modernas, intuitivas y visualmente atractivas para aplicaciones web y móviles.',
    icon: <></>,
    uid: 'web_mobile_design',
    category: 'ui_ux_design',
  },
  {
    title: 'Diseños UI/UX para Scripts de FiveM',
    description: 'Diseños y/o rediseños de interfaces UI/UX para scripts enfocados a FiveM.',
    icon: <></>,
    uid: 'fivem_ui_ux',
    category: 'ui_ux_design',
  },
  {
    title: 'Configuración para FiveM',
    description:
      'Desarrollo de servidores exclusivos para FiveM con sistemas únicos y personalizados para experiencias únicas.',
    icon: <></>,
    uid: 'fivem_configuration',
    category: 'fivem',
    plans: [
      {
        uid: 'fivem_configuration_plan_bronce',
        label: 'Configuración para FiveM - Plan Bronce',
      },
      {
        uid: 'fivem_configuration_plan_plata',
        label: 'Configuración para FiveM - Plan Plata',
      },
      {
        uid: 'fivem_configuration_plan_oro',
        label: 'Configuración para FiveM - Plan Oro',
      },
      {
        uid: 'fivem_configuration_plan_platino',
        label: 'Configuración para FiveM - Plan Platino',
      },
      {
        uid: 'fivem_configuration_plan_diamante',
        label: 'Configuración para FiveM - Plan Diamante',
      },
      {
        uid: 'fivem_configuration_plan_personalizado',
        label: 'Configuración para FiveM - Plan Personalizado',
      },
    ],
    cta: {
      label: 'Ver planes de soporte',
      href: '/services/fivem',
      section: '#plans',
    },
  },
  {
    title: 'Desarrollo de Scripts de FiveM',
    description:
      'Programación de scripts personalizados para añadir mecánicas avanzadas e innovadoras a servidores de FiveM.',
    icon: <></>,
    uid: 'fivem_scripts',
    category: 'fivem',
  },
  {
    title: 'Soporte para FiveM',
    description:
      'Servicio de soporte técnico y mantenimiento continuo para servidores en producción.',
    icon: <></>,
    uid: 'fivem_support',
    category: 'fivem',
  },
  {
    title: 'Bots de Discord',
    description:
      'Desarrollo de bots personalizados para automatización, moderación y gestión de comunidades.',
    icon: <></>,
    uid: 'discord_bots',
    category: 'discord_app',
  },
];
