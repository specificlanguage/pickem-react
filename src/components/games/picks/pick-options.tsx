import { FormControl, FormItem, FormMessage } from "@/components/ui/form.tsx";
import { RadioGroup } from "@/components/ui/radio-group.tsx";
import { OptionCard } from "@/components/forms/option-card.tsx";
import { TeamLogo } from "@/components/teams/logos.tsx";
import { ControllerRenderProps } from "react-hook-form";
import { Game } from "@/lib/http/games.ts";
import { useFetchTeams } from "@/lib/http/teams.ts";
import { GamePick } from "@/lib/http/picks.ts";

interface PickOptionsProps {
  field: ControllerRenderProps<{ [x: string]: string }, string>;
  game: Game;
  gamePick?: GamePick;
}

/**
 * PickOptions - Radio Form object provides functionality to pick a team.
 * @param field - Form field to insert
 * @param game - Game to pick for. If the game start time is past the current time, disables the pick options.
 * @param gamePick - The current pick for the game, if it exists. If present and matches the game ID, disables the pick options.
 * @constructor
 */
export default function PickOptions({
  field,
  game,
  gamePick,
}: PickOptionsProps) {
  const { teams } = useFetchTeams();
  const awayTeam = teams?.find((team) => team.id === game.awayTeam_id);
  const homeTeam = teams?.find((team) => team.id === game.homeTeam_id);

  // If the game has already started or the user has already picked these options, disable the pick options

  const alreadyPicked = gamePick !== undefined && game.id === gamePick.gameID;
  const isDisabled = alreadyPicked || new Date(game.date) < new Date();

  const defaultValue = alreadyPicked
    ? gamePick.pickedHome
      ? game.homeTeam_id.toString()
      : game.awayTeam_id.toString()
    : field.value;

  return (
    <FormItem>
      <FormControl>
        <RadioGroup
          onValueChange={field.onChange}
          defaultValue={defaultValue}
          className="gap-0"
        >
          {/* TODO: background should be proportionally filled to those who picked it, like the YouTube polls.*/}
          {/* ====== AWAY TEAM ========== */}
          <OptionCard
            value={game.awayTeam_id.toString()}
            disabled={isDisabled}
            className={`items-start ${isDisabled ? "opacity-50" : ""}`}
          >
            <div className="leading-5">
              {awayTeam ? (
                <TeamLogo
                  imageOrientation={"left"}
                  useLabel={"team"}
                  team={awayTeam}
                  height={32.25}
                  textSize="lg"
                  imageScheme="spot"
                />
              ) : null}
              {/* TODO: add team stats, proj. pitchers*/}
            </div>
          </OptionCard>

          {/* ====== HOME TEAM ========== */}
          <OptionCard
            value={game.homeTeam_id.toString()}
            disabled={isDisabled}
            className={`items-start ${isDisabled ? "opacity-50" : ""}`}
          >
            <div className="leading-5">
              {homeTeam ? (
                <TeamLogo
                  imageOrientation={"left"}
                  useLabel={"team"}
                  team={homeTeam}
                  height={32.25}
                  textSize="lg"
                  imageScheme="spot"
                />
              ) : null}
              {/* TODO: add team stats, proj. pitchers*/}
            </div>
          </OptionCard>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
