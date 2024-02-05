import { Game } from "@/lib/http/games.ts";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { utcToZonedTime, format } from "date-fns-tz";
import { FaCircle } from "react-icons/fa6";
import { TeamLogo } from "@/components/teams/logos.tsx";
import { useFetchTeams } from "@/lib/http/teams.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import MarqueeBadge from "@/components/games/marquee-badge.tsx";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const zonedDate = utcToZonedTime(new Date(game.startTimeUTC + "Z"), timeZone);
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
        <hr className="border-[0.5]" />
        <div className="mx-auto">
          <div className="text-sm flex justify-center space-x-2">
            <div>
              {zonedDate.getMinutes() == 33
                ? "TBD"
                : format(zonedDate, "h:mmaa zzz", { timeZone })
                    .replace("DT", "T")
                    .replace("ST", "T")}
            </div>
            <div className="leading-[16px]">
              <div className="inline-block align-middle">
                <FaCircle size={5} />
              </div>
            </div>
            <div>{game.venue}</div>
            {game.is_marquee && (
              <>
                <div className="leading-[16px]">
                  <div className="inline-block align-middle">
                    <FaCircle size={5} />
                  </div>
                </div>
                <div className="flex justify-center">
                  <MarqueeBadge />
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
