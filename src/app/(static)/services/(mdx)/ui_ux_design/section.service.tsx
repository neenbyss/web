import { ArrowRightIcon } from '@/icons/arrow-right';
import { serviceCategories, serviceDetails } from '@/utils/data/services';
import Link from 'next/link';

const category = 'ui_ux_design';

export function Services() {
  const categoryService = serviceCategories.find((x) => x.uid === category)!;

  return (
    <section
      className='border-y py-25'
      style={{ backgroundColor: `rgba(${categoryService.color}, .05)` }}
    >
      <div className='container-screen-2xl'>
        <h2
          className='mb-10 flex flex-col gap-4 text-2xl font-medium capitalize sm:mb-20 sm:flex-row sm:items-center sm:text-4xl [&_svg]:size-7 sm:[&_svg]:size-10'
          style={{
            color: `rgba(${categoryService.color})`,
          }}
        >
          {' '}
          {categoryService.icon} Servicios de {categoryService.title}{' '}
        </h2>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3'>
          {serviceDetails[category].map((service, i) => {
            return (
              <Link
                href={`/contact?service=${service.uid}`}
                key={i}
                className='group flex flex-col overflow-clip border-b pb-4 sm:border-b-0 sm:pb-0'
              >
                <h3 className='group-hover:text-primary mb-1.5 text-base font-medium duration-300 sm:text-2xl'>
                  {' '}
                  {service.title}{' '}
                </h3>
                <p> {service.description} </p>

                <div className='flex sm:justify-end'>
                  <span className='ease-soft-spring flex w-fit items-center gap-2 pt-8 opacity-100 duration-700 group-hover:translate-x-0 group-hover:opacity-100 sm:-translate-x-5 sm:opacity-0'>
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
