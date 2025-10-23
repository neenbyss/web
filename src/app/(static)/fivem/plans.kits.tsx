import SpotlightCard from '@/components/ui/spotlightcard';
import { plans } from './_plans';

export function Kits() {
  return (
    <div className='container-screen-lg pb-20'>
      <h3 className='mb-4 text-center text-5xl'> Complementos </h3>
      <p className='text-center'> Complementos adicionales para cada servicio. </p>
      <div className='mt-20 grid grid-cols-2 gap-4'>
        {plans.kits.map(({ description, icon: Icon, name, price }, i) => {
          return (
            <SpotlightCard
              spotlightColor={'rgba(255, 137, 4, .15)'}
              key={i}
              className='border border-orange-400/10 bg-orange-400/5 p-4'
            >
              <h4 className='mb-4 flex items-center justify-center gap-2'>
                <div className='flex size-8 shrink-0 flex-col items-center justify-center rounded-md border border-orange-600 bg-orange-600/20'>
                  <Icon className='size-5' />
                </div>
                <span className='text-lg font-medium text-orange-400'>{name}</span>
              </h4>
              <p className='text-center text-balance'>{description}</p>
            </SpotlightCard>
          );
        })}
      </div>
      <p className='mt-8 text-center text-sm opacity-40'>
        {' '}
        Descuento adicional para cada complemente al adquirir un servicio.{' '}
      </p>
    </div>
  );
}
