import type { Destination } from '../types';

export const getDestinationImages = (destination: Destination): string[] => {
  if (destination.images?.length) return destination.images;
  if (destination.imageUrl) return [destination.imageUrl];
  return [];
};

export const preloadDestinationImages = (destinations: Destination[]): void => {
  destinations.forEach((destination) => {
    getDestinationImages(destination).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  });
};
