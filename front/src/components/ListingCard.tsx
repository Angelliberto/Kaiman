import { Link } from 'react-router-dom';
import { MiniCalendar } from './MiniCalendar';
import { useI18n } from '../i18n/LanguageContext';
import type { LangCode } from '../i18n/translations';
import type { HostListing } from '../types';

interface ListingCardProps {
  listing: HostListing;
}

const LOCALE_BY_LANG: Record<LangCode, string> = {
  es: 'es-VE',
  en: 'en-US',
  pt: 'pt-BR',
  it: 'it-IT',
  de: 'de-DE',
  fr: 'fr-FR',
};

function formatDate(value: string, locale: string) {
  return new Date(value).toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

export function ListingCard({ listing }: ListingCardProps) {
  const { t, lang } = useI18n();
  const locale = LOCALE_BY_LANG[lang];
  const summary = listing.availabilitySummary;
  const statusLabel = summary?.isAvailableToday
    ? t('availableToday')
    : summary?.nextAvailableDate
      ? t('availableFrom', { date: formatDate(summary.nextAvailableDate, locale) })
      : t('noDatesSoon');

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
          <span>
            {listing.bedrooms} {t('bedroomsShort')}
          </span>
          <span>
            {listing.bathrooms} {t('bathroomsLabel')}
          </span>
          <span>
            {listing.maxGuests} {t('guestsLabel')}
          </span>
        </div>

        {summary ? (
          <>
            <MiniCalendar days={summary.previewDays} />
            <p className="muted calendar-legend">
              <span className="legend-dot free" /> {t('availableLabel')}
              <span className="legend-dot busy" /> {t('occupiedLabel')} ·{' '}
              {t('freeDaysNext14', { count: summary.availableCount })}
              {summary.source === 'airbnb-ical' ? ` · ${t('syncAirbnb')}` : ` · ${t('exampleSource')}`}
            </p>
          </>
        ) : (
          <p className="muted">{t('noAvailabilityData')}</p>
        )}

        <div className="listing-actions">
          <Link to={`/hospedaje/${listing.id}`} className="btn primary">
            {t('viewFullCalendar')}
          </Link>
          <a
            href={listing.airbnbListingUrl}
            target="_blank"
            rel="noreferrer"
            className="btn"
          >
            {t('bookOnAirbnb')}
          </a>
        </div>
      </div>
    </article>
  );
}
