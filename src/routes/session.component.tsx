import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import {
  getSession,
  createSession,
  convertSessPickToGamePick,
} from "@/lib/http/picks.ts";
import GamesLayout from "@/layouts/games-layout.tsx";
import SessionForm from "@/components/forms/sessions/session-form.tsx";
import { useNavigate } from "@tanstack/react-router";
import LoadingWheel from "@/components/loading-wheel.tsx";
import { startOfToday } from "date-fns";

export const component = function SessionPick() {
  const [date] = useState<Date>(startOfToday());
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

      const res = await getSession({
        year,
        month,
        day,
        token: (await getToken()) ?? "",
      });

      if (res) {
        return {
          games: res.games,
          picks: convertSessPickToGamePick(res.picks),
        };
      }

      // Create session if none exists
      const newSess = await createSession({
        year,
        month,
        day,
        token: (await getToken()) ?? "",
      });
      if (newSess) {
        return {
          games: newSess.games,
          picks: convertSessPickToGamePick(newSess.picks),
        };
      } else {
        return null;
      }
    },
  });

  // Note: is temporary! This will be replaced with a proper info page telling people to sign in.
  if (isSignedIn === false) {
    navigate({ to: "/" });
  }

  // TODO: Add way to get sessions from previous days
  return (
    <GamesLayout>
      <div className="justify-center max-w-xl mx-auto my-6 space-y-2">
        <h3 className="text-3xl font-bold">Session</h3>
        <p className="text-lg">Pick the winners for each game!</p>
        <p className="text-[11pt]">
          These are the games that will be counted on the leaderboards. Be
          careful! You can't change your pick once you submit.
        </p>

        {isLoading ? (
          <LoadingWheel />
        ) : isError ? (
          <p>Error: {error.message}</p>
        ) : data ? (
          <SessionForm
            games={data?.games.sort(
              (g1, g2) =>
                new Date(g1.startTimeUTC).getTime() -
                new Date(g2.startTimeUTC).getTime(),
            )}
            picks={data?.picks}
          />
        ) : (
          "No games today!"
        )}
      </div>
    </GamesLayout>
  );
};
