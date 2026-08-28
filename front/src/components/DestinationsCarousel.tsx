import { useEffect, useState } from 'react';
import { DestinationShowcase } from './DestinationShowcase';
import type { Destination } from '../types';
import { preloadDestinationImages } from '../utils/destinationHelpers';

interface DestinationsCarouselProps {
  destinations: Destination[];
}

export function DestinationsCarousel({ destinations }: DestinationsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeDestination = destinations[activeIndex];

  useEffect(() => {
    preloadDestinationImages(destinations);
  }, [destinations]);

  if (!activeDestination) {
    return null;
  }

  return (
    <section className="destinations-showcase">
      <DestinationShowcase
        destination={activeDestination}
        destinations={destinations}
        navMode="tabs"
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
        showCta
        headingLevel="h3"
        intervalMs={4500}
      />
    </section>
  );
}
