import SpotlightCard from '@/components/ui/spotlightcard';
import { plans } from './_plans';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AlertIcon } from '@/icons/alert';
import { ArrowRightIcon } from '@/icons/arrow-right';
import { CheckTaskIcon } from '@/icons/check-task';
import { Separator } from '@radix-ui/react-separator';
import Link from 'next/link';

export const PlansDev = () => {
  return (
    <div className='container-screen-2xl py-20'>
      <div>
        <h3 className='mb-1.5 text-center text-5xl'> Planes para Desarrollo </h3>
        <p className='pt-1.5 text-center text-lg'>Ideal para crear nuevos servidores</p>

        <div className='flex flex-wrap justify-center gap-4 py-20'>
          {plans.advanced.map((pricing, i) => {
            return (
              <SpotlightCard
                key={i}
                spotlightColor={
                  pricing.recommended
                    ? 'rgba(93,68,253,.4)'
                    : 'color-mix(in oklab, var(--secondary) 20%, transparent)'
                }
                className={cn(
                  pricing.recommended
                    ? 'to-primary/20 from-secondary/20 border-primary border-2 bg-gradient-to-t'
                    : 'bg-background',
                  pricing.custom && 'bg-foreground/[.05]',

                  'relative flex w-full max-w-sm flex-col p-6',
                )}
              >
                {pricing.recommended && (
                  <span className='bg-primary absolute top-0 right-0 rounded-bl-xl px-4 py-1.5 text-xs sm:text-sm'>
                    {' '}
                    Popular{' '}
                  </span>
                )}
                <h3 className='mb-1 text-base font-medium sm:text-2xl'> Plan {pricing.name} </h3>
                <p className='mb-4'> {pricing.description} </p>
                <span className={cn('text-foreground my-2 block text-3xl font-medium')}>
                  {' '}
                  ${pricing.price}{' '}
                  {!pricing.custom && <span className='text-sm font-light opacity-40'> /mes </span>}
                </span>

                <Button
                  asChild
                  variant={!pricing.recommended ? 'outline' : 'primary'}
                  className='w-full'
                >
                  <Link href={`/contact?service=${pricing.uid}`}>
                    {pricing.custom ? 'Contáctanos' : 'Contratar Plan'}
                    <ArrowRightIcon />
                  </Link>
                </Button>

                <Separator className='my-4' />

                <ul className='flex grow flex-col gap-4'>
                  {pricing.features?.map((x, j) => {
                    return (
                      <li key={`${i}-${j}`} className='flex items-center gap-2'>
                        <CheckTaskIcon className='text-primary' /> {x}
                      </li>
                    );
                  })}
                </ul>
                <Separator className='my-4' />
                <p className='text-xs opacity-40'>
                  <AlertIcon className='mr-2 inline-flex size-3' />
                  {pricing.note}
                </p>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};
