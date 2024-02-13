import { FormControl, FormItem, FormMessage } from "@/components/ui/form.tsx";
import { RadioGroup } from "@/components/ui/radio-group.tsx";
import { OptionCard } from "@/components/forms/option-card.tsx";
import { TeamLogo } from "@/components/teams/logos.tsx";
import { ControllerRenderProps } from "react-hook-form";
import { Game } from "@/lib/http/games.ts";
import { useFetchTeams } from "@/lib/http/teams.ts";

interface PickOptionsProps {
  field: ControllerRenderProps<{ team: string }, "team">;
  game: Game;
}

/**
 * PickOptions - Radio Form object provides functionality to pick a team.
 * @param field - Form field to insert
 * @param game - Game to pick for
 * @constructor
 */
export default function PickOptions({ field, game }: PickOptionsProps) {
  const { teams } = useFetchTeams();
  const awayTeam = teams?.find((team) => team.id === game.awayTeam_id);
  const homeTeam = teams?.find((team) => team.id === game.homeTeam_id);

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
            className="items-start"
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
            className="items-start my-0"
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
