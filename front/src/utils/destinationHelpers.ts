import type { Destination } from '../types';

export const getDestinationImages = (destination: Destination): string[] => {
  if (destination.images?.length) return destination.images;
  if (destination.imageUrl) return [destination.imageUrl];
  return [];
};

/** Cover / first image only — used for heroes and light previews. */
export const getDestinationCoverImage = (destination: Destination): string | null => {
  if (destination.images?.length) return destination.images[0];
  if (destination.imageUrl) return destination.imageUrl;
  return null;
};

/**
 * Warm the browser cache with only the first image of each destination.
 * Avoids downloading entire galleries on mobile.
 */
export const preloadDestinationCovers = (destinations: Destination[]): void => {
  destinations.forEach((destination) => {
    const cover = getDestinationCoverImage(destination);
    if (!cover || cover.startsWith('http')) return;

    const img = new Image();
    img.decoding = 'async';
    img.src = cover;
  });
};
