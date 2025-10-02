'use client';

import { useRef, useEffect, useCallback } from 'react';
import { FileOutlineIcon } from '../../icons/file';
import { CloudUpdateIcon } from '../../icons/cloud-update';
import { useMedia } from './provider';
import { cn } from '@/lib/utils';

export const Upload = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const { startUpload, finishUpload, selectImage, activeImage, isUploading, setTab } = useMedia();

  const handleFile = useCallback(
    async (file: File) => {
      setTab('media');
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      startUpload(file.name);

      const res = await fetch('/api/admin/media', {
        body: formData,
        method: 'POST',
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        finishUpload(null);
        return;
      }

      const { data: imageMeta } = data;
      finishUpload(imageMeta);
      selectImage(imageMeta);
    },
    [setTab, startUpload, finishUpload, selectImage],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  useEffect(() => {
    function handlePaste(e: ClipboardEvent) {
      const items = e.clipboardData?.files;
      if (items && items.length > 0) {
        handleFile(items[0]);
      }
    }
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [handleFile]);

  return (
    <div className='flex w-full grow flex-col overflow-y-auto p-3'>
      <div
        onClick={() => {
          if (!isUploading) fileRef.current?.click();
        }}
        onDrop={(e) => {
          e.preventDefault();
          if (isUploading) return;
          const file = e.dataTransfer.files?.[0];
          if (file) handleFile(file);
        }}
        onDragOver={(e) => e.preventDefault()}
        className={cn(
          'm-auto flex size-full min-h-120 w-full max-w-3xl cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center',
          isUploading ? 'pointer-events-none opacity-50' : 'hover:bg-foreground/[.02]',
        )}
      >
        <div className='relative'>
          <FileOutlineIcon className='size-38 stroke-1' />
          <div className='bg-primary absolute right-3 bottom-3 flex size-10 flex-col items-center justify-center rounded-2xl'>
            <CloudUpdateIcon className='size-6' />
          </div>
        </div>

        <p className='max-w-sm text-lg font-light'>
          Puedes arrastrar o pegar tu archivo aquí, o{' '}
          <span className='text-primary underline'>selecciónalo</span> desde tu dispositivo
        </p>
        <p className='mt-2 font-light opacity-60'>
          Puedes subir archivos de hasta <span className='text-foreground'>5 MB</span> cada uno
        </p>

        <input
          ref={fileRef}
          name='file'
          type='file'
          accept='image/*'
          onChange={handleChange}
          className='sr-only'
        />

        {isUploading && (
          <div className='mt-3'>
            <span>{activeImage?.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};
