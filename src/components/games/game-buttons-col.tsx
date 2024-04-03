import { SiMlb } from "react-icons/si";
import { Game } from "@/lib/http/games.ts";
import { PickIconDialog } from "@/components/games/picks/pick-dialog.tsx";
import { GameStatusInningInfo } from "@/components/games/game-status-view.tsx";
import { SignedIn } from "@clerk/clerk-react";
import MarqueeBadge from "@/components/games/marquee-badge.tsx";
import { isAfterStartTime } from "@/lib/datetime/gameDates.ts";
import { Button } from "@/components/ui/button.tsx";

interface GameButtonsColProps {
  game: Game;
  className?: string;
}

export function GameButtonsCol({ game, className }: GameButtonsColProps) {
  // const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  // const zonedDate = utcToZonedTime(new Date(game.startTimeUTC + "Z"), timeZone);

  return (
    <div className="flex flex-col justify-center">
      <div className={"space-y-2 " + className}>
        <GameStatusInningInfo game={game} />
        <div className="flex flex-row gap-x-2">
          <a
            href={`https://mlb.com/gameday/${game.id}/`}
            target="_blank"
            rel="noreferrer nofollow"
          >
            {game.finished ? (
              <Button className="bg-gray-600 hover:bg-gray-700 gap-x-1 p-0 px-2">
                <SiMlb size={22} />
                <p className="text-sm">Box</p>
              </Button>
            ) : (
              <Button
                className={
                  (game.status?.status === "IN_PROGRESS"
                    ? "bg-green-800 hover:bg-green-900 "
                    : "bg-neutral-600 hover:bg-neutral-800 ") +
                  " gap-x-1 p-0 px-2"
                }
              >
                <SiMlb size={22} />
                <p className="text-sm">Live</p>
              </Button>
            )}
          </a>
          <SignedIn>
            {isAfterStartTime(game) ? null : <PickIconDialog game={game} />}
          </SignedIn>
        </div>
        {game.is_marquee && <MarqueeBadge />}
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
