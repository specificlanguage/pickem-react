import { Game } from "@/lib/http/games.ts";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { TeamLogo } from "@/components/teams/logos.tsx";
import { useFetchTeams } from "@/lib/http/teams.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import GameInfo from "@/components/games/game-info.tsx";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const { data } = useFetchTeams();

  const awayTeam = data?.find((team) => team.id === game.awayTeam_id);
  const homeTeam = data?.find((team) => team.id === game.homeTeam_id);

  return (
    <Card data-testid={game.id}>
      <CardContent data-testid="game-card" className="my-2 pb-0 space-y-2">
        <div className="flex justify-center">
          {awayTeam ? (
            <TeamLogo
              imageOrientation={"left"}
              label={game.awayName}
              team={awayTeam}
              height={32}
              imageScheme="spot"
            />
          ) : (
            <Skeleton className="h-[32px] w-[32px]" />
          )}
          <div className="flex justify-between">
            <p className="mx-2 h-[32px] text-center leading-[32px]">@</p>
          </div>
          <div className="flex justify-between">
            {homeTeam ? (
              <TeamLogo
                imageOrientation={"right"}
                label={game.homeName}
                team={homeTeam}
                height={32}
                imageScheme="spot"
              />
            ) : (
              <Skeleton className="h-[32px] w-[32px]" />
            )}
          </div>
        </div>
        <GameInfo game={game} />
      </CardContent>
    </Card>
  );
}
