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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { TeamLogo } from "@/components/teams/logos.tsx";
import { useFetchTeams } from "@/lib/http/teams.ts";
import SubmitButton from "@/components/forms/submit-button.tsx";
import { useState } from "react";

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
                  className="flex flex-col space-y-1"
                >
                  {/* ====== AWAY TEAM ========== */}
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem
                        value={game.awayTeam_id.toString()}
                        id={game.awayTeam_id.toString()}
                      />
                    </FormControl>
                    <FormLabel className="text-xl">
                      {awayTeam ? (
                        <TeamLogo
                          imageOrientation={"right"}
                          label={awayTeam.name}
                          team={awayTeam}
                          height={32}
                          imageScheme="spot"
                        />
                      ) : (
                        game.awayName
                      )}
                    </FormLabel>
                  </FormItem>

                  {/* ====== HOME TEAM ========== */}
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem
                        value={game.homeTeam_id.toString()}
                        id={game.homeTeam_id.toString()}
                      />
                    </FormControl>
                    <FormLabel className="text-xl">
                      {homeTeam ? (
                        <TeamLogo
                          imageOrientation={"right"}
                          label={homeTeam.name}
                          team={homeTeam}
                          height={32}
                          imageScheme="spot"
                        />
                      ) : (
                        game.homeName
                      )}
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton isLoading={isLoading} />
      </form>
    </Form>
  );
}
