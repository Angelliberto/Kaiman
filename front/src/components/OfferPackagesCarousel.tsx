import { useEffect, useRef, useState } from 'react';
import type { DestinationPackage } from '../types';

interface OfferPackagesCarouselProps {
  packages: DestinationPackage[];
  label?: string;
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15.4 7.4 10.8 12l4.6 4.6L14 18l-6-6 6-6z" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.6 7.4 13.2 12l-4.6 4.6L10 18l6-6-6-6z" />
    </svg>
  );
}

function getPerView() {
  if (typeof window === 'undefined') return 3;
  if (window.matchMedia('(min-width: 1024px)').matches) return 3;
  if (window.matchMedia('(min-width: 768px)').matches) return 2;
  return 1;
}

export function OfferPackagesCarousel({
  packages,
  label = 'Paquetes',
}: OfferPackagesCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [perView, setPerView] = useState(() => getPerView());

  useEffect(() => {
    const update = () => setPerView(getPerView());
    update();

    const mobile = window.matchMedia('(max-width: 767px)');
    const tablet = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');
    const desktop = window.matchMedia('(min-width: 1024px)');

    mobile.addEventListener('change', update);
    tablet.addEventListener('change', update);
    desktop.addEventListener('change', update);
    return () => {
      mobile.removeEventListener('change', update);
      tablet.removeEventListener('change', update);
      desktop.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    setActiveIndex(0);
    trackRef.current?.scrollTo({ left: 0 });
  }, [packages, perView]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const syncIndex = () => {
      const children = Array.from(track.children) as HTMLElement[];
      if (children.length === 0) return;

      let closest = 0;
      let minDist = Number.POSITIVE_INFINITY;
      children.forEach((child, index) => {
        const dist = Math.abs(child.offsetLeft - track.scrollLeft);
        if (dist < minDist) {
          minDist = dist;
          closest = index;
        }
      });
      setActiveIndex(closest);
    };

    track.addEventListener('scroll', syncIndex, { passive: true });
    return () => track.removeEventListener('scroll', syncIndex);
  }, [packages.length]);

  const maxIndex = Math.max(0, packages.length - perView);
  const pageCount = Math.max(1, Math.ceil(packages.length / perView));
  const activePage = Math.min(pageCount - 1, Math.floor(activeIndex / perView));

  const goToIndex = (index: number) => {
    const next = Math.max(0, Math.min(maxIndex, index));
    const track = trackRef.current;
    const slide = track?.children[next] as HTMLElement | undefined;
    if (!track || !slide) return;
    track.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
    setActiveIndex(next);
  };

  const goToPage = (page: number) => {
    goToIndex(page * perView);
  };

  if (packages.length === 0) return null;

  const showNav = packages.length > perView;

  return (
    <div className="offer-packages-carousel">
      {showNav && (
        <div className="offer-packages-carousel-toolbar">
          <div className="offer-packages-nav">
            <button
              type="button"
              className="offer-packages-nav-btn"
              aria-label={`${label}: anterior`}
              disabled={activeIndex <= 0}
              onClick={() => goToIndex(activeIndex - perView)}
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              className="offer-packages-nav-btn"
              aria-label={`${label}: siguiente`}
              disabled={activeIndex >= maxIndex}
              onClick={() => goToIndex(activeIndex + perView)}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      )}

      <div ref={trackRef} className="offer-packages-track">
        {packages.map((pkg) => (
          <article key={pkg.name} className="destination-package offer-package-slide">
            <div className="destination-package-top">
              <div>
                <h3>{pkg.name}</h3>
                {pkg.badge && <span className="destination-package-tag">{pkg.badge}</span>}
              </div>
              <p className="destination-package-price">
                <strong>{pkg.price}</strong>
                {pkg.unit && <span>{pkg.unit}</span>}
              </p>
            </div>
            <ul className="highlight-list">
              {pkg.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {pkg.childRate && (
              <p className="muted destination-package-child">{pkg.childRate}</p>
            )}
          </article>
        ))}
      </div>

      {showNav && (
        <div className="offer-packages-dots" role="tablist" aria-label={label}>
          {Array.from({ length: pageCount }, (_, page) => (
            <button
              key={`dot-${page}`}
              type="button"
              role="tab"
              aria-selected={page === activePage}
              aria-label={`Vista ${page + 1}`}
              className={page === activePage ? 'is-active' : undefined}
              onClick={() => goToPage(page)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
