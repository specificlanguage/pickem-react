import axios from "axios";
import { authHeader, formatAPIPath } from "@/lib/http/utils.ts";

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

export async function getPreferences(token: string, uid: string) {
  return (
    await axios.get(
      formatAPIPath(`/users/preferences?uid=${uid}`),
      authHeader(token),
    )
  ).data as PreferencesResult;
}
