import { z } from "zod";
import { Game } from "@/lib/http/games.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast.ts";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { RadioGroup } from "@/components/ui/radio-group.tsx";
import { TeamLogo } from "@/components/teams/logos.tsx";
import { useFetchTeams } from "@/lib/http/teams.ts";
import SubmitButton from "@/components/forms/submit-button.tsx";
import { useState } from "react";
import { OptionCard } from "@/components/forms/option-card.tsx";

interface PickFormProps {
  game: Game;
}

/**
 * PickForm - A short form that allows people to predict the winner for a certain game.
 *
 * This uses the TeamQuery as found in lib/http/teams.ts to fetch the teams for the game.
 * TODO later: prevent submissions if the timestamp is too late!
 *
 * @param game - Game that they are predicting the winner for.
 * @constructor
 */

export default function PickForm({ game }: PickFormProps) {
  const [isLoading, setLoading] = useState(false);
  // todo: setError() when the game is too late to pick, or other validation error on serverside.

  const { teams } = useFetchTeams();
  const awayTeam = teams?.find((team) => team.id === game.awayTeam_id);
  const homeTeam = teams?.find((team) => team.id === game.homeTeam_id);

  const PickFormSchema = z.object({
    team: z.enum([game.awayTeam_id.toString(), game.homeTeam_id.toString()], {
      required_error: "You must pick a team",
    }),
  });

  const form = useForm<z.infer<typeof PickFormSchema>>({
    resolver: zodResolver(PickFormSchema),
  });

  /**
   * onSubmit - Handles the form submission.
   * The body is temporary, this does not actually submit to the server as of yet.
   * TODO: submit data to the server.
   * @param data
   */
  function onSubmit(data: z.infer<typeof PickFormSchema>) {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    toast({
      title: "Pick submitted",
      description: (
        <p>
          You submitted:{" "}
          {data.team === game.awayTeam_id.toString()
            ? game.awayName
            : game.homeName}
        </p>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="team"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel htmlFor="team">Pick the winner:</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {/* TODO: background should be proportionally filled to those who picked it, like the YouTube polls.*/}
                  {/* ====== AWAY TEAM ========== */}
                  <OptionCard
                    value={game.awayTeam_id.toString()}
                    className="items-start"
                  >
                    <div className="space-y-2 leading-5">
                      {awayTeam ? (
                        <TeamLogo
                          imageOrientation={"left"}
                          useLabel={"team"}
                          team={awayTeam}
                          height={32}
                          imageScheme="spot"
                        />
                      ) : null}
                      {/* TODO: add team stats, proj. pitchers*/}
                    </div>
                  </OptionCard>

                  {/* ====== HOME TEAM ========== */}
                  <OptionCard
                    value={game.homeTeam_id.toString()}
                    className="items-start"
                  >
                    <div className="space-y-2 leading-5">
                      {homeTeam ? (
                        <TeamLogo
                          imageOrientation={"left"}
                          useLabel={"team"}
                          team={homeTeam}
                          height={32}
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
          )}
        />
        <div className="flex justify-center">
          <SubmitButton isLoading={isLoading} />
        </div>
      </form>
    </Form>
  );
}
