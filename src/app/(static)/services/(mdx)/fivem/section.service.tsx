import { ArrowRightIcon } from '@/icons/arrow-right';
import { CheckTaskIcon } from '@/icons/check-task';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { serviceCategories, serviceDetails } from '@/utils/data/services';
import Link from 'next/link';

const service = 'fivem';

export function Services() {
  const categoryService = serviceCategories.find((x) => x.uid === service)!;

  return (
    <section
      id='services'
      className='border-y py-25'
      style={{ backgroundColor: `rgba(${categoryService.color}, .02)` }}
    >
      <div className='container-screen-2xl'>
        <h2
          className='mb-10 flex items-center gap-4 text-xl font-medium capitalize sm:mb-20 md:text-4xl [&_svg]:size-6 md:[&_svg]:size-10'
          style={{ color: `rgba(${categoryService.color})` }}
        >
          {categoryService.icon} Servicios de {categoryService.title}
        </h2>
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {serviceDetails[service].map((item, i) => {
            const href = item.href ?? `/contact?service=${item.uid}`;
            const ctaLabel = item.href ? 'Ver detalles' : 'Solicitar';
            return (
              <Link key={i} href={href} className='group block h-full'>
                <Card className='flex h-full flex-col border-2 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg'>
                  <CardHeader>
                    <div
                      className='mb-4 flex size-8 items-center justify-center rounded-lg md:size-12'
                      style={{
                        backgroundColor: `rgba(${categoryService.color.join(',')}, 0.15)`,
                        color: `rgb(${categoryService.color.join(',')})`,
                      }}
                    >
                      <CheckTaskIcon className='size-5' />
                    </div>
                    <CardTitle className='group-hover:text-primary text-base transition-colors duration-300 sm:text-xl'>
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='flex grow flex-col'>
                    <p className='text-muted-foreground grow'>{item.description}</p>
                    <span className='text-primary/70 group-hover:text-primary mt-6 flex items-center gap-2 text-sm transition-colors'>
                      {ctaLabel} <ArrowRightIcon className='size-4' />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
