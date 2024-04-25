import { useAuth, useUser } from "@clerk/clerk-react";
import { getTeamFromList, useFetchTeams } from "@/lib/http/teams.ts";
import { usePrefs } from "@/lib/http/users.ts";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { TeamLogo } from "@/components/teams/logos.tsx";
import { FavoriteTeamIcon, PickedIcon } from "@/components/games/icons.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Button } from "@/components/ui/button.tsx";
import { SiMlb } from "react-icons/si";
import {
  Game,
  joinGamesWithStatuses,
  useFetchStatusesByDate,
} from "@/lib/http/games.ts";
import { GamePick, useFetchSession } from "@/lib/http/picks.ts";
import { GameStatusInningInfo } from "@/components/games/game-status-view.tsx";
import { Link } from "@tanstack/react-router";
import { FaArrowRight } from "react-icons/fa6";
import { isToday } from "date-fns";

interface SmallGameCardProps {
  game: Game;
  pick?: GamePick;
  retrieveStatus?: boolean;
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
        <div className="flex flex-row space-x-4 h-12">
          <div className="basis-1/3 flex justify-between space-x-2 pl-2 items-center">
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
              {game.status && game.status.status === "IN_PROGRESS"
                ? game.status.awayScore
                : null}
            </span>
          </div>

          <div className=" m-2">
            <Separator orientation="vertical" />
          </div>

          {/* Home team */}
          <div className="basis-1/3 flex justify-between space-x-2 pl-2 items-center">
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
              {game.status && game.status.status === "IN_PROGRESS"
                ? game.status.homeScore
                : null}
            </span>
          </div>
          <div className="m-2">
            <Separator orientation="vertical" />
          </div>
          <div className="flex justify-center text-sm gap-x-2 m-2 items-center">
            {game.finished ? (
              <>
                <a
                  href={`https://mlb.com/gameday/${game.id}/`}
                  target="_blank"
                  rel="noreferrer nofollow"
                >
                  <Button className="bg-gray-600 hover:bg-gray-700 gap-x-1 p-0 px-2 mr-2 h-9">
                    <SiMlb size={22} />
                    <p className="text-sm">Box</p>
                  </Button>
                </a>
                Final
              </>
            ) : (
              <GameStatusInningInfo game={game} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SmallGameCardsByDate({
  date,
  title,
  showProfileLink,
}: {
  date: Date;
  title?: string;
  showProfileLink?: boolean;
}) {
  const { getToken } = useAuth();
  const { user } = useUser();
  const { isLoading, session } = useFetchSession(date, getToken);
  const { statuses } = useFetchStatusesByDate(date, isToday(date));

  if (isLoading) {
    return null;
  }
  if (!user) {
    return null;
  }
  if (statuses) {
    joinGamesWithStatuses(session?.games ?? [], statuses);
  }

  return (
    <div className="justify-center mt-8 space-y-2">
      <div className="flex flex-row justify-between items-center">
        <h4 className="font-bold text-lg">{title}</h4>
        {showProfileLink && (
          <Link
            to="/profile/$username"
            params={{ username: user.username ?? "" }}
          >
            <Button
              variant="ghost"
              className="h-7.5 dark:text-white text-black"
            >
              See more
              <FaArrowRight className="ml-2" />
            </Button>
          </Link>
        )}
      </div>
      {session?.games
        .sort(
          (g1, g2) =>
            new Date(g1.startTimeUTC).getTime() -
            new Date(g2.startTimeUTC).getTime(),
        )
        .map((game) => (
          <SmallGameCard
            key={game.id}
            game={game}
            pick={session?.picks.find((p) => p.gameID === game.id)}
            retrieveStatus={isToday(date)}
          />
        ))}
    </div>
  );
}
