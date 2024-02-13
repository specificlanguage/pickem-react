import { Form, FormField } from "@/components/ui/form.tsx";
import PickOptions from "@/components/games/picks/pick-options.tsx";
import GameInfo from "@/components/games/game-info.tsx";
import SubmitButton from "@/components/forms/submit-button.tsx";
import { z } from "zod";
import { Game } from "@/lib/http/games.ts";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

interface SessionFormProps {
  games: Game[];
  date: Date;
}

export default function SessionForm({ games, date }: SessionFormProps) {
  const [isLoading, setLoading] = useState(false);

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

  function onSubmit(data: z.infer<typeof sessionFormSchema>) {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    console.log(date);
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 py-4">
        {games.map((game, index) => (
          <>
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
            {index < games.length - 1 && <hr className="border-neutral-500" />}
          </>
        ))}

        <div className="flex justify-end">
          <SubmitButton className="text-lg px-6 py-6" isLoading={isLoading} />
        </div>
      </form>
    </Form>
  );
}
