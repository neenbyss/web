import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className='bg-content flex h-svh flex-col items-center justify-center p-6'>
      <div className='flex items-center gap-12'>
        <span className='text-primary text-[15rem]'> {':('} </span>
        <div>
          <span className='text-foreground block text-6xl font-black'> 4 0 4 </span>

          <h1 className='my-4 text-xl'> Página No Encontrada </h1>

          <Button variant='flat' asChild className='w-fit'>
            <Link href='/'>Regresar Al Inicio</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
