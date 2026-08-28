import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchDestinations, fetchSiteInfo } from '../api/client';
import { DestinationsCarousel } from '../components/DestinationsCarousel';
import { ImageCarousel } from '../components/ImageCarousel';
import type { Destination, SiteInfo } from '../types';

const FEATURES = [
  {
    title: 'Destinos icónicos',
    text: 'Roraima, Salto Ángel, Canaima, Los Roques y Margarita en un solo lugar.',
    tone: 'green',
  },
  {
    title: 'Experiencias reales',
    text: 'Información práctica: mejor época, duración y cómo llegar a cada destino.',
    tone: 'orange',
  },
  {
    title: 'Hospedajes en vivo',
    text: 'En la isla de Margarita consulta disponibilidad sincronizada antes de reservar en Airbnb.',
    tone: 'rose',
  },
];

export function HomePage() {
  const location = useLocation();
  const [site, setSite] = useState<SiteInfo | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([fetchSiteInfo(), fetchDestinations()])
      .then(([siteInfo, items]) => {
        setSite(siteInfo);
        setDestinations(items);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace('#', '');
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [location.hash]);

  const heroImages = useMemo(
    () =>
      destinations.flatMap((destination) =>
        destination.images?.length ? destination.images : [destination.imageUrl]
      ),
    [destinations]
  );

  if (loading) {
    return <div className="state-box">Cargando destinos...</div>;
  }

  if (error) {
    return <div className="error-box">{error}</div>;
  }

  return (
    <div className="page-stack home-page">
      <section className="hero-ravelo">
        <ImageCarousel
          images={heroImages}
          alt="Destinos en Venezuela"
          intervalMs={5000}
          className="hero-ravelo-carousel"
        />
        <div className="hero-ravelo-overlay" />
        <div className="hero-ravelo-content">
          <p className="hero-kicker">Turismo en Venezuela</p>
          <h1>
            Explora y empieza tu viaje con <span>{site?.hostName ?? 'KAIMAN'}</span>
          </h1>
          <p className="hero-text">
            Tepuyes, la cascada más alta del mundo, lagunas de Canaima, cayos
            vírgenes y playas caribeñas. Elige tu destino y planifica la aventura.
          </p>
        </div>
      </section>

      <section className="feature-strip">
        {FEATURES.map((feature) => (
          <article key={feature.title} className={`feature-card tone-${feature.tone}`}>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </article>
        ))}
      </section>

      <section id="destinos" className="destinations-section">
        <div className="section-heading">
          <p className="section-kicker">Destinos populares</p>
          <h2>Explora los mejores lugares de Venezuela</h2>
          <p className="section-subtitle">
            Cada módulo tiene galería rotativa, guía de viaje y contenido pensado para turistas.
          </p>
        </div>

        <DestinationsCarousel destinations={destinations} />
      </section>

      <section className="promo-banner">
        <div>
          <p className="section-kicker light">Isla de Margarita</p>
          <h2>Hospedajes con calendario en tiempo real</h2>
          <p>
            Consulta qué alojamientos están libres hoy y reserva directamente en Airbnb.
          </p>
        </div>
        <Link to="/destino/isla-de-margarita" className="btn btn-cta">
          Ver disponibilidad
        </Link>
      </section>
    </div>
  );
}
