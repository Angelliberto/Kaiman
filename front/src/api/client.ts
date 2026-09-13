import type {
  Destination,
  HostListing,
  ListingAvailability,
  SiteInfo,
  TourDeparture,
  TourDeparturesResponse,
} from '../types';

const API_BASE = '/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, init);

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error ?? `Error ${response.status}`);
  }

  return response.json();
}

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  /** Honeypot anti-bot; debe ir vacío */
  company?: string;
};

export const submitContact = (payload: ContactPayload): Promise<{ ok: boolean }> =>
  request('/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

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

export const fetchTourDepartures = (destinationId: string): Promise<TourDeparturesResponse> =>
  request(`/destinations/${destinationId}/departures`);

const ADMIN_TOKEN_KEY = 'kaiman-admin-token';

export const getAdminToken = (): string | null => sessionStorage.getItem(ADMIN_TOKEN_KEY);

export const setAdminToken = (token: string | null) => {
  if (token) sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
  else sessionStorage.removeItem(ADMIN_TOKEN_KEY);
  // Limpia tokens antiguos en localStorage
  localStorage.removeItem(ADMIN_TOKEN_KEY);
};

function adminHeaders(): HeadersInit {
  const token = getAdminToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export const adminLogin = (password: string): Promise<{ token: string }> =>
  request('/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });

export const fetchAdminDepartures = (
  destinationId = 'salto-angel'
): Promise<TourDeparturesResponse> =>
  request(`/admin/departures?destination=${encodeURIComponent(destinationId)}`, {
    headers: adminHeaders(),
  });

export const createAdminDeparture = (payload: {
  destinationId?: string;
  startDate: string;
  endDate: string;
  label?: string;
}): Promise<TourDeparture> =>
  request('/admin/departures', {
    method: 'POST',
    headers: adminHeaders(),
    body: JSON.stringify(payload),
  });

export const deleteAdminDeparture = (id: string): Promise<{ ok: boolean }> =>
  request(`/admin/departures/${id}`, {
    method: 'DELETE',
    headers: adminHeaders(),
  });
