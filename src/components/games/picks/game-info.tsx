import { Game } from "@/lib/http/games.ts";
import { format, utcToZonedTime } from "date-fns-tz";
import { FaCircle } from "react-icons/fa6";
import MarqueeBadge from "@/components/games/marquee-badge.tsx";

export default function GameInfo({
  game,
  className,
}: {
  game: Game;
  className?: string;
}) {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const zonedDate = utcToZonedTime(new Date(game.startTimeUTC + "Z"), timeZone);

  return (
    <>
      <hr />
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
    </>
  );
}
