import { Game, GameStatus } from "@/lib/http/games.ts";
import { utcToZonedTime } from "date-fns-tz";
import { FaCircle, FaLocationDot } from "react-icons/fa6";
import MarqueeBadge from "@/components/games/marquee-badge.tsx";
import { GameStatusInningInfo } from "@/components/games/game-status-view.tsx";
import { TimeDisplay } from "@/components/games/icons.tsx";
import { CardFooter } from "@/components/ui/card.tsx";
import { Separator } from "@/components/ui/separator.tsx";

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
function GameInfoVertical({ game, zonedDate }: GameInfoProps) {
  function StatusView({ game }: { game: Game }) {
    if (game.status) {
      return <GameStatusInningInfo game={game} />;
    }

    return <TimeDisplay zonedTime={zonedDate} />;
  }

  return (
    <div className="flex h-full justify-start items-center mx-1">
      <div className={"space-y-2 w-full my-2"}>
        <StatusView game={game} />
        <p className="flex justify-start gap-x-2 items-center">
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
    <div className="mx-auto gap-x-2">
      {game.status && game.status.status === "IN_PROGRESS" && (
        <div className={"flex justify-center space-x-8 p-2 " + className}>
          <p>P: {game.status.currentPitcher}</p>
          <p>AB: {game.status.atBat}</p>
        </div>
      )}
      <div
        className={
          "flex justify-center items-center space-x-2 p-2 " + className
        }
      >
        <p>ID: {game.id}</p>
        <TimeDisplay zonedTime={zonedDate} />
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

export function StatusFooter({
  status,
  game,
}: {
  status: GameStatus | undefined;
  venue: string;
  game: Game;
}) {
  function ExtraStatusInfo() {
    if (game.finished) {
      return null; // TODO later: Add winning/losing pitchers
    }
    if (!status) {
      return (
        <>
          <FaLocationDot />
          <span>{game.venue}</span>
        </>
      );
    }
    if (status.outs === 3) {
      return null;
    }
    return (
      <>
        <span>P: {status.currentPitcher}</span>
        <Separator orientation={"vertical"} className="m-2" />
        <span>AB: {status.atBat}</span>
      </>
    );
  }

  return (
    <CardFooter className="flex justify-between w-full pb-2">
      <div className="flex justify-start space-x-2 text-sm items-center ">
        <ExtraStatusInfo />
      </div>
      <div className="flex justify-end text-sm">
        <GameStatusInningInfo game={game} />
      </div>
    </CardFooter>
  );
}
