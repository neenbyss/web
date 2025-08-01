'use client';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import SpotlightCard from '@/components/ui/spotlightcard';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRightIcon } from '@/icons/arrow-right';
import { StarIcon } from '@/icons/star';
import { cn } from '@/lib/utils';

import { serviceCategories, serviceDetails, serviceDetailsFeatured } from '@/utils/data/services';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function Categories() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const route = useRouter();
  const indexedServices = Object.entries(serviceDetails).flatMap(([category, services]) =>
    services.map((service) => ({ ...service, category })),
  );

  const filteredServices =
    selectedCategory === 'all'
      ? serviceDetailsFeatured
      : indexedServices.filter((service) => service.category === selectedCategory);
  return (
    <section className='py-30'>
      <div className='container-screen-2xl'>
        <h2 className='mb-4 max-w-lg text-2xl font-medium sm:text-5xl'>
          {' '}
          Nuestros Principales Servicios{' '}
        </h2>
        <p className='mb-8 max-w-3xl'>
          {' '}
          Ofrecemos una amplia gama de servicios tecnológicos personalizados para ayudarte a
          alcanzar tus objetivos de negocio. Cada solución está diseñada a medida para satisfacer
          tus necesidades específicas.{' '}
        </p>

        <Tabs defaultValue='all' onValueChange={setSelectedCategory}>
          <ScrollArea>
            <TabsList>
              <TabsTrigger className='flex items-center gap-2' value={'all'}>
                {' '}
                <StarIcon /> Destacadas{' '}
              </TabsTrigger>
              {serviceCategories.map(({ uid, title, icon }, i) => (
                <TabsTrigger key={i} value={uid} className='flex items-center gap-2'>
                  {icon}
                  {title}{' '}
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </Tabs>
        <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {filteredServices.map((service, i) => {
            const color =
              selectedCategory === 'all'
                ? serviceCategories.find((x) => x.uid === service.category)?.color
                : serviceCategories.find((x) => x.uid === selectedCategory)?.color;

            const icon =
              selectedCategory === 'all'
                ? serviceCategories.find((x) => x.uid === service.category)?.icon
                : serviceCategories.find((x) => x.uid === selectedCategory)?.icon;
            return (
              <SpotlightCard
                key={i}
                onClick={() => {
                  route.push(
                    service.plans && service.cta
                      ? `/service/${service.uid}`
                      : `/contact?service=${service.uid}`,
                  );
                }}
                spotlightColor={`rgba(${color}, .4)`}
                className={cn(
                  'group bg-content ease-soft-spring [&:is(:hover,:focus)]:border-primary relative cursor-pointer overflow-clip rounded-xl border transition duration-500 [&:is(:hover,:focus)]:-translate-y-1',
                )}
              >
                <div
                  className='absolute inset-0'
                  style={{
                    backgroundColor: `rgba(${color}, .02)`,
                  }}
                />
                <div className='relative z-10 flex size-full flex-col p-6'>
                  <div
                    className='mb-3 flex size-9 flex-col items-center justify-center rounded-lg border'
                    style={{
                      backgroundColor: `rgba(${color}, .2)`,
                      borderColor: `rgba(${color}, .2)`,
                      color: `rgba(${color})`,
                    }}
                  >
                    {' '}
                    {icon}{' '}
                  </div>
                  <h3 className='mb-2 text-base font-medium text-balance sm:text-xl'>
                    {' '}
                    {service.title}{' '}
                  </h3>
                  <p className='grow'>{service.description}</p>

                  {service.plans && service.cta && (
                    <div className='mt-2.5 flex flex-col'>
                      {' '}
                      <span>
                        {' '}
                        Este servicio Incluye planes.{' '}
                        <Link href={service.cta?.href} className='text-primary hover:underline'>
                          {' '}
                          Ver Planes{' '}
                        </Link>{' '}
                      </span>{' '}
                    </div>
                  )}

                  <span className='ease-soft-spring mt-4 flex items-center gap-2 opacity-60 duration-500 group-hover:opacity-100'>
                    {' '}
                    Solicitar Servicio{' '}
                    <ArrowRightIcon className='ease-soft-spring size-6 shrink-0 duration-500 group-hover:translate-x-1' />{' '}
                  </span>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
        {selectedCategory !== 'all' && isCategory(selectedCategory) && (
          <Button asChild variant='outline' className='mt-6'>
            <Link href={`/services/${selectedCategory}`}>
              Saber más sobre
              <span className='text-primary'>
                {serviceCategories.find((x) => x.uid === selectedCategory)?.title}
              </span>{' '}
              <ArrowRightIcon />
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
}

function isCategory(category: string) {
  return ['web_development', 'ui_ux_design', 'fivem'].includes(category);
}
