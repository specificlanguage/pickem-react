import axios from "axios";
import { authHeader, formatAPIPath } from "@/lib/http/utils.ts";
import { useQuery } from "@tanstack/react-query";

interface Preferences {
  favoriteTeam: number;
  selectionTiming: string;
}

export interface PreferencesResult {
  favoriteTeam_id: number;
  id: string;
  selectionTiming: string;
}

/** Set user preferences from a user's uid. */
export async function setPreferences(token: string, preferences: Preferences) {
  return axios.put(
    formatAPIPath(`/users/preferences`),
    preferences,
    authHeader(token),
  );
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
  });
  return { data, isLoading, isError, prefs: data };
}
