import { useAuth } from "@clerk/clerk-react";
import { getTeamFromList, useFetchTeams } from "@/lib/http/teams.ts";
import { usePrefs } from "@/lib/http/users.ts";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { TeamLogo } from "@/components/teams/logos.tsx";
import { FavoriteTeamIcon, PickedIcon } from "@/components/games/icons.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Button } from "@/components/ui/button.tsx";
import { SiMlb } from "react-icons/si";
import { Game } from "@/lib/http/games.ts";
import { GamePick } from "@/lib/http/picks.ts";

interface SmallGameCardProps {
  game: Game;
  pick: GamePick;
  retrieveStatus: boolean;
}

/**
 * Will be customized soon, right now is similar to PreviousPickCard.
 * @param game - The game to display
 * @param pick - The pick for the game
 * @constructor
 */
export function SmallGameCard({ game, pick }: SmallGameCardProps) {
  const { getToken, userId } = useAuth();
  const { data: teams } = useFetchTeams();
  const { prefs } = usePrefs(getToken(), userId ?? "");
  if (!teams) return null;
  const awayTeam = getTeamFromList(teams, game.awayTeam_id);
  const homeTeam = getTeamFromList(teams, game.homeTeam_id);
  if (!awayTeam || !homeTeam) return null;

  return (
    <Card>
      <CardContent className="p-0 m-0 space-y-2">
        <div className="flex flex-row space-x-4">
          <div className="basis-5/12 flex justify-between space-x-2 pl-2 items-center">
            {/* Away team */}
            <div className="flex justify-start space-x-2 items-center">
              <TeamLogo
                imageOrientation={"left"}
                label={awayTeam.teamName}
                team={awayTeam}
                height={32}
                imageScheme="spot"
              />
              {prefs?.favoriteTeam_id === awayTeam.id && <FavoriteTeamIcon />}
              <PickedIcon game={game} pick={pick} displayAway={true} />
            </div>
            <span className="text-xl font-bold leading-8">
              {game.away_score === undefined ? null : game.away_score}
            </span>
          </div>

          <div className="basis-1/16 m-2">
            <Separator orientation="vertical" />
          </div>

          {/* Home team */}
          <div className="basis-5/12 flex justify-between space-x-2 pl-2 items-center">
            <div className="flex justify-start space-x-2 items-center">
              <TeamLogo
                imageOrientation={"left"}
                label={homeTeam.teamName}
                team={homeTeam}
                height={32}
                imageScheme="spot"
              />
              {prefs?.favoriteTeam_id === homeTeam.id && <FavoriteTeamIcon />}
              <p className="leading-8">
                <PickedIcon game={game} pick={pick} displayAway={false} />
              </p>
            </div>
            <span className="text-xl font-bold">
              {game.home_score === undefined ? null : game.home_score}
            </span>
          </div>
          <div className="basis-1/16 py-2">
            <Separator orientation="vertical" />
          </div>
          <div className="flex justify-start m-2">
            <a
              href={`https://mlb.com/gameday/${game.id}/`}
              target="_blank"
              rel="noreferrer nofollow"
            >
              <Button className="bg-gray-600 hover:bg-gray-700 gap-x-1 p-0 px-2 mr-2">
                <SiMlb size={22} />
                <p className="text-sm">Box</p>
              </Button>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
