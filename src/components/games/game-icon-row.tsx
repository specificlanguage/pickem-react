import { Game } from "@/lib/http/games.ts";
import { SiMlb } from "react-icons/si";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { PickIconDialog } from "@/components/games/picks/pick-dialog.tsx";
import { SignedIn } from "@clerk/clerk-react";
import { PiTelevision } from "react-icons/pi";
import { isToday } from "date-fns";

interface GameIconRowProps {
  game: Game;
  className?: string;
}

interface MLBIconProps {
  gameID: number;
}

interface PickIconProps {
  game: Game;
}

/**
 * MLBIcon -- a component to render the MLB icon and link to Gameday
 * @param gameID - Game object, used to get the game id
 * @constructor
 */
function MLBIcon({ gameID }: MLBIconProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <a href={`https://mlb.com/gameday/${gameID}/preview`}>
            <SiMlb size={28} />
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>MLB Gameday Link</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

/**
 * MLBTVIcon -- a component to render a TV icon to link to MLB.tv
 * @param gameID
 * @constructor
 */
function MLBTVIcon({ game }: PickIconProps) {
  if (!isToday(new Date(game.date))) {
    return null;
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <a href={`https://mlb.com/gameday/${game.id}/preview`}>
            <PiTelevision size={28} />
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>MLB Gameday Link</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

/**
 * Displays an icon to allow users to view the pick form for a game.
 * @param game - Game object
 * @constructor
 */
function PickIcon({ game }: PickIconProps) {
  return <PickIconDialog game={game} />;
}

/**
 * Displays the Icon row for the game, which shows MLB gameday link and if present, signed in.
 * @param game
 * @param className
 * @constructor
 */
export default function GameIconRow({ game, className }: GameIconRowProps) {
  return (
    <div className="mx-auto -mb-2">
      <div className={"flex justify-center space-x-6 " + className}>
        <MLBIcon gameID={game.id} />
        <MLBTVIcon game={game} />
        <SignedIn>
          <PickIcon game={game} />
        </SignedIn>
      </div>
    </div>
  );
}
