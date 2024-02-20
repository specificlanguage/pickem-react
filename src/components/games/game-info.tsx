import { Game } from "@/lib/http/games.ts";
import { format, utcToZonedTime } from "date-fns-tz";
import { FaCircle, FaClock, FaLocationDot } from "react-icons/fa6";
import MarqueeBadge from "@/components/games/marquee-badge.tsx";

interface GameInfoProps {
  game: Game;
  zonedDate: Date;
  className?: string;
}

/**
 * GameInfoVertical -- a component to render game info in a vertical layout
 * @param game -  Game object for info to display
 * @param className - optional class name to apply to the component
 * @param zonedDate - zoned time object that gets passed by the GameInfo component
 * @constructor
 */
function GameInfoVertical({ game, className, zonedDate }: GameInfoProps) {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

  return (
    <div className="flex h-full justify-start items-center">
      <div className={"space-y-2 " + className}>
        <p className="flex justify-start gap-x-2">
          <FaClock />
          {zonedDate.getMinutes() == 33
            ? "TBD"
            : format(zonedDate, "h:mmaa zzz", { timeZone })
                .replace("DT", "T")
                .replace("ST", "T")}
        </p>
        <p className="flex justify-start gap-x-2">
          <FaLocationDot />
          {game.venue}
        </p>
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

/**
 * GameInfoHorizontal -- a component to render game info in a horizontal layout
 * @param game - Game object for info to display
 * @param className - optional class name to apply to the component
 * @param zonedDate - zoned time object that gets passed by the GameInfo component
 * @constructor
 */

function GameInfoHorizontal({ game, className, zonedDate }: GameInfoProps) {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

  /**
   * CircleDivider -- a simple component to render a circle divider
   * @constructor
   */
  function CircleDivider() {
    return (
      <div className="leading-[24px]">
        <p className="inline-block align-middle">
          <FaCircle size={5} />
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <div className={"flex justify-center space-x-2 " + className}>
        <p className="flex justify-start gap-x-2">
          <FaClock className="mt-1" />
          {zonedDate.getMinutes() == 33
            ? "TBD"
            : format(zonedDate, "h:mmaa zzz", { timeZone })
                .replace("DT", "T")
                .replace("ST", "T")}
        </p>
        <CircleDivider />
        <p className="flex justify-start gap-x-2">
          <FaLocationDot className="mt-1" />
          {game.venue}
        </p>
        {game.is_marquee && (
          <>
            <CircleDivider />
            <div className="flex justify-center leading-[24px]">
              <MarqueeBadge />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * GameInfo -- a component to render game info in a vertical or horizontal layout
 * @param game - Game object for info to display
 * @param className - optional class name to apply to the component
 * @param orientation - optional orientation to render the component, defaults to horizontal
 * @constructor
 */
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
