import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { useFetchTeams } from "@/lib/http/teams.ts";
import { TeamLogo } from "@/components/teams/logos.tsx";
import { RadioGroup } from "@/components/ui/radio-group.tsx";
import { FaCalendarDays, FaCalendarWeek } from "react-icons/fa6";
import { OptionCard } from "@/components/forms/option-card.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { LuLoader2 } from "react-icons/lu";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";
import { setPreferences } from "@/lib/http/users.ts";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "@tanstack/react-router";

export default function OnboardingForm() {
  // TODO: abstract this into its own hook
  const { teams } = useFetchTeams();
  const [isLoading, setLoading] = useState(false);
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const onboardingFormSchema = z.object({
    favoriteTeam: z.string(),
    // otherFavorites: z.array(z.string()).max(3),
    selectionTiming: z.string(),
  });
  // .refine((data) => data.otherFavorites.includes(data.favoriteTeam), {
  //   message: "Passwords must match",
  //   path: ["confirm"],
  // });

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
          console.log("submitted");
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
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Choose team..."
                      className="text-gray-500"
                    />
                  </SelectTrigger>
                </FormControl>
                {/* Team selection here. */}
                <SelectContent>
                  <SelectItem key={0} value={"0"}>
                    {/* No team insert for the selection only. */}
                    <div className="flex justify-between space-x-2">
                      <img
                        src={
                          "https://midfield.mlbstatic.com/v1/team/343/spots/"
                        }
                        height={32}
                        width={32}
                        alt={"No team"}
                      />
                      <div className="h-[32px] leading-[32px]">
                        <p className="mx-auto inline-block align-center">
                          No team
                        </p>
                      </div>
                    </div>
                  </SelectItem>

                  {/* All other teams */}
                  {teams
                    ? teams.map((team) => (
                        <SelectItem key={team.id} value={team.id.toString()}>
                          <TeamLogo
                            height={32}
                            imageScheme={"spot"}
                            team={team}
                            imageOrientation={"left"}
                            useLabel="team"
                          />
                        </SelectItem>
                      ))
                    : null}
                </SelectContent>
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
            <FormItem className="space-y-1">
              <FormLabel className="font-bold text-xl tracking-tight">
                Frequency
              </FormLabel>
              <FormDescription>
                This asks how many sessions of picking you're going to look at
                per week.
              </FormDescription>
              <FormControl>
                <RadioGroup
                  required
                  onValueChange={field.onChange}
                  className="grid grid-cols-2 gap-4"
                >
                  <OptionCard value="series">
                    <div className="min-h-48 space-y-2 text-left leading-5">
                      <p className="font-bold text-lg flex justify-between">
                        Series <FaCalendarWeek />
                      </p>
                      <p>
                        Series are games that are played in a row against the
                        same team.
                      </p>
                      <p>
                        You would select winners for four series,{" "}
                        <i>twice per week</i>, about 8 picks per week.
                      </p>
                    </div>
                  </OptionCard>

                  <OptionCard value="daily">
                    <div className="min-h-48 space-y-2 text-left leading-5">
                      <p className="font-bold text-lg flex justify-between">
                        Daily <FaCalendarDays />
                      </p>
                      <p>
                        Baseball is played every day, recommended for true fans.
                      </p>
                      <p>
                        You would select winners for four series,{" "}
                        <i>every day,</i> about 28 picks per week.
                      </p>
                    </div>
                  </OptionCard>
                </RadioGroup>
              </FormControl>
              <FormMessage />
              <FormDescription>
                More options for picking will come soon. You can also pick daily
                games if you choose series regardless of this option, but they
                won't count towards the leaderboard.
              </FormDescription>
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
