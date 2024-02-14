import axios from "axios";
import { authHeader, formatAPIPath } from "@/lib/http/utils.ts";

interface Preferences {
  favoriteTeam: number;
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
