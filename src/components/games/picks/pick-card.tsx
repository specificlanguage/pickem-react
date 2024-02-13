import { Game } from "@/lib/http/games.ts";
import { Card, CardContent } from "@/components/ui/card.tsx";
import PickForm from "@/components/games/picks/pick-form.tsx";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Card>
      <CardContent className="my-2 pb-0 space-y-2">
        <PickForm game={game} />
      </CardContent>
    </Card>
  );
}
