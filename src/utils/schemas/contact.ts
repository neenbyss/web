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
  names: z.string().min(1, 'Se requieren tus Nombres Completos'),
  email: z
    .string()
    .min(1, 'Se requiere tu Dirección E-mail')
    .email('La dirección E-mail no es válida'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z
    .string()
    .min(1, 'Se Requiere Ingresar almenos un servicio')
    .refine((value) => enums.includes(value), {
      message: 'El servicio seleccionado no es válido',
    }),
  message: z.string().min(1, 'Se requiere un Mensaje detallado del servicio'),
});
