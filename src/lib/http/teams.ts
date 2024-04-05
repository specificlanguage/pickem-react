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

export interface TeamRecord {
  id: number;
  name: string;
  abbr: string;
  wins: number;
  losses: number;
  winningPercentage: string; // Should be converted to a decimal number if needed.
}

export interface StandingsResponse {
  standings: {
    name: string; // Division name
    teams: TeamRecord[];
  };
  teams: {
    [key: string]: TeamRecord;
  };
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

export const useFetchStandings = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["standings"],
    queryFn: () =>
      axios.get(formatAPIPath("/teams/standings")).then((res) => {
        return res.data as StandingsResponse;
      }),
  });
  return { data, isLoading, isError, standings: data };
};

export function getTeamRecord(teamID: number, standings: StandingsResponse) {
  return standings.teams[teamID.toString()];
}

export function getTeamFromList(
  teams: Team[],
  teamID: number,
): Team | undefined {
  return teams.find((team) => team.id === teamID);
}
