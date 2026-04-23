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
    uid: 'web_development',
    color: [93, 69, 253],
  },
  {
    title: 'Diseño UI/UX',
    icon: <DesignIcon />,
    uid: 'ui_ux_design',
    color: [237, 37, 255],
  },
  {
    title: 'FiveM',
    icon: <FiveMIcon />,
    uid: 'fivem',
    color: [255, 120, 37],
  },
  {
    title: 'Discord',
    icon: <DiscordIcon />,
    uid: 'discord_app',
    color: [114, 137, 218],
  },
];

// Categorías retiradas del catálogo público. Se preservan aquí para poder
// reactivarlas en el futuro sin tener que reescribir copy ni iconos.
export const hiddenServiceCategories = [
  {
    title: 'Mantenimiento & Consultoría',
    icon: <MaintenanceIcon />,
    uid: 'maintenance_it',
    color: [66, 242, 227],
  },
  {
    title: 'Aplicaciones Móviles',
    icon: <MobileIcon />,
    uid: 'mobile_apps',
    color: [155, 255, 78],
  },
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

export const serviceDetails: Record<string, ServiceProps[]> = {
  web_development: [
    {
      title: 'Landing Pages',
      description:
        'Diseñamos y desarrollamos páginas de aterrizaje enfocadas en captar la atención del usuario desde el primer segundo. Utilizamos estrategias de conversión, estructura visual jerárquica, velocidad de carga optimizada y llamadas a la acción efectivas para lograr que el visitante tome decisiones rápidas, ya sea registrarse, comprar o contactar.',
      icon: <></>,
      uid: 'landing_pages',
    },
    {
      title: 'Sitios Corporativos',
      description:
        'Creamos sitios institucionales completos que reflejan la identidad, valores y servicios de una empresa u organización. Incorporamos secciones como Nosotros, Servicios, Portafolio, Blog, Contacto, y más, adaptados al estilo de cada cliente. Todo con diseño responsive, SEO técnico y estándares de accesibilidad.',
      icon: <></>,
      uid: 'corporate_websites',
    },
    {
      title: 'E-Commerce',
      description:
        'Desarrollamos tiendas online completas con panel de administración, pasarelas de pago seguras, control de inventario, sistemas de descuentos, métodos de envío, carrito de compras inteligente y gestión de pedidos. Ideal para productos físicos o digitales, escalables según el modelo de negocio.',
      icon: <></>,
      uid: 'e_commerce',
    },
    {
      title: 'Dashboards & Paneles Administrativos',
      description:
        'Construimos paneles de administración y visualización de datos con enfoque en la eficiencia. Incluyen CRUDs personalizados, filtros avanzados, gráficos, exportación de datos y más. Adaptables a necesidades internas como manejo de usuarios, reportes financieros, registros y métricas en tiempo real.',
      icon: <></>,
      uid: 'dashboards',
    },
    {
      title: 'Aplicaciones Web Progresivas (PWA)',
      description:
        'Desarrollamos aplicaciones web que funcionan offline, se instalan como apps en cualquier dispositivo y ofrecen una experiencia fluida y rápida. Ideales para productos digitales, herramientas internas o servicios que deben funcionar sin conexión o con conectividad limitada.',
      icon: <></>,
      uid: 'pwa_apps',
    },
    {
      title: 'Integraciones API',
      description:
        'Conectamos tu sistema con otros servicios externos o internos para automatizar procesos, centralizar datos y mejorar el flujo de trabajo. Desde pasarelas de pago y CRMs hasta plataformas de envío, ERPs y soluciones a medida. Diseñamos integraciones robustas, seguras y escalables.',
      icon: <></>,
      uid: 'api_integrations',
    },
  ],

  ui_ux_design: [
    {
      title: 'Diseño de Aplicaciones Web & Móviles',
      description:
        'Creamos interfaces intuitivas y visualmente atractivas para aplicaciones web y móviles. Nos enfocamos en la experiencia del usuario desde el primer clic, garantizando usabilidad, jerarquía visual clara, coherencia de marca y adaptabilidad a todo tipo de dispositivo.',
      icon: <></>,
      uid: 'web_mobile_design',
    },
    {
      title: 'Diseños UI/UX para Scripts de FiveM',
      description:
        'Diseñamos interfaces exclusivas para servidores y scripts de FiveM, optimizadas para facilitar la navegación, la interacción del jugador y la inmersión dentro del entorno roleplay. Nos adaptamos al estilo visual de cada servidor para ofrecer una experiencia coherente y funcional.',
      icon: <></>,
      uid: 'fivem_ui_ux',
    },
    {
      title: 'Prototipos Interactivos',
      description:
        'Diseñamos prototipos funcionales que permiten simular la navegación completa de una aplicación antes de su desarrollo. Estos prototipos ayudan a validar ideas, probar flujos de usuario y obtener retroalimentación temprana en el proceso de diseño.',
      icon: <></>,
      uid: 'interactive_prototypes',
    },
    {
      title: 'Optimización de UX',
      description:
        'Analizamos productos digitales existentes para identificar fricciones y puntos de mejora en la experiencia del usuario. Rediseñamos flujos, mejoramos la arquitectura de información, jerarquía visual y simplificamos interacciones para maximizar la retención y conversión.',
      icon: <></>,
      uid: 'ux_optimization',
    },
    {
      title: 'Wireframes & Mockups',
      description:
        'Elaboramos wireframes (bocetos estructurales) y mockups (versiones visuales detalladas) como parte del proceso previo al desarrollo. Esto permite definir con claridad la arquitectura, disposición y estilo de cada sección o pantalla.',
      icon: <></>,
      uid: 'wireframes_mockups',
    },
  ],

  fivem: [
    {
      title: 'Configuración para FiveM',
      description:
        'Configuramos servidores de FiveM completamente optimizados y personalizados según la temática del rol (policíaco, urbano, realista, etc.). Instalamos recursos, configuramos permisos, bases de datos, scripts esenciales y ajustes clave para una experiencia fluida y escalable.',
      icon: <></>,
      uid: 'fivem_configuration',
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
        'Creamos scripts únicos y a medida para servidores de FiveM, desde sistemas de economía, inventario, trabajos, vehículos hasta mecánicas exclusivas. Nuestros scripts están pensados para optimizar el rendimiento del servidor y enriquecer la experiencia de los jugadores.',
      icon: <></>,
      uid: 'fivem_scripts',
    },
    {
      title: 'Soporte para FiveM',
      description:
        'Brindamos mantenimiento y soporte técnico para servidores de FiveM. Incluye resolución de errores, optimización de recursos, actualizaciones de scripts, y atención personalizada ante problemas técnicos en producción.',
      icon: <></>,
      uid: 'fivem_support',
    },
  ],

  discord_app: [
    {
      title: 'Bots de Discord',
      description:
        'Desarrollamos bots personalizados con comandos, automatizaciones, paneles de control y funciones avanzadas como verificación, gestión de rangos, reacciones, notificaciones automáticas y más. Ideales para comunidades, streamers o empresas.',
      icon: <></>,
      uid: 'discord_bots',
    },
    {
      title: 'Configuración de Servidores',
      description:
        'Organizamos servidores de Discord de forma profesional: creación de canales, roles jerárquicos, sistemas de permisos, reglas, automatizaciones, categorías y estética visual que refleje tu comunidad o marca.',
      icon: <></>,
      uid: 'server_setup',
    },
    {
      title: 'Integraciones con APIs Externas',
      description:
        'Conectamos Discord con sistemas externos como Trello, Notion, bases de datos personalizadas, CRMs, plataformas educativas y más, para sincronizar datos y mejorar la productividad del servidor.',
      icon: <></>,
      uid: 'discord_api_integrations',
    },
    {
      title: 'Sistemas de Verificación y Soporte',
      description:
        'Implementamos sistemas de verificación de usuarios mediante reacciones, preguntas, autenticación con bases de datos externas, y creación de sistemas de tickets para atención personalizada dentro de tu comunidad.',
      icon: <></>,
      uid: 'discord_verification_support',
    },
  ],
};

// Servicios retirados del catálogo público pero preservados para poder
// reactivarlos en el futuro. No se enlazan desde `serviceCategories`, por
// lo que no aparecen en el home ni en /services ni en el dropdown de contacto.
export const hiddenServiceDetails: Record<string, ServiceProps[]> = {
  maintenance_it: [
    {
      title: 'Mantenimiento Preventivo',
      description:
        'Realizamos revisiones periódicas de sitios y sistemas para garantizar su estabilidad, detectar posibles errores antes de que afecten al usuario final y extender la vida útil de las plataformas digitales.',
      icon: <></>,
      uid: 'preventive_maintenance',
    },
    {
      title: 'Actualización de Software',
      description:
        'Modernizamos tecnologías, frameworks, bibliotecas y dependencias utilizadas en tus sistemas. Aseguramos compatibilidad con versiones recientes, mejoras de seguridad y nuevos estándares web.',
      icon: <></>,
      uid: 'software_updates',
    },
    {
      title: 'Optimización de Performance',
      description:
        'Mejoramos la velocidad de carga, eficiencia del código, compresión de archivos y estructura general de los sitios para ofrecer una experiencia más rápida, aumentar el posicionamiento SEO y reducir la tasa de rebote.',
      icon: <></>,
      uid: 'performance_optimization',
    },
    {
      title: 'Resolución de Errores (Bug Fixing)',
      description:
        'Identificamos, depuramos y corregimos errores funcionales, visuales o de compatibilidad en sitios web, aplicaciones y sistemas. Documentamos cada caso para prevenir futuras incidencias.',
      icon: <></>,
      uid: 'bug_fixing',
    },
    {
      title: 'Backups & Seguridad',
      description:
        'Implementamos políticas de respaldo automáticas, almacenamiento seguro de información sensible, escaneos de seguridad, sistemas anti-hackeo y recuperación ante fallos o ataques.',
      icon: <></>,
      uid: 'backups_security',
    },
    {
      title: 'Consultoría Técnica General',
      description:
        'Ofrecemos asesoramiento técnico personalizado en arquitectura de software, elección de tecnologías, escalabilidad de sistemas, soluciones a medida, automatización y mejoras operativas.',
      icon: <></>,
      uid: 'technical_consulting',
    },
    {
      title: 'Auditoría de Código & Seguridad',
      description:
        'Revisamos código fuente, analizamos estándares de calidad, buscamos vulnerabilidades, y entregamos un informe detallado con recomendaciones prácticas para mejorar rendimiento y seguridad.',
      icon: <></>,
      uid: 'code_audit',
    },
  ],

  mobile_apps: [
    {
      title: 'Aplicaciones Nativas',
      description:
        'Desarrollamos aplicaciones móviles optimizadas exclusivamente para Android o iOS. Aprovechamos al máximo las capacidades del sistema operativo como notificaciones, GPS, cámara, sensores y rendimiento, logrando una experiencia fluida y potente.',
      icon: <></>,
      uid: 'native_apps',
    },
    {
      title: 'Aplicaciones Híbridas',
      description:
        'Creamos apps multiplataforma con frameworks como React Native o Flutter, lo que permite reducir costos y tiempo de desarrollo sin perder calidad. Un solo código base que funciona perfectamente en Android y iOS.',
      icon: <></>,
      uid: 'hybrid_apps',
    },
    {
      title: 'Integración de APIs',
      description:
        'Conectamos tu aplicación móvil con servicios externos para enviar o recibir datos en tiempo real: pagos, ubicación, notificaciones, CRMs, servicios propios o de terceros.',
      icon: <></>,
      uid: 'mobile_api_integration',
    },
    {
      title: 'UI/UX para Móviles',
      description:
        'Diseñamos interfaces centradas en la experiencia móvil: navegación simple, botones accesibles, legibilidad clara, interacción con gestos y adaptación a múltiples resoluciones.',
      icon: <></>,
      uid: 'mobile_ui_ux',
    },
    {
      title: 'Soporte y Actualización',
      description:
        'Mantenemos tus aplicaciones móviles actualizadas, libres de errores y adaptadas a las nuevas versiones del sistema operativo, resolviendo bugs, mejorando compatibilidad y agregando funcionalidades.',
      icon: <></>,
      uid: 'mobile_support',
    },
  ],
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
