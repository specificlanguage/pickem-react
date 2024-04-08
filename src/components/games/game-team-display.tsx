import { TeamLogo } from "@/components/teams/logos.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useState } from "react";
import { useFetchTeams } from "@/lib/http/teams.ts";
import { Game } from "@/lib/http/games.ts";
import { GamePick } from "@/lib/http/picks.ts";
import { FavoriteTeamIcon, PickedIcon } from "@/components/games/icons.tsx";
import { RecordDisplay } from "@/components/teams/records.tsx";
import { usePrefs } from "@/lib/http/users.ts";
import { useAuth } from "@clerk/clerk-react";

export default function GameTeamDisplay({
  game,
  pick,
  className,
  defaultView = "team",
  showRecord = false,
}: {
  game: Game;
  pick?: GamePick;
  className?: string;
  defaultView?: "team" | "abbr" | "full";
  showRecord?: boolean;
}) {
  const { getToken, userId } = useAuth();

  const { teams } = useFetchTeams();
  const { prefs } = usePrefs(getToken(), userId ?? "");

  const possibleViews = ["team", "abbr", "full"];
  const [teamView, setTeamView] = useState<number>(
    possibleViews.indexOf(defaultView) ?? 0,
  );

  const awayTeam = teams?.find((team) => team.id === game.awayTeam_id);
  const homeTeam = teams?.find((team) => team.id === game.homeTeam_id);

  if (!awayTeam || !homeTeam) {
    return null;
  }

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
          <div className="flex justify-between gap-2">
            <TeamLogo
              imageOrientation={"left"}
              label={getDisplay(awayTeam)}
              team={awayTeam}
              height={32}
              imageScheme="spot"
            />
            {showRecord && <RecordDisplay teamID={awayTeam.id} />}
            {prefs?.favoriteTeam_id === awayTeam.id && <FavoriteTeamIcon />}
            {pick && !pick.pickedHome && (
              <PickedIcon game={game} pick={pick} displayAway={true} />
            )}
          </div>
        ) : (
          <Skeleton className="h-[32px] w-[32px]" />
        )}
        {game.status?.status !== "SCHEDULED" &&
          game.status?.status !== "POSTPONED" && (
            <div className="flex justify-between gap-x-2">
              <p className="text-2xl font-sans">{game.status?.awayScore}</p>
            </div>
          )}
      </div>
      <div className={"flex justify-between text-lg "}>
        {homeTeam ? (
          <div className="flex justify-between gap-2 ">
            <TeamLogo
              imageOrientation={"left"}
              label={getDisplay(homeTeam)}
              team={homeTeam}
              height={32}
              imageScheme="spot"
            />
            {showRecord && <RecordDisplay teamID={homeTeam.id} />}
            {prefs?.favoriteTeam_id === homeTeam.id && <FavoriteTeamIcon />}
            {pick && pick.pickedHome && (
              <PickedIcon game={game} pick={pick} displayAway={false} />
            )}
          </div>
        ) : (
          <Skeleton className="h-[32px] w-[32px]" />
        )}
        {game.status?.status !== "SCHEDULED" &&
          game.status?.status !== "POSTPONED" && (
            <div className="flex justify-between gap-x-2">
              <p className="text-2xl font-sans">{game.status?.homeScore}</p>
            </div>
          )}
      </div>
    </div>
  );
}
