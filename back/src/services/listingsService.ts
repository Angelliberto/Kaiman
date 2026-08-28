



import { getAllListings, getListingById, loadListingsConfig } from '../config/listings';
import {
  buildDaysFromBlockedDates,
  DayAvailability,
  fetchAvailabilityFromIcal,
} from './icalService';

export type { DayAvailability };

export interface AvailabilitySummary {
  availableCount: number;
  blockedCount: number;
  isAvailableToday: boolean;
  nextAvailableDate: string | null;
  previewDays: DayAvailability[];
  syncedAt?: string;
  source: 'airbnb-ical' | 'manual-example';
}

const buildAvailabilitySummary = (
  days: DayAvailability[],
  source: AvailabilitySummary['source'],
  syncedAt?: string
): AvailabilitySummary => {
  const today = days[0];
  const nextAvailable = days.find((day) => day.available);

  return {
    availableCount: days.filter((day) => day.available).length,
    blockedCount: days.filter((day) => !day.available).length,
    isAvailableToday: today?.available ?? false,
    nextAvailableDate: nextAvailable?.date ?? null,
    previewDays: days.slice(0, 14),
    syncedAt,
    source,
  };
};

const resolveListingDays = async (
  listing: {
    airbnbIcalUrl?: string;
    blockedDates?: string[];
  },
  daysAhead: number,
  forceRefresh = false
): Promise<{ days: DayAvailability[]; source: AvailabilitySummary['source']; syncedAt?: string }> => {
  if (listing.airbnbIcalUrl && listing.airbnbIcalUrl.trim()) {
    const result = await fetchAvailabilityFromIcal(
      listing.airbnbIcalUrl.trim(),
      daysAhead,
      forceRefresh
    );

    return {
      days: result.days,
      source: 'airbnb-ical',
      syncedAt: result.syncedAt,
    };
  }

  return {
    days: buildDaysFromBlockedDates(listing.blockedDates ?? [], daysAhead),
    source: 'manual-example',
  };
};

export const getSiteInfo = () => {
  const config = loadListingsConfig();

  return {
    hostName: config.hostName,
    hostTagline: config.hostTagline,
    listingCount: config.listings.length,
  };
};

export const listHostListings = async (
  includeAvailability = false,
  destinationId?: string
) => {
  const listings = getAllListings().filter(
    (listing) => !destinationId || listing.destinationId === destinationId
  );

  if (!includeAvailability) {
    return listings.map(({ blockedDates: _b, airbnbIcalUrl: _i, ...listing }) => listing);
  }

  return Promise.all(
    listings.map(async (listing) => {
      try {
        const { days, source, syncedAt } = await resolveListingDays(listing, 14);

        return {
          ...listing,
          blockedDates: undefined,
          airbnbIcalUrl: undefined,
          availabilitySummary: buildAvailabilitySummary(days, source, syncedAt),
        };
      } catch {
        return {
          ...listing,
          blockedDates: undefined,
          airbnbIcalUrl: undefined,
          availabilitySummary: null,
        };
      }
    })
  );
};

export const getHostListing = (id: string) => {
  const listing = getListingById(id);

  if (!listing) {
    return null;
  }

  const { blockedDates: _b, airbnbIcalUrl: _i, ...publicListing } = listing;
  return publicListing;
};

export const getListingAvailability = async (
  id: string,
  options?: { daysAhead?: number; forceRefresh?: boolean }
) => {
  const listing = getListingById(id);

  if (!listing) {
    return null;
  }

  const { days, source, syncedAt } = await resolveListingDays(
    listing,
    options?.daysAhead ?? 60,
    options?.forceRefresh
  );

  return {
    propertyId: listing.id,
    propertyName: listing.name,
    location: listing.location,
    airbnbListingUrl: listing.airbnbListingUrl,
    days,
    blockedCount: days.filter((day) => !day.available).length,
    availableCount: days.filter((day) => day.available).length,
    syncedAt,
    source,
  };
};
