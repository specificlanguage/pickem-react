import { Button } from "@/components/ui/button.tsx";
import { SiMlb } from "react-icons/si";
import { Game } from "@/lib/http/games.ts";
import { format, utcToZonedTime } from "date-fns-tz";
import { FaClock } from "react-icons/fa6";
import { PickIconDialog } from "@/components/games/picks/pick-dialog.tsx";
import { isToday } from "date-fns";

interface GameButtonsColProps {
  game: Game;
  className?: string;
}

export function GameButtonsCol({ game, className }: GameButtonsColProps) {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const zonedDate = utcToZonedTime(new Date(game.startTimeUTC + "Z"), timeZone);

  return (
    <div className="flex flex-col justify-center">
      <div className={"space-y-2 " + className}>
        <p className="flex justify-start gap-x-2">
          <span className="mt-0.5">
            <FaClock size={20} />
          </span>
          {zonedDate.getMinutes() == 33
            ? "TBD"
            : format(zonedDate, "h:mmaa zzz", { timeZone })
                .replace("DT", "T")
                .replace("ST", "T")}
        </p>
        <div className="flex flex-row gap-x-2">
          {isToday(zonedDate) && (
            <Button className="bg-green-800 hover:bg-green-900 p-0 px-2">
              <a
                href={`https://mlb.com/gameday/${game.id}/`}
                className="flex flex-row space-x-2"
              >
                <SiMlb size={22} />
                <p className="text-sm">Live</p>
              </a>
            </Button>
          )}
          <PickIconDialog game={game} />
        </div>
        {/*{isToday(zonedDate) && (*/}
        {/*  <Button className="bg-neutral-600 hover:bg-neutral-800 p-0 px-2">*/}
        {/*    <span className="flex flex-row space-x-2">*/}
        {/*      <PiTelevision size={22} />*/}
        {/*      <p className="text-sm">MLB.tv</p>*/}
        {/*    </span>*/}
        {/*  </Button>*/}
        {/*)}*/}
        {/*<SignedIn>*/}
        {/*  <PickIcon game={game} />*/}
        {/*</SignedIn>*/}
      </div>
    </div>
  );
}
