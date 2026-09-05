import { existsSync, readdirSync, readFileSync } from 'fs';
import { extname, resolve } from 'path';

export interface DestinationPackage {
  name: string;
  price: string;
  unit?: string;
  badge?: string;
  includes: string[];
  childRate?: string;
}

export interface DestinationOffer {
  title: string;
  subtitle?: string;
  highlight?: string;
  packages: DestinationPackage[];
  extrasTitle?: string;
  extras?: string[];
  conditions?: string[];
  contactWhatsApp?: string;
}

export interface Destination {
  id: string;
  name: string;
  region: string;
  tagline: string;
  description: string;
  longDescription: string;
  /** Fallback si la carpeta aún no tiene fotos */
  imageUrl?: string;
  images?: string[];
  highlights: string[];
  bestSeason: string;
  typicalDuration: string;
  howToGetThere: string;
  offers?: DestinationOffer[];
  offer?: DestinationOffer;
}

interface DestinationsFile {
  destinations: Destination[];
}

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);

const DESTINATIONS_PATH =
  process.env.DESTINATIONS_FILE ?? resolve(process.cwd(), 'destinations.json');

const IMAGES_ROOT =
  process.env.DESTINATION_IMAGES_DIR ??
  resolve(process.cwd(), '../front/public/images');

let cachedRawDestinations: Destination[] | null = null;

const listLocalImages = (destinationId: string): string[] => {
  const folder = resolve(IMAGES_ROOT, destinationId);

  if (!existsSync(folder)) {
    return [];
  }

  return readdirSync(folder)
    .filter((file) => {
      if (file.startsWith('.')) return false;
      return IMAGE_EXTENSIONS.has(extname(file).toLowerCase());
    })
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => `/images/${destinationId}/${file}`);
};

const enrichDestination = (destination: Destination): Destination => {
  const localImages = listLocalImages(destination.id);
  const images =
    localImages.length > 0
      ? localImages
      : destination.images?.length
        ? destination.images
        : destination.imageUrl
          ? [destination.imageUrl]
          : [];

  return {
    ...destination,
    images,
    imageUrl: images[0] ?? destination.imageUrl ?? '',
  };
};

const loadRawDestinations = (): Destination[] => {
  if (cachedRawDestinations) {
    return cachedRawDestinations;
  }

  const raw = JSON.parse(readFileSync(DESTINATIONS_PATH, 'utf-8')) as DestinationsFile;
  cachedRawDestinations = raw.destinations ?? [];
  return cachedRawDestinations;
};

export const loadDestinations = (): Destination[] =>
  loadRawDestinations().map(enrichDestination);

export const getAllDestinations = (): Destination[] => loadDestinations();

export const getDestinationById = (id: string): Destination | undefined =>
  getAllDestinations().find((destination) => destination.id === id);

export const reloadDestinations = (): Destination[] => {
  cachedRawDestinations = null;
  return loadDestinations();
};
