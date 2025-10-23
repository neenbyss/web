import SpotlightCard from '@/components/ui/spotlightcard';
import { plans } from './_plans';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AlertIcon } from '@/icons/alert';
import { ArrowRightIcon } from '@/icons/arrow-right';
import { CheckTaskIcon } from '@/icons/check-task';
import { Separator } from '@radix-ui/react-separator';
import Link from 'next/link';

export const Packs = () => {
  return (
    <div className='container-screen-lg py-10'>
      <h3 className='mb-4 text-center text-6xl'> Paquetes Completos </h3>
      <p className='text-center'>
        {' '}
        Paquetes ideales para empezar tu servidor completo en poco tiempo{' '}
      </p>
      <div className='mt-20 grid grid-cols-2 gap-4'>
        <div className='flex flex-col gap-4'>
          <PricingCard {...plans.bundles[0]} />
          <PricingCard {...plans.bundles[1]} />
        </div>
        <PricingCard {...plans.bundles[2]} />
      </div>
    </div>
  );
};

const PricingCard = (pricing: (typeof plans.bundles)[0]) => {
  return (
    <SpotlightCard
      spotlightColor={
        pricing.recommended
          ? 'rgba(93,68,253,.4)'
          : 'color-mix(in oklab, var(--secondary) 15%, transparent)'
      }
      className={cn(
        pricing.recommended
          ? 'to-primary/20 from-secondary/20 border-primary border-2 bg-gradient-to-t'
          : 'bg-background',
        pricing.custom && 'bg-foreground/[.05]',
        'relative flex w-full flex-col p-6',
      )}
    >
      {pricing.recommended && (
        <span className='bg-primary absolute top-0 right-0 rounded-bl-xl px-4 py-1.5 text-xs sm:text-sm'>
          {' '}
          Recomendado{' '}
        </span>
      )}
      <h3 className='mb-1 text-base font-medium sm:text-2xl'> {pricing.name} </h3>
      <p className='mb-4'> {pricing.description} </p>
      <span className={cn('text-foreground my-2 block text-3xl font-medium')}>
        {' '}
        ${pricing.price}{' '}
        {!pricing.custom && <span className='text-sm font-light opacity-40'> /mes </span>}
      </span>

      <Button asChild variant={!pricing.recommended ? 'outline' : 'primary'} className='w-full'>
        <Link href={`/contact?service=${pricing.uid}`}>
          {pricing.custom ? 'Contáctanos' : 'Contratar Plan'}
          <ArrowRightIcon />
        </Link>
      </Button>

      <Separator className='my-4' />

      <ul className='flex grow flex-col gap-4'>
        {pricing.features?.map((x, i) => {
          return (
            <li key={`${i}`} className='flex items-center gap-2'>
              <CheckTaskIcon className='text-primary' /> {x}
            </li>
          );
        })}
      </ul>
    </SpotlightCard>
  );
};
