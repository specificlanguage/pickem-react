import axios from "axios";
import { QueryKey } from "@tanstack/react-query";
import { formatAPIPath } from "@/lib/http/utils.ts";

export interface Game {
  homeTeam_id: number;
  awayTeam_id: number;
  startTimeUTC: string;
  finished: boolean;
  id: number;
  date: string;
  series_num: number;
  venue: string;
  is_marquee: boolean;
  homeName?: string;
  awayName?: string;
}

interface DateQueryProps {
  queryKey: QueryKey;
}

/**
 * Get games by date from the API.
 * @param queryKey - The query key, formatted as ["games", {year: number, month: number, day: number}]
 */
export async function getGamesByDate({
  queryKey,
}: DateQueryProps): Promise<Game[] | null> {
  const [, { year, month, day }] = queryKey as [
    string,
    { year: number; month: number; day: number },
  ];

  return await axios
    .get(formatAPIPath(`/games/date?year=${year}&month=${month}&day=${day}`))
    .then((res) => {
      return res.data as Game[];
    });
}
