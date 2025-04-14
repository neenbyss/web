'use client';
import { use } from 'react';

import { Button } from '@/components/ui/button';

import { ArrowRightIcon } from '@/icons/arrow-right';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  TriggerPrevius,
  TriggerNext,
  Indicators,
} from '@/components/ui/carousel';

import dayjs from 'dayjs';

import { ChevronLeftIcon } from '@/icons/chevron-left';
import { ChevronRightIcon } from '@/icons/chevron-right';
import Link from 'next/link';
import { useProject } from '@/store/projects-store';
import { ProjectCategory } from '@/types/project';
import { CalendarIcon } from '@/icons/calendar';
import { Badge } from '@/components/common/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { WebsiteIcon } from '@/icons/website';
import { GithubIcon } from '@/icons/github';
import { FigmaIcon } from '@/icons/figma';
import { categories } from './categories';

export function ProjectsSection() {
  const { category, search, setModeContent, mode_content, callbackProjects } = useProject();

  const projects = use(callbackProjects!);

  const regex = new RegExp(
    search
      .split(' ')
      .map((word) => `(?=.*${word})`)
      .join(''),
    'i',
  );

  const filter =
    category === 'all'
      ? projects?.data.filter((x) => regex.test(x.title))
      : projects?.data.filter(
          (x) => x.category.includes(category as ProjectCategory) && regex.test(x.title),
        );

  return (
    <>
      <h2 className='text-primary text-3xl font-medium'>
        {categories.find((n) => (category ? n.slug === category : n.slug === 'all'))?.label}
      </h2>
      <div className='flex justify-between gap-2'>
        <span className='opacity-50'> {filter?.length ?? 0} Proyectos encontrados </span>
        {/** 
        <div className='flex items-center gap-2'>
          <Button variant='outline'>Ordenar</Button>
          <Button
            onClick={() => setModeContent('grid_box')}
            variant={mode_content === 'grid_box' ? 'primary' : 'outline'}
            size='icon'
          ></Button>
          <Button
            onClick={() => setModeContent('list_box')}
            variant={mode_content === 'list_box' ? 'primary' : 'outline'}
            size='icon'
          ></Button>
        </div>
        */}
      </div>

      {mode_content === 'grid_box' && (
        <div className='mt-6 grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
          {filter?.map(
            (
              {
                title,
                cover,
                date,
                tags,
                description,
                slug,
                project_url,
                repository,
                figma_url,
                ...props
              },
              i,
            ) => {
              const href = `/projects/${slug}`;
              return (
                <div
                  key={i}
                  className='ease-soft-spring flex flex-col overflow-clip rounded-lg border duration-500 hover:shadow-lg'
                >
                  <Link href={href} className='border-b duration-300 hover:brightness-75'>
                    <img
                      alt={title + '_image'}
                      src={cover[0]}
                      width={400}
                      height={400}
                      className='aspect-video w-full object-cover object-top'
                    />
                  </Link>
                  <div className='flex grow flex-col p-5'>
                    <h3 className='group-hover:text-primary mb-1 line-clamp-2 text-base font-medium duration-300'>
                      {title}
                    </h3>
                    {date && (
                      <span className='my-2 flex items-center gap-2 text-xs'>
                        <CalendarIcon className='size-3' />
                        {dayjs(date).format('LL')}
                      </span>
                    )}
                    <p className='line-clamp-4 grow opacity-80'>{description}</p>

                    <div className='mt-4 flex flex-wrap items-center gap-2 opacity-70'>
                      {tags.slice(0, 5).map((tag, i) => (
                        <Badge key={i} className='text-[10px]'>
                          {tag}
                        </Badge>
                      ))}

                      {tags.length > 5 && <Badge className='text-[10px]'>+{tags.length - 5}</Badge>}
                    </div>

                    <TooltipProvider>
                      <div className='mt-5 flex w-full items-center justify-end gap-2'>
                        {repository && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button asChild variant='outline' size='icon_sm'>
                                <a href={repository} target='_blank'>
                                  <GithubIcon className='size-4' />
                                </a>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className='text-xs'>
                              {' '}
                              Repositorio de Github{' '}
                            </TooltipContent>
                          </Tooltip>
                        )}
                        {figma_url && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button asChild variant='outline' size='icon_sm'>
                                <a href={figma_url} target='_blank'>
                                  <FigmaIcon className='size-4' />
                                </a>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className='text-xs'>
                              {' '}
                              Repositorio de Figma{' '}
                            </TooltipContent>
                          </Tooltip>
                        )}
                        {project_url && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button asChild variant='outline' size='icon_sm'>
                                <a href={project_url} target='_blank'>
                                  <WebsiteIcon className='size-4' />
                                </a>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className='text-xs'> Sitio Web </TooltipContent>
                          </Tooltip>
                        )}

                        <Button asChild variant='outline' size='xs' className='group'>
                          <Link href={href}>
                            Saber Más
                            <ArrowRightIcon className='size-4 shrink-0 duration-300 group-hover:ml-1' />
                          </Link>
                        </Button>
                      </div>
                    </TooltipProvider>
                  </div>
                </div>
              );
            },
          )}
        </div>
      )}

      {mode_content === 'list_box' && (
        <div className='mt-6 space-y-4'>
          {filter?.map(({ title, cover, description, slug, tags, ...props }, i) => {
            return (
              <div key={i} className='bg-content overflow-clip rounded-lg border'>
                <div className='p-6'>
                  <h3 className='mb-2.5 line-clamp-3 text-2xl font-medium'>{title}</h3>
                  <p className='line-clamp-4 grow-0'>{description}</p>

                  <div className='mt-4 flex flex-wrap items-center gap-2'>
                    {tags.map((tag, i) => (
                      <span
                        key={i}
                        className='bg-ring text-foreground rounded-sm px-3 py-1 text-xs'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className='mt-4 flex items-end justify-between gap-2'>
                    <div className='flex items-center gap-2'>
                      <Button variant='outline' size='icon'></Button>
                      <Button>
                        {' '}
                        Ver Proyecto <ArrowRightIcon />{' '}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className='group'>
                  <Carousel>
                    <CarouselContent>
                      {cover.map((s, i) => (
                        <CarouselItem key={i}>
                          {' '}
                          <img
                            alt={title + '_img' + i}
                            src={s}
                            width={800}
                            height={800}
                            className='aspect-video w-full object-cover'
                          />{' '}
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <TriggerPrevius className='bg-background absolute top-1/2 left-5 z-10 -translate-x-5 -translate-y-1/2 opacity-0 duration-300 group-hover:-translate-x-0 group-hover:opacity-100'>
                      <ChevronLeftIcon />
                    </TriggerPrevius>
                    <TriggerNext className='bg-background absolute top-1/2 right-5 z-10 translate-x-5 -translate-y-1/2 opacity-0 duration-300 group-hover:translate-x-0 group-hover:opacity-100'>
                      <ChevronRightIcon />
                    </TriggerNext>

                    <Indicators className='translate-y-5 opacity-0 duration-300 group-hover:translate-y-0 group-hover:opacity-100' />
                    <div className='group-hover:bg-background/40 pointer-events-none absolute inset-0 duration-500' />
                  </Carousel>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
