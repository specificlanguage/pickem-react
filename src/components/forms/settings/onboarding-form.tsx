import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Select } from "@/components/ui/select.tsx";
import { useFetchTeams } from "@/lib/http/teams.ts";
import { Separator } from "@/components/ui/separator.tsx";
import { LuLoader2 } from "react-icons/lu";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";
import { setPreferences } from "@/lib/http/users.ts";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  FavoriteTeamSelection,
  FrequencyDescription,
  FrequencySelection,
} from "@/components/forms/settings/settings-form-components.tsx";

export default function OnboardingForm() {
  // TODO: abstract this into its own hook
  const { teams } = useFetchTeams();
  const [isLoading, setLoading] = useState(false);
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const qClient = useQueryClient();

  const onboardingFormSchema = z.object({
    favoriteTeam: z.string(),
    // otherFavorites: z.array(z.string()).max(3),
    selectionTiming: z.string(),
  });

  const onboardingForm = useForm<z.infer<typeof onboardingFormSchema>>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      favoriteTeam: "0",
      // otherFavorites: [],
      selectionTiming: "",
    },
  });

  async function onSubmit(values: z.infer<typeof onboardingFormSchema>) {
    setLoading(true);
    await setPreferences((await getToken()) ?? "", {
      favoriteTeam: parseInt(values.favoriteTeam),
      selectionTiming: values.selectionTiming,
    })
      .then((result) => {
        if (result) {
          qClient.invalidateQueries({ queryKey: ["prefs"] });
          setLoading(false);
          navigate({ to: "/" });
        } else {
          // TODO set message of error
          setLoading(false);
        }
      })
      .catch((err) => {
        /// TODO set error message
        console.log(err);
        setLoading(false);
      });
  }

  if (teams) {
    teams.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <Form {...onboardingForm}>
      <form onSubmit={onboardingForm.handleSubmit(onSubmit)}>
        {/* ====== FAVORITE TEAM =======*/}
        <FormField
          control={onboardingForm.control}
          name="favoriteTeam"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-xl tracking-tight">
                Favorite Team
              </FormLabel>
              <FormDescription>
                You'll be picking games for this team every session. You don't
                have to pick a team, but you can change it later.
              </FormDescription>
              <Select onValueChange={field.onChange}>
                <FavoriteTeamSelection />
              </Select>
              <FormMessage {...field} />
            </FormItem>
          )}
        />

        <div className="py-4">
          <Separator />
        </div>

        {/* ======== FREQUENCY ========== */}
        <FormField
          control={onboardingForm.control}
          name="selectionTiming"
          render={({ field }) => (
            <FormItem className="gap-y-1">
              <FormLabel className="font-bold text-xl tracking-tight">
                Frequency
              </FormLabel>
              <FormDescription>
                How many games do you want to pick each week?
              </FormDescription>
              <Select onValueChange={field.onChange}>
                <FrequencySelection />
              </Select>
              <FormMessage />
              <FrequencyDescription value={field.value} />
            </FormItem>
          )}
        />

        <div className="py-4">
          <Separator />
        </div>

        {/*===== Submission Button ========*/}
        <div className="flex justify-center">
          <Button type="submit" disabled={isLoading} className="float-right">
            {isLoading ? (
              <LuLoader2 className="mx-auto h-4 w-4 animate-spin" />
            ) : (
              "Let's Pick!"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
