import icon from "@/assets/icon.png";
import { FormControl } from "@/components/ui/form.tsx";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { useFetchTeams } from "@/lib/http/teams.ts";
import { TeamLogo } from "@/components/teams/logos.tsx";
import {
  FaBaseball,
  FaCalendarDays,
  FaCalendarWeek,
  FaCircle,
  FaFlag,
} from "react-icons/fa6";

export function FavoriteTeamSelection({ className }: { className?: string }) {
  const { teams } = useFetchTeams();

  return (
    <>
      <FormControl className={className ?? ""}>
        <SelectTrigger>
          <SelectValue placeholder="Choose team..." className="text-gray-500" />
        </SelectTrigger>
      </FormControl>
      {/* Team selection here. */}
      <SelectContent>
        <SelectItem key={0} value={"0"}>
          {/* No team insert for the selection only. */}
          <div className="flex justify-between space-x-2">
            <img src={icon} height={32} width={32} alt={"No team"} />
            <div className="h-[32px] leading-[32px]">
              <p className="mx-auto inline-block align-center">No team</p>
            </div>
          </div>
        </SelectItem>

        {/* All other teams */}
        {teams
          ? teams.map((team) => (
              <SelectItem key={team.id} value={team.id.toString()}>
                <TeamLogo
                  height={32}
                  imageScheme={"spot"}
                  team={team}
                  imageOrientation={"left"}
                  useLabel="team"
                />
              </SelectItem>
            ))
          : null}
      </SelectContent>
    </>
  );
}

export function FrequencySelection({ className }: { className?: string }) {
  function SeriesFrequency() {
    return (
      <SelectItem value="series" disabled>
        <p className="flex justify-between items-center gap-x-2">
          <FaCalendarWeek /> Series (currently disabled in Beta)
        </p>
      </SelectItem>
    );
  }

  function DailyFrequency() {
    return (
      <SelectItem value="daily">
        <p className="font-bold flex justify-between items-center gap-x-2">
          <FaCalendarDays /> Daily
        </p>
      </SelectItem>
    );
  }

  function SingleTeamFrequency() {
    return (
      <SelectItem value="singleteam">
        <p className="font-bold flex justify-between items-center gap-x-2">
          <FaFlag /> Single Team
        </p>
      </SelectItem>
    );
  }

  function MarqueeFrequency() {
    return (
      <SelectItem value="marquee">
        <p className="font-bold flex justify-between items-center gap-x-2">
          <FaBaseball /> Marquee
        </p>
      </SelectItem>
    );
  }

  return (
    <>
      <FormControl className={className ?? ""}>
        <SelectTrigger>
          <SelectValue placeholder="Choose team..." className="text-gray-500" />
        </SelectTrigger>
      </FormControl>
      {/* Team selection here. */}
      <SelectContent>
        <SeriesFrequency />
        <DailyFrequency />
        <SingleTeamFrequency />
        <MarqueeFrequency />
      </SelectContent>
    </>
  );
}

export function FrequencyDescription({ value }: { value: string }) {
  let descriptionComponent: null | React.ReactNode = null;

  switch (value) {
    case "series":
      descriptionComponent = (
        <>
          <h3 className="text-xl">For casual fans</h3>
          <p className="text-sm">
            Series are games that are played in a row against the same team. You
            would select winners for four series, twice per week.
          </p>
          <span className="my-2 flex justify-start font-bold items-center gap-x-2">
            4 picks on Tuesday/Friday
            <FaCircle size={4} />8 picks/week
          </span>
        </>
      );
      break;
    case "daily":
      descriptionComponent = (
        <>
          <h3 className="text-xl">For baseball fanatics</h3>
          <p className="text-sm">
            You're a baseball fan, and you follow baseball (at least casually).
            <br className="my-2" />
            Baseball games are played every day, you would be picking one from
            your favorite team, and three others from around the league.
          </p>
          <span className="my-2 flex justify-start font-bold items-center gap-x-2">
            4 games/day
            <FaCircle size={4} />
            ~28 picks/week
          </span>
        </>
      );
      break;
    case "singleteam":
      descriptionComponent = (
        <>
          <h3 className="text-xl">For fans of one team</h3>
          <p className="text-sm">
            When you just care about that *one* team.
            <br className="my-2" />
            You would only pick games for your favorite team (or, if none
            selected, the marquee game), daily.
          </p>
          <span className="my-2 flex justify-start font-bold items-center gap-x-2">
            1 game/day
            <FaCircle size={4} />
            6-7 picks/week
          </span>
        </>
      );
      break;
    case "marquee":
      descriptionComponent = (
        <>
          <h3 className="text-xl">For baseball enthusiasts</h3>
          <p className="text-sm">
            When you're curious about what else is going on in the league.
            <br className="my-2" />
            You would only picks games for your favorite team and the marquee
            game of the day, daily.
          </p>
          <span className="my-2 flex justify-start font-bold items-center gap-x-2">
            2 games/day
            <FaCircle size={4} />
            ~14 picks/week
          </span>
        </>
      );
      break;
    default:
      descriptionComponent = (
        <>
          <p className="text-sm">
            You'll see more information about the frequency you pick here.
          </p>
        </>
      );
  }

  return (
    <div className="my-2 text-muted-foreground">{descriptionComponent}</div>
  );
}

export function ConfirmationMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return <p className="text-green-700 dark:text-green-500">{children}</p>;
}

export function ErrorMessage({ children }: { children: React.ReactNode }) {
  return <p className="text-destructive">{children}</p>;
}

export function FormFeedbackMessage({
  message,
  isError,
}: {
  message?: string;
  isError: boolean;
}) {
  if (isError) {
    return (
      <ErrorMessage>
        {message ?? "Something went wrong, try again later."}
      </ErrorMessage>
    );
  } else {
    return <ConfirmationMessage>{message ?? "Submitted!"}</ConfirmationMessage>;
  }
}
