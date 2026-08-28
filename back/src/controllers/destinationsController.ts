import { Request, Response } from 'express';
import { getDestination, listDestinations } from '../services/destinationsService';

export const getDestinations = (_req: Request, res: Response): void => {
  res.json(listDestinations());
};

export const getDestinationBySlug = (req: Request, res: Response): void => {
  const destination = getDestination(String(req.params.id));

  if (!destination) {
    res.status(404).json({ error: 'Destino no encontrado' });
    return;
  }

  res.json(destination);
};
