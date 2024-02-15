import { useQuery } from "@tanstack/react-query";
import { Game, getGamesByDate } from "@/lib/http/games.ts";
import GameCard from "@/components/games/game-card.tsx";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import GameSkeleton from "@/components/games/game-skeleton.tsx";
import GamesLayout from "@/layouts/games-layout.tsx";
import DatePicker from "@/components/date-picker.tsx";
import { add } from "date-fns";

export const component = function GamePage() {
  // Note: undefined will *never* occur, it is only used for type checking purposes.
  const [date, setDate] = useState<Date | undefined>(new Date(2024, 2, 28));

  const { isLoading, isError, data, error } = useQuery({
    queryKey: [
      "games",
      {
        year: date?.getFullYear(),
        month: date ? date.getMonth() + 1 : 0, // Why is month 0-indexed? Javascript moment.
        day: date?.getDate(),
      },
    ],
    queryFn: getGamesByDate,
  });

  if (isError) {
    console.log(error);
  }
  if (data) {
    data?.sort(
      (g1, g2) =>
        new Date(g1.startTimeUTC).getTime() -
        new Date(g2.startTimeUTC).getTime(),
    );
  }

  return (
    <GamesLayout>
      <div className="mx-auto max-w-xl space-y-2 mb-10">
        <h2 className="my-2 font-bold text-3xl">Games</h2>
        <div className="flex justify-between text-2xl">
          <span className="leading-8">
            <button
              className="inline-block align-middle"
              onClick={() => setDate(add(date ?? new Date(), { days: -1 }))}
            >
              <FaArrowLeft size={24} />
            </button>
          </span>
          <DatePicker date={date ?? new Date()} setDate={setDate} />
          <span className="leading-8 inline-block align-middle">
            <button
              className="inline-block align-middle"
              onClick={() => setDate(add(date ?? new Date(), { days: 1 }))}
            >
              <FaArrowRight size={24} />
            </button>
          </span>
        </div>
        <hr className="border-2 bg-foreground" />
        <div className="space-y-2">
          {isError && (
            <div className="flex justify-center mx-auto text-lg font-bold">
              Something went wrong... try again later!
            </div>
          )}
          {isLoading &&
            !isError &&
            Array.from({ length: 8 }, (_, i) => i).map((_, i) => {
              return <GameSkeleton key={i} />;
            })}
          {data &&
            !isError &&
            (data.length === 0 ? (
              <div className="flex justify-center mx-auto text-lg font-bold ">
                No games today!
              </div>
            ) : (
              data.map((game: Game) => {
                return <GameCard key={game.id} game={game} />;
              })
            ))}
        </div>
      </div>
    </GamesLayout>
  );
};
