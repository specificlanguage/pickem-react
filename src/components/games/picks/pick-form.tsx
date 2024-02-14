import { z } from "zod";
import { Game } from "@/lib/http/games.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form.tsx";
import SubmitButton from "@/components/forms/submit-button.tsx";
import { useState } from "react";
import GameInfo from "@/components/games/game-info.tsx";
import PickOptions from "@/components/games/picks/pick-options.tsx";
import { submitPick, transformFormDataToPicks } from "@/lib/http/picks.ts";
import { useAuth } from "@clerk/clerk-react";

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
  const { getToken } = useAuth();
  // todo: setError() when the game is too late to pick, or other validation error on serverside.

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

  /**
   * onSubmit - Handles the form submission.
   * The body is temporary, this does not actually submit to the server as of yet.
   * TODO: submit data to the server.
   * @param data
   */
  async function onSubmit(data: z.infer<typeof PickFormSchema>) {
    setLoading(true);
    const pick = transformFormDataToPicks(data, [game])[0]; // Function transforms a list, so just use the first element.
    await submitPick(pick, (await getToken()) ?? "");
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 py-4">
        <FormField
          control={form.control}
          name={game.id.toString()}
          render={({ field }) => <PickOptions field={field} game={game} />}
        />
        <GameInfo game={game} />
        <div className="flex justify-center">
          <SubmitButton isLoading={isLoading} />
        </div>
      </form>
    </Form>
  );
}
