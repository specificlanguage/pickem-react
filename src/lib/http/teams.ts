import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { formatAPIPath } from "@/lib/http/utils.ts";

export interface Team {
  teamName: string;
  id: number;
  abbr: string;
  name: string;
  cityName: string;
}

/**
 * Get all team info from the API.
 */
export async function getAllTeamInfo() {
  return axios.get(formatAPIPath("teams?")).then((res) => {
    return res.data as Team[];
  });
}

/**
 * Gets all team info from the API, as a React hook for React Query. Returns all the same fields that are used in a normal React Query call.
 */
export const useFetchTeams = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["teams"],
    queryFn: getAllTeamInfo,
  });
  return { data, isLoading, isError, teams: data };
};
