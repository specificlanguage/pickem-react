import { Card, CardContent } from "@/components/ui/card.tsx";
import { Game } from "@/lib/http/games.ts";
import { GamePick } from "@/lib/http/picks.ts";
import { getTeamFromList, useFetchTeams } from "@/lib/http/teams.ts";
import { TeamLogo } from "@/components/teams/logos.tsx";
import { CheckedIcon, HollowCheckedIcon } from "@/components/games/icons.tsx";

interface PreviousPickCardProps {
  game: Game;
  pick?: GamePick;
}

export function PreviousPickCard({ game, pick }: PreviousPickCardProps) {
  const { data: teams } = useFetchTeams();
  if (!teams) return null;
  const awayTeam = getTeamFromList(teams, game.awayTeam_id);
  const homeTeam = getTeamFromList(teams, game.homeTeam_id);
  if (!awayTeam || !homeTeam) return null;

  return (
    <Card>
      <CardContent className="p-0 m-0 space-y-2">
        <div className="mx-10 my-2 flex justify-around">
          <div className="flex justify-start space-x-2 ">
            <TeamLogo
              imageOrientation={"left"}
              useLabel={"city"}
              team={awayTeam}
              height={32}
              imageScheme="spot"
            />
            <p className="text-xl font-bold leading-8">
              {game.away_score === undefined ? null : game.away_score}
            </p>
            {!pick?.pickedHome &&
              (game.finished && game.winner === awayTeam.id ? (
                <CheckedIcon />
              ) : (
                <HollowCheckedIcon />
              ))}
          </div>
          <div className="flex justify-start space-x-2">
            <TeamLogo
              imageOrientation={"left"}
              useLabel={"city"}
              team={homeTeam}
              height={32}
              imageScheme="spot"
            />
            <p className="text-xl font-bold leading-8">
              {game.home_score === undefined ? null : game.home_score}
            </p>
            {pick?.pickedHome &&
              (game.finished && game.winner === homeTeam.id ? (
                <CheckedIcon />
              ) : (
                <HollowCheckedIcon />
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
