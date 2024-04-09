import LoadingWheel from "@/components/loading-wheel.tsx";
import SessionForm from "@/components/forms/sessions/session-form.tsx";
import { useFetchSession } from "@/lib/http/picks.ts";
import { useAuth } from "@clerk/clerk-react";
import { format } from "date-fns-tz";
import { PreviousPickCard } from "@/components/games/picks/previous-pick-card.tsx";
import { add, isSameDay, startOfToday, sub } from "date-fns";
import {
  joinGamesWithStatuses,
  useFetchStatusesByDate,
} from "@/lib/http/games.ts";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";

export default function SessionPage() {
  const date = startOfToday();
  const yesterday = sub(date, { days: 1 });
  const tomorrow = add(date, { days: 1 });

  return (
    <div className="justify-center max-w-xl mx-auto my-6 space-y-2">
      <h3 className="text-3xl font-bold">Session</h3>
      <p className="text-lg">Pick the winners for each game!</p>
      <Tabs defaultValue={"today"}>
        <div className="flex justify-between">
          <div>
            <TabsContent
              value="today"
              className="flex justify-start gap-2 mt-0"
            >
              <h4 className="text-2xl font-bold">Today's games</h4>
              <p className="text-2xl">({format(date, "MMMM d")})</p>
            </TabsContent>
            <TabsContent
              value="tomorrow"
              className="flex justify-start gap-2 mt-0"
            >
              <h4 className="text-2xl font-bold">Tomorrow's games</h4>
              <p className="text-2xl">({format(tomorrow, "MMMM d")})</p>
            </TabsContent>
          </div>
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="today">
          <SessionPickForm date={date} />
        </TabsContent>
        <TabsContent value="tomorrow">
          <SessionPickForm date={tomorrow} />
        </TabsContent>
      </Tabs>
      <div className="mt-6">
        <PreviousPicks date={yesterday} />
      </div>
    </div>
  );
}

function SessionPickForm({ date }: { date: Date }) {
  const { getToken } = useAuth();

  const { isLoading, isError, session, error } = useFetchSession(
    date,
    getToken,
  );

  const shouldFetchStatus = session
    ? session.games && isSameDay(date, startOfToday())
    : false;

  const { statuses } = useFetchStatusesByDate(
    date ?? startOfToday(),
    shouldFetchStatus,
  );

  if (session && statuses && shouldFetchStatus) {
    joinGamesWithStatuses(session.games, statuses);
  }

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
            key={game.id}
            game={game}
            pick={session?.picks.find((p) => p.gameID === game.id)}
          />
        ))}
    </div>
  );
}
