import { useMemo } from 'react';
import { Link } from 'react-router-dom';
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

  return (
    <div className="destinations-showcase-frame">
      <ImageCarousel
        images={images}
        alt={destination.name}
        intervalMs={intervalMs}
        className="destinations-showcase-carousel"
      />
      <div className="destinations-showcase-overlay" />

      {navMode === 'links' && (
        <DestinationNavBar mode="links" destinations={destinations} />
      )}

      {navMode === 'tabs' && onSelect && (
        <DestinationNavBar
          mode="tabs"
          destinations={destinations}
          activeIndex={activeIndex}
          onSelect={onSelect}
        />
      )}

      <div
        key={destination.id}
        className={`destinations-showcase-info destination-content-fade ${fadeClass}`}
      >
        <span className="destination-region light">{destination.region}</span>
        <TitleTag>{destination.name}</TitleTag>
        <p>{destination.tagline}</p>
      </div>

      {showCta && (
        <Link
          to={`/destino/${destination.id}`}
          className="btn btn-cta destinations-showcase-cta"
        >
          Explorar destino
        </Link>
      )}
    </div>
  );
}
