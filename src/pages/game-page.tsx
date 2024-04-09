import { add, isSameDay, startOfToday } from "date-fns";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import DatePicker from "@/components/date-picker.tsx";
import GameSkeleton from "@/components/games/game-skeleton.tsx";
import {
  Game,
  useFetchGamesByDate,
  useFetchStatusesByDate,
} from "@/lib/http/games.ts";
import GameCard from "@/components/games/game-card.tsx";
import { useState } from "react";
import { useFetchPicksByDate } from "@/lib/http/picks.ts";
import { useAuth } from "@clerk/clerk-react";

export default function GamePage() {
  const [date, setDate] = useState<Date | undefined>(startOfToday());

  return (
    <div className="mx-auto max-w-2xl space-y-2 mb-10 justify-center">
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
        <DatePicker date={date ?? startOfToday()} setDate={setDate} />
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
      <GameList date={date ?? startOfToday()} />
    </div>
  );
}

function GameList({ date }: { date: Date }) {
  const { getToken } = useAuth();

  // Retrieve games
  const { isLoading, isError, games } = useFetchGamesByDate(
    date ?? startOfToday(),
  );

  // Retrieve picks
  const { picks } = useFetchPicksByDate(
    date ?? startOfToday(),
    games !== null && games !== undefined && games.length > 0,
    getToken,
  );

  // Retrieve statuses
  const { statuses } = useFetchStatusesByDate(
    date ?? startOfToday(),
    games !== undefined && games.length > 0 && isSameDay(date, startOfToday()),
  );

  // Add statuses to the games present, sort by time
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
                  picks ? picks.find((p) => p.gameID === game.id) : undefined
                }
              />
            );
          })
        ))}
    </div>
  );
}
