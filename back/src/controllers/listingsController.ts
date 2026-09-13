import { Request, Response } from 'express';
import {
  getHostListing,
  getListingAvailability,
  getSiteInfo,
  listHostListings,
} from '../services/listingsService';
import { reloadListingsConfig } from '../config/listings';
import { verifyAdminToken } from '../utils/adminAuth';

export const getSite = (_req: Request, res: Response): void => {
  res.json(getSiteInfo());
};

export const getListings = async (req: Request, res: Response): Promise<void> => {
  try {
    const includeAvailability = req.query.availability === 'true';
    const destinationId =
      typeof req.query.destination === 'string' ? req.query.destination : undefined;
    const listings = await listHostListings(includeAvailability, destinationId);
    res.json(listings);
  } catch (error) {
    console.error('[ListingsController] Error:', error);
    res.status(500).json({ error: 'No se pudieron cargar los hospedajes' });
  }
};

export const getListing = (req: Request, res: Response): void => {
  const listing = getHostListing(String(req.params.id));

  if (!listing) {
    res.status(404).json({ error: 'Hospedaje no encontrado' });
    return;
  }

  res.json(listing);
};

export const getAvailability = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const rawDays = req.query.days ? Number(req.query.days) : 60;
    const daysAhead = Number.isFinite(rawDays)
      ? Math.min(120, Math.max(1, Math.floor(rawDays)))
      : 60;

    // refresh=true solo con admin (evita abuso de iCal externo)
    const wantsRefresh = req.query.refresh === 'true';
    const auth = req.header('authorization') ?? '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : '';
    const forceRefresh = wantsRefresh && verifyAdminToken(token);

    const availability = await getListingAvailability(String(req.params.id), {
      daysAhead,
      forceRefresh,
    });

    if (!availability) {
      res.status(404).json({ error: 'Hospedaje no encontrado' });
      return;
    }

    res.json(availability);
  } catch (error) {
    console.error('[ListingsController] Error:', error);
    res.status(400).json({ error: 'No se pudo obtener la disponibilidad' });
  }
};

export const reloadListings = (_req: Request, res: Response): void => {
  const config = reloadListingsConfig();
  res.json({
    message: 'Listings recargados desde listings.json',
    listingCount: config.listings.length,
  });
};
