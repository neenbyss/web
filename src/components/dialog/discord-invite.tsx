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
import { CalendarIcon } from '@/icons/calendar';
import { EmailIcon } from '@/icons/email';
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
    title: 'Recibimos tu solicitud',
    description:
      'Te responderemos inicialmente en menos de 24 horas. Si tu caso es urgente, puedes continuar por Discord o agendar una llamada.',
  },
  error: {
    icon: <XIcon />,
    title: 'No pudimos enviar tu mensaje',
    description:
      'No pudimos procesar tu solicitud en este momento. Para no perder tiempo, continúa por Discord, agenda una llamada o escríbenos por email.',
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
          <div className='flex flex-wrap items-center justify-center gap-2'>
            <Button asChild>
              <Link
                href={globalLinks.discord.link}
                target='_blank'
                rel='noopener noreferrer'
                data-event='click_discord'
                data-location='post_submit'
              >
                <DiscordIcon />
                Discord
              </Link>
            </Button>
            <Button asChild variant='outline'>
              <a
                href={globalLinks.meeting.link}
                target='_blank'
                rel='noopener noreferrer'
                data-event='click_agenda'
                data-location='post_submit'
              >
                <CalendarIcon />
                Agendar llamada
              </a>
            </Button>
            <Button asChild variant='outline'>
              <a href={globalLinks.email.link} data-event='click_email' data-location='post_submit'>
                <EmailIcon />
                Email
              </a>
            </Button>
            <Button variant='flat' onClick={() => onOpenChange(false)}>
              Cerrar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
