import { Button } from '@/components/ui/button';
import { NotFoundTracker } from '@/components/not-found-tracker';
import Link from 'next/link';

const helpfulLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/services/fivem', label: 'Servicios FiveM' },
  { href: '/projects', label: 'Proyectos' },
  { href: '/faqs', label: 'Preguntas frecuentes' },
  { href: '/contact', label: 'Contáctanos' },
];

export default function NotFound() {
  return (
    <main className='bg-content flex h-svh flex-col items-center justify-center p-6'>
      <NotFoundTracker />
      <div className='flex flex-col items-center gap-8 text-center md:flex-row md:text-left'>
        <span className='text-primary text-[15rem]' aria-hidden='true'>
          {' '}
          {':('}{' '}
        </span>
        <div>
          <span className='text-foreground block text-6xl font-black'> 4 0 4 </span>

          <h1 className='my-4 text-xl'> Página No Encontrada </h1>
          <p className='text-foreground-2 mb-6 max-w-sm text-sm'>
            La página que buscas no existe o fue movida. Te dejamos accesos directos para que sigas
            adelante.
          </p>

          <nav aria-label='Enlaces útiles' className='mb-6 flex flex-wrap gap-2'>
            {helpfulLinks.map(({ href, label }) => (
              <Button key={href} variant='flat' asChild size='sm'>
                <Link href={href}>{label}</Link>
              </Button>
            ))}
          </nav>

          <Button variant='flat' asChild className='w-fit'>
            <Link href='/'>Regresar Al Inicio</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
