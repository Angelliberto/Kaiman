import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchListing, fetchListingAvailability } from '../api/client';
import { AvailabilityCalendar } from '../components/AvailabilityCalendar';
import { PageMessage } from '../components/PageMessage';
import type { HostListing, ListingAvailability } from '../types';

export function ListingPage() {
  const { id } = useParams();
  const [listing, setListing] = useState<HostListing | null>(null);
  const [availability, setAvailability] = useState<ListingAvailability | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async (refresh = false) => {
    if (!id) return;

    if (refresh) setRefreshing(true);
    else setLoading(true);

    setError(null);

    try {
      const [listingData, availabilityData] = await Promise.all([
        fetchListing(id),
        fetchListingAvailability(id, refresh),
      ]);
      setListing(listingData);
      setAvailability(availabilityData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  if (loading) {
    return <div className="state-box">Cargando hospedaje...</div>;
  }

  if (error || !listing || !availability) {
    return (
      <PageMessage
        actions={
          <Link to="/" className="btn">
            Volver a destinos
          </Link>
        }
      >
        <div className="error-box">{error ?? 'No encontrado'}</div>
      </PageMessage>
    );
  }

  return (
    <div className="page-stack listing-detail">
      <Link
        to={listing.destinationId ? `/destino/${listing.destinationId}` : '/'}
        className="muted back-link"
      >
        ← Volver al destino
      </Link>

      <section className="panel">
        <div className="listing-detail-header">
          {listing.imageUrl && (
            <img src={listing.imageUrl} alt={listing.name} className="listing-detail-image" />
          )}
          <div>
            <h1>{listing.name}</h1>
            <p className="muted">{listing.location}</p>
            <p>{listing.description}</p>
            <div className="listing-meta">
              <span>{listing.bedrooms} habitaciones</span>
              <span>{listing.bathrooms} baños</span>
              <span>{listing.maxGuests} huéspedes</span>
            </div>
            <div className="listing-actions">
              <a
                href={listing.airbnbListingUrl}
                target="_blank"
                rel="noreferrer"
                className="btn primary"
              >
                Reservar en Airbnb
              </a>
              {availability.source === 'airbnb-ical' && (
                <button
                  type="button"
                  className="btn"
                  onClick={() => load(true)}
                  disabled={refreshing}
                >
                  {refreshing ? 'Actualizando...' : 'Actualizar calendario'}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>Disponibilidad</h2>
          <span className="muted">
            {availability.source === 'airbnb-ical'
              ? 'Sincronizado desde el calendario de Airbnb (iCal)'
              : 'Datos de ejemplo — agrega airbnbIcalUrl para sincronizar'}
          </span>
        </div>
        <div className="panel-body">
          <AvailabilityCalendar availability={availability} />
        </div>
      </section>
    </div>
  );
}
