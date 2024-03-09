import { getLeaderboard } from "@/lib/http/picks.ts";
import { useQuery } from "@tanstack/react-query";
import LoadingWheel from "@/components/loading-wheel.tsx";
import { getAllUsers } from "@/lib/http/users.ts";
import { DataTable } from "@/components/leaderboard/data-table.tsx";
import { ColumnDef } from "@tanstack/react-table";
import { LeaderboardRow, transformLeaderboardData } from "@/lib/picks.ts";

export const leaderboardColumns: ColumnDef<LeaderboardRow>[] = [
  {
    accessorKey: "rank",
    header: "Rank",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "points",
    header: "Points",
  },
];

export default function LeaderboardView() {
  const { isLoading, data: leaderboard } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => getLeaderboard(),
  });

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
    enabled: leaderboard !== undefined && leaderboard !== null,
  });

  if (isLoading) {
    return <LoadingWheel />;
  }

  if (!leaderboard || !users) {
    return null;
  }

  const leaderboardRows = transformLeaderboardData(leaderboard, users);

  return (
    <div>
      <DataTable columns={leaderboardColumns} data={leaderboardRows} />
    </div>
  );
}
