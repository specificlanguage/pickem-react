import { TeamLogo } from "@/components/teams/logos.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useState } from "react";
import { useFetchTeams } from "@/lib/http/teams.ts";
import { Game } from "@/lib/http/games.ts";

export default function GameTeamDisplay({
  game,
  className,
  defaultView = "team",
}: {
  game: Game;
  className?: string;
  defaultView?: "team" | "abbr" | "full";
}) {
  const { teams } = useFetchTeams();

  const possibleViews = ["team", "abbr", "full"];
  const [teamView, setTeamView] = useState<number>(
    possibleViews.indexOf(defaultView) ?? 0,
  );

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
    <div className={className + " space-y-4 mx-2"}>
      <div className="flex justify-between text-lg" onClick={onClick}>
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
        {game.status && game.status.status !== "SCHEDULED" && (
          <p className="text-2xl font-sans">{game.status?.awayScore}</p>
        )}
      </div>
      <div className="flex justify-between text-lg">
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
        {game.status && game.status.status !== "SCHEDULED" && (
          <p className="text-2xl font-sans">{game.status?.homeScore}</p>
        )}
      </div>
    </div>
  );
}
