import { DesignIcon } from '@/icons/design';
import { DiscordIcon } from '@/icons/discord';
import { FiveMIcon } from '@/icons/fivem';
import { WebsiteIcon } from '@/icons/website';

export const plans = {
  monthly: [
    {
      uid: 'basico',
      name: 'Básico',
      description: 'Mantenimiento ligero para servidores estables',
      price: 37,
      hours: '28h/mes',
      recommended: false,
      custom: false,
      discount3: 'Ahorra 5% contratando 3 meses',
      discount6: 'Ahorra 10% contratando 6 meses',
      note: 'Incluye soporte L-V y urgencias fin de semana',
      features: [
        '7 horas semanales de soporte',
        'Corrección de bugs simples',
        'Instalación de scripts básicos',
        'Revisión de logs y consola',
        'Soporte L-V + urgencias weekend',
      ],
    },
    {
      uid: 'plus',
      name: 'Plus',
      description: 'Soporte activo con cambios regulares',
      price: 75,
      hours: '56h/mes',
      recommended: true,
      custom: false,
      discount3: 'Ahorra 7% contratando 3 meses',
      discount6: 'Ahorra 12% contratando 6 meses',
      note: 'Recomendado para servidores con actualizaciones frecuentes',
      features: [
        '14 horas semanales de soporte',
        'Instalación de scripts avanzados',
        'Prioridad en el soporte',
        'Revisión proactiva del servidor',
        'Soporte L-V + urgencias weekend',
      ],
    },
  ],

  advanced: [
    {
      uid: 'reparacion',
      name: 'Reparación',
      description: 'Solución de errores y problemas técnicos',
      price: 115,
      hours: '84h/mes',
      recommended: false,
      custom: false,
      note: 'Especializado en problemas críticos y rendimiento',
      features: [
        '21 horas semanales de trabajo',
        'Corrección de errores críticos',
        'Integración entre sistemas',
        'Optimización de rendimiento',
        'Soporte técnico especializado',
      ],
    },
    {
      uid: 'completo',
      name: 'Completo',
      description: 'Desarrollo integral para expansión',
      price: 165,
      hours: '112h/mes',
      recommended: true,
      custom: false,
      note: 'Ideal para proyectos en crecimiento continuo',
      features: [
        '28 horas semanales de desarrollo',
        'Configuración masiva de contenido',
        'Integración completa de sistemas',
        'Revisiones semanales de progreso',
        'Optimización continua',
      ],
    },
    {
      uid: 'maxima',
      name: 'Máxima',
      description: 'Aceleración total en tiempo récord',
      price: 250,
      hours: '160h/mes',
      recommended: false,
      custom: false,
      note: 'Incluye soporte premium 24/7 y entregas rápidas',
      features: [
        '40 horas semanales dedicadas',
        'Montaje completo en 30 días',
        'Prioridad absoluta en tareas',
        'Adaptaciones personalizadas',
        'Soporte premium 24/7',
      ],
    },
  ],

  kits: [
    {
      icon: DiscordIcon,
      name: 'Discord',
      description:
        'Servidor de Discord completo, bot personalizado, canales organizados y sistema de tickets',
      price: 37,
    },
    {
      icon: WebsiteIcon,
      name: 'Página web',
      description: 'Página web informativa con diseño personalizado + 1 mes de hosting gratuito',
      price: 27,
    },
    {
      icon: FiveMIcon,
      name: 'Base de Fivem',
      description: 'Base de un servidor de FiveM QBCore preconfigurado',
      price: 77,
    },
    {
      icon: DesignIcon,
      name: 'Diseños personalizados',
      description:
        'Complemento para darle personalidad y una marca a tu servidor (branding, diseños, etc)',
      price: 27,
    },
  ],

  bundles: [
    {
      uid: 'pack-basic',
      name: 'Paquete Básico',
      description: 'Servicio Básico por un mes + complementos básicos',
      price: 107,
      original: 180,
      save: 6,
      custom: false,
      features: [
        'Servicio básico por un mes',
        'Servidor básico de discord + bot',
        'Página web sencilla',
      ],
    },
    {
      uid: 'pack-pro',
      name: 'Paquete PRO',
      description: 'Base completa preconfigurada + complementos + servicios básico por un mes',
      price: 157,
      original: 227,
      save: 20,
      custom: false,
      features: [
        'Base preconfigurada QBCore',
        'Servidor + bot de discord',
        'Página web informativa',
        'Plan completo por un mes',
        'Soporte Básico',
      ],
    },
    {
      uid: 'pack-premium',
      name: 'Paquete Premium',
      description: 'Paquete 100% completo para fivem, TODO EN UNO',
      price: 307,
      original: 450,
      save: 31,
      custom: false,
      recommended: true,

      features: [
        'Página web completa',
        'Servidor y bot de discord completo',
        'Servicio por un mes',
        'Soporte después lanzamiento por un mes',
      ],
    },
  ],
};
