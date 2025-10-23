import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from '@/icons/arrow-right';

export const CTA = () => {
  return (
    <div className='bg-content mx-auto my-20 flex w-full max-w-6xl flex-col items-center justify-between overflow-clip rounded-3xl border p-8 md:flex-row md:gap-20'>
      <div>
        <h2 className='mb-3 text-xl sm:text-4xl'>¿Necesitas Algo Diferente?</h2>
        <p className='mb-8 text-sm sm:text-lg'>
          Cada servidor necesita mejores opciones para cumplir sus necesidades y deseos.
          <br />
          No dudes con contactarnos y daremos la mejor solución para tí.
        </p>
      </div>

      <div className='flex w-full flex-col items-start md:items-end'>
        <div className='mb-6 flex flex-wrap items-center gap-3'>
          <span className='flex items-center gap-2.5 whitespace-nowrap'>
            <div className='bg-success flex size-1.5 shrink-0 items-center justify-center rounded-full'>
              <div className='bg-success/50 size-2 shrink-0 animate-ping rounded-full' />
            </div>
            Respuesta en menos de 24h
          </span>

          <span className='bg-foreground size-1 shrink-0 rounded-full' />

          <span className='whitespace-nowrap'> Sin compromiso </span>
        </div>
        <Button size='sm' className='shadow-primary/50 relative shadow-2xl'>
          <div className='bg-primary/10 absolute top-0 left-0 h-full w-full animate-ping rounded-xl' />
          Consulta Gratuita <ArrowRightIcon />
        </Button>
      </div>
    </div>
  );
};
