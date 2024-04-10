import { useQuery } from "@tanstack/react-query";
import {
  convertHistoryPickToGamePick,
  getPickHistory,
  HistoryPick,
} from "@/lib/http/picks.ts";
import { PreviousPickCard } from "@/components/games/picks/previous-pick-card.tsx";
import { format } from "date-fns-tz";
import { parseISO } from "date-fns";
import LoadingWheel from "@/components/loading-wheel.tsx";

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
  return (
    <div>
      <h2 className="text-xl my-4">
        {format(localDate, "MMMM d", { timeZone: "Etc/UTC" })}
      </h2>
      <div className="space-y-2">
        {picks.map((pick) => (
          <PreviousPickCard
            game={pick.game}
            pick={convertHistoryPickToGamePick(pick)}
            key={pick.game.id}
          />
        ))}
      </div>
    </div>
  );
}
