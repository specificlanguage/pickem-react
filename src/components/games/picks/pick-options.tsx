import { FormControl, FormItem, FormMessage } from "@/components/ui/form.tsx";
import { RadioGroup } from "@/components/ui/radio-group.tsx";
import { OptionCard } from "@/components/forms/option-card.tsx";
import { TeamLogo } from "@/components/teams/logos.tsx";
import { ControllerRenderProps } from "react-hook-form";
import { Game } from "@/lib/http/games.ts";
import { useFetchTeams } from "@/lib/http/teams.ts";
import { GamePick, getAllPicks } from "@/lib/http/picks.ts";
import { useAuth } from "@clerk/clerk-react";
import { usePrefs } from "@/lib/http/users.ts";
import { CheckedIcon, FavoriteTeamIcon } from "@/components/games/icons.tsx";
import { useQuery } from "@tanstack/react-query";
import { isAfterStartTime } from "@/lib/datetime/gameDates.ts";
import { calculatePercentages } from "@/lib/picks.ts";

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
  const { getToken, userId } = useAuth();
  const { teams } = useFetchTeams();
  const { prefs } = usePrefs(getToken(), userId ?? "");
  const awayTeam = teams?.find((team) => team.id === game.awayTeam_id);
  const homeTeam = teams?.find((team) => team.id === game.homeTeam_id);

  // If the game has already started or the user has already picked these options, disable the pick options

  const alreadyPicked = gamePick !== undefined && game.id === gamePick.gameID;
  const isDisabled = alreadyPicked || isAfterStartTime(game);

  const pickedAway =
    field.value === game.awayTeam_id.toString() ||
    (alreadyPicked && !gamePick?.pickedHome);
  const pickedHome =
    field.value === game.homeTeam_id.toString() ||
    (alreadyPicked && gamePick?.pickedHome);

  const { data } = useQuery({
    queryKey: ["pickData", game.id],
    queryFn: async () => getAllPicks(game.id),
  });

  return (
    <FormItem>
      <FormControl>
        <RadioGroup
          onValueChange={field.onChange}
          defaultValue={field.value}
          className="gap-0"
        >
          {/* TODO: background should be proportionally filled to those who picked it, like the YouTube polls.*/}
          {/* ====== AWAY TEAM ========== */}
          <OptionCard
            value={game.awayTeam_id.toString()}
            disabled={isDisabled}
            showHighlight={pickedAway}
            fillPct={
              isDisabled && data ? calculatePercentages(data, true) : undefined
            }
            className={`items-start 
            ${isDisabled ? "opacity-50" : ""}`}
          >
            {awayTeam ? (
              <div className="leading-5 flex justify-between w-full space-x-0.5">
                <div
                  className="flex justify-start space-x-2"
                  id="pick-option-home-logo"
                >
                  <TeamLogo
                    imageOrientation={"left"}
                    useLabel={"team"}
                    team={awayTeam}
                    height={32.25}
                    textSize="lg"
                    imageScheme="spot"
                  />
                  <div id="pick-option-away-is-favorite-team">
                    {prefs?.favoriteTeam_id === game.awayTeam_id && (
                      <FavoriteTeamIcon />
                    )}
                  </div>
                  <div id="pick-option-away-selected">
                    {pickedAway ? <CheckedIcon /> : null}
                  </div>
                </div>
                <div
                  id="pick-option-home-selection-data"
                  className="flex justify-end leading-7"
                >
                  {isDisabled && data
                    ? calculatePercentages(data, true) + "%"
                    : null}
                </div>
              </div>
            ) : null}
            {/* TODO: add team stats, proj. pitchers*/}
          </OptionCard>

          {/* ====== HOME TEAM ========== */}
          <OptionCard
            value={game.homeTeam_id.toString()}
            disabled={isDisabled}
            showHighlight={pickedHome}
            fillPct={
              isDisabled && data ? calculatePercentages(data, false) : undefined
            }
            className={`items-start 
            ${isDisabled && data ? "opacity-50" : ""}`}
          >
            {homeTeam ? (
              <div className="flex justify-between w-full space-x-0.5 leading-5">
                <div
                  className="flex justify-start space-x-2"
                  id="pick-option-home-logo"
                >
                  <TeamLogo
                    imageOrientation={"left"}
                    useLabel={"team"}
                    team={homeTeam}
                    height={32.25}
                    textSize="lg"
                    imageScheme="spot"
                  />
                  <div id="pick-option-home-is-favorite-team">
                    {prefs?.favoriteTeam_id === game.homeTeam_id && (
                      <FavoriteTeamIcon />
                    )}
                  </div>
                  <div id="pick-option-home-selected">
                    {pickedHome ? <CheckedIcon /> : null}
                  </div>
                </div>
                <div
                  id="pick-option-home-selection-data"
                  className="flex justify-end leading-7"
                >
                  {isDisabled && data
                    ? calculatePercentages(data, false) + "%"
                    : null}
                </div>
              </div>
            ) : null}
            {/* TODO: add team stats, proj. pitchers*/}
          </OptionCard>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
