import { Request, Response } from 'express';
import {
  getHostListing,
  getListingAvailability,
  getSiteInfo,
  listHostListings,
} from '../services/listingsService';
import { reloadListingsConfig } from '../config/listings';

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
    const availability = await getListingAvailability(String(req.params.id), {
      daysAhead: req.query.days ? Number(req.query.days) : 60,
      forceRefresh: req.query.refresh === 'true',
    });

    if (!availability) {
      res.status(404).json({ error: 'Hospedaje no encontrado' });
      return;
    }

    res.json(availability);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    console.error('[ListingsController] Error:', error);
    res.status(400).json({ error: message });
  }
};

export const reloadListings = (_req: Request, res: Response): void => {
  const config = reloadListingsConfig();
  res.json({
    message: 'Listings recargados desde listings.json',
    listingCount: config.listings.length,
  });
};
