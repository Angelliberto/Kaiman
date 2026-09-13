import type { Request, Response } from 'express';
import { sendContactEmail } from '../services/mailService';

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  company?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = {
  name: 120,
  email: 254,
  phone: 32,
  message: 2000,
};

/** Anti-spam por email (además del rate-limit por IP) */
const emailHits = new Map<string, { count: number; resetAt: number }>();
const EMAIL_WINDOW_MS = 60 * 60 * 1000;
const EMAIL_MAX = 3;

function allowEmail(email: string): boolean {
  const key = email.toLowerCase();
  const now = Date.now();
  const current = emailHits.get(key);
  if (!current || current.resetAt <= now) {
    emailHits.set(key, { count: 1, resetAt: now + EMAIL_WINDOW_MS });
    return true;
  }
  current.count += 1;
  return current.count <= EMAIL_MAX;
}

setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of emailHits) {
    if (bucket.resetAt <= now) emailHits.delete(key);
  }
}, 60_000).unref?.();

export async function postContact(req: Request, res: Response): Promise<void> {
  const { name, email, phone, message, company } = req.body as ContactBody;

  // Honeypot: si viene relleno, fingimos éxito sin procesar
  if (typeof company === 'string' && company.trim().length > 0) {
    res.json({ ok: true });
    return;
  }

  const trimmedName = name?.trim() ?? '';
  const trimmedEmail = email?.trim() ?? '';
  const trimmedPhone = phone?.trim() ?? '';
  const trimmedMessage = message?.trim() ?? '';

  if (trimmedName.length < 2 || trimmedName.length > LIMITS.name) {
    res.status(400).json({ error: 'Indica un nombre válido.' });
    return;
  }

  if (!EMAIL_PATTERN.test(trimmedEmail) || trimmedEmail.length > LIMITS.email) {
    res.status(400).json({ error: 'Indica un email válido.' });
    return;
  }

  if (trimmedPhone.length > LIMITS.phone) {
    res.status(400).json({ error: 'El teléfono es demasiado largo.' });
    return;
  }

  if (trimmedMessage.length < 10 || trimmedMessage.length > LIMITS.message) {
    res.status(400).json({
      error: `El mensaje debe tener entre 10 y ${LIMITS.message} caracteres.`,
    });
    return;
  }

  if (!allowEmail(trimmedEmail)) {
    res.status(429).json({
      error: 'Demasiados mensajes desde este email. Intenta más tarde.',
    });
    return;
  }

  console.log('[Contact] Solicitud recibida', {
    name: trimmedName,
    email: trimmedEmail,
    phone: trimmedPhone || null,
    message: trimmedMessage,
    at: new Date().toISOString(),
  });

  try {
    const sent = await sendContactEmail({
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone || undefined,
      message: trimmedMessage,
    });

    console.log('[Contact] ✅ Email ENVIADO correctamente', {
      to: sent.to,
      messageId: sent.messageId,
      from: trimmedEmail,
      name: trimmedName,
      at: new Date().toISOString(),
    });

    res.json({ ok: true });
  } catch (error) {
    const err = error as { message?: string; code?: string; response?: string };
    console.error('[Contact] ❌ Email NO enviado', {
      error: err?.message ?? String(error),
      code: err?.code,
      response: err?.response,
      from: trimmedEmail,
      name: trimmedName,
      at: new Date().toISOString(),
    });
    res.status(503).json({
      error: 'No se pudo enviar el mensaje ahora. Intenta de nuevo más tarde.',
    });
  }
}
