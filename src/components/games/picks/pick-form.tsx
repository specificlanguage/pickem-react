import { z } from "zod";
import { Game } from "@/lib/http/games.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form.tsx";
import SubmitButton from "@/components/forms/submit-button.tsx";
import { useState } from "react";
import GameInfo from "@/components/games/game-info.tsx";
import PickOptions from "@/components/games/picks/pick-options.tsx";
import {
  GamePick,
  getPick,
  submitPick,
  transformFormDataToPicks,
} from "@/lib/http/picks.ts";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingWheel from "@/components/loading-wheel.tsx";
import { isAfterStartTime } from "@/lib/datetime/gameDates.ts";

interface PickFormProps {
  game: Game;
  id?: string;
  showSubmitButton?: boolean;
}

/**
 * PickForm - A short form that allows people to predict the winner for a certain game.
 *
 * This uses the TeamQuery as found in lib/http/teams.ts to fetch the teams for the game.
 * TODO later: prevent submissions if the timestamp is too late!
 *
 * @param game - Game that they are predicting the winner for.
 * @param id - Optional id for the form.
 * @param showSubmitButton - Whether to show the submit button. Should be used in conjunction with the id.
 * @constructor
 */

export default function PickForm({
  game,
  id,
  showSubmitButton = true,
}: PickFormProps) {
  const [isSubmitting, setSubmitting] = useState(false);
  const [pick, setPick] = useState<GamePick | undefined>(undefined);
  const { getToken } = useAuth();

  // todo: setError() when the game is too late to pick, or other validation error on serverside.
  const alreadyPicked = pick !== undefined && game.id === pick?.gameID;
  const isDisabled = alreadyPicked || isAfterStartTime(game);

  const fields = [
    {
      name: game.id.toString(),
      fieldType: z.enum([
        game.awayTeam_id.toString(),
        game.homeTeam_id.toString(),
      ]),
    },
  ];

  const PickFormSchema = z.object(
    Object.fromEntries(fields.map((field) => [field.name, field.fieldType])),
  );

  const form = useForm<z.infer<typeof PickFormSchema>>({
    resolver: zodResolver(PickFormSchema),
  });

  const qClient = useQueryClient();

  const { isLoading } = useQuery({
    queryKey: ["pick", game.id],
    queryFn: async () => {
      const resp = await getPick(game.id, (await getToken()) ?? "");
      setPick(resp ?? undefined);
      return resp ?? null;
    },
  });

  const mutation = useMutation({
    mutationFn: async (pick: GamePick) =>
      await submitPick(pick, (await getToken()) ?? ""),
    onSuccess: async () => {
      // Refresh all pick information
      await qClient.invalidateQueries({ queryKey: ["pick", game.id] });
      await qClient.invalidateQueries({ queryKey: ["pickData", game.id] });
      await qClient.invalidateQueries({ queryKey: ["picks"] });
    },
  });

  /**
   * onSubmit - Handles the form submission.
   * The body is temporary, this does not actually submit to the server as of yet.
   * TODO: submit data to the server.
   * @param data
   */
  async function onSubmit(data: z.infer<typeof PickFormSchema>) {
    setSubmitting(true);
    const pick = transformFormDataToPicks(data, [game])[0]; // Function transforms a list, so just use the first element.
    mutation.mutate(pick);
    setPick(pick);
    setSubmitting(false);
  }

  if (isLoading) {
    return (
      <div>
        <LoadingWheel />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 py-4"
        id={id}
      >
        <FormField
          control={form.control}
          name={game.id.toString()}
          render={({ field }) => (
            <PickOptions
              field={field}
              game={game}
              gamePick={pick ?? undefined}
            />
          )}
        />
        <GameInfo game={game} />
        {showSubmitButton ? (
          <div className="flex justify-center">
            <SubmitButton isLoading={isSubmitting} disable={isDisabled} />
          </div>
        ) : null}
      </form>
    </Form>
  );
}
