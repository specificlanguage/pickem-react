import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import PickCard from "@/components/games/picks/pick-card";
import { useAuth } from "@clerk/clerk-react";
import { getOrCreateSession } from "@/lib/http/picks.ts";
import GamesLayout from "@/layouts/games-layout.tsx";

export const component = function SessionPick() {
  const [date] = useState<Date>(new Date(2024, 2, 28));
  const { getToken } = useAuth();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: [
      "session",
      {
        year: date?.getFullYear(),
        month: date ? date.getMonth() + 1 : 0,
        day: date?.getDate(),
      },
    ],

    // Function to get or create a new session from the picks specified
    queryFn: async ({ queryKey }) => {
      const [key, { year, month, day }] = queryKey as [
        string,
        { year: number; month: number; day: number },
      ];
      const res = await getOrCreateSession({
        year,
        month,
        day,
        token: (await getToken()) ?? "",
      });
      if (res) {
        return res.games;
      }
    },
  });

  // TODO: join pick forms into a single form
  return (
    <GamesLayout>
      <div className="justify-center max-w-lg mx-auto my-6 space-y-6">
        <h3 className="text-3xl font-bold">Session</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error: {error.message}</p>
        ) : data ? (
          data
            ?.sort(
              (g1, g2) =>
                new Date(g1.startTimeUTC).getTime() -
                new Date(g2.startTimeUTC).getTime(),
            )
            .map((game) => {
              return <PickCard key={game.id} game={game} />;
            })
        ) : (
          "No games today!"
        )}
      </div>
    </GamesLayout>
  );
};
