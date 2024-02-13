import axios from "axios";
import { Game } from "@/lib/http/games.ts";

export interface CreateSessionProps {
  year: number;
  month: number;
  day: number;
  token: string;
}

export interface CreateSessionResponse {
  id: number;
  is_series: boolean;
  date: string;
  user_id: string;
  games: Game[];
}

export async function getOrCreateSession({
  year,
  month,
  day,
  token,
}: CreateSessionProps): Promise<CreateSessionResponse | null> {
  return await axios
    .post(
      `/api/picks/session/new`,
      { year, month, day },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    .then((res) => {
      return res.data as CreateSessionResponse;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
}

export async function submitSessionPicks(
  picks: {
    gameID: number;
    pickedHome: boolean;
    isSeries: boolean;
    comment?: string;
  }[],
  token: string,
) {
  console.log(picks);
  return await axios
    .post(
      `/api/picks/`,
      { picks },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    .then(() => true)
    .catch(() => false);
}
