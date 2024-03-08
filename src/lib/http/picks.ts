import axios from "axios";
import { Game } from "@/lib/http/games.ts";
import { authHeader, formatAPIPath } from "@/lib/http/utils.ts";

export interface SessionRequest {
  year: number;
  month: number;
  day: number;
  token: string;
}

export interface SessionResponse {
  id: number;
  is_series: boolean;
  date: string;
  user_id: string;
  games: Game[];
  picks: {
    game_id: number;
    pickedHome: boolean;
    isSeries: boolean;
    comment?: string | null;
  }[];
}

export interface SessionPick {
  game_id: number; // Yes, I know this is a bad waste of energy, but this will be a TODO to fix this field.
  pickedHome: boolean;
  isSeries: boolean;
  comment?: string | null;
}

export interface GamePick {
  gameID: number;
  pickedHome: boolean;
  isSeries: boolean;
  comment?: string | null;
}

export interface AllPickResponse {
  gameID: number;
  totalPicks: number;
  homePicks: number;
  awayPicks: number;
}

export interface MultiplePickResponse {
  results: AllPickResponse[];
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

export function convertSessPickToGamePick(picks: SessionPick[]): GamePick[] {
  return picks.map((pick) => ({
    gameID: pick.game_id,
    pickedHome: pick.pickedHome,
    isSeries: pick.isSeries,
    comment: pick.comment,
  }));
}

export async function getSession({
  year,
  month,
  day,
  token,
}: SessionRequest): Promise<SessionResponse | null> {
  return await axios
    .get(
      formatAPIPath(`/picks/session?year=${year}&month=${month}&day=${day}`),
      authHeader(token),
    )
    .then((res) => res.data as SessionResponse)
    .catch(() => null);
}

/**
 * Gets the picks for a specific session, dictated by the day. Will return different depending on the user's preferences (not specified here.)
 * @param year - Year
 * @param month - Month
 * @param day - Day
 * @param token - The user's token
 */
export async function createSession({
  year,
  month,
  day,
  token,
}: SessionRequest): Promise<SessionResponse | null> {
  return await axios
    .post(
      formatAPIPath(`/picks/session/new`),
      { year, month, day },
      authHeader(token),
    )
    .then((res) => {
      return res.data as SessionResponse;
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
    .then((res) => res.data as GamePick)
    .catch(() => null);
}

export async function getMultiplePicks(gameIDs: number[], token: string) {
  console.log(gameIDs.join("&gameID="));
  return await axios
    .get(
      formatAPIPath(`/picks/user?gameID=${gameIDs.join("&gameID=")}`),
      authHeader(token),
    )
    .then((res) => res.data as GamePick[])
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

export async function getAllPicksForGames(gameIDs: number[]) {
  return await axios
    .get(
      formatAPIPath(
        `/picks/all?gameID=${gameIDs.join("&gameID=")}&isSeries=false`,
      ),
    ) // TODO: Implement series
    .then((res) => res.data)
    .catch(() => null);
}

export async function getAllPicks(gameID: number) {
  return await axios
    .get(formatAPIPath(`/picks/all?gameID=${gameID}&isSeries=false`))
    .then((res) => res.data.results[0] as AllPickResponse)
    .catch(() => null);
}
