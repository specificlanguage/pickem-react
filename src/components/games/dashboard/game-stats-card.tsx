import {
  Game,
  joinGamesWithStatuses,
  useFetchGamesByDate,
  useFetchStatusesByDate,
} from "@/lib/http/games.ts";
import LoadingSpinner from "@/components/loading-wheel.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { TeamLogo } from "@/components/teams/logos.tsx";
import { useQuery } from "@tanstack/react-query";
import { getAllPicks } from "@/lib/http/picks.ts";
import { isAfterStartTime } from "@/lib/datetime/gameDates.ts";
import { getTeamFromList, useFetchTeams } from "@/lib/http/teams.ts";
import { Separator } from "@/components/ui/separator.tsx";
import { startOfToday } from "date-fns";
import { StatusFooter } from "@/components/games/game-info.tsx";

/**
 * Please note that this component should be used sparingly, to prevent excessive querying to the API.
 * @constructor
 */
export function GameStatsCard({ game }: { game: Game }) {
  const { teams } = useFetchTeams();
  const { isLoading, data } = useQuery({
    queryKey: ["pickData", game.id],
    queryFn: async () => getAllPicks(game.id),
    enabled: true,
  });
  const { statuses } = useFetchStatusesByDate(
    startOfToday(),
    isAfterStartTime(game),
  );

  if (isLoading) {
    return <LoadingSpinner size={48} />;
  }

  if (!data) {
    return null;
  }

  const awayTeam = getTeamFromList(teams ?? [], game.awayTeam_id);
  const homeTeam = getTeamFromList(teams ?? [], game.homeTeam_id);
  if (!awayTeam || !homeTeam) return null;

  if (data) {
    const awayPct = Math.round(
      (data.awayPicks / (data.totalPicks === 0 ? data.totalPicks : 1)) * 100,
    );
    const homePct = Math.round(
      (data.homePicks / (data.totalPicks === 0 ? data.totalPicks : 1)) * 100,
    );

    if (statuses) {
      joinGamesWithStatuses([game], statuses);
    }

    return (
      <Card>
        <CardContent className="py-2 px-6">
          <div className="flex flex-row justify-between">
            <div id="gamestatscard-away" className="space-y-1 basis-5/12">
              <TeamLogo
                height={32}
                imageScheme={"spot"}
                team={awayTeam}
                imageOrientation={"left"}
                useLabel="team"
              />
              <div className="flex justify-start gap-x-2 text-sm items-center">
                <div
                  className={`bg-foreground rounded-r-lg pl-2 h-2 w-[${awayPct}%]`}
                />
                {awayPct}%
              </div>
            </div>
            <div className="mx-2">
              <Separator orientation="vertical" />
            </div>
            <div id="gamestatscard-home" className="space-y-1 basis-5/12">
              <TeamLogo
                height={32}
                imageScheme={"spot"}
                team={homeTeam}
                imageOrientation={"left"}
                useLabel="team"
              />
              <div className="flex justify-start gap-x-2 text-sm items-center">
                <div
                  className={`bg-foreground rounded-r-lg pl-2 h-2 w-[${homePct}%]`}
                />
                {homePct}%
              </div>
            </div>
          </div>
        </CardContent>
        <Separator className="my-2" />
        <StatusFooter game={game} status={game.status} venue={game.venue} />
      </Card>
    );
  }
}

export function MarqueeStatCard() {
  const { games } = useFetchGamesByDate(startOfToday());
  const marquee = games?.filter((game) => game.is_marquee);
  if (!marquee || marquee.length === 0) return null;
  return (
    <div className="space-y-2">
      <h3 className="font-bold text-xl">Today's Marquee Game</h3>
      <GameStatsCard game={marquee[0]} />
    </div>
  );
}
