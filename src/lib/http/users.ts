import axios from "axios";

interface Preferences {
  favoriteTeam: number;
  selectionTiming: string;
}

/** Set user preferences from a user's uid. */
export async function setPreferences(token: string, preferences: Preferences) {
  return axios.put(
    import.meta.env.VITE_BACKEND_URL + `/users/preferences`,
    preferences,
    { headers: { Authorization: `Bearer ${token}` } },
  );
}
