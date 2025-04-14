import { ContactForm } from '@/components/form/contact';
import { Button } from '@/components/ui/button';
import { Fade } from '@/components/ui/fade';

import { ClockIcon } from '@/icons/clock';
import { DiscordIcon } from '@/icons/discord';
import { EmailIcon } from '@/icons/email';

import { globalLinks } from '@/utils/data/global-links';
import { Socials } from '@/utils/data/socials';
import { Suspense } from 'react';

export function Contact() {
  return (
    <section className='from-background border-y bg-gradient-to-r to-[rgba(151,71,255,0.05)]'>
      <div className='container-screen-xl flex flex-col justify-between gap-8 py-32 lg:flex-row'>
        <div className='w-full lg:max-w-md'>
          <Fade as='h2' delay={0.2} className='bg-primary mb-2 w-fit p-1.5 text-base sm:text-xl'>
            Contáctanos
          </Fade>
          <Fade as='span' delay={0.4} className='text-foreground text-3xl font-medium sm:text-6xl'>
            {' '}
            Nos Encantaría Poder Ayudarte{' '}
          </Fade>

          <Fade as='p' delay={0.6} className='mt-6'>
            ¿Tienes un proyecto en mente? Estamos aquí para ayudarte a hacerlo realidad. Ponte en
            contacto con nosotros y comencemos a trabajar juntos.
          </Fade>

          <div className='mt-4 space-y-2'>
            <Fade
              as='a'
              delay={0.8}
              href={globalLinks.email.link}
              target='_blank'
              className='bg-content hover:bg-content-1 hover:border-primary flex items-center gap-3 rounded-lg border p-3.5 transition-colors'
            >
              <div className='bg-primary/10 flex size-10 items-center justify-center rounded-lg'>
                <EmailIcon className='text-primary' />
              </div>
              <div>
                <h3 className='text-primary text-base'>Correo Empresarial</h3>
                <p> {globalLinks.email.label} </p>
              </div>
            </Fade>
            <Fade delay={1} className='bg-content flex items-center gap-3 rounded-lg border p-3.5'>
              <div className='bg-primary/10 flex size-10 items-center justify-center rounded-lg'>
                <ClockIcon className='text-primary' />
              </div>
              <div>
                <h3 className='text-primary text-base'>Horario de Atención</h3>
                <p> Lun-Sab: 6:00PM - 1:00AM (UTC) </p>
              </div>
            </Fade>
          </div>

          <div className='mt-4'>
            <Fade as='h3' delay={0.4} className='text-secondary text-lg font-medium'>
              {' '}
              Redes Sociales{' '}
            </Fade>
            <div className='mt-3 flex flex-wrap gap-2'>
              {Socials.map(({ href, icon }, i) => (
                <Button key={i} asChild size='sm' variant='flat' className='size-8 hover:scale-105'>
                  <Fade as='a' delay={i * 0.05 + 0.4} href={href} target='_blank'>
                    {icon}
                  </Fade>
                </Button>
              ))}
            </div>
          </div>

          <Fade direction='down' delay={0.8} className='bg-primary/10 mt-4 rounded-lg p-4'>
            <h3 className='mb-2 text-base font-medium'> ¿Necesitas una respuesta rápida? </h3>
            <p className='mb-4'>
              {' '}
              Únete a nuestro servidor de Discord y abre un ticket personalizado para recibir
              atención rápida y eficiente.{' '}
            </p>
            <Button asChild variant='outline' className='bg-background w-full'>
              <a href={globalLinks.discord.link} target='_blank'>
                Unirse Ahora <DiscordIcon />
              </a>
            </Button>
          </Fade>
        </div>

        <Fade
          direction='right'
          delay={0.8}
          className='bg-content h-fit w-full rounded-lg border p-5 lg:max-w-2xl'
        >
          <h2 className='text-2xl font-medium'> Envíanos Un Mensaje </h2>
          <Suspense>
            <ContactForm />
          </Suspense>
        </Fade>
      </div>
    </section>
  );
}
