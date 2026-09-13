import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchDestinations, fetchSiteInfo } from '../api/client';
import { DestinationsCarousel } from '../components/DestinationsCarousel';
import { ImageCarousel } from '../components/ImageCarousel';
import { localizeDestinations } from '../i18n/destinationsContent';
import { useI18n } from '../i18n/LanguageContext';
import type { Destination, SiteInfo } from '../types';

export function HomePage() {
  const { t, lang } = useI18n();
  const location = useLocation();
  const [site, setSite] = useState<SiteInfo | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const localizedDestinations = useMemo(
    () => localizeDestinations(destinations, lang),
    [destinations, lang]
  );

  const features = useMemo(
    () => [
      { title: t('feature1Title'), text: t('feature1Text'), tone: 'green' },
      { title: t('feature2Title'), text: t('feature2Text'), tone: 'orange' },
      { title: t('feature3Title'), text: t('feature3Text'), tone: 'rose' },
    ],
    [t]
  );

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
    return <div className="state-box">{t('loadingDestinations')}</div>;
  }

  if (error) {
    return <div className="error-box">{error}</div>;
  }

  return (
    <div className="page-stack home-page">
      <section className="hero-ravelo">
        <ImageCarousel
          images={heroImages}
          alt={t('destinationsTitle')}
          intervalMs={5000}
          className="hero-ravelo-carousel"
        />
        <div className="hero-ravelo-overlay" />
        <div className="hero-ravelo-content">
          <p className="hero-kicker">{t('heroKicker')}</p>
          <h1>
            {t('heroTitleBefore')} <span>{site?.hostName ?? 'KAIMAN'}</span>
          </h1>
          <p className="hero-text">{t('heroText')}</p>
          <div className="hero-actions">
            <a href="#destinos" className="btn btn-cta">
              {t('heroCtaDestinations')}
            </a>
            <a href="#contacto" className="btn btn-outline-light">
              {t('heroCtaContact')}
            </a>
          </div>
        </div>
      </section>

      <section className="feature-strip">
        {features.map((feature) => (
          <article key={feature.title} className={`feature-card tone-${feature.tone}`}>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </article>
        ))}
      </section>

      <section id="destinos" className="destinations-section">
        <div className="section-heading">
          <p className="section-kicker">{t('destinationsKicker')}</p>
          <h2>{t('destinationsTitle')}</h2>
          <p className="section-subtitle">{t('destinationsSubtitle')}</p>
        </div>

        <DestinationsCarousel destinations={localizedDestinations} />
      </section>
    </div>
  );
}
