import type { Request, Response } from 'express';
import {
  createAdminToken,
  isAdminConfigured,
  verifyAdminPassword,
} from '../utils/adminAuth';
import {
  createDeparture,
  deleteDeparture,
  listDepartures,
  PUBLIC_LEAD_DAYS,
} from '../services/tourDeparturesService';

export function getPublicDepartures(req: Request, res: Response): void {
  try {
    const destinationId = String(req.params.id);
    const departures = listDepartures(destinationId, { publicOnly: true });
    res.json({
      destinationId,
      leadDays: PUBLIC_LEAD_DAYS,
      departures,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

export function adminLogin(req: Request, res: Response): void {
  if (!isAdminConfigured()) {
    res.status(503).json({ error: 'Admin no configurado (ADMIN_PASSWORD)' });
    return;
  }

  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  if (!verifyAdminPassword(password)) {
    res.status(401).json({ error: 'Contraseña incorrecta' });
    return;
  }

  res.json({ token: createAdminToken() });
}

export function getAdminDepartures(req: Request, res: Response): void {
  try {
    const destinationId =
      typeof req.query.destination === 'string' ? req.query.destination : 'salto-angel';
    const departures = listDepartures(destinationId, { publicOnly: false });
    res.json({ destinationId, leadDays: PUBLIC_LEAD_DAYS, departures });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

export function postAdminDeparture(req: Request, res: Response): void {
  try {
    const destinationId =
      typeof req.body?.destinationId === 'string' ? req.body.destinationId : 'salto-angel';
    const startDate = typeof req.body?.startDate === 'string' ? req.body.startDate : '';
    const endDate = typeof req.body?.endDate === 'string' ? req.body.endDate : '';
    const label = typeof req.body?.label === 'string' ? req.body.label : '';

    if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate) || !/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
      res.status(400).json({ error: 'Fechas inválidas (usa YYYY-MM-DD)' });
      return;
    }

    if (label.length > 120) {
      res.status(400).json({ error: 'La etiqueta es demasiado larga' });
      return;
    }

    const departure = createDeparture({ destinationId, startDate, endDate, label });
    res.status(201).json(departure);
  } catch (error) {
    const message = (error as Error).message;
    if (message.includes('Ya existe') || message.includes('fecha') || message.includes('antelación')) {
      res.status(message.includes('Ya existe') ? 409 : 400).json({ error: message });
      return;
    }
    console.error('[Tours] create error', error);
    res.status(500).json({ error: 'No se pudo crear la salida' });
  }
}

export function removeAdminDeparture(req: Request, res: Response): void {
  try {
    const ok = deleteDeparture(String(req.params.id));
    if (!ok) {
      res.status(404).json({ error: 'Salida no encontrada' });
      return;
    }
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
