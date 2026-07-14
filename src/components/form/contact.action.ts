'use server';

import { ContactSchema } from '@/utils/schemas/contact';
import { serviceDetails } from '@/utils/data/services';
import { headers } from 'next/headers';
import { isOnCooldown, setCooldown } from '@/lib/cooldown';

async function getClientIP() {
  const header = await headers();

  const forwarded = header.get('x-forwarded-for');
  if (!forwarded) return 'unknown';
  return forwarded.split(',')[0].trim();
}

export async function sendContactEmail(data: any) {
  const parsed = ContactSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, message: 'Datos Inválidos.' };
  }

  const ip = await getClientIP();
  const key = `cooldown:contact:${ip}`;

  if (await isOnCooldown(key, 60)) {
    return {
      success: false,
      message: 'Has enviado un mensaje recientemente. Intenta de nuevo en 1 minuto.',
    };
  }

  await setCooldown(key, 60);

  const { names, email, phone, company, service: serviceUid, message } = parsed.data;

  const service = getServiceLabelByUid(serviceUid);

  try {
    // ✅ Enviar mensaje de contacto a Discord como embed
    await fetch(process.env.DISCORD_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: '📩 Alerta Neenbyss',
        embeds: [
          {
            title: '📬 Nuevo mensaje de contacto',
            color: 0x2ecc71, // verde
            fields: [
              { name: '👤 Nombre', value: names },
              { name: '📧 Email', value: email },
              { name: '📞 Teléfono', value: phone || 'No proporcionado' },
              { name: '🏢 Compañía', value: company || 'No proporcionado' },
              { name: '🛠 Servicio', value: service || 'No especificado' },
              { name: '📝 Mensaje', value: message || 'Sin mensaje' },
              { name: '🌐 IP', value: ip },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    return { success: true, message: 'Mensaje enviado con éxito.' };
  } catch (error) {
    console.error('[Error al enviar mensaje a Discord]', error);

    return { success: false, message: 'Error al enviar el mensaje.' };
  }
}

function getServiceLabelByUid(uid: string): string | null {
  for (const services of Object.values(serviceDetails)) {
    for (const service of services) {
      // Coincide con el servicio principal
      if (service.uid === uid) {
        return service.title;
      }

      // Coincide con uno de los planes (si existen)
      if (service.plans) {
        const matchingPlan = service.plans.find((plan) => plan.uid === uid);
        if (matchingPlan) {
          return matchingPlan.label;
        }
      }
    }
  }

  return null; // Si no encuentra nada
}
