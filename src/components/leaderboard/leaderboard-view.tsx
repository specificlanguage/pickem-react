import { getLeaderboard } from "@/lib/http/picks.ts";
import { useQuery } from "@tanstack/react-query";
import LoadingWheel from "@/components/loading-wheel.tsx";
import { getAllUsers } from "@/lib/http/users.ts";
import { ColumnDef } from "@tanstack/react-table";
import { LeaderboardRow } from "@/lib/picks.ts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { Avatar } from "@/components/ui/avatar.tsx";
import { AvatarImage } from "@radix-ui/react-avatar";

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

  function UserAvatar({ imageURL }: { imageURL: string }) {
    return (
      <Avatar className="h-8 w-8">
        <AvatarImage src={imageURL} />
      </Avatar>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/12">Rank</TableHead>
          <TableHead>Username</TableHead>
          <TableHead className="w-1/12">Correct</TableHead>
          <TableHead className="w-1/12">Total</TableHead>
          <TableHead className="w-1/12">Correct%</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaderboard.leaders.map((leader, index) => (
          <TableRow key={index} className="p-2">
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <div className="flex justify-left gap-4">
                <UserAvatar imageURL={users.users[leader.userID].image_url} />
                <p className="leading-7 font-bold">
                  {users.users[leader.userID].username}
                </p>
              </div>
            </TableCell>
            <TableCell>{leader.correctPicks}</TableCell>
            <TableCell>{leader.totalPicks}</TableCell>
            <TableCell>
              {(leader.correctPicks / leader.totalPicks).toPrecision(3)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
