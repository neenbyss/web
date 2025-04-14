import { Suspense } from 'react';
import { notFound } from 'next/navigation';

import { ProjectProvider } from '@/store/projects-store';
import { Hero } from './section.hero';
import { FilterSection } from './section.filters';
import { ProjectsSection } from './section.projects';
import { categories } from './categories';

import { createMetadata } from '@/lib/metadata';
import { getAllProjects } from '@/lib/get-projects';

type Props = {
  params: Promise<{ category: string }>;
};

export const dynamic = 'error';

export async function generateStaticParams(): Promise<{ category: string }[]> {
  return categories.map((c) => ({ category: c.slug }));
}

export const metadata = createMetadata({
  title: 'Proyectos',
  description:
    'Explorá nuestra colección de proyectos destacados que demuestran nuestra experiencia y capacidad para crear soluciones digitales innovadoras. Cada proyecto refleja nuestro compromiso con la excelencia y la satisfacción del cliente.',
});

export default async function ProjectsPage({ params }: Props) {
  const { category } = await params;

  const projects = getAllProjects();

  return (
    <ProjectProvider category={category ?? 'all'} callbackProjects={projects}>
      <main>
        <h1 className='sr-only'>Proyectos</h1>
        <Hero />
        <section className='container-screen-2xl flex flex-col gap-6 pt-10 pb-8 lg:grid lg:grid-cols-[0.28fr_1fr] xl:grid-cols-[0.25fr_1fr]'>
          <FilterSection />
          <div className='min-h-140'>
            <h2 className='text-primary text-3xl font-medium'>
              {categories.find((n) => n.slug === category)?.label}
            </h2>
            <Suspense fallback={<span>Cargando...</span>}>
              <ProjectsSection />
            </Suspense>
          </div>
        </section>
      </main>
    </ProjectProvider>
  );
}
