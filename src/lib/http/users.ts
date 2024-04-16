import axios from "axios";
import { authHeader, formatAPIPath } from "@/lib/http/utils.ts";
import { useQuery } from "@tanstack/react-query";

interface Preferences {
  favoriteTeam?: number;
  selectionTiming?: string;
  description?: string;
}

export interface PreferencesResult {
  favoriteTeam_id: number;
  id: string;
  selectionTiming: string;
  description: string;
}

export interface UserInfoObject {
  id: string;
  username: string;
  image_url: string;
}

export interface AllUsersResponse {
  users: {
    [uid: string]: UserInfoObject;
  };
}

export interface AllUserInfo {
  id: string;
  username: string;
  image_url: string;
  description: string;
  favoriteTeam_id: number;
}

/** Set user preferences from a user's uid. */
export async function setPreferences(token: string, preferences: Preferences) {
  return axios.put(
    formatAPIPath(`/users/preferences`),
    preferences,
    authHeader(token),
  );
}

/** Get all users from the API. */
export async function getAllUsers() {
  return axios
    .get(formatAPIPath("/users/all"))
    .then((r) => r.data as AllUsersResponse)
    .catch(() => null);
}

/**
 * React-Query-like hook to retrieve a user's preferences.
 * @param token - The token function of the user (i.e. getToken).
 * @param uid - UID (or null)
 */
export function usePrefs(token: Promise<string | null>, uid: string | null) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["prefs"],
    queryFn: async () => {
      if (uid === null) {
        return null;
      } else {
        return await axios
          .get(
            formatAPIPath(`/users/preferences?uid=${uid}`),
            authHeader((await token) ?? ""),
          )
          .then((r) => r.data as PreferencesResult)
          .catch((e) => {
            console.error(e);
            return null;
          });
      }
    },
    staleTime: Infinity,
  });
  return { data, isLoading, isError, prefs: data };
}

export function getUser(uidOrUsername: string) {
  return axios
    .get(formatAPIPath("/users/" + uidOrUsername))
    .then((r) => r.data as AllUserInfo);
}
