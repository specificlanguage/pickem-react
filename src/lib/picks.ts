import { AllPickResponse } from "@/lib/http/picks.ts";

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
