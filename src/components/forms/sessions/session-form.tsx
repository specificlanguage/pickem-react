import { Form, FormField } from "@/components/ui/form.tsx";
import PickOptions from "@/components/games/picks/pick-options.tsx";
import GameInfo from "@/components/games/game-info.tsx";
import SubmitButton from "@/components/forms/submit-button.tsx";
import { z } from "zod";
import { Game } from "@/lib/http/games.ts";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitSessionPicks } from "@/lib/http/picks.ts";
import { useAuth } from "@clerk/clerk-react";

interface SessionFormProps {
  games: Game[];
}

export default function SessionForm({ games }: SessionFormProps) {
  const [isLoading, setLoading] = useState(false);
  const { getToken } = useAuth();

  // Parser to create the fields for the schema.
  const fields = games.map((game) => ({
    name: game.id.toString(),
    fieldType: z.enum([
      game.awayTeam_id.toString(),
      game.homeTeam_id.toString(),
    ]),
  }));

  const sessionFormSchema = z.object(
    Object.fromEntries(fields.map((field) => [field.name, field.fieldType])),
  );

  const form = useForm<z.infer<typeof sessionFormSchema>>({
    resolver: zodResolver(sessionFormSchema),
  });

  async function onSubmit(data: z.infer<typeof sessionFormSchema>) {
    setLoading(true);
    const pickList = Object.entries(data).map(([gameID, pick]) => ({
      gameID: parseInt(gameID),
      pickedHome:
        pick ===
        games
          .find((game) => game.id.toString() === gameID)
          ?.homeTeam_id.toString(),
      isSeries: false, // TODO: Implement series
    }));
    console.log(pickList);
    await submitSessionPicks(pickList, (await getToken()) ?? "");
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="py-4">
        {games.map((game, index) => (
          <div key={index}>
            <div className="flex flex-row gap-2 gap-x-8">
              <div className="basis-8/12">
                <FormField
                  control={form.control}
                  name={game.id.toString()}
                  render={({ field }) => (
                    <PickOptions field={field} game={game} />
                  )}
                />
              </div>
              <div className="basis-4/12">
                <GameInfo orientation={"vertical"} game={game} />
              </div>
            </div>
            {index < games.length - 1 && (
              <hr className="border-neutral-500 my-2" />
            )}
          </div>
        ))}

        <div className="flex justify-end">
          <SubmitButton className="text-lg px-6 py-6" isLoading={isLoading} />
        </div>
      </form>
    </Form>
  );
}
