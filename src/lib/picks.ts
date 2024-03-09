import { AllPickResponse, LeaderboardResponse } from "@/lib/http/picks.ts";
import { AllUsersResponse } from "@/lib/http/users.ts";

export type LeaderboardRow = {
  rank: number;
  username: string;
  points: number;
};

export function calculatePercentages(data: AllPickResponse, away: boolean) {
  if (data.totalPicks == 0) {
    return 0;
  }
  if (away) {
    return Math.floor((data.awayPicks / data.totalPicks) * 100);
  } else {
    return Math.floor((data.homePicks / data.totalPicks) * 100);
  }
}

export function transformLeaderboardData(
  leaders: LeaderboardResponse,
  users: AllUsersResponse,
): LeaderboardRow[] {
  return leaders.leaders.map((leader, index) => {
    return {
      rank: index + 1,
      username: users.users[leader.userID].username,
      points: leader.correctPicks,
    };
  });
}
