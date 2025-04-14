'use client';

import Marquee from '@/components/common/marquee';
import { Fade } from '@/components/ui/fade';

export function Products() {
  const mitad = Math.ceil(customSoftwareCategories.length / 2);
  const primeraMitad = customSoftwareCategories.slice(0, mitad);
  const segundaMitad = customSoftwareCategories.slice(mitad);
  return (
    <>
      <style>
        {`
        .mask-gradient-marquee {
         mask-image:linear-gradient(to left, transparent 5%, rgba(0,0,0,1) 52%, rgba(0,0,0,1) 44%,transparent 95%)
        }
        `}
      </style>
      <Fade
        as='section'
        direction='up'
        duration={2}
        initTranslate={100}
        scroll
        className='mask-gradient-marquee relative py-20'
      >
        <h2 className='sr-only'> Proyectos </h2>
        <div className='container-screen-2xl relative flex flex-col items-center gap-2 overflow-clip backdrop-blur-3xl'>
          <Marquee>
            {primeraMitad.map(({ name, icon }, i) => (
              <span
                className='bg-primary/20 shrink-0 rounded-lg px-3 py-1.5 text-sm text-nowrap sm:text-xl'
                key={i}
              >
                {name}
              </span>
            ))}
          </Marquee>
          <Marquee reverse>
            {segundaMitad.map(({ name, icon }, i) => (
              <span
                className='bg-primary/20 shrink-0 rounded-lg px-3 py-1.5 text-sm text-nowrap sm:text-xl'
                key={i}
              >
                {name}
              </span>
            ))}
          </Marquee>
        </div>
      </Fade>
    </>
  );
}

const customSoftwareCategories = [
  { name: 'Páginas Web', icon: <></> },
  { name: 'Landing Pages', icon: <></> },
  { name: 'E-commerce', icon: <></> },
  { name: 'Diseños UI/UX', icon: <></> },
  { name: 'Aplicaciones Móviles', icon: <></> },
  { name: 'Aplicaciones Web Progresivas (PWA)', icon: <></> },
  { name: 'Dashboards y Paneles Administrativos', icon: <></> },
  { name: 'Portales Web Empresariales', icon: <></> },
  { name: 'Sistemas de Reservas Online', icon: <></> },
  { name: 'Sistemas de Facturación', icon: <></> },
  { name: 'Sistemas de Inventario', icon: <></> },
  { name: 'Plataformas Educativas (LMS)', icon: <></> },
  { name: 'Plataformas de Membresía', icon: <></> },
  { name: 'Automatización de Procesos', icon: <></> },
  { name: 'Integraciones con APIs', icon: <></> },
  { name: 'Pasarelas de Pago', icon: <></> },
  { name: 'Sistemas Multiusuario', icon: <></> },
  { name: 'Sistemas de Turnos o Agendamiento', icon: <></> },
  { name: 'Foros y Comunidades Online', icon: <></> },
  { name: 'Redes Sociales Personalizadas', icon: <></> },
  { name: 'Plataformas de Streaming o Video On Demand', icon: <></> },
  { name: 'Sistemas de Encuestas y Formularios', icon: <></> },
  { name: 'Sistemas de Soporte y Tickets', icon: <></> },
  { name: 'Sistemas de Autenticación y Seguridad', icon: <></> },
  { name: 'Sistemas de Logs y Auditoría', icon: <></> },
  { name: 'Bots para Discord', icon: <></> },
  { name: 'Bots para Telegram', icon: <></> },
  { name: 'Integraciones con WhatsApp Business API', icon: <></> },
  { name: 'Sistemas de Chat en Tiempo Real', icon: <></> },
  { name: 'Aplicaciones SaaS', icon: <></> },
  { name: 'Sistemas de Encuestas Dinámicas', icon: <></> },
  { name: 'Software para Restaurantes', icon: <></> },
  { name: 'Software para Clínicas y Psicólogos', icon: <></> },
  { name: 'Sistemas para Coworking', icon: <></> },
  { name: 'Plataformas para Freelancers', icon: <></> },
  { name: 'Sistemas de Gestión Escolar', icon: <></> },
  { name: 'Scripts para FiveM', icon: <></> },
  { name: 'Paneles para Servidores de Juegos', icon: <></> },
  { name: 'Sistemas de Control de Acceso', icon: <></> },
  { name: 'Plataformas de Evaluaciones y Exámenes', icon: <></> },
  { name: 'Gestores de Archivos Online', icon: <></> },
  { name: 'Marketplace Personalizado', icon: <></> },
  { name: 'Integración con Google Calendar', icon: <></> },
  { name: 'Sistemas de Suscripciones y Planes', icon: <></> },
  { name: 'Dashboards de Analytics Personalizados', icon: <></> },
  { name: 'Sistemas de Afiliados', icon: <></> },
  { name: 'Gestión de Proyectos (PM Tools)', icon: <></> },
];
