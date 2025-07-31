'use client';
import { Suspense, use, useEffect, useMemo, useState } from 'react';
import { useMedia } from './provider';
import { cn } from '@/lib/utils';
import { CheckIcon } from '@/icons/check';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DeleteIcon } from '@/icons/delete';
import { getFiles } from './action';
import { SearchIcon } from '@/icons/search';
import { AnimatePresence } from 'motion/react';
import { motion } from 'motion/react';

export function MediaFiles() {
  const { activeImage, selectImage } = useMedia();

  return (
    <div className='relative flex grow flex-col overflow-hidden'>
      <div className='bg-foreground/[.02] flex items-center gap-2 border-b p-3'>
        <Input className='h-9 max-w-sm' placeholder='Buscar...' startContent={<SearchIcon />} />
      </div>
      <div className='relative max-h-full grow overflow-y-auto p-3'>
        <GridContainer />
      </div>
      {/** Details */}
      {activeImage && (
        <motion.div
          onClick={() => selectImage(activeImage)}
          className='absolute inset-0 top-0 left-0 bg-black/80'
          variants={{
            hidden: {
              opacity: 0,
            },
            show: {
              opacity: 1,
            },
          }}
          transition={{
            duration: 0.3,
          }}
          initial='hidden'
          animate='show'
          exit='hidden'
        />
      )}
      <AnimatePresence initial={false} mode='wait'>
        {activeImage && (
          <motion.div
            className={cn(
              'bg-content absolute top-0 right-0 z-20 h-full max-h-full w-full max-w-full overflow-y-auto md:max-w-[90%] md:border-l',
            )}
            variants={{
              hidden: {
                x: '10%',
                opacity: 0,
              },
              show: {
                x: 0,
                opacity: 1,
              },
            }}
            transition={{
              duration: 0.3,
              ease: 'circInOut',
            }}
            initial='hidden'
            animate='show'
            exit='hidden'
          >
            <Details />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const GridContainer = () => {
  const { selectImage, activeImage, setTab, setImages, images } = useMedia();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFiles()
      .then((e) => setImages(e))
      .finally(() => {
        setLoading(false);
      });
  }, [setImages]);

  return (
    <>
      <div className='flex flex-col gap-2'>
        {images.map((img, i) => {
          return (
            <div
              key={i}
              onClick={() => selectImage(img)}
              className={cn(
                '[&_span]:text-foreground bg-content flex max-w-full cursor-pointer items-center gap-4 overflow-hidden rounded-sm border p-2 select-none',
                activeImage?.url === img.url ? 'border-primary' : 'hover:border-foreground/30',
              )}
            >
              <div className='relative aspect-square size-14 shrink-0 overflow-hidden border'>
                <img alt={img.name} src={img.url} className='size-full object-cover' />
              </div>
              <span className='block grow truncate'> {img.name} </span>
              <div className='flex flex-col gap-0.5 text-xs opacity-50'>
                <span className='text-nowrap'> Tamaño: {img.sizeKB} KB </span>
                <span className='text-nowrap'>
                  Dimensión: {img.width}x{img.height}{' '}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {!loading && images.length < 1 && (
        <div className='flex flex-col gap-1'>
          {' '}
          <span>
            No hay archivos creados.
            <button
              onClick={() => setTab('upload')}
              className='text-primary inline cursor-pointer pl-2 font-medium underline'
            >
              Subir un archivo
            </button>{' '}
          </span>{' '}
        </div>
      )}
      {loading && <span> Cargando adjuntos... </span>}
    </>
  );
};

const Details = () => {
  const { activeImage, isDeleting, deleteActiveImage, updateMetadata, selectImage } = useMedia();
  return (
    <div className='p-3'>
      {activeImage && (
        <div className='flex flex-col gap-3'>
          <label className='flex items-center justify-between gap-2 text-base font-medium'>
            Detalles del adjunto
            <Button size='xs' variant='outline' onClick={() => selectImage(activeImage)}>
              Cerrar
            </Button>
          </label>

          <div className='flex flex-wrap gap-2'>
            {Boolean(activeImage.url) ? (
              <img
                alt='PREVIEW_DN'
                src={activeImage.url}
                className='bg-foreground/5 max-w-50 object-contain'
              />
            ) : (
              <div className='bg-foreground/5 max-w-30 object-contain' />
            )}
            <div className='[&_span]:text-foreground/60 flex flex-col gap-0.5 text-xs font-light'>
              <span className='!text-foreground text-sm font-normal break-words'>
                {activeImage.name}
              </span>
              <span> {activeImage.date} </span>
              <span>
                {activeImage.width} x {activeImage.height}{' '}
              </span>
              <span>{activeImage.sizeKB} KB</span>

              <div className='mt-3'>
                <Button
                  variant='none'
                  size='xs'
                  loading={isDeleting}
                  onClick={() => {
                    deleteActiveImage();
                  }}
                  className='border-danger text-danger border bg-transparent hover:opacity-70'
                >
                  <DeleteIcon />
                  Borrar Permanentemente
                </Button>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-2 [&_>_label]:text-xs'>
            <Textarea
              label='Texto Alternativo'
              value={activeImage.metadata.alt || ''}
              onChange={(e) => updateMetadata('alt', e.target.value)}
            />
            <Input
              type='text'
              label='Título'
              value={activeImage.metadata.title || ''}
              onChange={(e) => updateMetadata('title', e.target.value)}
            />
            <Textarea
              label='Leyenda'
              value={activeImage.metadata.caption || ''}
              onChange={(e) => updateMetadata('caption', e.target.value)}
            />
            <Textarea
              label='Descripción'
              value={activeImage.metadata.description || ''}
              onChange={(e) => updateMetadata('description', e.target.value)}
            />
            <Input type='text' value={`${activeImage.url}`} readOnly />
            <Button
              variant='outline'
              onClick={() => navigator.clipboard.writeText(activeImage.url!)}
            >
              Copiar URL al portapapeles
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
