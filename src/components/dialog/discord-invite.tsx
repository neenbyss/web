'use client';

import Link from 'next/link';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { DiscordIcon } from '@/icons/discord';
import { CheckIcon } from '@/icons/check';
import { XIcon } from '@/icons/x';
import { globalLinks } from '@/utils/data/global-links';
import { cn } from '@/lib/utils';

interface DiscordInviteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Indica si el mensaje se envió correctamente o hubo un error. */
  variant?: 'success' | 'error';
}

const content = {
  success: {
    icon: <CheckIcon />,
    title: 'Tu mensaje fue enviado',
    description:
      'En breve te responderemos. Pero si quieres apresurar la conversación, únete a nuestro Discord: ahí respondemos mucho más rápido.',
  },
  error: {
    icon: <XIcon />,
    title: 'No pudimos enviar tu mensaje',
    description:
      'Ocurrió un error al enviar tu mensaje. Para no perder tiempo, únete a nuestro Discord y hablemos directamente: respondemos mucho más rápido.',
  },
} as const;

export function DiscordInviteDialog({
  open,
  onOpenChange,
  variant = 'success',
}: DiscordInviteDialogProps) {
  const { icon, title, description } = content[variant];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <div
            className={cn(
              'mx-auto flex size-12 items-center justify-center rounded-full [&_svg]:size-6',
              variant === 'success' ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger',
            )}
          >
            {icon}
          </div>
          <DialogTitle className='mt-2 text-center sm:text-center'>{title}</DialogTitle>
          <DialogDescription className='text-center sm:text-center'>
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className='mt-2 gap-2 sm:justify-center'>
          <Button variant='flat' onClick={() => onOpenChange(false)}>
            Ahora no
          </Button>
          <Button asChild>
            <Link href={globalLinks.discord.link} target='_blank' rel='noopener noreferrer'>
              <DiscordIcon />
              Unirme al Discord
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
