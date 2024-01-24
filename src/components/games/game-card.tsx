import { Game } from "@/lib/http/games.ts";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { utcToZonedTime, format } from "date-fns-tz";
import { FaCircle } from "react-icons/fa6";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const zonedDate = utcToZonedTime(new Date(game.startTimeUTC + "Z"), timeZone);

  return (
    <Card data-testid={game.id}>
      <CardContent data-testid="game-card" className="my-2 pb-0 space-y-2">
        <div className="flex justify-between">
          <div className="flex justify-between">
            <img
              src={`https://midfield.mlbstatic.com/v1/team/${game.awayTeam_id}/spots`}
              height={"32"}
              width={"32"}
              alt={game.awayName}
            />
            <div className="mx-2 h-[32px] text-center leading-[32px]">
              <p className="inline-block align-middle">{game.awayName}</p>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="mx-2 h-[32px] text-center leading-[32px]">
              <p className="inline-block align-middle">{game.homeName}</p>
            </div>
            <img
              src={`https://midfield.mlbstatic.com/v1/team/${game.homeTeam_id}/spots`}
              height={"32"}
              width={"32"}
              alt={game.homeName}
            />
          </div>
        </div>
        <hr className="border" />
        <div className="mx-auto">
          <div className="text-sm flex justify-center space-x-2">
            <div>
              {zonedDate.getMinutes() == 33
                ? "TBD"
                : format(zonedDate, "h:mmaa zz", { timeZone })}
            </div>
            <div className="leading-[16px]">
              <div className="inline-block align-middle">
                <FaCircle size={5} />
              </div>
            </div>
            <div>{game.venue}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
