import axios from "axios";
import { Game } from "@/lib/http/games.ts";
import { authHeader, formatAPIPath } from "@/lib/http/utils.ts";
import { useQuery } from "@tanstack/react-query";

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

export interface GamePick {
  gameID: number;
  pickedHome: boolean;
  isSeries: boolean;
  comment?: string;
}

/**
 * Transforms form data to a pick object
 * @param data - Form data, formatted as {string: string}
 * @param games - Games to search from for form data
 */
export function transformFormDataToPicks(
  data: { [p: string]: string },
  games: Game[],
) {
  return Object.entries(data).map(([gameID, pick]) => ({
    gameID: parseInt(gameID),
    pickedHome:
      pick ===
      games
        .find((game) => game.id.toString() === gameID)
        ?.homeTeam_id.toString(),
    isSeries: false, // TODO: Implement series
  }));
}

/**
 * Gets the picks for a specific session, dictated by the day. Will return different depending on the user's preferences (not specified here.)
 * @param year - Year
 * @param month - Month
 * @param day - Day
 * @param token - The user's token
 */
export async function getOrCreateSession({
  year,
  month,
  day,
  token,
}: CreateSessionProps): Promise<CreateSessionResponse | null> {
  return await axios
    .post(
      formatAPIPath(`/picks/session/new`),
      { year, month, day },
      authHeader(token),
    )
    .then((res) => {
      return res.data as CreateSessionResponse;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
}

/**
 * Submits the picks for an entire session, i.e. submits for multiple games.
 * @param picks - An array of pick objects that describes the picks for all games.
 * @param token - The user's token
 * @returns - True if picks are submitted successfully, false if not.
 */
export async function submitSessionPicks(picks: GamePick[], token: string) {
  return await axios
    .post(formatAPIPath(`/picks/`), { picks }, authHeader(token))
    .then(() => true)
    .catch(() => false);
}

/**
 * Gets a single pick for a game.
 * @param gameID - The game ID
 * @param token - The user's token
 */
export async function getPick(gameID: number, token: string) {
  return await axios
    .get(formatAPIPath(`/picks/${gameID}`), authHeader(token))
    .then((res) => res.data)
    .catch(() => null);
}

/**
 * Submits a pick for a single game.
 * @param pick - The pick for the game. See the interface for more details.
 * @param token - The user's token
 */
export async function submitPick(pick: GamePick, token: string) {
  return await axios
    .post(
      formatAPIPath(`/picks/${pick.gameID}`),
      { ...pick },
      authHeader(token),
    )
    .then(() => true)
    .catch(() => false);
}

export async function useFetchPick(gameID: number, token: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["teams", { gameID }],
    queryFn: () => getPick(gameID, token),
  });
  return { data, isLoading, isError, teams: data };
}
