import { add, differenceInCalendarDays } from "date-fns";

/**
 * Disabled days for the date picker & other utilities that should not be used.
 */
export const disabledDays = [
  {
    from: new Date(0),
    to: new Date(2024, 2, 19),
  },
  {
    from: new Date(2024, 2, 22),
    to: new Date(2024, 2, 27),
  },
  {
    from: new Date(2024, 8, 29),
    to: new Date(2027, 1, 1),
  },
];

/**
 * Check if a date is between valid baseball dates.
 * @param date
 */
export function isValidDate(date: Date) {
  return (
    differenceInCalendarDays(date, new Date(2024, 8, 30)) > 0 &&
    differenceInCalendarDays(date, new Date(2024, 2, 19))
  );
}

export function getNextValidDate(date: Date) {
  for (const { from, to } of disabledDays.slice(0, -1)) {
    if (from <= date && date <= to) {
      return add(to, { days: 1 });
    }
  }
  const { from, to } = disabledDays[disabledDays.length - 1];
  if (from <= date && date <= to) {
    return undefined; // Reached end of season, no more dates to use
  }
  return date; // Is valid date if none matches
}
