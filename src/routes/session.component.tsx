import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { getOrCreateSession } from "@/lib/http/picks.ts";
import GamesLayout from "@/layouts/games-layout.tsx";
import SessionForm from "@/components/forms/sessions/session-form.tsx";
import { useNavigate } from "@tanstack/react-router";

export const component = function SessionPick() {
  const [date] = useState<Date>(new Date(2024, 2, 28));
  const { getToken, isSignedIn } = useAuth();
  const navigate = useNavigate();

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
      const [, { year, month, day }] = queryKey as [
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

  // Note: is temporary! This will be replaced with a proper info page telling people to sign in.
  if (isSignedIn === false) {
    navigate({ to: "/" });
  }

  // TODO: join pick forms into a single form
  return (
    <GamesLayout>
      <div className="justify-center max-w-xl mx-auto my-6 space-y-2">
        <h3 className="text-3xl font-bold">Session</h3>
        <p className="text-lg">Pick the winners for each game!</p>
        <p className="text-[10pt]">
          These are the games that will be counted on the leaderboards.
        </p>
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error: {error.message}</p>
        ) : data ? (
          <SessionForm
            games={data?.sort(
              (g1, g2) =>
                new Date(g1.startTimeUTC).getTime() -
                new Date(g2.startTimeUTC).getTime(),
            )}
          />
        ) : (
          "No games today!"
        )}
      </div>
    </GamesLayout>
  );
};
