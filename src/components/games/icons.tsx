import { FaClock, FaStar } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { GamePick } from "@/lib/http/picks.ts";
import { Game } from "@/lib/http/games.ts";
import { format, utcToZonedTime } from "date-fns-tz";

export const FavoriteTeamIcon = () => (
  <span className="text-yellow-500 inline-block align-middle">
    <FaStar size={16} />
  </span>
);

export const CheckedIcon = () => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <span className="inline-block align-middle bg-green-700 p-1 text-white rounded-full shadow-none">
          <FaCheck size={12} />
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>Correct guess!</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export const HollowCheckedIcon = () => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <span className="border border-foreground inline-block align-middle p-1 text-black dark:text-white rounded-full shadow-none">
          <FaCheck size={12} />
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>Picked team</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export function PickedIcon({
  game,
  pick,
  displayAway,
}: {
  game: Game;
  pick?: GamePick;
  displayAway: boolean;
}) {
  if (pick === undefined) return null;
  if (pick.pickedHome && displayAway) return null;
  if (!pick.pickedHome && !displayAway) return null;
  if (game.finished) {
    if (
      game.winner === (pick.pickedHome ? game.homeTeam_id : game.awayTeam_id)
    ) {
      return <CheckedIcon />;
    }
  }
  return <HollowCheckedIcon />;
}

export function TimeDisplay({
  utcTime,
  zonedTime,
}: {
  utcTime?: string | Date;
  zonedTime?: Date;
}) {
  if (!utcTime && !zonedTime) {
    return null;
  }

  let finalTime: Date;
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

  if (zonedTime) {
    finalTime = zonedTime;
  } else {
    finalTime = utcToZonedTime(new Date(utcTime + "Z"), timeZone);
  }
  return (
    <span className="flex justify-start gap-x-2 items-center w-full">
      <FaClock className="mt-1" />
      {format(finalTime, "h:mmaa zzz", { timeZone })
        .replace("DT", "T")
        .replace("ST", "T")}
    </span>
  );
}
