import { Link } from 'react-router-dom';
import type { Destination } from '../types';
import { ImageCarousel } from './ImageCarousel';
import { getDestinationImages } from '../utils/destinationHelpers';

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  const images = getDestinationImages(destination);

  return (
    <article className="destination-card-ravelo">
      <Link to={`/destino/${destination.id}`} className="destination-card-media">
        <ImageCarousel
          images={images}
          alt={destination.name}
          intervalMs={4000}
        />
        {destination.listingCount > 0 && (
          <span className="destination-price-tag">{destination.listingCount} hospedajes</span>
        )}
      </Link>

      <div className="destination-card-body">
        <span className="destination-region">{destination.region}</span>
        <h3>
          <Link to={`/destino/${destination.id}`}>{destination.name}</Link>
        </h3>
        <p>{destination.tagline}</p>
        <div className="destination-card-footer">
          <span className="destination-duration">{destination.typicalDuration}</span>
          <Link to={`/destino/${destination.id}`} className="btn btn-sm btn-primary">
            Ver destino
          </Link>
        </div>
      </div>
    </article>
  );
}
