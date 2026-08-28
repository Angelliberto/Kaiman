export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const startOfDay = (date: Date): Date => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

export const daysUntil = (from: Date, to: Date): number => {
  const fromDay = startOfDay(from).getTime();
  const toDay = startOfDay(to).getTime();
  return Math.round((toDay - fromDay) / (1000 * 60 * 60 * 24));
};

export const getNextDays = (from: Date, count: number): Date[] => {
  return Array.from({ length: count }, (_, index) => addDays(from, index + 1));
};
