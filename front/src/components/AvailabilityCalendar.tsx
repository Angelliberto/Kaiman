import type { ListingAvailability } from '../types';

interface AvailabilityCalendarProps {
  availability: ListingAvailability;
}

function formatDay(value: string) {
  return new Date(value).toLocaleDateString('es-VE', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

export function AvailabilityCalendar({ availability }: AvailabilityCalendarProps) {
  return (
    <div>
      <div className="availability-summary">
        <span className="badge available-badge">
          {availability.availableCount} disponibles
        </span>
        <span className="badge blocked-badge">{availability.blockedCount} ocupados</span>
        {availability.source === 'airbnb-ical' && availability.syncedAt && (
          <span className="muted" style={{ fontSize: '0.82rem' }}>
            Sync Airbnb: {new Date(availability.syncedAt).toLocaleString('es-VE')}
          </span>
        )}
        {availability.source === 'manual-example' && (
          <span className="muted" style={{ fontSize: '0.82rem' }}>
            Datos de ejemplo
          </span>
        )}
      </div>

      <div className="availability-grid">
        {availability.days.map((day) => (
          <div
            key={day.date}
            className={`availability-day ${day.available ? 'is-available' : 'is-blocked'}`}
          >
            <span>{formatDay(day.date)}</span>
            <strong>{day.available ? 'Libre' : 'Ocupado'}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
