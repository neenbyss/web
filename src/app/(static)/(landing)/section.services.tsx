'use client';

import { Button } from '@/components/ui/button';
import { Fade } from '@/components/ui/fade';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { serviceCategories, serviceDetails } from '@/utils/data/services';

import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Services() {
  return (
    <section className='bg-content-1 min-h-280 border-b'>
      <div className='container-screen-2xl py-50'>
        <Fade as='h2' delay={0.2} className='mb-4 text-3xl font-medium capitalize sm:text-6xl'>
          {' '}
          Nuestros Servicios{' '}
        </Fade>
        <div className='flex flex-col justify-between gap-4 md:flex-row md:items-end'>
          <Fade as='p' delay={0.4} className='max-w-2xl text-pretty'>
            {' '}
            Nuestro enfoque está en transformar ideas en realidades tangibles, adaptándonos a las
            necesidades de cada proyecto para impulsar el éxito de nuestros clientes.{' '}
          </Fade>
          <Fade as='p' direction='right' delay={0.6}>
            <Button asChild variant='outline' className='w-fit'>
              <Link href='/services'>Explorar más Servicios</Link>
            </Button>
          </Fade>
        </div>

        <div className='mt-12'>
          <Tabs
            defaultValue={serviceCategories[0].uid}
            className='flex-col lg:flex-row'
            orientation={'vertical'}
          >
            <ScrollArea className='min-w-80'>
              <TabsList className='flex-row border-b border-l-0 lg:flex-col lg:border-b-0 lg:border-l'>
                {serviceCategories.map((category, i) => (
                  <TabsTrigger
                    key={i}
                    value={category.uid}
                    className='flex items-center justify-center gap-2 px-2 py-6 whitespace-nowrap lg:justify-start lg:px-6 lg:py-2 lg:text-start lg:whitespace-normal'
                    lineClassName='left-0 h-1 bottom-0 w-full lg:left-0 lg:h-full lg:w-1'
                  >
                    {category.icon}
                    {category.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              <ScrollBar orientation='horizontal' />
            </ScrollArea>

            {Object.entries(serviceDetails).map(([key, details], i) => {
              return (
                <TabsContent key={i} value={key}>
                  <Fade as='h3' className='text-secondary text-2xl capitalize'>
                    {' '}
                    {serviceCategories.find((cat) => cat.uid === key)?.title}
                  </Fade>

                  <div className='mt-8 grid gap-3 sm:grid-cols-2'>
                    {details.map(({ title, description }, i) => (
                      <Fade
                        key={i}
                        className={cn(
                          'bg-background ease-soft-spring flex transform flex-col rounded-lg border p-5',
                        )}
                        direction='up'
                        delay={i === 0 ? 0.2 : 0.2 + i * 0.05}
                      >
                        <h4 className='mb-1 text-lg font-medium capitalize'>{title}</h4>
                        <p className='h-full text-pretty'>{description}</p>
                      </Fade>
                    ))}
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
