'use client';

import { useRef } from 'react';
import { UploadIcon } from '../../icons/upload';
import { Button } from '@/components/ui/button';
import { useMedia } from './provider';

export const Upload = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const { startUpload, finishUpload, selectImage, activeImage, isUploading, setTab } = useMedia();

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTab('media');
    const file = e.target.files?.[0];
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
      console.log(data);
      finishUpload(null);
      return;
    }

    const { data: imageMeta } = data;

    finishUpload(imageMeta);
    selectImage(imageMeta);
  }

  return (
    <div className='flex w-full grow flex-col overflow-y-auto p-3'>
      <div className='bg-foreground/[.02] m-auto flex size-full min-h-120 w-full max-w-3xl flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center'>
        <UploadIcon className='size-30' />
        <span className='text-foreground text-2xl font-medium'>
          Arrastra archivos para subirlos <br />o
        </span>
        <input
          ref={fileRef}
          name='file'
          type='file'
          accept='image/*'
          onChange={handleChange}
          className='sr-only'
        />
        <Button
          disabled={isUploading}
          onClick={() => fileRef.current?.click()}
          size='sm'
          className='mt-2'
        >
          Seleccionar Archivo
        </Button>

        {isUploading && (
          <div className='mt-3'>
            <span> {activeImage?.name} </span>
          </div>
        )}
      </div>
    </div>
  );
};
