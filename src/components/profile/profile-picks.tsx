import { useQuery } from "@tanstack/react-query";
import {
  convertHistoryPickToGamePick,
  getPickHistory,
  HistoryPick,
} from "@/lib/http/picks.ts";
import { format } from "date-fns-tz";
import { isToday, parseISO } from "date-fns";
import LoadingWheel from "@/components/loading-wheel.tsx";
import { SmallGameCard } from "@/components/games/small-game-card.tsx";
import {
  joinGamesWithStatuses,
  useFetchStatusesByDate,
} from "@/lib/http/games.ts";

export default function ProfilePicks({ username }: { username: string }) {
  const { data: picks, isLoading } = useQuery({
    queryKey: ["history", username],
    queryFn: () => getPickHistory(undefined, username),
  });

  if (isLoading) {
    return (
      <div className="my-8">
        <LoadingWheel size={48} />
      </div>
    );
  }

  if (!picks) {
    // TODO: make temporary UI to show this user has made no picks
    return null;
  }

  const groupedByDate = picks.reduce(
    (acc: { [date: string]: HistoryPick[] }, pick) => ({
      ...acc,
      [pick.game.date]: [...(acc[pick.game.date] || []), pick],
    }),
    {},
  );

  return (
    <div>
      {Object.entries(groupedByDate).map(([date, picks]) => (
        <ProfilePicksDate date={date} picks={picks} key={date} />
      ))}
    </div>
  );
}

export function ProfilePicksDate({
  date,
  picks,
}: {
  date: string;
  picks: HistoryPick[];
}) {
  const localDate = parseISO(date);
  const { statuses } = useFetchStatusesByDate(localDate, isToday(localDate));
  if (statuses) {
    joinGamesWithStatuses(
      picks.map((p) => p.game),
      statuses,
    );
  }
  return (
    <div>
      <h2 className="text-xl my-4">
        {format(localDate, "MMMM d", { timeZone: "Etc/UTC" })}
      </h2>
      <div className="space-y-2">
        {picks.map((pick) => (
          <SmallGameCard
            game={pick.game}
            pick={convertHistoryPickToGamePick(pick)}
            key={pick.game.id}
          />
        ))}
      </div>
    </div>
  );
}
