'use client';
import * as z from 'zod';

import { useEffect, useRef, useState } from 'react';
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
import { useAnalytics } from '@/hooks/use-analytics';
import { SendIcon } from '@/icons/send';
import { toast } from '@/hooks/use-toast';
import { CheckIcon } from '@/icons/check';
import { XIcon } from '@/icons/x';
import { DiscordInviteDialog } from '../dialog/discord-invite';

type ContactValueProps = z.infer<typeof ContactSchema>;

function getServiceCategory(uid: string): string | null {
  for (const [category, services] of Object.entries(serviceDetails)) {
    for (const service of services) {
      if (service.uid === uid) return category;
      if (service.plans?.some((plan) => plan.uid === uid)) return category;
    }
  }
  return null;
}

const frameworkOptions = [
  {
    items: [
      { value: 'esx', label: 'ESX' },
      { value: 'qbcore', label: 'QBCore' },
      { value: 'qbox', label: 'Qbox' },
      { value: 'otro', label: 'Otro' },
      { value: 'no_se', label: 'No lo sé' },
    ],
  },
];

const projectStatusOptions = [
  {
    items: [
      { value: 'nuevo', label: 'Servidor nuevo (aún no abierto)' },
      { value: 'operativo', label: 'Servidor operativo' },
      { value: 'con_errores', label: 'Con errores o lag' },
      { value: 'migracion', label: 'Migración entre frameworks' },
    ],
  },
];

