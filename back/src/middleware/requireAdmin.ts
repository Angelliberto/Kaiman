import type { Request, Response, NextFunction } from 'express';
import { verifyAdminToken } from '../utils/adminAuth';

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const header = req.header('authorization') ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';

  if (!verifyAdminToken(token)) {
    res.status(401).json({ error: 'No autorizado' });
    return;
  }

  next();
}
