import type { DestinationOffer } from '../../types';

export type LocalizedDestinationPatch = {
  name?: string;
  region?: string;
  tagline?: string;
  description?: string;
  longDescription?: string;
  highlights?: string[];
  bestSeason?: string;
  typicalDuration?: string;
  howToGetThere?: string;
  offers?: DestinationOffer[];
  offer?: DestinationOffer;
};
