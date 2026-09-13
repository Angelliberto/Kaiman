import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  fetchDestination,
  fetchDestinations,
  fetchListings,
  fetchTourDepartures,
} from '../api/client';
import { DestinationShowcase } from '../components/DestinationShowcase';
import { ListingCard } from '../components/ListingCard';
import { OfferPackagesCarousel } from '../components/OfferPackagesCarousel';
import { PageMessage } from '../components/PageMessage';
import { TourDeparturesCalendar } from '../components/TourDeparturesCalendar';
import { useContact } from '../context/ContactContext';
import { useI18n } from '../i18n/LanguageContext';
import { localizeDestination, localizeDestinations } from '../i18n/destinationsContent';
import type { Destination, DestinationOffer, HostListing, TourDeparture } from '../types';
import { preloadDestinationCovers } from '../utils/destinationHelpers';

type Filter = 'all' | 'available';

function getDestinationOffers(destination: Destination): DestinationOffer[] {
  if (destination.offers?.length) return destination.offers;
  if (destination.offer) return [destination.offer];
  return [];
}

export function DestinationPage() {
  const { id } = useParams();
  const { openContact } = useContact();
  const { t, lang } = useI18n();
  const isFirstLoad = useRef(true);
  const [destination, setDestination] = useState<Destination | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [listings, setListings] = useState<HostListing[]>([]);
  const [tourDepartures, setTourDepartures] = useState<TourDeparture[]>([]);
  const [tourLeadDays, setTourLeadDays] = useState(7);
  const [filter, setFilter] = useState<Filter>('all');
  const [loading, setLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const localizedDestination = useMemo(
    () => (destination ? localizeDestination(destination, lang) : null),
    [destination, lang]
  );
  const localizedDestinations = useMemo(
    () => localizeDestinations(destinations, lang),
    [destinations, lang]
  );

  useEffect(() => {
    fetchDestinations()
      .then((items) => {
        setDestinations(items);
        preloadDestinationCovers(items);
      })
      .catch(() => {
        /* La barra se oculta si no hay datos */
      });
  }, []);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;
    setError(null);

    if (isFirstLoad.current) {
      setLoading(true);
    } else {
      setContentVisible(false);
    }

    const fadeDelay = isFirstLoad.current ? 0 : 280;

    const timer = window.setTimeout(() => {
      Promise.all([fetchDestination(id), fetchListings(id)])
        .then(async ([dest, items]) => {
          if (cancelled) return;
          setDestination(dest);
          setListings(items);
          setFilter('all');

          if (id === 'salto-angel') {
            try {
              const tours = await fetchTourDepartures(id);
              if (cancelled) return;
              setTourDepartures(tours.departures);
              setTourLeadDays(tours.leadDays);
            } catch {
              if (cancelled) return;
              setTourDepartures([]);
            }
          } else {
            setTourDepartures([]);
          }
        })
        .catch((err: Error) => {
          if (cancelled) return;
          setError(err.message);
        })
        .finally(() => {
          if (cancelled) return;
          setLoading(false);
          isFirstLoad.current = false;
          requestAnimationFrame(() => {
            requestAnimationFrame(() => setContentVisible(true));
          });
        });
    }, fadeDelay);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [id]);

  const filteredListings = useMemo(() => {
    if (filter === 'available') {
      return listings.filter((item) => item.availabilitySummary?.isAvailableToday);
    }
    return listings;
  }, [listings, filter]);

  const availableCount = listings.filter(
    (item) => item.availabilitySummary?.isAvailableToday
  ).length;

  if (loading && isFirstLoad.current) {
    return <div className="state-box">{t('loadingDestination')}</div>;
  }

  if (error || !localizedDestination || !destination) {
    return (
      <PageMessage
        actions={
          <Link to="/" className="btn">
            {t('backToDestinations')}
          </Link>
        }
      >
        <div className="error-box">{error ?? t('destinationNotFound')}</div>
      </PageMessage>
    );
  }

  const fadeClass = contentVisible ? 'is-visible' : '';
  const offers = getDestinationOffers(localizedDestination);

  return (
    <div className="page-stack destination-page">
      <DestinationShowcase
        destination={localizedDestination}
        destinations={localizedDestinations}
        navMode="links"
        headingLevel="h1"
        intervalMs={5000}
        copyVisible={contentVisible}
      />

      <div className={`page-stack page-stack-tight destination-content-fade ${fadeClass}`}>
        <section className="panel">
          <div className="panel-header section-panel-header">
            <div>
              <p className="section-kicker">{t('infoKicker')}</p>
              <h2>{t('aboutDestination', { name: localizedDestination.name })}</h2>
            </div>
          </div>
          <div className="panel-body destination-intro">
            <p className="destination-lead">{localizedDestination.longDescription}</p>
            <div className="destination-facts">
              <div>
                <strong>{t('bestSeason')}</strong>
                <span>{localizedDestination.bestSeason}</span>
              </div>
              <div>
                <strong>{t('typicalDuration')}</strong>
                <span>{localizedDestination.typicalDuration}</span>
              </div>
              <div>
                <strong>{t('howToGetThere')}</strong>
                <span>{localizedDestination.howToGetThere}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2>{t('whatYouLive')}</h2>
          </div>
          <div className="panel-body">
            <ul className="highlight-list">
              {localizedDestination.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {offers.map((offer) => (
          <section key={offer.title} className="panel destination-offer">
            <div className="panel-header section-panel-header destination-offer-header">
              <div>
                <p className="section-kicker">{t('offerKicker')}</p>
                <h2>{offer.title}</h2>
                {offer.subtitle && (
                  <p className="muted destination-offer-subtitle">{offer.subtitle}</p>
                )}
              </div>
              {offer.highlight && (
                <span className="destination-offer-badge">{offer.highlight}</span>
              )}
            </div>

            <div className="panel-body destination-offer-body">
              <OfferPackagesCarousel packages={offer.packages} label={offer.title} />

              {offer.extras && offer.extras.length > 0 && (
                <div className="destination-offer-block">
                  <h3>{offer.extrasTitle ?? t('extrasDefault')}</h3>
                  <ul className="highlight-list">
                    {offer.extras.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {offer.conditions && offer.conditions.length > 0 && (
                <details className="destination-offer-conditions">
                  <summary>{t('conditions')}</summary>
                  <ul className="highlight-list">
                    {offer.conditions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </details>
              )}

              <div className="destination-offer-cta">
                <button
                  type="button"
                  className="btn btn-cta"
                  onClick={() =>
                    openContact({
                      message: t('offerInterestMessage', { name: localizedDestination.name }),
                    })
                  }
                >
                  {t('consultBooking')}
                </button>
                <p className="muted">{t('consultHelp')}</p>
              </div>
            </div>
          </section>
        ))}

        {localizedDestination.id === 'salto-angel' && (
          <section className="panel">
            <div className="panel-header section-panel-header">
              <div>
                <p className="section-kicker">{t('calendarKicker')}</p>
                <h2>{t('confirmedDepartures')}</h2>
              </div>
            </div>
            <div className="panel-body">
              <TourDeparturesCalendar
                departures={tourDepartures}
                destinationName={localizedDestination.name}
                leadDays={tourLeadDays}
              />
            </div>
          </section>
        )}

        {listings.length > 0 && (
          <section className="destination-listings">
            <div className="panel-header destination-listings-header">
              <h2>{t('listingsTitle', { name: localizedDestination.name })}</h2>
              <span className="muted">{t('listingsSync')}</span>
            </div>

            <div className="filter-bar">
              <button
                type="button"
                className={`btn ${filter === 'all' ? 'primary' : ''}`}
                onClick={() => setFilter('all')}
              >
                {t('filterAll', { count: listings.length })}
              </button>
              <button
                type="button"
                className={`btn ${filter === 'available' ? 'primary' : ''}`}
                onClick={() => setFilter('available')}
              >
                {t('filterAvailable', { count: availableCount })}
              </button>
            </div>

            {filteredListings.length === 0 ? (
              <div className="state-box">{t('noListingsToday')}</div>
            ) : (
              <div className="listings-grid">
                {filteredListings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
