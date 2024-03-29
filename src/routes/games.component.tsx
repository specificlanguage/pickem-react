import { useQuery } from "@tanstack/react-query";
import { Game, getGamesByDate, getStatusOfGames } from "@/lib/http/games.ts";
import GameCard from "@/components/games/game-card.tsx";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import GameSkeleton from "@/components/games/game-skeleton.tsx";
import GamesLayout from "@/layouts/games-layout.tsx";
import DatePicker from "@/components/date-picker.tsx";
import { add, startOfToday } from "date-fns";
import { useAuth } from "@clerk/clerk-react";
import { getMultiplePicks } from "@/lib/http/picks.ts";

export const component = function GamePage() {
  // Note: undefined will *never* occur, it is only used for type checking purposes.
  const [date, setDate] = useState<Date | undefined>(startOfToday());
  const { getToken } = useAuth();

  const {
    isLoading,
    isError,
    data: games,
    error,
  } = useQuery({
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

  const { data: statuses } = useQuery({
    queryKey: ["status", games?.map((game) => game.id)],
    queryFn: () => getStatusOfGames(games?.map((game) => game.id) ?? []),
    refetchInterval: 1000 * 60,
    enabled: games !== null && games !== undefined && games.length > 0,
  });

  const { data: picks } = useQuery({
    queryKey: ["picks", games?.map((game) => game.id)],
    queryFn: async () =>
      getMultiplePicks(
        games?.map((game) => game.id) ?? [],
        (await getToken()) ?? "",
      ),
    enabled: games !== null && games !== undefined && games.length > 0,
  });

  if (isError) {
    console.log(error);
  }
  if (games) {
    games?.sort(
      (g1, g2) =>
        new Date(g1.startTimeUTC).getTime() -
        new Date(g2.startTimeUTC).getTime(),
    );
    if (statuses) {
      games.forEach((game) => {
        game.status = statuses.find((s) => s.gameID === game.id);
      });
    }
  }

  return (
    <GamesLayout>
      <div className="mx-auto max-w-2xl space-y-2 mb-10">
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
          {games &&
            !isError &&
            (games.length === 0 ? (
              <div className="flex justify-center mx-auto text-lg font-bold ">
                No games today!
              </div>
            ) : (
              games.map((game: Game) => {
                return (
                  <GameCard
                    key={game.id}
                    game={game}
                    pick={
                      picks
                        ? picks.find((p) => p.gameID === game.id)
                        : undefined
                    }
                  />
                );
              })
            ))}
        </div>
      </div>
    </GamesLayout>
  );
};
