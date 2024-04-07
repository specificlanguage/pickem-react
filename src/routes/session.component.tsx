import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import {
  convertSessPickToGamePick,
  getOrCreateSession,
  getSession,
} from "@/lib/http/picks.ts";
import GamesLayout from "@/layouts/games-layout.tsx";
import SessionForm from "@/components/forms/sessions/session-form.tsx";
import { useNavigate } from "@tanstack/react-router";
import LoadingWheel from "@/components/loading-wheel.tsx";
import { startOfToday, sub } from "date-fns";
import { PreviousPickCard } from "@/components/games/picks/previous-pick-card.tsx";
import { format } from "date-fns-tz";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

export const component = function SessionPick() {
  const [date] = useState<Date>(startOfToday());
  const { getToken, isSignedIn } = useAuth();
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    data: todaySession,
    error,
  } = useQuery({
    queryKey: [
      "session",
      {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
      },
    ],

    // Function to get or create a new session from the picks specified
    queryFn: () =>
      getOrCreateSession({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        token: getToken() ?? "",
      }),
  });
  const yesterday = sub(date, { days: 1 });
  const { data: yesterdaySession } = useQuery({
    queryKey: [
      "session",
      {
        year: yesterday.getFullYear(),
        month: yesterday.getMonth() + 1,
        day: yesterday.getDate(),
      },
    ],
    queryFn: async () => {
      const session = await getSession({
        year: yesterday.getFullYear(),
        month: yesterday.getMonth() + 1,
        day: yesterday.getDate(),
        token: getToken(),
      });
      if (session == null) {
        return null;
      }
      return {
        games: session.games,
        picks: convertSessPickToGamePick(session.picks),
      };
    },
  });

  // Note: is temporary! This will be replaced with a proper info page telling people to sign in.
  if (isSignedIn === false) {
    navigate({ to: "/" });
  }

  // TODO: Add way to get sessions from previous days
  return (
    <GamesLayout>
      <Helmet>
        <title>Pick | Pick'em</title>
      </Helmet>
      <div className="justify-center max-w-xl mx-auto my-6 space-y-2">
        <h3 className="text-3xl font-bold">Session</h3>
        <p className="text-lg">Pick the winners for each game!</p>
        <p className="text-[11pt]">
          These are the games that will be counted on the leaderboards. Be
          careful! You can't change your pick once you submit.
        </p>

        {isLoading ? (
          <LoadingWheel size={48} />
        ) : isError ? (
          <p>Error: {error?.message}</p>
        ) : todaySession ? (
          <SessionForm
            games={todaySession?.games.sort(
              (g1, g2) =>
                new Date(g1.startTimeUTC).getTime() -
                new Date(g2.startTimeUTC).getTime(),
            )}
            picks={todaySession?.picks}
          />
        ) : (
          "No games today!"
        )}
      </div>
      <hr className="justify-center max-w-xl mx-auto" />
      <div className="justify-center max-w-xl mx-auto my-6 space-y-2">
        <h4 className="font-bold text-lg">
          Yesterday's games ({format(yesterday, "PPP")}):
        </h4>
        {yesterdaySession?.games
          .sort(
            (g1, g2) =>
              new Date(g1.startTimeUTC).getTime() -
              new Date(g2.startTimeUTC).getTime(),
          )
          .map((game) => (
            <PreviousPickCard
              game={game}
              pick={yesterdaySession?.picks.find((p) => p.gameID === game.id)}
            />
          ))}
      </div>
    </GamesLayout>
  );
};
