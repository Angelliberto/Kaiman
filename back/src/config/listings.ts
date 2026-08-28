import { readFileSync } from 'fs';
import { resolve } from 'path';

export interface HostListing {
  id: string;
  destinationId: string;
  name: string;
  location: string;
  description: string;
  imageUrl?: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  airbnbListingUrl: string;
  /** URL iCal de Airbnb — sincroniza disponibilidad automáticamente */
  airbnbIcalUrl?: string;
  /** Solo para demo/ejemplo si aún no hay iCal */
  blockedDates?: string[];
}

export interface ListingsConfig {
  hostName: string;
  hostTagline?: string;
  listings: HostListing[];
}

const LISTINGS_PATH =
  process.env.LISTINGS_FILE ?? resolve(process.cwd(), 'listings.json');

let cachedConfig: ListingsConfig | null = null;

export const loadListingsConfig = (): ListingsConfig => {
  if (cachedConfig) {
    return cachedConfig;
  }

  const raw = JSON.parse(readFileSync(LISTINGS_PATH, 'utf-8')) as ListingsConfig;

  cachedConfig = {
    hostName: raw.hostName ?? process.env.HOST_NAME ?? 'KAIMAN',
    hostTagline:
      raw.hostTagline ??
      process.env.HOST_TAGLINE ??
      'Turismo en Venezuela',
    listings: raw.listings ?? [],
  };

  return cachedConfig;
};

export const getAllListings = (): HostListing[] =>
  loadListingsConfig().listings;

export const getListingById = (id: string): HostListing | undefined =>
  getAllListings().find((listing) => listing.id === id);

export const reloadListingsConfig = (): ListingsConfig => {
  cachedConfig = null;
  return loadListingsConfig();
};
