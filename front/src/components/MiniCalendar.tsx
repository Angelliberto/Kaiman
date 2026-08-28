function formatShortDate(value: string) {
  return new Date(value).toLocaleDateString('es-VE', {
    day: 'numeric',
    month: 'short',
  });
}

interface MiniCalendarProps {
  days: { date: string; available: boolean }[];
}

export function MiniCalendar({ days }: MiniCalendarProps) {
  return (
    <div className="mini-calendar">
      {days.map((day) => (
        <div
          key={day.date}
          className={`mini-day ${day.available ? 'free' : 'busy'}`}
          title={`${formatShortDate(day.date)} — ${day.available ? 'Disponible' : 'Ocupado'}`}
        >
          <span>{new Date(day.date).getDate()}</span>
        </div>
      ))}
    </div>
  );
}
