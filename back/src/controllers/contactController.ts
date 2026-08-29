import type { Request, Response } from 'express';

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function postContact(req: Request, res: Response): void {
  const { name, email, phone, message } = req.body as ContactBody;

  const trimmedName = name?.trim() ?? '';
  const trimmedEmail = email?.trim() ?? '';
  const trimmedPhone = phone?.trim() ?? '';
  const trimmedMessage = message?.trim() ?? '';

  if (trimmedName.length < 2) {
    res.status(400).json({ error: 'Indica tu nombre.' });
    return;
  }

  if (!EMAIL_PATTERN.test(trimmedEmail)) {
    res.status(400).json({ error: 'Indica un email válido.' });
    return;
  }

  if (trimmedMessage.length < 10) {
    res.status(400).json({ error: 'El mensaje debe tener al menos 10 caracteres.' });
    return;
  }

  console.log('[Contact]', {
    name: trimmedName,
    email: trimmedEmail,
    phone: trimmedPhone || null,
    message: trimmedMessage,
    at: new Date().toISOString(),
  });

  res.json({ ok: true });
}
