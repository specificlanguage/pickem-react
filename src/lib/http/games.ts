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
  status?: GameStatus;
  home_score?: number;
  away_score?: number;
}

interface DateQueryProps {
  queryKey: QueryKey;
}

export interface GameStatus {
  status: "COMPLETED" | "IN_PROGRESS" | "SCHEDULED" | "POSTPONED";
  gameID: number;
  homeScore?: number;
  awayScore?: number;
  startTimeUTC?: string;
  currentInning?: number;
  currentPitcher?: string;
  atBat?: string;
  isTopInning?: number;
  outs?: number;
  onFirst?: boolean;
  onSecond?: boolean;
  onThird?: boolean;
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

export async function getStatusOfGames(
  year: number,
  month: number,
  day: number,
) {
  return await axios
    .get(
      formatAPIPath(
        `/games/status/date?year=${year}&month=${month}&day=${day}`,
      ),
    )
    .then((res) => {
      return res.data as GameStatus[];
    });
}
