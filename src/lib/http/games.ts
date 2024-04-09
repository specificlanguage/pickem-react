import axios from "axios";
import { QueryKey, useQuery } from "@tanstack/react-query";
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
  winner?: number;
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
 * A hook to fetch games from the API by a date.
 * @param date - The date to fetch games for.
 */
export function useFetchGamesByDate(date: Date) {
  const {
    isLoading,
    isError,
    data: games,
  } = useQuery({
    queryKey: [
      "games",
      {
        year: date?.getFullYear(),
        month: date ? date.getMonth() + 1 : 0, // Why is month 0-indexed? Javascript moment.
        day: date?.getDate(),
      },
    ],
    queryFn: getGamesByDate,
  });
  return { isLoading, isError, games };
}

/**
 * A hook to fetch game statuses by date.
 * @param date - Date
 * @param enabled - Whether to query or not.
 */
export function useFetchStatusesByDate(date: Date, enabled: boolean) {
  // Status query
  const { data: statuses } = useQuery({
    queryKey: [
      "status",
      {
        year: date?.getFullYear(),
        month: date ? date.getMonth() + 1 : 0, // Why is month 0-indexed? Javascript moment.
        day: date?.getDate(),
      },
    ],
    queryFn: () =>
      getStatusOfGames(
        date?.getFullYear() ?? 0,
        date ? date.getMonth() + 1 : 0,
        date?.getDate() ?? 0,
      ),
    refetchInterval: 1000 * 60,
    enabled: enabled,
  });

  return { statuses };
}

/**
 * Get games by date from the API.
 * @param queryKey - The query key, formatted as ["games", {year: number, month: number, day: number}]
 */
export async function getGamesByDate({
  queryKey,
}: DateQueryProps): Promise<Game[]> {
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

export function joinGamesWithStatuses(games: Game[], statuses: GameStatus[]) {
  games.forEach((game) => {
    game.status = statuses.find((s) => s.gameID === game.id);
  });
}
