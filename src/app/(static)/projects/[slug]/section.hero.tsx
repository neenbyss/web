'use client';
import Link from 'next/link';

import dayjs from 'dayjs';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { Badge } from '@/components/common/badge';
import { AppBreadcrumb } from '@/components/common/app-breadcrumb';

import { FigmaIcon } from '@/icons/figma';
import { GithubIcon } from '@/icons/github';
import { ExternalIcon } from '@/icons/external';
import { CalendarIcon } from '@/icons/calendar';

import HERO_VECTOR_BG from '@/resources/svg/HERO_VECTOR_BG.svg';

import type { ProjectMetadata } from '@/types/project';

export function Hero({ meta }: { meta: ProjectMetadata }) {
  const { repository, title, date, description, tags, figma_url, project_url, cover } = meta;
  return (
    <section
      className='repeat-0 relative overflow-clip border-b bg-cover bg-center'
      style={{
        backgroundImage: `url(${cover[0]})`,
      }}
    >
      <div className='from-background to-background/[.96] bg-gradient-to-r'>
        <div className='container-screen-xl relative z-10 py-5 sm:py-12'>
          <AppBreadcrumb className='mb-6 bg-transparent px-0 py-0' />

          <h1 className='mb-4 text-3xl font-medium text-balance sm:text-6xl'> {title} </h1>
          <p className='sr-only'> {description} </p>

          {date && (
            <span className='my-2 flex items-center gap-2'>
              <CalendarIcon />
              {dayjs(date).format('LL')}
            </span>
          )}

          {tags.length > 0 ? (
            <div className='mt-4 flex flex-wrap gap-2'>
              {tags.map((tag, i) => (
                <Badge key={i} className='border text-xs'>
                  {tag}
                </Badge>
              ))}
            </div>
          ) : (
            <span className='text-xs opacity-30'> No tiene tags </span>
          )}

          <TooltipProvider>
            <div className='mt-4 flex w-full flex-wrap items-center gap-2'>
              {repository && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button asChild variant='outline' size='icon'>
                      <a href={repository} target='_blank'>
                        <GithubIcon />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className='text-xs'> Repositorio de Github </TooltipContent>
                </Tooltip>
              )}
              {figma_url && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button asChild variant='outline' size='icon'>
                      <a href={figma_url} target='_blank'>
                        <FigmaIcon />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className='text-xs'> Repositorio de Figma </TooltipContent>
                </Tooltip>
              )}
              {project_url && (
                <Button asChild variant='outline'>
                  <Link href={project_url} target='_blank'>
                    Demostración
                    <ExternalIcon className='size-4 shrink-0' />
                  </Link>
                </Button>
              )}
            </div>
          </TooltipProvider>
        </div>
      </div>

      <img
        alt='VECTOR'
        src={HERO_VECTOR_BG.src}
        className='pointer-events-none absolute -top-5 left-0 sm:-top-60 sm:left-1/2 sm:-translate-x-[calc((1/2*100%)--30rem)]'
      />
    </section>
  );
}
