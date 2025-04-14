import { ArrowRightIcon } from '@/icons/arrow-right';
import { serviceCategories, serviceDetails } from '@/utils/data/services';
import Link from 'next/link';

const service = 'fivem';

export function Services() {
  const categoryService = serviceCategories.find((x) => x.uid === service)!;

  return (
    <section
      className='border-y py-25'
      style={{ backgroundColor: `rgba(${categoryService.color}, .02)` }}
    >
      <div className='container-screen-2xl'>
        <h2
          className='mb-10 flex items-center gap-4 text-xl font-medium capitalize sm:mb-20 md:text-4xl [&_svg]:size-6 md:[&_svg]:size-10'
          style={{
            color: `rgba(${categoryService.color})`,
          }}
        >
          {' '}
          {categoryService.icon} Servicios de {categoryService.title}{' '}
        </h2>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3'>
          {serviceDetails[service].map((service, i) => {
            return (
              <Link
                href={`/contact?service=${service.uid}`}
                key={i}
                className='group flex flex-col overflow-clip border-b pb-8 sm:border-none sm:pb-0'
              >
                <h3 className='group-hover:text-primary mb-1.5 text-base font-medium duration-300 sm:text-2xl'>
                  {' '}
                  {service.title}{' '}
                </h3>
                <p> {service.description} </p>

                <div className='flex sm:justify-end'>
                  <span className='ease-soft-spring flex w-fit items-center gap-2 pt-8 opacity-50 duration-700 group-hover:translate-x-0 group-hover:opacity-100 sm:-translate-x-5 sm:opacity-0'>
                    {' '}
                    Solicitar <ArrowRightIcon />{' '}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
