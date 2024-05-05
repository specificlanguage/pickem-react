import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { FaCheck } from "react-icons/fa";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { getUserRecord } from "@/lib/http/stats.ts";
import LoadingSpinner from "@/components/loading-wheel.tsx";
import {
  FaArrowRight,
  FaBaseballBatBall,
  FaCheckDouble,
} from "react-icons/fa6";
import { Link } from "@tanstack/react-router";
import { useFetchSession } from "@/lib/http/picks.ts";
import { isBefore, startOfToday, sub } from "date-fns";
import React from "react";
import { Separator } from "@/components/ui/separator.tsx";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";
import { format } from "date-fns-tz";
import { SmallGameCardsByDate } from "@/components/games/small-game-card.tsx";
import { MarqueeStatCard } from "@/components/games/dashboard/game-stats-card.tsx";

function DashboardCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="space-y-1">{children}</CardContent>
    </Card>
  );
}

export function StatsCards() {
  const { user } = useUser();

  const { data: userRecord } = useQuery({
    queryKey: ["userRecord", user?.username, "week"],
    queryFn: () => getUserRecord("week", user?.id),
  });

  return (
    <div className="mt-6 grid gap-4 lg:grid-cols-2">
      <DashboardCard title={"Total picks (past week)"} icon={<FaCheck />}>
        <div className="text-2xl font-bold">{userRecord?.total}</div>
      </DashboardCard>
      <DashboardCard
        title={"Correct picks (past week)"}
        icon={<FaCheckDouble />}
      >
        <div className="text-2xl font-bold">{userRecord?.correct ?? 0}</div>
        <p className="text-xs text-muted-foreground">
          {Math.round(
            ((userRecord?.correct ?? 0) /
              (userRecord && userRecord.total ? userRecord.total : 1)) *
              100,
          )}
          % accuracy
        </p>
      </DashboardCard>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const date = startOfToday();
  const yesterday = sub(date, { days: 1 });
  const { session, isLoading } = useFetchSession(date, getToken);

  const lastGameStarted = session
    ? isBefore(
        new Date(
          // Unreadable code, but at the end of the day, sorts games by time
          session.games.sort(
            (g1, g2) =>
              new Date(g1.startTimeUTC).getTime() -
              new Date(g2.startTimeUTC).getTime(),
            // Then makes sure the last game has started or not.
          )[session.games.length - 1].startTimeUTC,
        ),
        new Date(),
      )
    : false;

  if (isLoading) {
    return <LoadingSpinner size={48} />;
  }

  function NotPickedAlert() {
    return (
      <Alert className="border-yellow-500 bg-yellow-50 dark:text-accent">
        <FaBaseballBatBall color="black" />
        <AlertTitle>You haven't picked today yet!</AlertTitle>
        <AlertDescription>
          Go to{" "}
          <Link to={"/session"}>
            <span className="text-blue-500 hover:underline">
              the session page
            </span>
          </Link>{" "}
          to do today's picks.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col space-y-4 w-full">
      <div className="space-2">
        <StatsCards />
        <div className="flex justify-end m-2">
          <Link
            to={"/profile/$username"}
            params={{ username: user?.username ?? "" }}
          >
            <span className="flex flex-row text-xs text-muted-foreground items-center gap-2 hover:underline">
              See more in profile <FaArrowRight />
            </span>
          </Link>
        </div>
        <MarqueeStatCard />
      </div>
      <Separator />
      {session &&
      !lastGameStarted &&
      session.picks.length < session.games.length ? (
        <NotPickedAlert />
      ) : null}
      {session ? (
        <SmallGameCardsByDate
          date={startOfToday()}
          title={`Today's games (${format(startOfToday(), "MMM d, yyyy")})`}
        />
      ) : null}
      <SmallGameCardsByDate date={yesterday} title={`Yesterday's picks`} />
    </div>
  );
}
