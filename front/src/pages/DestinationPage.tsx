import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchDestination, fetchDestinations, fetchListings } from '../api/client';
import { DestinationShowcase } from '../components/DestinationShowcase';
import { ListingCard } from '../components/ListingCard';
import { PageMessage } from '../components/PageMessage';
import type { Destination, HostListing } from '../types';
import { preloadDestinationImages } from '../utils/destinationHelpers';

type Filter = 'all' | 'available';

export function DestinationPage() {
  const { id } = useParams();
  const isFirstLoad = useRef(true);
  const [destination, setDestination] = useState<Destination | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [listings, setListings] = useState<HostListing[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [loading, setLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDestinations()
      .then((items) => {
        setDestinations(items);
        preloadDestinationImages(items);
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
        .then(([dest, items]) => {
          if (cancelled) return;
          setDestination(dest);
          setListings(items);
          setFilter('all');
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
    return <div className="state-box">Cargando destino...</div>;
  }

  if (error || !destination) {
    return (
      <PageMessage
        actions={
          <Link to="/" className="btn">
            Volver a destinos
          </Link>
        }
      >
        <div className="error-box">{error ?? 'Destino no encontrado'}</div>
      </PageMessage>
    );
  }

  const fadeClass = contentVisible ? 'is-visible' : '';

  return (
    <div className="page-stack destination-page">
      <DestinationShowcase
        destination={destination}
        destinations={destinations}
        navMode="links"
        headingLevel="h1"
        intervalMs={5000}
        copyVisible={contentVisible}
      />

      <div className={`page-stack page-stack-tight destination-content-fade ${fadeClass}`}>
        <section className="panel">
          <div className="panel-header section-panel-header">
            <div>
              <p className="section-kicker">Información</p>
              <h2>Sobre {destination.name}</h2>
            </div>
          </div>
          <div className="panel-body destination-intro">
            <p className="destination-lead">{destination.longDescription}</p>
            <div className="destination-facts">
              <div>
                <strong>Mejor época</strong>
                <span>{destination.bestSeason}</span>
              </div>
              <div>
                <strong>Duración típica</strong>
                <span>{destination.typicalDuration}</span>
              </div>
              <div>
                <strong>Cómo llegar</strong>
                <span>{destination.howToGetThere}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2>Qué vas a vivir</h2>
          </div>
          <div className="panel-body">
            <ul className="highlight-list">
              {destination.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {listings.length > 0 && (
          <section className="destination-listings">
            <div className="panel-header destination-listings-header">
              <h2>Hospedajes en {destination.name}</h2>
              <span className="muted">Calendario sincronizado con Airbnb</span>
            </div>

            <div className="filter-bar">
              <button
                type="button"
                className={`btn ${filter === 'all' ? 'primary' : ''}`}
                onClick={() => setFilter('all')}
              >
                Todos ({listings.length})
              </button>
              <button
                type="button"
                className={`btn ${filter === 'available' ? 'primary' : ''}`}
                onClick={() => setFilter('available')}
              >
                Disponibles hoy ({availableCount})
              </button>
            </div>

            {filteredListings.length === 0 ? (
              <div className="state-box">Ningún hospedaje disponible hoy. Prueba ver todos.</div>
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
