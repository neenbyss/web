import * as z from 'zod';
import { serviceDetails } from '../data/services';

const indexedServices = Object.entries(serviceDetails).flatMap(([category, services]) =>
  services.map((service) => ({ ...service, category })),
);

// Extendemos enums para incluir tanto los servicios como los planes
const enums = indexedServices.flatMap((service) =>
  service.plans ? [service.uid, ...service.plans.map((plan) => plan.uid)] : [service.uid],
);

export const ContactSchema = z.object({
  names: z
    .string()
    .min(1, 'Se requieren tus Nombres Completos')
    .min(4, '...Nombres muy cortos. ¿No crees?')
    .refine((val) => /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{3,}$/.test(val), {
      message: 'El nombre parece inválido o contiene caracteres no permitidos',
    })
    .refine((val) => !containsSpam(val), {
      message: 'El mensaje contiene contenido inapropiado',
    }),
  email: z
    .string()
    .min(1, 'Se requiere tu Dirección E-mail')
    .email('La dirección E-mail no es válida'),
  phone: z.string().optional(),
  company: z
    .string()
    .optional()
    .refine((val) => (val ? !containsSpam(val) : true), {
      message: 'El mensaje contiene contenido inapropiado',
    }),
  service: z
    .string()
    .min(1, 'Se Requiere Ingresar almenos un servicio')
    .refine((value) => enums.includes(value), {
      message: 'El servicio seleccionado no es válido',
    }),
  message: z
    .string()
    .min(10, 'Se requiere un Mensaje detallado del servicio')
    .refine((val) => val.trim().split(/\s+/).length > 5, {
      message: 'El mensaje parece demasiado corto o irrelevante',
    })
    .refine((val) => !containsSpam(val), {
      message: 'El mensaje contiene contenido inapropiado',
    }),
});

const badWords = [
  'puta',
  'mierda',
  'sexo',
  '8===',
  'xxx',
  'caca',
  'pinga',
  'vagina',
  'pene',
  'shota',
  'estúpido',
];

function containsSpam(val: string) {
  return badWords.some((word) => val.toLowerCase().includes(word));
}
