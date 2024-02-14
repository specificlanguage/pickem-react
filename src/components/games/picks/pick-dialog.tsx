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

export function PickIconDialog({ game }: { game: Game }) {
  return (
    <Dialog>
      <DialogTrigger className="text-blue-500 h-[28px] flex place-items-center">
        <FaRegSquareCheck size={21} />
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
