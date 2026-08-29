import { useCallback, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiMaximize2 } from 'react-icons/fi';
import { DestinationNavBar } from './DestinationNavBar';
import { ImageCarousel } from './ImageCarousel';
import type { Destination } from '../types';
import { getDestinationImages } from '../utils/destinationHelpers';

interface DestinationShowcaseProps {
  destination: Destination;
  destinations?: Destination[];
  navMode?: 'tabs' | 'links' | 'none';
  activeIndex?: number;
  onSelect?: (index: number) => void;
  showCta?: boolean;
  headingLevel?: 'h1' | 'h3';
  intervalMs?: number;
  copyVisible?: boolean;
}

export function DestinationShowcase({
  destination,
  destinations = [],
  navMode = 'none',
  activeIndex = 0,
  onSelect,
  showCta = false,
  headingLevel = 'h3',
  intervalMs = 4500,
  copyVisible = true,
}: DestinationShowcaseProps) {
  const images = useMemo(() => getDestinationImages(destination), [destination]);
  const TitleTag = headingLevel;
  const fadeClass = copyVisible ? 'is-visible' : '';
  const openGalleryRef = useRef<(() => void) | null>(null);

  const handleGalleryReady = useCallback((openGallery: (() => void) | null) => {
    openGalleryRef.current = openGallery;
  }, []);

  const navElement =
    navMode === 'links' ? (
      <DestinationNavBar mode="links" destinations={destinations} />
    ) : navMode === 'tabs' && onSelect ? (
      <DestinationNavBar
        mode="tabs"
        destinations={destinations}
        activeIndex={activeIndex}
        onSelect={onSelect}
      />
    ) : null;

  return (
    <div className="destinations-showcase-frame">
      <ImageCarousel
        images={images}
        alt={destination.name}
        intervalMs={intervalMs}
        className="destinations-showcase-carousel"
        showGalleryTrigger={false}
        onGalleryReady={handleGalleryReady}
      />
      <div className="destinations-showcase-overlay" />

      {navElement}

      <div className="destinations-showcase-actions">
        <button
          type="button"
          className="carousel-gallery-trigger destinations-showcase-gallery-trigger"
          aria-label="Ver galería en pantalla completa"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            openGalleryRef.current?.();
          }}
        >
          <FiMaximize2 aria-hidden="true" />
        </button>

        {showCta && (
          <Link
            to={`/destino/${destination.id}`}
            className="btn btn-cta destinations-showcase-cta"
          >
            Explorar destino
          </Link>
        )}
      </div>

      <div
        key={destination.id}
        className={`destinations-showcase-info destination-content-fade ${fadeClass}`}
      >
        <span className="destination-region light">{destination.region}</span>
        <TitleTag>{destination.name}</TitleTag>
        <p>{destination.tagline}</p>
      </div>
    </div>
  );
}
