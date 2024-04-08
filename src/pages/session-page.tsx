import LoadingWheel from "@/components/loading-wheel.tsx";
import SessionForm from "@/components/forms/sessions/session-form.tsx";
import { useFetchSession } from "@/lib/http/picks.ts";
import { useAuth } from "@clerk/clerk-react";
import { format } from "date-fns-tz";
import { PreviousPickCard } from "@/components/games/picks/previous-pick-card.tsx";
import { startOfToday, sub } from "date-fns";

export default function SessionPage() {
  const date = startOfToday();
  const yesterday = sub(date, { days: 1 });

  return (
    <div className="justify-center max-w-xl mx-auto my-6 space-y-2">
      <h3 className="text-3xl font-bold">Session</h3>
      <p className="text-lg">Pick the winners for each game!</p>
      <p className="text-[11pt]">
        These are the games that will be counted on the leaderboards. Be
        careful! You can't change your pick once you submit.
      </p>
      <SessionPickForm date={date} />
      <PreviousPicks date={yesterday} />
    </div>
  );
}

function SessionPickForm({ date }: { date: Date }) {
  const { getToken } = useAuth();

  const { isLoading, isError, session, error } = useFetchSession(
    date,
    getToken,
  );

  return (
    <>
      {isLoading ? (
        <LoadingWheel size={48} />
      ) : isError ? (
        <p>Error: {error?.message}</p>
      ) : session ? (
        <SessionForm
          games={session?.games.sort(
            (g1, g2) =>
              new Date(g1.startTimeUTC).getTime() -
              new Date(g2.startTimeUTC).getTime(),
          )}
          picks={session?.picks}
        />
      ) : (
        "No games today!"
      )}
    </>
  );
}

function PreviousPicks({ date }: { date: Date }) {
  const { getToken } = useAuth();

  const { isLoading, session } = useFetchSession(date, getToken);

  if (isLoading) {
    return null;
  }

  return (
    <div className="justify-center max-w-xl mx-auto mt-8 space-y-2">
      <h4 className="font-bold text-lg mt-4">
        Yesterday's games ({format(date, "PPP")}):
      </h4>
      {session?.games
        .sort(
          (g1, g2) =>
            new Date(g1.startTimeUTC).getTime() -
            new Date(g2.startTimeUTC).getTime(),
        )
        .map((game) => (
          <PreviousPickCard
            game={game}
            pick={session?.picks.find((p) => p.gameID === game.id)}
          />
        ))}
    </div>
  );
}
