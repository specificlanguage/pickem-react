import { Game } from "@/lib/http/games.ts";
import { format, utcToZonedTime } from "date-fns-tz";
import {
  FaArrowDown,
  FaArrowUp,
  FaCircle,
  FaClock,
  FaLocationDot,
} from "react-icons/fa6";
import MarqueeBadge from "@/components/games/marquee-badge.tsx";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible.tsx";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { GameStatusInningInfo } from "@/components/games/game-status-view.tsx";

interface GameInfoProps {
  game: Game;
  zonedDate: Date;
  className?: string;
}

interface GameInfoCollapsibleProps {
  game: Game;
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
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

  function StatusView({ game }: { game: Game }) {
    const timeDisplay = format(zonedDate, "h:mmaa zzz", { timeZone })
      .replace("DT", "T")
      .replace("ST", "T");

    if (game.status) {
      return <GameStatusInningInfo game={game} />;
    }

    return (
      <div className="flex justify-start gap-x-2 items-center w-full">
        <FaClock />
        {timeDisplay}
      </div>
    );
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
    <div className="mx-auto gap-x-2">
      {game.status && game.status.status === "IN_PROGRESS" && (
        <div className={"flex justify-center space-x-8 p-2 " + className}>
          <p>P: {game.status.currentPitcher}</p>
          <p>AB: {game.status.atBat}</p>
        </div>
      )}
      <div className={"flex justify-center space-x-2 p-2 " + className}>
        <p>{game.id}</p>
        <p className="flex justify-start gap-x-2">
          <FaClock className="mt-1" />
          {format(zonedDate, "h:mmaa zzz", { timeZone })
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

export function GameInfoCollapsible({
  game,
  className,
}: GameInfoCollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-background w-full m-0 py-0.5 h-6"
        >
          <div className="flex justify-between space-x-2">
            <p>More info</p>
            <span className="mt-1">
              {isOpen ? <FaArrowUp /> : <FaArrowDown />}
            </span>
          </div>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="bg-accent">
        <GameInfo game={game} className={className} />
      </CollapsibleContent>
    </Collapsible>
  );
}
