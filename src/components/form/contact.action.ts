'use server';

import nodemailer from 'nodemailer';
import { ContactSchema } from '@/utils/schemas/contact';
import { sleep } from '@/lib/sleep';

export async function sendContactEmail(data: any) {
  await sleep(500);

  return { success: true, message: 'Correo enviado con éxito.' };
  /** 
  const parsed = ContactSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, message: 'Datos inválidos.' };
  }

  const { names, email, phone, company, service, message } = parsed.data;

  try {
    const transporter = nodemailer.createTransport({
      host: 'mail.tudominio.com', // 👈 Cambia esto por el SMTP de tu hosting
      port: 465, // o 587 si no usas SSL
      secure: true, // true para 465, false para 587
      auth: {
        user: 'tucorreo@tudominio.com',
        pass: process.env.MAIL_PASSWORD || '',
      },
    });

    await transporter.sendMail({
      from: `"${names}" <${email}>`,
      to: 'tucorreo@tudominio.com',
      subject: '📨 Nuevo mensaje de contacto desde Neenbyss',
      html: `
        <h2>📬 Nuevo mensaje recibido</h2>
        <p><strong>Nombre:</strong> ${names}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
        <p><strong>Compañía:</strong> ${company || 'No proporcionado'}</p>
        <p><strong>Servicio solicitado:</strong> ${service}</p>
        <p><strong>Mensaje:</strong><br/>${message}</p>
      `,
    });

    return { success: true, message: 'Correo enviado con éxito.' };
  } catch (err) {
    console.error('[MAIL ERROR]', err);
    return { success: false, message: 'Error al enviar el correo. Intenta más tarde.' };
  }
    */
}
