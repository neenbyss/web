'use client';
import Link from 'next/link';

import { Input } from '@/components/ui/input';
import { SearchIcon } from '@/icons/search';
import { cn } from '@/lib/utils';
import { useProject } from '@/store/projects-store';
import { categories } from './categories';
import { use, useRef } from 'react';
import { ProjectCategory } from '@/types/project';

export function FilterSection() {
  const { category, setCategory, setSearch, search, callbackProjects } = useProject();
  const projects = use(callbackProjects);

  const handleScroll = () => {
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  return (
    <div>
      <div className='sticky top-24'>
        <h2 className='text-primary mb-2 opacity-50'>Filtrar Proyectos</h2>
        <Input
          placeholder='Buscar '
          className='h-10'
          startContent={<SearchIcon />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <span className='mt-4 mb-2 block text-xs opacity-40'> Categorías </span>

        <div className='space-y-1'>
          {categories.map(({ icon, label, slug }, i) => (
            <Link
              key={i}
              href={`/projects?category=${slug}`}
              scroll={false}
              onClick={() => {
                setCategory(slug);
                handleScroll();
              }}
              className={cn(
                'group flex h-10 gap-3 rounded-lg pr-3 duration-300',
                category === slug ? 'bg-primary/10' : 'hover:bg-default',
              )}
            >
              {category === slug ? (
                <div className='bg-primary h-full w-1' />
              ) : (
                <div className='bg-primary h-0 w-1 duration-300 group-hover:h-full' />
              )}
              <span
                className={cn(
                  'flex w-full items-center gap-2 duration-300',
                  category !== slug && 'opacity-60 group-hover:opacity-100',
                )}
              >
                <span className='text-foreground flex w-full items-center gap-2'>
                  {icon}
                  {label}
                </span>
                <span className='text-primary bg-primary/20 flex size-6 shrink-0 flex-col items-center justify-center rounded-full text-xs font-semibold'>
                  {slug === 'all'
                    ? projects?.total
                    : projects?.data.filter((x) => x.category.includes(slug as ProjectCategory))
                        .length}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
