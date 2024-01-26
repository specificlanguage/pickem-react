import axios from "axios";
import { QueryKey } from "@tanstack/react-query";

export interface Game {
  homeTeam_id: number;
  awayTeam_id: number;
  startTimeUTC: string;
  finished: boolean;
  id: number;
  date: string;
  series_num: number;
  venue: string;
  homeName?: string;
  awayName?: string;
}

interface DateQueryProps {
  queryKey: QueryKey;
}

export async function getGamesByDate({
  queryKey,
}: DateQueryProps): Promise<Game[] | null> {
  const [_, { year, month, day }] = queryKey as [
    string,
    { year: number; month: number; day: number },
  ];

  return await axios
    .get(
      import.meta.env.VITE_BACKEND_URL +
        `/games/date?year=${year}&month=${month}&day=${day}`,
    )
    .then((res) => {
      return res.data as Game[];
    });
}
