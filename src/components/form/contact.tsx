'use client';
import * as z from 'zod';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { PhoneIcon } from '../../icons/phone';
import { BusinessIcon } from '../../icons/business';
import { ServiceIcon } from '../ui/service';
import { MessageIcon } from '../ui/message';

import { FieldInput as Input } from '../field/field-input';
import { FieldSelect as Select } from '../field/field-select';
import { FieldTextarea as Textarea } from '../field/field-textarea';

import { EmailIcon } from '@/icons/email';
import { UserIcon } from '@/icons/user';

import { ContactSchema } from '@/utils/schemas/contact';

import { zodResolver } from '@hookform/resolvers/zod';
import { serviceCategories, serviceDetails } from '@/utils/data/services';

import { sendContactEmail } from './contact.action';
import { useServerAction } from '@/hooks/use-server-action';
import { SendIcon } from '@/icons/send';
import { toast } from '@/hooks/use-toast';
import { CheckIcon } from '@/icons/check';
import { XIcon } from '@/icons/x';
import { DiscordInviteDialog } from '../dialog/discord-invite';

type ContactValueProps = z.infer<typeof ContactSchema>;

export function ContactForm() {
  const [isChecked, setChecked] = useState(false);
  const [discordDialogOpen, setDiscordDialogOpen] = useState(false);
  const [discordDialogVariant, setDiscordDialogVariant] = useState<'success' | 'error'>('success');
  const path = useSearchParams();
  const email = path.get('email') ?? '';
  const names = path.get('names') ?? '';
  const phone = path.get('phone') ?? '';
  const company = path.get('company') ?? '';
  const service = path.get('service') ?? '';
  const message = path.get('message') ?? '';

  const {
    execute: submitEmail,
    isPending,
    isSuccess,
  } = useServerAction(sendContactEmail, {
    onSuccess() {
      toast({
        className: 'bg-success/40 border-success backdrop-blur-sm',
        title: (
          <span className='text-foreground flex items-center gap-2 text-base font-medium'>
            {' '}
            <CheckIcon /> Solicitud Enviada{' '}
          </span>
        ) as unknown as string,
        description: (
          <span className='text-foreground flex items-center gap-2'>
            <EmailIcon />
            Tu solicitud fue enviada correctamente.
          </span>
        ),
      });
      setDiscordDialogVariant('success');
      setDiscordDialogOpen(true);
    },
    onError({ message }) {
      toast({
        className: 'bg-danger/40 border-danger backdrop-blur-sm',
        title: (
          <span className='text-foreground flex items-center gap-2 text-base font-medium'>
            {' '}
            <XIcon /> Error Inesperado{' '}
          </span>
        ) as unknown as string,
        description: (
          <span className='text-foreground flex items-center gap-2'>
            <EmailIcon />
            {message}
          </span>
        ),
      });
      setDiscordDialogVariant('error');
      setDiscordDialogOpen(true);
    },
  });

  const form = useForm<ContactValueProps>({
    defaultValues: { names, email, phone, company, service, message },
    resolver: zodResolver(ContactSchema),
  });

  const onSubmit = async (values: ContactValueProps) => {
    if (!isChecked) return;
    submitEmail(values);
  };

  const services = Object.entries(serviceDetails).map(([key, values]) => {
    const category = serviceCategories.find((x) => x.uid === key);
    return {
      groupLabel: (
        <span className='flex items-center gap-2'>
          {category?.icon}
          {category?.title}
        </span>
      ),
      items: values.flatMap((x) =>
        x.plans
          ? x.plans.map((y) => ({ value: y.uid, label: y.label }))
          : [{ value: x.uid, label: x.title }],
      ),
    };
  });

  return (
    <>
      <FormProvider {...form}>
        <form
          noValidate
          className='mt-6 flex grid-cols-2 flex-col gap-4 sm:grid'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Input
            type='name'
            name='names'
            label='Nombres Completos'
            required
            startContent={<UserIcon />}
            placeholder='Nombres Completos'
          />
          <Input
            type='email'
            name='email'
            label='Dirección E-mail'
            required
            startContent={<EmailIcon />}
            placeholder='nombre@email.com'
          />
          <Input
            type='phone'
            name='phone'
            label='Teléfono de Contacto'
            startContent={<PhoneIcon />}
            placeholder='Teléfono de contacto'
          />
          <Input
            type='name'
            name='company'
            label='Nombre de la Compañía'
            startContent={<BusinessIcon />}
            placeholder='Nombre de la compañía'
          />

          <Select
            required
            name='service'
            startContent={<ServiceIcon className='!text-foreground' />}
            label='Servicio de interés'
            placeholder='Selecciona un servicio'
            wrapperClassName='col-span-2'
            itemsGroup={services}
          />

          <Textarea
            name='message'
            label='Mensaje'
            startContent={<MessageIcon />}
            required
            placeholder='Mensaje más detallado del servicio'
            classNames={{
              container: 'col-span-2',
            }}
          />

          <label className='col-span-2 flex cursor-pointer gap-2 select-none'>
            <Checkbox onCheckedChange={(v) => setChecked(v as boolean)} />
            <span>
              Aceptar nuestros términos y condiciones de Neenbyss
              <span className='text-foreground-2/50 mt-1 block text-xs'>
                Acepto los{' '}
                <Link href='/terms' className='text-primary underline'>
                  Términos y Condiciones
                </Link>
                , la{' '}
                <Link href='/privacy' className='text-primary underline'>
                  Política de Privacidad
                </Link>{' '}
                y autorizo el tratamiento de mis datos personales conforme a la normativa aplicable.
              </span>
            </span>
          </label>

          <div className='col-span-2 mt-2 flex justify-end gap-2'>
            <Button
              disabled={!isChecked || isPending}
              loading={isPending}
              type='submit'
              className='w-full'
            >
              Enviar Mensaje
              <SendIcon />
            </Button>
          </div>
        </form>
      </FormProvider>

      <DiscordInviteDialog
        open={discordDialogOpen}
        onOpenChange={setDiscordDialogOpen}
        variant={discordDialogVariant}
      />
    </>
  );
}
