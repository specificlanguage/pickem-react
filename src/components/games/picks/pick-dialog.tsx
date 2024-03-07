import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import PickForm from "@/components/games/picks/pick-form.tsx";
import { Game } from "@/lib/http/games.ts";
import { FaRegSquareCheck } from "react-icons/fa6";
import { format } from "date-fns-tz";
import { Button } from "@/components/ui/button.tsx";
import { isAfterStartTime } from "@/lib/datetime/gameDates.ts";

/**
 * PickIconDialog -- a component to render a dialog to pick the winner of a game.
 * @param game - Game object, used to get the game id
 * @constructor
 */
export function PickIconDialog({ game }: { game: Game }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={
            "p-0 px-2 " +
            (isAfterStartTime(game)
              ? "bg-neutral-600 hover:bg-neutral-800"
              : "bg-blue-600 hover:bg-blue-800")
          }
        >
          <FaRegSquareCheck size={21} /> <p className="ml-0.5">Pick</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Pick'em for {game.awayName} @ {game.homeName} (
            {format(new Date(game.date), "PP")})
          </DialogTitle>
          <DialogDescription>
            Pick the team you think is going to win this game!
          </DialogDescription>
        </DialogHeader>
        <PickForm game={game} />
      </DialogContent>
    </Dialog>
  );
}
