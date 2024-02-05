import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export interface Team {
  teamName: string;
  id: number;
  abbr: string;
  name: string;
  cityName: string;
}

export function getAllTeamInfo() {
  return axios.get("/api/teams?").then((res) => {
    return res.data as Team[];
  });
}

export const useFetchTeams = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["teams"],
    queryFn: getAllTeamInfo,
  });
  return { data, isLoading, isError };
};
