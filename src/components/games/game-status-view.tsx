import { Game } from "@/lib/http/games.ts";
import { format, utcToZonedTime } from "date-fns-tz";
import { FaCircle, FaClock, FaRegCircle } from "react-icons/fa6";

function getOrdinalSuffix(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function OutsDisplay({ outs }: { outs?: number }) {
  return (
    <span className="flex justify-between mt-1.5 gap-0.5">
      {Array.from(new Array(outs ?? 0)).map((_, index) => (
        <FaCircle key={index} size={10} />
      ))}
      {Array.from(new Array(outs ? 3 - outs : 3)).map((_, index) => (
        <FaRegCircle key={index} size={10} />
      ))}
    </span>
  );
}

export function GameStatusInningInfo({ game }: { game: Game }) {
  const status = game.status;
  if (!status) {
    return null;
  }

  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const zonedTime = utcToZonedTime(new Date(game.startTimeUTC + "Z"), timeZone);

  if (status.status === "SCHEDULED") {
    return (
      <span className="flex justify-start gap-x-2">
        <p className="mt-1">
          <FaClock />
        </p>
        <p>
          {format(zonedTime, "h:mmaa zzz", {
            timeZone,
          })
            .replace("DT", "T")
            .replace("ST", "T")}
        </p>
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
              Mid {getOrdinalSuffix(status.currentInning ?? 0)}
            </span>
          );
        } else {
          return (
            <div className="flex justify-between mr-2 text-green-800 dark:text-green-500">
              <span>Top {getOrdinalSuffix(status.currentInning ?? 0)}</span>
              <OutsDisplay outs={status.outs ?? 0} />
            </div>
          );
        }
      case 0:
        if (status.outs === 3) {
          return (
            <span className="text-green-800 dark:text-green-500">
              End {getOrdinalSuffix(status.currentInning ?? 0)}
            </span>
          );
        } else {
          return (
            <div className="flex justify-between mr-2 text-green-800 dark:text-green-500">
              <span>Bot {getOrdinalSuffix(status.currentInning ?? 0)}</span>
              <OutsDisplay outs={status.outs ?? 0} />
            </div>
          );
        }
    }
  }
}
