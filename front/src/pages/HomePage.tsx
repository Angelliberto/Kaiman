import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchDestinations, fetchSiteInfo } from '../api/client';
import { DestinationsCarousel } from '../components/DestinationsCarousel';
import { ImageCarousel } from '../components/ImageCarousel';
import type { Destination, SiteInfo } from '../types';

const FEATURES = [
  {
    title: 'Destinos icónicos',
    text: 'Lo ultimo del gran escandalo, homero simpson cubierto en una bolsa de oxigeno que segun el le da PODERES SEXUALES',
    tone: 'green',
  },
  {
    title: 'Experiencias Unicas',
    text: '-Homero aqui hay una familia de Zariweyas - A la grande le puse Cuca',
    tone: 'orange',
  },
  {
    title: 'Hospedajes',
    text: 'Trabajo muy duro como un esclavo y ya no ay ya se me olvido todo bueno paguenme dinero',
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
    if (!location.hash || location.hash === '#contacto') return;

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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </p>
        </div>

        <DestinationsCarousel destinations={destinations} />
      </section>

    </div>
  );
}
