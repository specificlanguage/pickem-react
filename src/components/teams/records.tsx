import { getTeamRecord, useFetchStandings } from "@/lib/http/teams.ts";

export function RecordDisplay({ teamID }: { teamID: number }) {
  const { standings } = useFetchStandings();

  if (!standings) return null;

  const record = getTeamRecord(teamID, standings);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-sm">
        ({record.wins}-{record.losses})
      </div>
    </div>
  );
}
