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

type ContactValueProps = z.infer<typeof ContactSchema>;

export function ContactForm() {
  const [isChecked, setChecked] = useState(false);
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
    message: errorMessage,
    status,
    isSuccess,
    isError,
  } = useServerAction(sendContactEmail);

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
      items: values.map((x) => ({ value: x.uid, label: x.title })),
    };
  });

  return (
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
  );
}