export function ContactForm() {
  const [isChecked, setChecked] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [discordDialogOpen, setDiscordDialogOpen] = useState(false);
  const [discordDialogVariant, setDiscordDialogVariant] = useState<'success' | 'error'>('success');
  const path = useSearchParams();
  // Prefill: primero query (?service=, ?email= por compatibilidad), después
  // sessionStorage (el captador del footer ya no expone el email en la URL).
  const getPrefill = (key: string) => {
    const fromQuery = path.get(key);
    if (fromQuery) return fromQuery;
    if (typeof window !== 'undefined') {
      try {
        return sessionStorage.getItem(`contact_${key}`) ?? '';
      } catch {
        return '';
      }
    }
    return '';
  };
  const email = getPrefill('email');
  const names = getPrefill('names');
  const phone = getPrefill('phone');
  const company = getPrefill('company');
  const service = getPrefill('service');
  const message = getPrefill('message');

  const { trackEvent } = useAnalytics();
  const startedRef = useRef(false);
  const preselectedRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<ContactValueProps>({
    defaultValues: {
      names,
      email,
      phone,
      company,
      service,
      message,
      framework: undefined,
      project_status: undefined,
      deadline: '',
      slots: '',
      evidence_link: '',
      budget: '',
    },
    resolver: zodResolver(ContactSchema),
  });

  const {
    execute: submitEmail,
    isPending,
    isSuccess,
  } = useServerAction(sendContactEmail, {
    onSuccess() {
      const submitted = form.getValues();
      const category = getServiceCategory(submitted.service ?? '');
      trackEvent('contact_submit', {
        service_uid: submitted.service ?? '',
        service_category: category ?? 'unknown',
        has_phone: Boolean(submitted.phone),
        message_len: submitted.message?.length ?? 0,
        preselected: preselectedRef.current,
        page_location: window.location.pathname,
      });
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
            Recibimos tu solicitud. Te responderemos inicialmente en menos de 24 horas.
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
            <XIcon /> No pudimos enviar tu mensaje{' '}
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

  const selectedService = form.watch('service');
  const isFivemService = getServiceCategory(selectedService ?? '') === 'fivem';

  useEffect(() => {
    if (service && !preselectedRef.current) {
      preselectedRef.current = true;
      trackEvent('service_preselect', {
        service_uid: service,
        page_location: window.location.pathname,
      });
    }
    // Solo al montar: registra la preselección inicial desde la URL.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFirstInteraction = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent('contact_start', {
      page_location: window.location.pathname,
      service_uid: form.getValues('service') ?? '',
    });
  };

  const onSubmit = async (values: ContactValueProps) => {
    if (!isChecked) {
      setTermsError(true);
      return;
    }
    setTermsError(false);
    submitEmail(values);
  };

  // Tras un submit inválido, mueve el foco al primer campo con error
  // para que teclado y lector de pantalla lo encuentren de inmediato.
  const onInvalid = () => {
    requestAnimationFrame(() => {
      formRef.current
        ?.querySelector<HTMLElement>('[aria-invalid="true"]')
        ?.focus({ preventScroll: false });
    });
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

  // Etiqueta legible del servicio actual (incluida la preselección por URL):
  // Radix muestra el placeholder hasta que el desplegable se abre una vez.
  const selectedServiceLabel = selectedService
    ? services.flatMap((g) => g.items).find((item) => item.value === selectedService)?.label
    : null;

  return (
    <>
      <FormProvider {...form}>
        <form
          noValidate
          ref={formRef}
          className='mt-6 flex grid-cols-2 flex-col gap-4 sm:grid'
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          onFocus={handleFirstInteraction}
        >
          <Input
            type='text'
            name='names'
            label='Nombres Completos'
            required
            autoComplete='name'
            startContent={<UserIcon />}
            placeholder='Nombres Completos'
          />
          <Input
            type='email'
            name='email'
            label='Dirección E-mail'
            required
            autoComplete='email'
            startContent={<EmailIcon />}
            placeholder='nombre@email.com'
          />
          <Input
            type='tel'
            name='phone'
            label='Teléfono de Contacto'
            autoComplete='tel'
            startContent={<PhoneIcon />}
            placeholder='Teléfono de contacto (opcional)'
          />
          <Input
            type='text'
            name='company'
            label='Nombre de la Compañía'
            autoComplete='organization'
            startContent={<BusinessIcon />}
            placeholder='Nombre de la compañía (opcional)'
          />

          <div className='col-span-2'>
            <Select
              required
              name='service'
              startContent={<ServiceIcon className='!text-foreground' />}
              label='Servicio de interés'
              placeholder='Selecciona un servicio'
              itemsGroup={services}
            />
            {selectedServiceLabel && (
              <p className='text-foreground-2/70 mt-1.5 text-xs' aria-live='polite'>
                Servicio seleccionado:{' '}
                <span className='text-foreground'>{selectedServiceLabel}</span>
              </p>
            )}
          </div>

          {isFivemService && (
            <>
              <Select
                name='framework'
                label='Framework (opcional)'
                placeholder='ESX, QBCore, Qbox…'
                itemsGroup={frameworkOptions}
              />
              <Select
                name='project_status'
                label='Estado del servidor (opcional)'
                placeholder='Nuevo, operativo, con errores…'
                itemsGroup={projectStatusOptions}
              />
              <Input
                type='text'
                name='deadline'
                label='Fecha objetivo (opcional)'
                placeholder='Beta, apertura, evento…'
              />
              <Input
                type='text'
                name='slots'
                label='Jugadores o slots (opcional)'
                placeholder='Ej. 64 slots'
              />
              <div className='col-span-2'>
                <Input
                  type='text'
                  name='evidence_link'
                  label='Enlace a logs o capturas (opcional)'
                  placeholder='https://…'
                />
              </div>
              <div className='col-span-2'>
                <Input
                  type='text'
                  name='budget'
                  label='Presupuesto orientativo (opcional)'
                  placeholder='Rango que quieres respetar'
                />
              </div>
            </>
          )}

          <Textarea
            name='message'
            label='Mensaje'
            startContent={<MessageIcon />}
            required
            placeholder='Describe qué quieres crear o qué está fallando. Si tienes framework, error, log, captura o fecha objetivo, inclúyelo aquí.'
            classNames={{
              container: 'col-span-2',
            }}
          />

          <div className='col-span-2'>
            <label className='flex cursor-pointer gap-2 select-none'>
              <Checkbox
                onCheckedChange={(v) => {
                  setChecked(v as boolean);
                  if (v) setTermsError(false);
                }}
              />
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
                  y autorizo el tratamiento de mis datos personales conforme a la normativa
                  aplicable.
                </span>
              </span>
            </label>
            {termsError && (
              <p role='alert' className='text-danger mt-2 text-sm'>
                Debes aceptar los términos y la política de privacidad para enviar tu solicitud.
              </p>
            )}
          </div>

          <div className='col-span-2 mt-2 flex justify-end gap-2'>
            <Button loading={isPending} type='submit' className='w-full' disabled={isPending}>
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
