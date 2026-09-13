import nodemailer from 'nodemailer';

const CONTACT_TO = process.env.CONTACT_TO ?? 'Kaimantravel@gmail.com';

export type ContactMailPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

function createTransport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user, pass },
  });
}

export async function sendContactEmail(
  payload: ContactMailPayload
): Promise<{ messageId: string; to: string }> {
  const transport = createTransport();

  if (!transport) {
    throw new Error(
      'Correo no configurado. Define SMTP_HOST, SMTP_USER y SMTP_PASS en el servidor.'
    );
  }

  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER ?? CONTACT_TO;
  const phoneLine = payload.phone ? `\nTeléfono: ${payload.phone}` : '';

  console.log('[Contact] Enviando email por SMTP…', {
    to: CONTACT_TO,
    from,
    replyTo: payload.email,
  });

  const info = await transport.sendMail({
    from: `"KAIMAN Web" <${from}>`,
    to: CONTACT_TO,
    replyTo: `"${payload.name}" <${payload.email}>`,
    subject: `Nuevo contacto web — ${payload.name}`,
    text: [
      'Nuevo mensaje desde el formulario de KAIMAN',
      '',
      `Nombre: ${payload.name}`,
      `Email: ${payload.email}${phoneLine}`,
      '',
      'Mensaje:',
      payload.message,
    ].join('\n'),
    html: `
      <div style="font-family:Segoe UI,Arial,sans-serif;line-height:1.5;color:#1f2937">
        <h2 style="margin:0 0 12px">Nuevo mensaje desde la web</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(payload.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
        ${
          payload.phone
            ? `<p><strong>Teléfono:</strong> ${escapeHtml(payload.phone)}</p>`
            : ''
        }
        <p><strong>Mensaje:</strong></p>
        <p style="white-space:pre-wrap;background:#f8fafc;padding:12px;border-radius:8px">${escapeHtml(
          payload.message
        )}</p>
      </div>
    `,
  });

  return { messageId: info.messageId ?? '', to: CONTACT_TO };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
