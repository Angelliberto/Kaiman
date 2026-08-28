import { addDays, startOfDay } from '../utils/dateHelpers';

export interface DayAvailability {
  date: string;
  available: boolean;
}

export interface BlockedPeriod {
  start: Date;
  end: Date;
}

const CACHE_TTL_MS = 15 * 60 * 1000;
const cache = new Map<
  string,
  { days: DayAvailability[]; syncedAt: string; expires: number }
>();

const toDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const parseIcsDate = (value: string): Date => {
  const cleaned = value.replace(/^;.*:/, '').trim();

  if (cleaned.length === 8) {
    const year = Number(cleaned.slice(0, 4));
    const month = Number(cleaned.slice(4, 6)) - 1;
    const day = Number(cleaned.slice(6, 8));
    return startOfDay(new Date(year, month, day));
  }

  return startOfDay(new Date(cleaned));
};

const extractIcsValue = (block: string, key: string): string | null => {
  const regex = new RegExp(`^${key}(?:;[^:]*)?:(.+)$`, 'im');
  const match = block.match(regex);
  return match?.[1]?.trim() ?? null;
};

export const parseBlockedPeriods = (icsContent: string): BlockedPeriod[] => {
  const periods: BlockedPeriod[] = [];
  const chunks = icsContent.split('BEGIN:VEVENT');

  for (const chunk of chunks.slice(1)) {
    const dtStart = extractIcsValue(chunk, 'DTSTART');
    const dtEnd = extractIcsValue(chunk, 'DTEND');

    if (!dtStart) continue;

    const start = parseIcsDate(dtStart);
    const end = dtEnd ? parseIcsDate(dtEnd) : addDays(start, 1);
    periods.push({ start, end });
  }

  return periods;
};

const isDayBlocked = (day: Date, periods: BlockedPeriod[]): boolean => {
  const time = day.getTime();
  return periods.some(
    (period) => time >= period.start.getTime() && time < period.end.getTime()
  );
};

export const buildDaysFromBlockedDates = (
  blockedDates: string[],
  daysAhead = 60
): DayAvailability[] => {
  const blocked = new Set(blockedDates);
  const today = startOfDay(new Date());
  const days: DayAvailability[] = [];

  for (let index = 0; index < daysAhead; index += 1) {
    const date = addDays(today, index);
    days.push({
      date: date.toISOString(),
      available: !blocked.has(toDateKey(date)),
    });
  }

  return days;
};

export const buildDaysFromPeriods = (
  periods: BlockedPeriod[],
  daysAhead = 60
): DayAvailability[] => {
  const today = startOfDay(new Date());
  const days: DayAvailability[] = [];

  for (let index = 0; index < daysAhead; index += 1) {
    const date = addDays(today, index);
    days.push({
      date: date.toISOString(),
      available: !isDayBlocked(date, periods),
    });
  }

  return days;
};

export const fetchAvailabilityFromIcal = async (
  icalUrl: string,
  daysAhead = 60,
  forceRefresh = false
): Promise<{ days: DayAvailability[]; syncedAt: string }> => {
  const now = Date.now();
  const cached = cache.get(icalUrl);

  if (!forceRefresh && cached && cached.expires > now) {
    return { days: cached.days, syncedAt: cached.syncedAt };
  }

  const response = await fetch(icalUrl, {
    headers: {
      'User-Agent': 'KAIMAN-Availability/0.2',
    },
  });

  if (!response.ok) {
    throw new Error('No se pudo descargar el calendario iCal de Airbnb');
  }

  const icsContent = await response.text();
  const periods = parseBlockedPeriods(icsContent);
  const days = buildDaysFromPeriods(periods, daysAhead);
  const syncedAt = new Date().toISOString();

  cache.set(icalUrl, {
    days,
    syncedAt,
    expires: now + CACHE_TTL_MS,
  });

  return { days, syncedAt };
};
