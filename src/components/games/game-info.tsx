import { Game } from "@/lib/http/games.ts";
import { format, utcToZonedTime } from "date-fns-tz";
import { FaCircle } from "react-icons/fa6";
import MarqueeBadge from "@/components/games/marquee-badge.tsx";

interface GameInfoProps {
  game: Game;
  zonedDate: Date;
  className?: string;
}

function GameInfoVertical({ game, className, zonedDate }: GameInfoProps) {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

  return (
    <div className="flex h-full justify-start items-center">
      <div className={"space-y-2 " + className}>
        <p>
          {zonedDate.getMinutes() == 33
            ? "TBD"
            : format(zonedDate, "h:mmaa zzz", { timeZone })
                .replace("DT", "T")
                .replace("ST", "T")}
        </p>
        <p>{game.venue}</p>
        {game.is_marquee && (
          <>
            <div className="flex justify-center leading-[24px]">
              <MarqueeBadge />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function GameInfoHorizontal({ game, className, zonedDate }: GameInfoProps) {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

  return (
    <div className="mx-auto">
      <div className={"flex justify-center space-x-2 " + className}>
        <p>
          {zonedDate.getMinutes() == 33
            ? "TBD"
            : format(zonedDate, "h:mmaa zzz", { timeZone })
                .replace("DT", "T")
                .replace("ST", "T")}
        </p>
        <div className="leading-[24px]">
          <p className="inline-block align-middle">
            <FaCircle size={5} />
          </p>
        </div>
        <p>{game.venue}</p>
        {game.is_marquee && (
          <>
            <div className="leading-[24px]">
              <div className="inline-block align-middle">
                <FaCircle size={5} />
              </div>
            </div>
            <div className="flex justify-center leading-[24px]">
              <MarqueeBadge />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function GameInfo({
  game,
  className,
  orientation,
}: {
  game: Game;
  className?: string;
  orientation?: "vertical" | "horizontal";
}) {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const zonedDate = utcToZonedTime(new Date(game.startTimeUTC + "Z"), timeZone);

  if (orientation === "vertical") {
    return (
      <GameInfoVertical
        game={game}
        className={className}
        zonedDate={zonedDate}
      />
    );
  } else {
    return (
      <GameInfoHorizontal
        game={game}
        className={className}
        zonedDate={zonedDate}
      />
    );
  }
}
