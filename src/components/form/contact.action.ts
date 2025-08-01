'use server';

import nodemailer from 'nodemailer';
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

  console.log(`
        <h2>📬 Nuevo mensaje recibido</h2>
        <p><strong>Nombre:</strong> ${names}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
        <p><strong>Compañía:</strong> ${company || 'No proporcionado'}</p>
        <p><strong>Servicio solicitado:</strong> ${service}</p>
        <p><strong>Mensaje:</strong><br/>${message}</p>
        <span><strong>CLIENT_IP:</strong> ${ip.toString()} </span>
      `);

  try {
    const transporter = nodemailer.createTransport({
      host: 'mail.neenbyss.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.Email,
        pass: process.env.MAIL_PASSWORD || '',
      },
    });

    await transporter.sendMail({
      from: `"Neenbyss Contacto" <team@neenbyss.com>`,
      to: 'team@neenbyss.com',
      replyTo: email,
      subject: `📨 Nuevo mensaje de contacto desde Neenbyss | ${email}`,
      html: `
        <h2>📬 Nuevo mensaje recibido</h2>
        <p><strong>Nombre:</strong> ${names}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
        <p><strong>Compañía:</strong> ${company || 'No proporcionado'}</p>
        <p><strong>Servicio solicitado:</strong> ${service}</p>
        <p><strong>Mensaje:</strong><br/>${message}</p>
        <span><strong>CLIENT_IP:</strong> ${ip} </span>
      `,
    });

    // ✅ Enviar alerta a Discord como embed si se envió el correo correctamente
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
              { name: '🛠 Servicio', value: service },
              { name: '📝 Mensaje', value: message || 'Sin mensaje' },
            ],
            footer: {
              text: 'Correo enviado correctamente',
            },
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    return { success: true, message: 'Correo enviado con éxito.' };
  } catch (error) {
    console.error('[Error al enviar correo]', error);

    // ❌ Enviar alerta a Discord como embed de error
    await fetch(process.env.DISCORD_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: '🚨 Error Neenbyss',
        embeds: [
          {
            title: '❌ Error al enviar mensaje de contacto',
            color: 0xe74c3c, // rojo
            description: `Ocurrió un error al enviar el correo.`,
            fields: [
              { name: 'Nombre', value: data.names || '—', inline: true },
              { name: 'Email', value: data.email || '—', inline: true },
            ],
            footer: {
              text: 'Fallo en el envío del correo',
            },
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    return { success: false, message: 'Error al enviar el correo.' };
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
