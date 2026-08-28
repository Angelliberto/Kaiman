import { Link } from 'react-router-dom';
import { MiniCalendar } from './MiniCalendar';
import type { HostListing } from '../types';

interface ListingCardProps {
  listing: HostListing;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('es-VE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

export function ListingCard({ listing }: ListingCardProps) {
  const summary = listing.availabilitySummary;
  const statusLabel = summary?.isAvailableToday
    ? 'Disponible hoy'
    : summary?.nextAvailableDate
      ? `Disponible desde ${formatDate(summary.nextAvailableDate)}`
      : 'Sin fechas libres próximas';

  const statusClass = summary?.isAvailableToday
    ? 'status-available'
    : summary?.nextAvailableDate
      ? 'status-soon'
      : 'status-full';

  return (
    <article className="listing-card-public">
      {listing.imageUrl && (
        <div className="listing-image-wrap">
          <img src={listing.imageUrl} alt={listing.name} className="listing-image" />
          {summary && (
            <span className={`status-pill ${statusClass}`}>{statusLabel}</span>
          )}
        </div>
      )}

      <div className="listing-card-body">
        <h3>{listing.name}</h3>
        <p className="muted">{listing.location}</p>
        <p>{listing.description}</p>
        <div className="listing-meta">
          <span>{listing.bedrooms} hab.</span>
          <span>{listing.bathrooms} baños</span>
          <span>{listing.maxGuests} huéspedes</span>
        </div>

        {summary ? (
          <>
            <MiniCalendar days={summary.previewDays} />
            <p className="muted calendar-legend">
              <span className="legend-dot free" /> Disponible
              <span className="legend-dot busy" /> Ocupado
              · {summary.availableCount} días libres en los próximos 14
              {summary.source === 'airbnb-ical' ? ' · sync Airbnb' : ' · ejemplo'}
            </p>
          </>
        ) : (
          <p className="muted">Sin datos de disponibilidad.</p>
        )}

        <div className="listing-actions">
          <Link to={`/hospedaje/${listing.id}`} className="btn primary">
            Ver calendario completo
          </Link>
          <a
            href={listing.airbnbListingUrl}
            target="_blank"
            rel="noreferrer"
            className="btn"
          >
            Reservar en Airbnb
          </a>
        </div>
      </div>
    </article>
  );
}
