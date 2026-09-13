import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { daysUntil, startOfDay } from '../utils/dateHelpers';

/** Días mínimos de antelación para reservar. Con ≤ este valor se cierra y se elimina. */
export const PUBLIC_LEAD_DAYS = 7;

export type TourDepartureDTO = {
  id: string;
  destinationId: string;
  startDate: string;
  endDate: string;
  label: string;
  durationDays: number;
  visibleToPublic: boolean;
};

type StoredDeparture = {
  id: string;
  destinationId: string;
  startDate: string;
  endDate: string;
  label?: string;
};

const SEED_SALTO_ANGEL_2026: Array<{ startDate: string; endDate: string }> = [
  { startDate: '2026-09-20', endDate: '2026-09-24' },
  { startDate: '2026-10-11', endDate: '2026-10-15' },
  { startDate: '2026-10-18', endDate: '2026-10-22' },
  { startDate: '2026-11-01', endDate: '2026-11-05' },
  { startDate: '2026-11-05', endDate: '2026-11-08' },
  { startDate: '2026-11-12', endDate: '2026-11-15' },
  { startDate: '2026-11-22', endDate: '2026-11-26' },
  { startDate: '2026-12-06', endDate: '2026-12-10' },
  { startDate: '2026-12-10', endDate: '2026-12-13' },
  { startDate: '2026-12-13', endDate: '2026-12-17' },
  { startDate: '2026-12-20', endDate: '2026-12-24' },
  { startDate: '2026-12-27', endDate: '2026-12-31' },
];

const JSON_PATH =
  process.env.TOUR_DEPARTURES_FILE ?? resolve(process.cwd(), 'tour-departures.json');

function parseDateKey(value: string): Date {
  const [y, m, d] = value.split('-').map(Number);
  return startOfDay(new Date(y, m - 1, d));
}

function durationDays(startDate: string, endDate: string): number {
  return daysUntil(parseDateKey(startDate), parseDateKey(endDate)) + 1;
}

/** Reserva abierta solo si faltan MÁS de PUBLIC_LEAD_DAYS. Con 7 o menos → cerrada. */
function isOpenForPublicBooking(startDate: string, today = new Date()): boolean {
  return daysUntil(today, parseDateKey(startDate)) > PUBLIC_LEAD_DAYS;
}

function toDTO(item: StoredDeparture): TourDepartureDTO {
  return {
    id: item.id,
    destinationId: item.destinationId,
    startDate: item.startDate,
    endDate: item.endDate,
    label: item.label ?? '',
    durationDays: durationDays(item.startDate, item.endDate),
    visibleToPublic: isOpenForPublicBooking(item.startDate),
  };
}

function readJsonStore(): StoredDeparture[] {
  if (!existsSync(JSON_PATH)) {
    return [];
  }
  const raw = JSON.parse(readFileSync(JSON_PATH, 'utf-8')) as { departures?: StoredDeparture[] };
  return raw.departures ?? [];
}

function writeJsonStore(departures: StoredDeparture[]): void {
  writeFileSync(JSON_PATH, JSON.stringify({ departures }, null, 2), 'utf-8');
}

function makeId(): string {
  return `tour_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

/** Elimina salidas con ≤ PUBLIC_LEAD_DAYS de antelación (reserva cerrada). */
export function purgeClosedDepartures(today = new Date()): number {
  const store = readJsonStore();
  const next = store.filter((item) => isOpenForPublicBooking(item.startDate, today));
  const removed = store.length - next.length;
  if (removed > 0) {
    writeJsonStore(next);
    console.log(
      `[Tours] Eliminadas ${removed} salida(s) con ≤ ${PUBLIC_LEAD_DAYS} días de antelación`
    );
  }
  return removed;
}

export function seedTourDeparturesIfEmpty(): void {
  const existing = readJsonStore().filter((item) => item.destinationId === 'salto-angel');
  if (existing.length > 0) {
    purgeClosedDepartures();
    return;
  }

  writeJsonStore(
    SEED_SALTO_ANGEL_2026.filter((item) => isOpenForPublicBooking(item.startDate)).map(
      (item) => ({
        id: makeId(),
        destinationId: 'salto-angel',
        startDate: item.startDate,
        endDate: item.endDate,
        label: '',
      })
    )
  );
  console.log('[Tours] Seed Salto Ángel en tour-departures.json (2026)');
}

export function listDepartures(
  destinationId: string,
  options: { publicOnly?: boolean } = {}
): TourDepartureDTO[] {
  purgeClosedDepartures();

  const mapped = readJsonStore()
    .filter((item) => item.destinationId === destinationId)
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .map(toDTO);

  if (options.publicOnly) {
    return mapped.filter((item) => item.visibleToPublic);
  }

  return mapped;
}

export function createDeparture(input: {
  destinationId: string;
  startDate: string;
  endDate: string;
  label?: string;
}): TourDepartureDTO {
  if (input.endDate < input.startDate) {
    throw new Error('La fecha de fin debe ser posterior o igual a la de inicio');
  }

  if (!isOpenForPublicBooking(input.startDate)) {
    throw new Error(
      `La reserva se cierra ${PUBLIC_LEAD_DAYS} días antes de la salida; elige una fecha con más antelación`
    );
  }

  purgeClosedDepartures();

  const store = readJsonStore();
  const duplicate = store.some(
    (item) =>
      item.destinationId === input.destinationId && item.startDate === input.startDate
  );
  if (duplicate) {
    throw new Error('Ya existe esa salida');
  }

  const row: StoredDeparture = {
    id: makeId(),
    destinationId: input.destinationId,
    startDate: input.startDate,
    endDate: input.endDate,
    label: input.label ?? '',
  };
  store.push(row);
  writeJsonStore(store);
  return toDTO(row);
}

export function deleteDeparture(id: string): boolean {
  const store = readJsonStore();
  const next = store.filter((item) => item.id !== id);
  if (next.length === store.length) return false;
  writeJsonStore(next);
  return true;
}
