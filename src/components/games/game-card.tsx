import { Game } from "@/lib/http/games.ts";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { TeamLogo } from "@/components/teams/logos.tsx";
import { useFetchTeams } from "@/lib/http/teams.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { GameInfoCollapsible } from "@/components/games/game-info.tsx";
import { useState } from "react";
import { Separator } from "@/components/ui/separator.tsx";
import { GameButtonsCol } from "@/components/games/game-buttons-col.tsx";

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
      <CardContent data-testid="game-card" className="p-0 m-0 space-y-2">
        <div className="flex flex-row pb-0 space-y-1 p-6 mb-2">
          <div className="basis-12/12 md:basis-8/12 space-y-4">
            <div className="text-lg" onClick={onClick}>
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
            <div className="text-lg">
              {homeTeam ? (
                <TeamLogo
                  imageOrientation={"left"}
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
          <div className="invisible md:visible md:basis-1/12">
            <Separator orientation="vertical" />
          </div>
          <div className="invisible md:visible md:basis-3/12 flex flex-row">
            {/*<div>*/}
            {/*  <GameInfo*/}
            {/*    className="text-sm"*/}
            {/*    orientation={"vertical"}*/}
            {/*    game={game}*/}
            {/*  />*/}
            {/*</div>*/}
            <div className="my-auto">
              <GameButtonsCol game={game} />
            </div>
          </div>
        </div>
        <GameInfoCollapsible game={game} />
      </CardContent>
    </Card>
  );
}
