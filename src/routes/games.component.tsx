import { useQuery } from "@tanstack/react-query";
import { Game, getGamesByDate } from "@/lib/http/games.ts";
import GameCard from "@/components/games/game-card.tsx";
import { useState } from "react";
import { format } from "date-fns-tz";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export const component = function GamePage() {
  // const queryClient = useQueryClient();
  // Why is month 0-indexed? Javascript moment.
  const [date] = useState(new Date(2024, 3, 1));
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["games", { year: 2024, month: 4, day: 1 }],
    queryFn: getGamesByDate,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    console.log(error);
    return <div>Error: {error.message}</div>;
  } else {
    data?.sort(
      (g1, g2) =>
        new Date(g1.startTimeUTC).getTime() -
        new Date(g2.startTimeUTC).getTime(),
    );
    return (
      <div className="mx-auto max-w-lg space-y-2 my-2">
        <div className="flex justify-between text-white text-2xl">
          <span className="leading-8">
            <span className="inline-block align-middle">
              <FaArrowLeft size={24} />
            </span>
          </span>
          <h2>{format(date, "MMM d, yyy")}</h2>
          <span className="leading-8 inline-block align-middle">
            <span className="inline-block align-middle">
              <FaArrowRight size={24} />
            </span>
          </span>
        </div>
        <hr className="border-2" />
        <div className="space-y-2">
          {data?.map((game: Game) => {
            return <GameCard key={game.id} game={game} />;
          })}
        </div>
      </div>
    );
  }
};
