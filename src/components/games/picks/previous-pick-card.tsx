import { Card, CardContent } from "@/components/ui/card.tsx";
import { Game } from "@/lib/http/games.ts";
import { GamePick, useFetchSession } from "@/lib/http/picks.ts";
import { getTeamFromList, useFetchTeams } from "@/lib/http/teams.ts";
import { TeamLogo } from "@/components/teams/logos.tsx";
import { FavoriteTeamIcon, PickedIcon } from "@/components/games/icons.tsx";
import { SiMlb } from "react-icons/si";
import { Button } from "@/components/ui/button.tsx";
import { useAuth, useUser } from "@clerk/clerk-react";
import { usePrefs } from "@/lib/http/users.ts";
import { Separator } from "@/components/ui/separator.tsx";
import { Link } from "@tanstack/react-router";
import { FaArrowRight } from "react-icons/fa6";

interface PreviousPickCardProps {
  game: Game;
  pick?: GamePick;
}

export function PreviousPickCard({ game, pick }: PreviousPickCardProps) {
  const { getToken, userId } = useAuth();
  const { data: teams } = useFetchTeams();
  const { prefs } = usePrefs(getToken(), userId ?? null, userId !== null);
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

export function PreviousPicks({
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

  if (isLoading) {
    return null;
  }
  if (!user) {
    return null;
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
          <PreviousPickCard
            key={game.id}
            game={game}
            pick={session?.picks.find((p) => p.gameID === game.id)}
          />
        ))}
    </div>
  );
}
