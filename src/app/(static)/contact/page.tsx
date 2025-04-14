import { AppBreadcrumb } from '@/components/common/app-breadcrumb';
import { ContactForm } from '@/components/form/contact';
import { Button } from '@/components/ui/button';
import SpotlightCard from '@/components/ui/spotlightcard';
import { CalendarIcon } from '@/icons/calendar';
import { DiscordIcon } from '@/icons/discord';
import { EmailIcon } from '@/icons/email';
import { Socials } from '@/utils/data/socials';

import HERO_CIRCLES_GROUP from '@/resources/svg/CIRCLES_CONTACT.svg';
import HERO_VECTOR_BG from '@/resources/svg/VECTOR_CONTACT.svg';
import { createMetadata } from '@/lib/metadata';
import Link from 'next/link';
import { globalLinks } from '@/utils/data/global-links';
import { Suspense } from 'react';

export const metadata = createMetadata({
  title: 'Contáctanos',
  description:
    'Conéctate con nuestro equipo y ten por garantizado un soporte especializado en ofrecer soluciones personalizadas',
});
export default function ContactPage() {
  return (
    <main className='relative overflow-clip'>
      <h1 className='sr-only'> Contáctanos </h1>

      <div className='container-screen-xl relative z-10 flex flex-col gap-8 pt-10 pb-24 lg:flex-row'>
        <div>
          <AppBreadcrumb className='mb-3 bg-transparent px-0 py-0' />

          <h2 className='mb-4 text-5xl font-medium capitalize'>Consulta con Nuestro Equipo</h2>
          <p className='mb-6 max-w-sm'>
            <span className='text-primary font-medium'>
              {' '}
              ¿Necesitas ayuda o tienes una consulta?{' '}
            </span>
            <br />
            Estamos aquí para asistirte.
            <br />
            <br />
            Nuestro equipo de soporte especializado está listo para ofrecerte soluciones
            personalizadas y asesorarte en cada paso.
          </p>

          <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
            <a href={globalLinks.email.link} target='_blank' className='group'>
              <SpotlightCard
                className='border-primary bg-primary/20 border p-4'
                spotlightColor='rgba(93, 69, 253, .4)'
              >
                <div className='bg-primary/15 border-primary text-primary group-hover:text-foreground mb-3 flex size-10 flex-col items-center justify-center rounded-lg border duration-300'>
                  <EmailIcon />{' '}
                </div>
                <span className='mb-1.5 block text-lg font-medium capitalize'>
                  Correo Empresarial
                </span>
                <span className='-my-2 block'>{globalLinks.email.label}</span>
                <p className='text-foreground/40 pt-2 text-xs'>Respuesta en menos de 24-48 horas</p>
              </SpotlightCard>
            </a>
            <a href={globalLinks.discord.link} target='_blank' className='group'>
              <SpotlightCard
                className='border-secondary bg-secondary/20 border p-4'
                spotlightColor='rgba(151, 71, 255, .4)'
              >
                <div className='bg-secondary/15 border-secondary text-secondary group-hover:text-foreground mb-3 flex size-10 flex-col items-center justify-center rounded-lg border duration-300'>
                  <DiscordIcon />{' '}
                </div>
                <span className='mb-1.5 block text-lg font-medium capitalize'>
                  Servidor De Discord
                </span>
                <span className='-my-2 block'> {globalLinks.discord.label} </span>
                <p className='text-foreground/40 pt-2 text-xs'>Se parte de nuestra comunidad</p>
              </SpotlightCard>
            </a>
          </div>

          <div className='mt-3 mb-5'>
            <h3 className='text-primary mb-2 text-lg font-medium'> Nuestras Redes Sociales </h3>

            <div className='flex flex-wrap gap-2'>
              {Socials.map(({ href, icon }, i) => (
                <Button
                  key={i}
                  asChild
                  size='icon'
                  variant='flat'
                  className='border-primary border hover:scale-105'
                >
                  <a href={href} target='_blank'>
                    {icon}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <div className='bg-ring rounded-lg border p-3'>
            <h3 className='mb-1.5 text-base font-medium'> ¿Necesitas Agendar Una reunión? </h3>
            <p className='pb-3'>
              {' '}
              Programa una llamada con uno de nuestros especialistas y obtén respuestas inmediatas a
              tus consultas.{' '}
            </p>
            <Button asChild className='w-full'>
              <a href={globalLinks.meeting.link} target='_blank'>
                Agenda Una Reunión <CalendarIcon />{' '}
              </a>
            </Button>
          </div>
        </div>
        <div className='w-full lg:max-w-2xl'>
          <div className='bg-content h-fit w-full rounded-lg border p-5'>
            <h2 className='text-2xl font-medium'> Envíanos Un Mensaje </h2>
            <Suspense>
              <ContactForm />
            </Suspense>
          </div>
          <div className='mt-4'>
            <p className='text-foreground/50'>
              {' '}
              Horario de Atención <br />
              Lunes a Sábados entre las 6:00PM - 1:00AM (UTC){' '}
            </p>
          </div>
        </div>
      </div>
      <img
        alt='CIRCLES'
        src={HERO_CIRCLES_GROUP.src}
        className='pointer-events-none absolute -top-20 -right-50 sm:-top-80 sm:left-1/2 sm:-translate-x-[calc((1/2*100%)-50rem)]'
      />
      <img
        alt='VECTOR'
        src={HERO_VECTOR_BG.src}
        className='pointer-events-none absolute -top-5 left-0 sm:-top-60 sm:left-1/2 sm:-translate-x-[calc((1/2*100%)--30rem)]'
      />
    </main>
  );
}
