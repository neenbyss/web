import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ImageIcon } from '../../icons/image';
import { TooltipBtn } from './../_tooltip';
import { Button } from '@/components/ui/button';
import { UploadIcon } from '../../icons/upload';
import { MediaIcon } from '../../icons/media';
import { Upload } from './upload';
import { MediaFiles } from './media-files';
import { useMedia } from './provider';

export function ImageMain() {
  const { isTab, setTab, activeImage } = useMedia();
  return (
    <Dialog>
      <TooltipBtn
        asChild
        size='sm'
        className='h-7 gap-1 pr-1.5 pl-1.5 font-light'
        content='Insertar Imágen'
      >
        <DialogTrigger>
          <ImageIcon /> Ins..
        </DialogTrigger>
      </TooltipBtn>
      <DialogContent className='flex max-h-[95vh] min-h-[95vh] max-w-[95%] flex-col gap-0 p-0'>
        <DialogHeader className='border-b p-3'>
          <DialogTitle className='text-xl font-normal'> Insertar Imágen </DialogTitle>
          <DialogDescription className='sr-only'> Inserta una imágen </DialogDescription>
          <div className='mt-2 flex items-center gap-2'>
            <Button
              onClick={() => setTab('upload')}
              variant={isTab('upload') ? 'primary' : 'light'}
              size='sm'
              className='w-full sm:w-fit'
            >
              <UploadIcon />
              Subir Archivos
            </Button>
            <Button
              onClick={() => setTab('media')}
              variant={isTab('media') ? 'primary' : 'light'}
              size='sm'
              className='w-full sm:w-fit'
            >
              <MediaIcon />
              Biblioteca
            </Button>
          </div>
        </DialogHeader>
        {isTab('upload') && <Upload />}
        {isTab('media') && <MediaFiles />}
        <DialogFooter className='border-t p-3'>
          <DialogClose asChild>
            <Button size='sm' variant='light' className='opacity-80'>
              Cancelar
            </Button>
          </DialogClose>
          <Button size='sm' disabled={!activeImage}>
            Seleccionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
