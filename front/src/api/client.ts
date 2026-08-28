import type { Destination, HostListing, ListingAvailability, SiteInfo } from '../types';

const API_BASE = import.meta.env.VITE_API_URL ?? '/api';

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`);

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error ?? `Error ${response.status}`);
  }

  return response.json();
}

export const fetchSiteInfo = (): Promise<SiteInfo> => request('/site');

export const fetchDestinations = (): Promise<Destination[]> => request('/destinations');

export const fetchDestination = (id: string): Promise<Destination> =>
  request(`/destinations/${id}`);

export const fetchListings = (destinationId?: string): Promise<HostListing[]> => {
  const params = new URLSearchParams({ availability: 'true' });
  if (destinationId) params.set('destination', destinationId);
  return request(`/listings?${params.toString()}`);
};

export const fetchListing = (id: string): Promise<HostListing> =>
  request(`/listings/${id}`);

export const fetchListingAvailability = (
  id: string,
  refresh = false
): Promise<ListingAvailability> =>
  request(`/listings/${id}/availability${refresh ? '?refresh=true' : ''}`);
