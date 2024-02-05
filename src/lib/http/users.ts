import axios from "axios";

interface Preferences {
  favoriteTeam: number;
  selectionTiming: string;
}

/** Set user preferences from a user's uid. */
export async function setPreferences(token: string, preferences: Preferences) {
  return axios.put(`/api/users/preferences`, preferences, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
