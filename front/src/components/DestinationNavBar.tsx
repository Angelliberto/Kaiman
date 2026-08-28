import { NavLink } from 'react-router-dom';
import type { Destination } from '../types';

type DestinationNavBarProps =
  | {
      mode: 'links';
      destinations: Destination[];
      activeIndex?: never;
      onSelect?: never;
    }
  | {
      mode: 'tabs';
      destinations: Destination[];
      activeIndex: number;
      onSelect: (index: number) => void;
    };

export function DestinationNavBar(props: DestinationNavBarProps) {
  const { destinations, mode } = props;

  if (destinations.length === 0) {
    return null;
  }

  if (mode === 'links') {
    return (
      <nav className="destinations-showcase-nav" aria-label="Destinos">
        {destinations.map((destination) => (
          <NavLink
            key={destination.id}
            to={`/destino/${destination.id}`}
            className={({ isActive }) => (isActive ? 'is-active' : undefined)}
          >
            {destination.name}
          </NavLink>
        ))}
      </nav>
    );
  }

  const { activeIndex, onSelect } = props;

  return (
    <nav className="destinations-showcase-nav" role="tablist" aria-label="Destinos">
      {destinations.map((destination, index) => (
        <button
          key={destination.id}
          type="button"
          role="tab"
          aria-selected={index === activeIndex}
          className={index === activeIndex ? 'is-active' : ''}
          onClick={() => onSelect(index)}
        >
          {destination.name}
        </button>
      ))}
    </nav>
  );
}
