import { Form, FormField } from "@/components/ui/form.tsx";
import PickOptions from "@/components/games/picks/pick-options.tsx";
import GameInfo from "@/components/games/game-info.tsx";
import SubmitButton from "@/components/forms/submit-button.tsx";
import { z } from "zod";
import { Game } from "@/lib/http/games.ts";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  GamePick,
  submitSessionPicks,
  transformFormDataToPicks,
} from "@/lib/http/picks.ts";
import { useAuth } from "@clerk/clerk-react";
import GameTeamDisplay from "@/components/games/game-team-display.tsx";
import { isAfterStartTime } from "@/lib/datetime/gameDates.ts";

interface SessionFormProps {
  games: Game[];
  picks?: GamePick[];
}

export default function SessionForm({ games, picks }: SessionFormProps) {
  const [isLoading, setLoading] = useState(false);
  const [playerPicks, setPlayerPicks] = useState<GamePick[]>(picks ?? []);
  const { getToken } = useAuth();

  // Parser to create the fields for the schema.
  const fields = games
    .filter((game) => !isAfterStartTime(game))
    .map((game) => ({
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
    const submitPicks = transformFormDataToPicks(data, games);
    await submitSessionPicks(submitPicks, (await getToken()) ?? "");
    setPlayerPicks(submitPicks);
    setLoading(false);
  }

  function getPick(game: Game) {
    return playerPicks?.find((p) => p.gameID === game.id);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {games.map((game, index) => (
          <div key={index}>
            <div className="flex flex-row gap-2 gap-x-8">
              <div className="basis-8/12 m-2">
                <FormField
                  control={form.control}
                  name={game.id.toString()}
                  render={({ field }) =>
                    isAfterStartTime(game) || getPick(game) ? (
                      <GameTeamDisplay
                        game={game}
                        className="m-2"
                        showRecord={true}
                        pick={getPick(game) ?? undefined}
                      />
                    ) : (
                      <PickOptions
                        field={field}
                        game={game}
                        showRecord={true}
                      />
                    )
                  }
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
          <SubmitButton
            className="text-lg px-6 py-6"
            isLoading={isLoading}
            disable={picks && picks.length > 0}
          />
        </div>
      </form>
    </Form>
  );
}
