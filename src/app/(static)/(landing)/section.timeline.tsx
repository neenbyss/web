'use client';
import React from 'react';
import Image from 'next/image';

import { Timeline as TimelineUI } from '@/components/ui/timeline';
import { Button } from '@/components/ui/button';
import { Fade } from '@/components/ui/fade';

import { AlertIcon } from '@/icons/alert';
import { CheckIcon } from '@/icons/check';
import { Separator } from '@/components/ui/separator';
import { EmailIcon } from '@/icons/email';
import { DiscordIcon } from '@/icons/discord';

import { SmileIcon } from '@/icons/smile';
import { UsersIcon } from '@/icons/users';
import { QuoteIcon } from '@/icons/quote';
import { CheckTaskIcon } from '@/icons/check-task';
import { OrganizationIcon } from '@/icons/organization';
import { ProcessIcon } from '@/icons/process';
import { InterfaceIcon } from '@/icons/interface';
import { AllIcon } from '@/icons/all';
import { DeviceIcon } from '@/icons/device';
import { PerformanceIcon } from '@/icons/perfomance';
import { ShieldIcon } from '@/icons/shield';
import { StarIcon } from '@/icons/star';
import { TestIcon } from '@/icons/test';
import { SupportIcon } from '@/icons/support';
import { SwitchIcon } from '@/icons/switch';

import { cn } from '@/lib/utils';

import VISUAL_SVG from '@/resources/svg/visual.svg';
import TASK_SVG from '@/resources/svg/task.svg';
import { MessageIcon } from '@/components/ui/message';
import { FileIcon } from '@/icons/file';
import { CodeIcon } from '@/icons/code';
import { LaunchIcon } from '@/icons/launch';

const data = [
  {
    title: 'Consulta Y Descubrimiento',
    icon: <MessageIcon />,
    content: <ConsultaYDescubrimiento />,
  },
  {
    title: 'Planificación Estratégica',
    icon: <FileIcon />,
    content: <Planification />,
  },
  {
    title: 'Ejecución',
    icon: <CodeIcon />,
    content: <Ejecucion />,
  },
  {
    title: 'Pruebas Y Optimización',
    icon: <TestIcon />,
    content: <PruebasYOptmization />,
  },
  {
    title: 'Lanzamiento Y Soporte',
    icon: <LaunchIcon />,
    content: <LazamientoYSoporte />,
  },
];

export function Timeline() {
  return (
    <TimelineUI as='section' className='container-screen-2xl overflow-clip py-50' data={data}>
      <div>
        <Fade
          as='h2'
          direction='down'
          delay={0.2}
          className='bg-primary text-primary-foreground w-fit px-3 py-1.5 text-center text-sm md:text-2xl lg:mx-auto'
        >
          {' '}
          ¿Cómo Trabajamos?{' '}
        </Fade>
        <Fade
          as='span'
          direction='down'
          delay={0.4}
          className='text-foreground mt-3 mb-4 block text-3xl font-medium capitalize md:max-w-xl md:text-6xl lg:mx-auto lg:text-center'
        >
          nuestra Ruta Hacia el Éxito del Proyecto
        </Fade>
        <Fade as='p' direction='down' delay={0.6} className='max-w-4xl lg:mx-auto lg:text-center'>
          Seguimos una metodología estructurada que garantiza resultados consistentes y de alta
          calidad en cada proyecto que desarrollamos.
        </Fade>
      </div>
    </TimelineUI>
  );
}

