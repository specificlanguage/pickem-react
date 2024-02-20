import { Game } from "@/lib/http/games.ts";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { TeamLogo } from "@/components/teams/logos.tsx";
import { useFetchTeams } from "@/lib/http/teams.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import GameInfo from "@/components/games/game-info.tsx";
import { useState } from "react";
import GameIconRow from "@/components/games/game-icon-row.tsx";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const { teams } = useFetchTeams();

  const possibleViews = ["team", "abbr", "full"];
  const [teamView, setTeamView] = useState<number>(0);

  const awayTeam = teams?.find((team) => team.id === game.awayTeam_id);
  const homeTeam = teams?.find((team) => team.id === game.homeTeam_id);

  function onClick() {
    setTeamView((teamView + 1) % possibleViews.length);
  }

  function getDisplay(team: typeof awayTeam | typeof homeTeam) {
    if (possibleViews[teamView] === "abbr") {
      return team?.abbr;
    } else if (possibleViews[teamView] === "full") {
      return team?.name;
    } else {
      return team?.teamName;
    }
  }

  return (
    <Card data-testid={game.id}>
      <CardContent data-testid="game-card" className="my-2 pb-0 space-y-1">
        <div className="flex flex-row">
          <div
            className="flex justify-end basis-[48%]"
            onClick={() => onClick()}
          >
            {awayTeam ? (
              <TeamLogo
                imageOrientation={"left"}
                label={getDisplay(awayTeam)}
                team={awayTeam}
                height={32}
                imageScheme="spot"
              />
            ) : (
              <Skeleton className="h-[32px] w-[32px]" />
            )}
          </div>
          <div className="basis-[4%]">
            <p className="mx-2 h-[32px] text-center leading-[32px]">@</p>
          </div>
          <div
            className="flex justify-start basis-[48%]"
            onClick={() => onClick()}
          >
            {homeTeam ? (
              <TeamLogo
                imageOrientation={"right"}
                label={getDisplay(homeTeam)}
                team={homeTeam}
                height={32}
                imageScheme="spot"
              />
            ) : (
              <Skeleton className="h-[32px] w-[32px]" />
            )}
          </div>
        </div>
        <hr />
        <GameInfo game={game} />
        <div className="-mt-2">
          <GameIconRow game={game} />
        </div>
      </CardContent>
    </Card>
  );
}
