export interface Destination {
  id: string;
  name: string;
  region: string;
  tagline: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  images: string[];
  highlights: string[];
  bestSeason: string;
  typicalDuration: string;
  howToGetThere: string;
  listingCount: number;
}

export interface HostListing {
  id: string;
  destinationId?: string;
  name: string;
  location: string;
  description: string;
  imageUrl?: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  airbnbListingUrl: string;
  availabilitySummary?: AvailabilitySummary | null;
}

export interface AvailabilitySummary {
  availableCount: number;
  blockedCount: number;
  isAvailableToday: boolean;
  nextAvailableDate: string | null;
  previewDays: DayAvailability[];
  syncedAt?: string;
  source?: 'airbnb-ical' | 'manual-example';
}

export interface SiteInfo {
  hostName: string;
  hostTagline?: string;
  listingCount: number;
}

export interface DayAvailability {
  date: string;
  available: boolean;
}

export interface ListingAvailability {
  propertyId: string;
  propertyName: string;
  location: string;
  airbnbListingUrl?: string;
  days: DayAvailability[];
  blockedCount: number;
  availableCount: number;
  syncedAt?: string;
  source: 'airbnb-ical' | 'manual-example';
}
