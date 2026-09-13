import type { Destination, DestinationOffer, DestinationPackage } from '../types';
import type { LangCode } from './translations';
import type { LocalizedDestinationPatch } from './destinations/types';
import { en } from './destinations/en';
import { pt } from './destinations/pt';
import { it } from './destinations/it';
import { de } from './destinations/de';
import { fr } from './destinations/fr';

export type { LocalizedDestinationPatch } from './destinations/types';

const BY_LANG: Record<Exclude<LangCode, 'es'>, Record<string, LocalizedDestinationPatch>> = {
  en,
  pt,
  it,
  de,
  fr,
};

function mergePackage(base: DestinationPackage, patch?: DestinationPackage): DestinationPackage {
  if (!patch) return base;
  return {
    ...base,
    ...patch,
    includes: patch.includes ?? base.includes,
  };
}

function mergeOffer(base: DestinationOffer, patch?: DestinationOffer): DestinationOffer {
  if (!patch) return base;
  return {
    ...base,
    ...patch,
    packages: (patch.packages ?? base.packages).map((pkg, index) =>
      mergePackage(base.packages[index] ?? pkg, patch.packages?.[index])
    ),
    extras: patch.extras ?? base.extras,
    conditions: patch.conditions ?? base.conditions,
  };
}

export function localizeDestination(destination: Destination, lang: LangCode): Destination {
  if (lang === 'es') return destination;
  const patch = BY_LANG[lang]?.[destination.id];
  if (!patch) return destination;

  return {
    ...destination,
    name: patch.name ?? destination.name,
    region: patch.region ?? destination.region,
    tagline: patch.tagline ?? destination.tagline,
    description: patch.description ?? destination.description,
    longDescription: patch.longDescription ?? destination.longDescription,
    highlights: patch.highlights ?? destination.highlights,
    bestSeason: patch.bestSeason ?? destination.bestSeason,
    typicalDuration: patch.typicalDuration ?? destination.typicalDuration,
    howToGetThere: patch.howToGetThere ?? destination.howToGetThere,
    offers: patch.offers
      ? patch.offers.map((offer, index) =>
          mergeOffer(destination.offers?.[index] ?? offer, offer)
        )
      : destination.offers,
    offer: patch.offer
      ? mergeOffer(destination.offer ?? patch.offer, patch.offer)
      : destination.offer,
  };
}

export function localizeDestinations(items: Destination[], lang: LangCode): Destination[] {
  return items.map((item) => localizeDestination(item, lang));
}
