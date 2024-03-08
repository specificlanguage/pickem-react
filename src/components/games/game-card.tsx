import { Game } from "@/lib/http/games.ts";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { GameInfoCollapsible } from "@/components/games/game-info.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { GameButtonsCol } from "@/components/games/game-buttons-col.tsx";
import GameTeamDisplay from "@/components/games/game-team-display.tsx";
import { GamePick } from "@/lib/http/picks.ts";

interface GameCardProps {
  game: Game;
  pick?: GamePick;
}

export default function GameCard({ game, pick }: GameCardProps) {
  return (
    <Card data-testid={game.id}>
      <CardContent data-testid="game-card" className="p-0 m-0 space-y-2">
        <div className="flex flex-row pb-0 space-y-1 p-6 mb-2">
          <div className="basis-12/12 md:basis-8/12">
            <GameTeamDisplay game={game} pick={pick} />
          </div>
          <div className="invisible md:visible md:basis-1/12">
            <Separator orientation="vertical" />
          </div>
          <div className="invisible md:visible md:basis-3/12 flex flex-row">
            <div className="my-auto">
              <GameButtonsCol game={game} />
            </div>
          </div>
        </div>
        <GameInfoCollapsible game={game} />
      </CardContent>
    </Card>
  );
}
