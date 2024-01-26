import axios from "axios";

export interface Team {
  teamName: string;
  id: number;
  abbr: string;
  name: string;
  cityName: string;
}

export function getAllTeamInfo() {
  return axios.get(import.meta.env.VITE_BACKEND_URL + "/teams?").then((res) => {
    return res.data as Team[];
  });
}
