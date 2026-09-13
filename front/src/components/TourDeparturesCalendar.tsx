import { useEffect, useMemo, useRef, useState } from 'react';
import { useContact } from '../context/ContactContext';
import { useI18n } from '../i18n/LanguageContext';
import type { LangCode } from '../i18n/translations';
import type { TourDeparture } from '../types';

type DepartureStatus = 'confirmada' | 'abiertas' | 'ultimos';

interface TourDeparturesCalendarProps {
  departures: TourDeparture[];
  destinationName?: string;
  leadDays?: number;
  interactive?: boolean;
  selectedStart?: string | null;
  selectedEnd?: string | null;
  onDayClick?: (dateKey: string) => void;
  onDepartureClick?: (departure: TourDeparture) => void;
}

const LOCALE_BY_LANG: Record<LangCode, string> = {
  es: 'es-VE',
  en: 'en-US',
  pt: 'pt-BR',
  it: 'it-IT',
  de: 'de-DE',
  fr: 'fr-FR',
};

function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function parseDateKey(value: string): Date {
  const [y, m, d] = value.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function daysUntilStart(startDate: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = parseDateKey(startDate);
  return Math.round((start.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function getStatus(startDate: string): DepartureStatus {
  const days = daysUntilStart(startDate);
  if (days < 14) return 'ultimos';
  if (days < 45) return 'confirmada';
  return 'abiertas';
}

function getWeekdays(locale: string): string[] {
  // 2024-01-01 was a Monday
  return Array.from({ length: 7 }, (_, i) =>
    new Date(2024, 0, 1 + i).toLocaleDateString(locale, { weekday: 'short' })
  );
}

function formatCardRange(startDate: string, endDate: string, locale: string): string {
  const start = parseDateKey(startDate);
  const end = parseDateKey(endDate);
  const startLabel = start.toLocaleDateString(locale, { month: 'short', day: '2-digit' });
  const endLabel = end.toLocaleDateString(locale, {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
  return `${startLabel} - ${endLabel}`.replace(/\./g, '');
}

function formatRange(startDate: string, endDate: string, locale: string): string {
  return formatCardRange(startDate, endDate, locale);
}

function buildMonthCells(year: number, month: number) {
  const first = new Date(year, month, 1);
  const startOffset = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<{ dateKey: string | null; day: number | null }> = [];

  for (let i = 0; i < startOffset; i += 1) {
    cells.push({ dateKey: null, day: null });
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ dateKey: toDateKey(new Date(year, month, day)), day });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ dateKey: null, day: null });
  }
  return cells;
}

export function TourDeparturesCalendar({
  departures,
  destinationName,
  leadDays = 7,
  interactive = false,
  selectedStart = null,
  selectedEnd = null,
  onDayClick,
  onDepartureClick,
}: TourDeparturesCalendarProps) {
  const { openContact } = useContact();
  const { t, lang } = useI18n();
  const locale = LOCALE_BY_LANG[lang];
  const weekdays = useMemo(() => getWeekdays(locale), [locale]);

  const statusLabel: Record<DepartureStatus, string> = {
    confirmada: t('statusConfirmed'),
    abiertas: t('statusOpen'),
    ultimos: t('statusLast'),
  };

  const initial = useMemo(() => {
    const first = departures.find((d) => d.visibleToPublic)?.startDate ?? departures[0]?.startDate;
    const base = first ? parseDateKey(first) : new Date();
    return { year: base.getFullYear(), month: base.getMonth() };
  }, [departures]);

  const [cursor, setCursor] = useState(initial);
  const [scope, setScope] = useState<'month' | 'year'>('month');
  const listRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setCursor(initial);
  }, [initial.year, initial.month]);

  const cells = useMemo(
    () => buildMonthCells(cursor.year, cursor.month),
    [cursor.year, cursor.month]
  );

  const departureByDay = useMemo(() => {
    const map = new Map<string, TourDeparture>();
    for (const dep of departures) {
      const start = parseDateKey(dep.startDate);
      const end = parseDateKey(dep.endDate);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        map.set(toDateKey(d), dep);
      }
    }
    return map;
  }, [departures]);

  const startDates = useMemo(
    () => new Set(departures.map((dep) => dep.startDate)),
    [departures]
  );

  const monthLabel = new Date(cursor.year, cursor.month, 1).toLocaleDateString(locale, {
    month: 'long',
    year: 'numeric',
  });

  const shiftMonth = (delta: number) => {
    setCursor((prev) => {
      const next = new Date(prev.year, prev.month + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });
  };

  const visibleDepartures = useMemo(() => {
    const list = interactive ? departures : departures.filter((d) => d.visibleToPublic);
    return list.filter((dep) => {
      const start = parseDateKey(dep.startDate);
      if (scope === 'year') return start.getFullYear() === cursor.year;
      return start.getFullYear() === cursor.year && start.getMonth() === cursor.month;
    });
  }, [departures, interactive, scope, cursor.year, cursor.month]);

  useEffect(() => {
    if (interactive) return;

    const list = listRef.current;
    const calendar = calendarRef.current;
    if (!list || !calendar) return;

    const syncListHeight = () => {
      const mobile = window.matchMedia('(max-width: 900px)').matches;
      if (!mobile) {
        list.style.maxHeight = '';
        return;
      }

      const cards = Array.from(list.querySelectorAll<HTMLElement>('.tour-departure-card'));
      if (cards.length === 0) {
        list.style.maxHeight = '';
        return;
      }

      const styles = window.getComputedStyle(list);
      const gap = Number.parseFloat(styles.rowGap || styles.gap || '0') || 0;
      const visibleCount = Math.min(2, cards.length);
      let height = 0;
      for (let i = 0; i < visibleCount; i += 1) {
        height += cards[i].offsetHeight;
        if (i < visibleCount - 1) height += gap;
      }

      list.style.maxHeight = `${Math.ceil(height)}px`;
    };

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(syncListHeight);
    });
    const observer = new ResizeObserver(() => syncListHeight());
    observer.observe(list);
    observer.observe(calendar);
    window.addEventListener('resize', syncListHeight);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', syncListHeight);
      list.style.maxHeight = '';
    };
  }, [interactive, visibleDepartures, cursor.year, cursor.month, scope, lang]);

  if (interactive) {
    return (
      <AdminDayPicker
        cells={cells}
        monthLabel={monthLabel}
        departureByDay={departureByDay}
        selectedStart={selectedStart}
        selectedEnd={selectedEnd}
        leadDays={leadDays}
        departures={departures}
        onShiftMonth={shiftMonth}
        onDayClick={onDayClick}
        onDepartureClick={onDepartureClick}
      />
    );
  }

  return (
    <div className="tour-board">
      <div className="tour-board-month-nav">
        <button
          type="button"
          className="tour-nav-btn"
          onClick={() => shiftMonth(-1)}
          aria-label={t('monthPrev')}
        >
          ‹
        </button>
        <h3>{monthLabel}</h3>
        <button
          type="button"
          className="tour-nav-btn"
          onClick={() => shiftMonth(1)}
          aria-label={t('monthNext')}
        >
          ›
        </button>
      </div>

      <div className="tour-board-layout">
        <div className="tour-board-list" ref={listRef}>
          {visibleDepartures.length === 0 ? (
            <p className="muted tour-board-empty">{t('noDeparturesPeriod')}</p>
          ) : (
            visibleDepartures.map((dep) => {
              const status = getStatus(dep.startDate);
              const nights = Math.max(dep.durationDays - 1, 0);
              const nightLabel = nights === 1 ? t('night') : t('nights');
              return (
                <article key={dep.id} className="tour-departure-card">
                  <div className="tour-departure-card-main">
                    <span className={`tour-status-badge is-${status}`}>
                      {statusLabel[status]}
                    </span>
                    <h4>{formatCardRange(dep.startDate, dep.endDate, locale)}</h4>
                    <p>
                      {t('daysNights', {
                        days: dep.durationDays,
                        nights,
                        nightLabel,
                      })}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn tour-reserve-btn"
                    onClick={() =>
                      openContact({
                        message: t('reserveMessage', {
                          destination: destinationName ?? '',
                          dates: formatCardRange(dep.startDate, dep.endDate, locale),
                        }),
                      })
                    }
                  >
                    {t('reserve')}
                  </button>
                </article>
              );
            })
          )}
        </div>

        <aside className="tour-mini-panel" ref={calendarRef}>
          <div className="tour-mini-weekdays">
            {weekdays.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="tour-mini-grid">
            {cells.map((cell, index) => {
              if (!cell.dateKey || cell.day == null) {
                return <div key={`e-${index}`} className="tour-mini-day is-empty" />;
              }
              const dep = departureByDay.get(cell.dateKey);
              const isStart = startDates.has(cell.dateKey);
              const isEnd = dep?.endDate === cell.dateKey;
              return (
                <div
                  key={cell.dateKey}
                  className={[
                    'tour-mini-day',
                    dep ? 'is-range' : '',
                    isStart ? 'is-start' : '',
                    isEnd ? 'is-end' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  title={
                    dep ? formatRange(dep.startDate, dep.endDate, locale) : undefined
                  }
                >
                  <span>{cell.day}</span>
                  {isStart && <i className="tour-mini-dot" aria-hidden="true" />}
                </div>
              );
            })}
          </div>
        </aside>
      </div>

      <div className="tour-board-footer">
        <div className="tour-board-filters">
          <span>{t('seeNextDepartures')}</span>
          <label className="tour-filter-select">
            <select
              value={scope === 'month' ? 'month' : 'year'}
              onChange={(event) => setScope(event.target.value === 'year' ? 'year' : 'month')}
            >
              <option value="month">{t('thisMonth')}</option>
              <option value="year">{t('thisYear')}</option>
            </select>
          </label>
          <label className="tour-filter-select">
            <select
              value={cursor.year}
              onChange={(event) =>
                setCursor((prev) => ({ ...prev, year: Number(event.target.value) }))
              }
            >
              {Array.from(
                new Set([
                  cursor.year,
                  ...departures.map((d) => parseDateKey(d.startDate).getFullYear()),
                ])
              )
                .sort()
                .map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
            </select>
          </label>
        </div>

        <button type="button" className="btn tour-next-month-btn" onClick={() => shiftMonth(1)}>
          {t('nextMonthAvailability')}
        </button>
      </div>
    </div>
  );
}

function AdminDayPicker({
  cells,
  monthLabel,
  departureByDay,
  selectedStart,
  selectedEnd,
  leadDays,
  departures,
  onShiftMonth,
  onDayClick,
  onDepartureClick,
}: {
  cells: Array<{ dateKey: string | null; day: number | null }>;
  monthLabel: string;
  departureByDay: Map<string, TourDeparture>;
  selectedStart: string | null;
  selectedEnd: string | null;
  leadDays: number;
  departures: TourDeparture[];
  onShiftMonth: (delta: number) => void;
  onDayClick?: (dateKey: string) => void;
  onDepartureClick?: (departure: TourDeparture) => void;
}) {
  const adminWeekdays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const adminLocale = 'es-VE';

  return (
    <div className="tour-calendar">
      <div className="tour-calendar-toolbar">
        <button type="button" className="btn" onClick={() => onShiftMonth(-1)} aria-label="Mes anterior">
          ‹
        </button>
        <h3>{monthLabel}</h3>
        <button type="button" className="btn" onClick={() => onShiftMonth(1)} aria-label="Mes siguiente">
          ›
        </button>
      </div>

      <div className="tour-calendar-weekdays">
        {adminWeekdays.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="tour-calendar-grid">
        {cells.map((cell, index) => {
          if (!cell.dateKey || cell.day == null) {
            return <div key={`empty-${index}`} className="tour-calendar-day is-empty" />;
          }

          const dateKey = cell.dateKey;
          const departure = departureByDay.get(dateKey);
          const isStart = departure?.startDate === dateKey;
          const isEnd = departure?.endDate === dateKey;
          const isSelected = dateKey === selectedStart || dateKey === selectedEnd;
          const inSelection =
            Boolean(selectedStart) &&
            Boolean(selectedEnd) &&
            dateKey >= selectedStart! &&
            dateKey <= selectedEnd!;
          const pendingStart = Boolean(selectedStart) && !selectedEnd && dateKey === selectedStart;

          const classes = [
            'tour-calendar-day',
            'is-interactive',
            departure ? 'is-departure' : '',
            isStart ? 'is-start' : '',
            isEnd ? 'is-end' : '',
            isSelected || pendingStart ? 'is-selected' : '',
            inSelection ? 'is-in-range' : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <button
              key={dateKey}
              type="button"
              className={classes}
              title={
                departure
                  ? formatRange(departure.startDate, departure.endDate, adminLocale)
                  : dateKey
              }
              onClick={() => {
                if (departure && onDepartureClick) {
                  onDepartureClick(departure);
                  return;
                }
                onDayClick?.(dateKey);
              }}
            >
              <span>{cell.day}</span>
            </button>
          );
        })}
      </div>

      <div className="tour-calendar-legend">
        <span>
          <i className="tour-legend-swatch is-departure" /> Salida confirmada (reserva abierta)
        </span>
        <span className="muted">
          Se elimina sola cuando faltan ≤ {leadDays} días
        </span>
      </div>

      <ul className="tour-calendar-list">
        {departures.map((dep) => (
          <li key={dep.id}>
            <strong>{formatRange(dep.startDate, dep.endDate, adminLocale)}</strong>
            <span className="muted">{dep.durationDays} días</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