function ConsultaYDescubrimiento() {
  const data = {
    procesoDeConsultoria: [
      {
        paso: 1,
        titulo: 'Reunión Inicial',
        descripcion:
          'Conversamos sobre tu visión, objetivos y expectativas para establecer una base sólida de entendimiento.',
      },
      {
        paso: 2,
        titulo: 'Análisis de necesidades',
        descripcion:
          'Evaluamos a fondo tus requisitos técnicos, funcionales y de negocio para definir el alcance del proyecto.',
      },
      {
        paso: 3,
        titulo: 'Propuesta personalizada',
        descripcion:
          'Desarrollamos una propuesta detallada con soluciones, metodología y estimación de recursos.',
      },
      {
        paso: 4,
        titulo: 'Acuerdo y compromiso',
        descripcion:
          'Formalizamos nuestra colaboración con términos claros y expectativas alineadas para iniciar el proyecto.',
      },
    ],
    actividadesPrincipales: [
      'Análisis de requisitos técnicos y funcionales',
      'Identificación de objetivos de negocio',
      'Evaluación de público objetivo',
      'Definición de métricas de éxito',
    ],
  };

  return (
    <div>
      <p className='mb-8 max-w-md'>
        Comenzamos con una consulta detallada para entender tus necesidades, objetivos y visión del
        proyecto.
      </p>
      <div>
        <h4 className='mb-2.5 text-lg font-medium sm:text-2xl'> Proceso de Consultoría </h4>

        <div className='space-y-2'>
          {data.procesoDeConsultoria.map(({ titulo, paso, descripcion }, i) => (
            <div key={i} className='bg-primary/10 flex gap-5 rounded-lg p-4'>
              <span className='bg-primary text-foreground mt-1 flex size-5 shrink-0 flex-col items-center justify-center rounded-sm font-medium'>
                {paso}
              </span>
              <div>
                <h5 className='text-base font-medium'> {titulo} </h5>
                <p>{descripcion}</p>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-8 grid gap-6 sm:grid-cols-[1fr_0.6fr] lg:grid-cols-1 xl:grid-cols-[1fr_0.6fr]'>
          <div>
            <h5 className='mb-3 text-lg font-medium sm:text-2xl'> Actividades Principales </h5>
            <ul className='mb-8 flex flex-col gap-1.5'>
              {data.actividadesPrincipales.map((txt, i) => (
                <li key={i} className='flex items-center gap-2'>
                  {' '}
                  <CheckTaskIcon className='text-primary shrink-0' /> {txt}{' '}
                </li>
              ))}
            </ul>

            <div className='bg-primary/10 border-primary rounded-lg border p-4'>
              <div className='mb-2 flex gap-2'>
                <QuoteIcon className='text-primary size-6 shrink-0' />
                <p className='text-primary text-base text-pretty'>
                  La fase de descubrimiento es fundamental para entender realmente lo que el cliente
                  necesita, no solo lo que pide.
                </p>
              </div>
              <span className='text-primary block w-full text-end'>— Nuestro equipo</span>
            </div>
          </div>
          <div className='grid gap-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1'>
            <div className='bg-default rounded-lg border p-4'>
              <SmileIcon className='text-primary size-8' />
              <span className='mt-2 block text-3xl font-medium'> 98% </span>
              <p> Satisfacción en esta fase </p>
            </div>
            <div className='bg-default rounded-lg border p-4'>
              <UsersIcon className='text-primary size-8' />
              <span className='mt-2 block text-3xl font-medium'> 2-3 </span>
              <p> Reuniones Promedio </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Planification() {
  const planificacionProyecto = {
    tableroDePlanificacion: {
      porHacer: ['Planificación por sprints', 'Establecimiento y Organización'],
      enProgreso: ['Elaboración de cronograma', 'Asignación de recursos'],
      completado: ['Definición de alcance y entregables'],
    },
    fasesDelProyecto: [
      {
        fase: 1,
        nombre: 'Definición de alcance y entregables',
      },
      {
        fase: 2,
        nombre: 'Elaboración de cronograma',
      },
      {
        fase: 3,
        nombre: 'Asignación de recursos',
      },
      {
        fase: 4,
        nombre: 'Planificación de sprints',
      },
      {
        fase: 5,
        nombre: 'Establecimiento de hitos',
      },
    ],
    elementosClave: [
      {
        titulo: 'Equipo Asignado',
        descripcion: 'Especialistas dedicados a tu proyecto',
        icon: <UsersIcon />,
      },
      {
        titulo: 'Objetivos Claros',
        descripcion: 'Metas y entregables definidos',
        icon: <ProcessIcon />,
      },
      {
        titulo: 'Metodología Ágil',
        descripcion: 'Adaptación y mejora continua',
        icon: <OrganizationIcon />,
      },
    ],
  };

  const parseInfo = {
    porHacer: {
      point: 'bg-[#A7A7A7]',
      contendor: 'bg-[#777777]/10',
      label: 'Por Hacer',
    },
    enProgreso: {
      point: 'bg-primary',
      contendor: 'bg-primary/10',
      label: 'En Progreso',
    },
    completado: {
      point: 'bg-success',
      contendor: 'bg-success/10',
      label: 'Completado',
    },
  };

  return (
    <div>
      <p className='max-w-sm'>
        Desarrollamos un plan detallado y una estrategia clara para alcanzar tus objetivos.
      </p>

      <div className='mt-8'>
        <h4 className='!text-foreground mb-4 flex items-center gap-2 text-lg font-medium'>
          <OrganizationIcon /> Tablero de planificación
        </h4>

        <div className='grid gap-3 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3'>
          {Object.entries(planificacionProyecto.tableroDePlanificacion).map(([key, entries], i) => {
            const { point, label, contendor } = parseInfo[key as keyof typeof parseInfo];

            return (
              <div key={i} className='bg-content ronded-lg rounded-lg border p-3'>
                <h5 className='flex items-center gap-2'>
                  {' '}
                  <div className={cn('size-2 rounded-full', point)} /> {label}{' '}
                </h5>
                {}
                <div className='mt-2.5 space-y-1'>
                  {entries.map((txt, j) => (
                    <span
                      key={`${i}-${j}`}
                      className={cn(contendor, 'block truncate rounded-lg px-4 py-2.5')}
                    >
                      {' '}
                      {txt}{' '}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className='mt-8'>
        <h4 className='!text-foreground mb-4 flex items-center gap-2 text-lg font-medium'>
          Fases del Proyecto
        </h4>

        <div className='mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3'>
          {planificacionProyecto.fasesDelProyecto.map(({ fase, nombre }, i) => (
            <div key={i} className='bg-ring rounded-lg p-4'>
              <span className='bg-secondary flex size-6 flex-col items-center justify-center rounded-md font-medium'>
                {fase}
              </span>
              <p className='pt-4'> {nombre} </p>
            </div>
          ))}
        </div>

        <div className='mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3'>
          {planificacionProyecto.elementosClave.map(({ descripcion, titulo, icon }, i) => (
            <div key={i} className='bg-secondary/10 flex flex-col items-center rounded-lg p-4'>
              <div className='bg-secondary/40 flex size-8 flex-col items-center justify-center rounded-lg'>
                {' '}
                {icon}{' '}
              </div>
              <h5 className='mt-4 mb-1 text-center'> {titulo} </h5>
              <p className='text-center opacity-50'>{descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Ejecucion() {
  const ejecutionData = {
    process: [
      {
        number: '1',
        title: 'Configuración Inicial',
        description:
          'Preparamos el entorno y establecemos la base para el desarrollo de la solución.',
      },
      {
        number: '2',
        title: 'Desarrollo Incremental',
        description:
          'Preparamos el entorno y establecemos la base para el desarrollo de la solución.',
      },
      {
        number: '3',
        title: 'Revisión y Ajustes',
        description:
          'Evaluamos el progreso, realizamos ajustes y refinamos la implementación según tus comentarios.',
      },
      {
        number: '4',
        title: 'Integración Completa',
        description:
          'Unificamos todos los componentes en una solución cohesiva y preparada para pruebas exhaustivas.',
      },
    ],
  };
  return (
    <div>
      <p className='max-w-sm'>
        {' '}
        Implementamos la solución utilizando las mejores prácticas y tecnologías modernas adaptadas
        a tus necesidades.{' '}
      </p>

      <div className='mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2'>
        <div className='bg-content rounded-lg border p-4'>
          <div className='flex flex-col items-start gap-4 p-0'>
            <div className='flex w-full items-center gap-2.5'>
              <h4 className='flex items-center gap-2 text-base font-medium'>
                {' '}
                <InterfaceIcon /> Implementación Visual
              </h4>
            </div>
            <Image
              alt='TASK'
              src={VISUAL_SVG.src}
              className='aspect-video w-full'
              width={200}
              height={200}
            />
            <p className='opacity-40'>
              Diseño de interfaces intuitivas y experiencias de usuario optimizadas para tus
              necesidades específicas.
            </p>
          </div>
        </div>
        <div className='bg-content rounded-lg border p-4'>
          <div className='flex h-full flex-col items-start gap-4 p-0'>
            <div className='flex w-full items-center gap-2.5'>
              <h4 className='flex items-center gap-2 text-base font-medium'>
                {' '}
                <AllIcon /> Implementación Funcional
              </h4>
            </div>
            <div className='flex w-full flex-1 flex-col items-start justify-between'>
              <Image
                alt='TASK'
                src={TASK_SVG.src}
                className='aspect-video w-full'
                width={200}
                height={200}
              />
              <p className='opacity-40'>
                Desarrollo de funcionalidades clave y lógica de negocio que impulsan el valor de tu
                solución digital.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-8'>
        <h4 className='mb-4 flex items-center gap-2 text-base font-medium'>
          {' '}
          <DeviceIcon /> Proceso de Implementación{' '}
        </h4>

        <div className='relative flex w-full flex-col items-start gap-4'>
          <div className='absolute top-0 left-[15px] h-full w-0.5 bg-[#442620]' />

          {ejecutionData.process.map((processStep, i) => (
            <div key={i} className='flex w-full items-center gap-4'>
              <div className='relative z-10 flex size-8 shrink-0 flex-col items-center justify-center overflow-hidden rounded-lg bg-[#442620]'>
                <span className='text-base font-bold text-[#f24e1e]'>{processStep.number}</span>
              </div>
              <div className='flex flex-col items-start justify-center gap-1'>
                <h5 className='text-base font-normal'>{processStep.title}</h5>
                <p className='opacity-80'>{processStep.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PruebasYOptmization() {
  const calidadYPruebas = {
    pilaresDeCalidad: [
      {
        titulo: 'Rendimiento',
        descripcion:
          'Optimizamos la velocidad y eficiencia para una experiencia fluida en todos los dispositivos.',
        icon: <PerformanceIcon />,
      },
      {
        titulo: 'Seguridad',
        descripcion:
          'Implementamos protecciones robustas para salvaguardar datos y prevenir vulnerabilidades.',
        icon: <ShieldIcon />,
      },
      {
        titulo: 'Usabilidad',
        descripcion:
          'Aseguramos que la solución sea intuitiva y accesible para todos los usuarios.',
        icon: <StarIcon />,
      },
    ],
    pruebas: [
      {
        numero: 1,
        titulo: 'Test Funcional',
        descripcion: 'Verificamos que cada componente funcione correctamente de manera individual.',
      },
      {
        numero: 2,
        titulo: 'Prueba y Error',
        descripcion: 'Evaluamos el rendimiento bajo diferentes condiciones de carga.',
      },
      {
        numero: 3,
        titulo: 'Test de Seguridad',
        descripcion: 'Protegemos tu aplicación contra vulnerabilidades y amenazas.',
      },
      {
        numero: 4,
        titulo: 'Validación y Requisitos',
        descripcion: 'Confirmamos que todos los requisitos han sido implementados correctamente.',
      },
    ],
  };
  return (
    <div>
      <p className='max-w-sm'>
        Realizamos pruebas exhaustivas para garantizar calidad y rendimiento óptimo.
      </p>

      <div className='mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2'></div>

      <div className='mt-8'>
        <h4 className='mb-4 text-base font-medium'> Proceso de Implementación </h4>

        <div className='grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3'>
          {calidadYPruebas.pilaresDeCalidad.map(({ descripcion, titulo, icon }, i) => (
            <div key={i} className='bg-danger/10 flex flex-col items-center rounded-lg p-4'>
              <div className='bg-danger/40 flex size-8 flex-col items-center justify-center rounded-lg'>
                {' '}
                {icon}{' '}
              </div>
              <h5 className='mt-4 mb-1 text-center'> {titulo} </h5>
              <p className='text-center opacity-50'>{descripcion}</p>
            </div>
          ))}
        </div>

        <div className='bg-content mt-4 rounded-lg border p-4'>
          <div className='flex items-center gap-2'>
            <h5 className='flex items-center gap-2 text-base font-medium'>
              {' '}
              <TestIcon /> Pruebas{' '}
            </h5>
          </div>

          <div className='mt-2 grid gap-3 sm:grid-cols-2'>
            {calidadYPruebas.pruebas.map(({ descripcion, titulo, numero }, i) => (
              <div key={i} className='bg-danger/10 rounded-lg p-4'>
                <span className='bg-danger/20 text-danger flex size-6 flex-col items-center justify-center rounded-md font-medium'>
                  {numero}
                </span>
                <h6 className='mt-2'> {titulo} </h6>
                <p className='pt-2'> {descripcion} </p>
              </div>
            ))}
          </div>
        </div>
        <span className='bg-danger/10 border-danger !text-danger mt-4 flex items-center gap-2 rounded-lg border p-4'>
          <AlertIcon />
          Las pruebas rigurosas son la mejor inversión para evitar problemas futuros.
        </span>
      </div>
    </div>
  );
}

function LazamientoYSoporte() {
  const estadoYSoporte = {
    indicadores: [
      {
        nombre: 'Tiempo de Actividad',
        valor: '99.9%',
      },
      {
        nombre: 'Tiempo de Respuesta',
        valor: '245ms',
      },
      {
        nombre: 'Incidentes Activos',
        valor: '0',
      },
    ],
    estados: [
      'Despliegue en producción',
      'Monitorización en vivo',
      'Soporte post-lanzamiento',
      'Mantenimiento continuo',
      'Optimización continua',
    ],
    soporteTecnico: {
      email: 'team@neenbyss.com',
      discord: 'Enlace de invitación',
      consultaGratis: true,
    },
    mantenimientoContinuo: [
      'Actualizaciones de seguridad automáticas',
      'Copias de seguridad diarias',
      'Monitorización 24/7',
      'Optimización de rendimiento mensual',
    ],
  };
  return (
    <div>
      <p className='max-w-sm'>
        {' '}
        Desplegamos tu solución y proporcionamos soporte continuo para garantizar su éxito.{' '}
      </p>

      <div className='mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3'>
        {estadoYSoporte.indicadores.map(({ nombre, valor }, i) => (
          <div key={i} className='bg-success/10 flex flex-col gap-2 rounded-lg p-4'>
            <span className='text-success text-center text-3xl font-medium'> {valor} </span>
            <p className='text-success text-center opacity-50'> {nombre} </p>
          </div>
        ))}
      </div>

      <div className='bg-content mt-6 rounded-lg border p-4'>
        <h4 className='mb-2'> Estados </h4>
        <ul className='flex flex-col gap-2'>
          {estadoYSoporte.estados.map((txt, i) => (
            <li
              key={i}
              className='bg-background flex items-center gap-2 rounded-lg border px-4 py-2.5'
            >
              <div className='bg-success flex size-2 flex-col items-center justify-center rounded-full'>
                <div className='bg-success size-2 animate-ping rounded-full' />
              </div>
              <span className='block w-full'> {txt} </span>
              <span className='bg-success/10 text-success rounded-full px-2.5 py-1 text-xs'>
                {' '}
                operativo{' '}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className='mt-4 flex flex-col-reverse gap-3 sm:grid sm:grid-cols-2'>
        <div className='bg-ring rounded-lg p-4'>
          <div className='flex items-center gap-2'>
            <h4 className='flex items-center gap-2 text-base font-medium'>
              {' '}
              <SupportIcon /> Soporte Técnico{' '}
            </h4>
          </div>
          <Separator className='mt-2 mb-4' />

          <div className='flex gap-2'>
            <EmailIcon className='mt-2' />
            <div>
              <span className='text-foreground block text-base font-medium'>
                {' '}
                Soporte Por Email{' '}
              </span>
              <p> team@neenbyss.com </p>
            </div>
          </div>
          <div className='my-2 flex gap-2'>
            <DiscordIcon className='mt-2' />
            <div>
              <span className='text-foreground block text-base font-medium'>
                {' '}
                Soporte Por Discord{' '}
              </span>
              <a href='#' className='hover:text-primary underline'>
                {' '}
                Enlace de Invitación{' '}
              </a>
            </div>
          </div>

          <Button variant='outline' className='mt-2 w-full'>
            Consulta Gratis
          </Button>
        </div>
        <div className='bg-ring rounded-lg p-4'>
          <div className='flex items-center gap-2'>
            <h4 className='flex items-center gap-2 text-base font-medium'>
              {' '}
              <SwitchIcon /> Mantenimiento Continuo{' '}
            </h4>
          </div>
          <Separator className='mt-2 mb-4' />

          <ul className='flex flex-col gap-1'>
            {estadoYSoporte.mantenimientoContinuo.map((txt, i) => (
              <li key={i} className='flex items-center gap-2'>
                <div className='bg-success size-1.5 rounded-full' />
                <span> {txt} </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <span className='bg-success/10 border-success !text-success mt-4 flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5'>
        <CheckIcon className='shrink' />
        El lanzamiento no es el final del viaje, sino el comienzo de una nueva fase de crecimiento.{' '}
      </span>
    </div>
  );
}
