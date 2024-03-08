import { TeamLogo } from "@/components/teams/logos.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useState } from "react";
import { useFetchTeams } from "@/lib/http/teams.ts";
import { Game } from "@/lib/http/games.ts";
import { GamePick } from "@/lib/http/picks.ts";
import { CheckedIcon } from "@/components/games/icons.tsx";

export default function GameTeamDisplay({
  game,
  pick,
  className,
  defaultView = "team",
}: {
  game: Game;
  pick?: GamePick;
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
          <div className="flex justify-between">
            <TeamLogo
              imageOrientation={"left"}
              label={getDisplay(awayTeam)}
              team={awayTeam}
              height={32}
              imageScheme="spot"
            />
            {pick && !pick.pickedHome && <CheckedIcon />}
          </div>
        ) : (
          <Skeleton className="h-[32px] w-[32px]" />
        )}
        {game.status && game.status.status !== "SCHEDULED" && (
          <div className="flex justify-between gap-x-2">
            <p className="text-2xl font-sans">{game.status?.homeScore}</p>
          </div>
        )}
      </div>
      <div className={"flex justify-between text-lg "}>
        {homeTeam ? (
          <div className="flex justify-between">
            <TeamLogo
              imageOrientation={"left"}
              label={getDisplay(homeTeam)}
              team={homeTeam}
              height={32}
              imageScheme="spot"
            />
            {pick && pick.pickedHome && <CheckedIcon />}
          </div>
        ) : (
          <Skeleton className="h-[32px] w-[32px]" />
        )}
        {game.status && game.status.status !== "SCHEDULED" && (
          <div className="flex justify-between gap-x-2">
            {/*<p className="font-sans text-sm leading-8 align-middle">*/}
            {/*  {pickData*/}
            {/*    ? "Picked: " + calculatePercentages(pickData, false) + "%"*/}
            {/*    : null}*/}
            {/*</p>*/}
            <p className="text-2xl font-sans">{game.status?.homeScore}</p>
          </div>
        )}
      </div>
    </div>
  );
}
