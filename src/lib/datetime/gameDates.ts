import { add, compareAsc, differenceInCalendarDays } from "date-fns";
import { Game } from "@/lib/http/games.ts";
import { utcToZonedTime } from "date-fns-tz";

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

export function isAfterStartTime(game: Game) {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const zonedDate = utcToZonedTime(new Date(game.startTimeUTC + "Z"), timeZone);
  const now = utcToZonedTime(new Date(Date.now()), timeZone);
  return compareAsc(zonedDate, now) < 0;
}
