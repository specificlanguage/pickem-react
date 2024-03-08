import { Game } from "@/lib/http/games.ts";
import { format, utcToZonedTime } from "date-fns-tz";
import { FaCircle, FaRegCircle } from "react-icons/fa6";

export function GameStatusInningInfo({ game }: { game: Game }) {
  const status = game.status;
  if (!status) {
    return null;
  }

  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const zonedTime = utcToZonedTime(new Date(game.startTimeUTC + "Z"), timeZone);

  if (status.status === "SCHEDULED") {
    return (
      <span>
        {format(zonedTime, "h:mmaa zzz", {
          timeZone,
        })
          .replace("DT", "T")
          .replace("ST", "T")}
      </span>
    );
  }

  if (status.status === "COMPLETED") {
    return <span>Final</span>;
  }

  if (status.status === "POSTPONED") {
    return <span>Postponed</span>;
  }

  if (status.status === "IN_PROGRESS") {
    switch (status.isTopInning) {
      case 1:
        if (status.outs === 3) {
          // Yeah, this is how it is, MLB updates are fun.
          return (
            <span className="text-green-800 dark:text-green-500">
              Mid {status.currentInning ?? 0}
            </span>
          );
        } else {
          return (
            <div className="flex justify-between mr-2 text-green-800 dark:text-green-500">
              <span>Top {status.currentInning ?? 0}</span>
              <span className="flex justify-between mt-1.5 gap-0.5">
                {Array.from(new Array(status.outs ?? 0)).map(() => (
                  <FaCircle size={10} />
                ))}
                {Array.from(new Array(status.outs ? 3 - status.outs : 3)).map(
                  () => (
                    <FaRegCircle size={10} />
                  ),
                )}
              </span>
            </div>
          );
        }
      case 0:
        if (status.outs === 3) {
          return (
            <span className="text-green-800 dark:text-green-500">
              End {status.currentInning ?? 0}
            </span>
          );
        } else {
          return (
            <div className="flex justify-between mr-2 text-green-800 dark:text-green-500">
              <span>Bot {status.currentInning ?? 0}</span>
              <span className="flex justify-between mt-1.5 gap-0.5">
                {Array.from(new Array(status.outs ?? 0)).map(() => (
                  <FaCircle size={10} />
                ))}
                {Array.from(new Array(status.outs ? 3 - status.outs : 3)).map(
                  () => (
                    <FaRegCircle size={10} />
                  ),
                )}
              </span>
            </div>
          );
        }
    }
  }
}
