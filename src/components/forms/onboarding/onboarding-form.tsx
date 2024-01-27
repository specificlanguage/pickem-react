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
import { useQuery } from "@tanstack/react-query";
import { getAllTeamInfo } from "@/lib/http/teams.ts";
import { TeamLogo } from "@/components/teams/logos.tsx";
// import SelectableRadioCard from "@/components/ui/selectable-card.tsx";
// import {
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import {
  FaApple,
  FaCalendar,
  FaCalendarDays,
  FaCalendarWeek,
} from "react-icons/fa6";
import { Label } from "@/components/ui/label.tsx";
import { FaCheck } from "react-icons/fa";
import { FrequencyCard } from "@/components/forms/onboarding/frequency-card.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { LuLoader2 } from "react-icons/lu";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";

export default function OnboardingForm() {
  // TODO: abstract this into its own hook
  const { data } = useQuery({
    queryKey: ["teams"],
    queryFn: () => getAllTeamInfo(),
  });
  const [isLoading, setLoading] = useState();

  const onboardingFormSchema = z.object({
    favoriteTeam: z.number(),
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
      favoriteTeam: "",
      // otherFavorites: [],
      selectionTiming: "",
    },
  });

  function onSubmit(values: z.infer<typeof onboardingFormSchema>) {
    setLoading(true);
    console.log(values); // TODO: send to server
  }

  if (data) {
    data.sort((a, b) => a.name.localeCompare(b.name));
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
                  {data
                    ? data.map((team) => (
                        <SelectItem key={team.id} value={team.id.toString()}>
                          <TeamLogo
                            height={32}
                            imageScheme={"spot"}
                            teamID={team.id}
                            imageOrientation={"left"}
                            useLabel="team"
                          />
                        </SelectItem>
                      ))
                    : null}
                </SelectContent>
              </Select>
              <FormDescription>
                You'll be picking games for this team (almost) every day. You
                don't have to pick a team, but you can change it later.
              </FormDescription>
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
              <FormControl>
                <RadioGroup
                  required
                  onValueChange={field.onChange}
                  className="grid grid-cols-2 gap-4"
                >
                  <FrequencyCard value="series">
                    <div className="min-h-48 space-y-2 text-left leading-5">
                      <p className="font-bold text-lg flex justify-between">
                        Series <FaCalendarWeek />
                      </p>
                      <p>
                        Series are a collection of games that are played in a
                        row.
                      </p>
                      <p>
                        You would select four series, <i>twice per week</i>,
                        resulting in 8 picks per week.
                      </p>
                    </div>
                  </FrequencyCard>

                  <FrequencyCard value="daily">
                    <div className="min-h-48 space-y-2 text-left leading-5">
                      <p className="font-bold text-lg flex justify-between">
                        Daily <FaCalendarDays />
                      </p>
                      <p>
                        This is recommended this for those who really follow
                        baseball.
                      </p>
                      <p>
                        You would select four series, <i>every day,</i>{" "}
                        resulting in about 28 picks per week.
                      </p>
                    </div>
                  </FrequencyCard>
                </RadioGroup>
              </FormControl>
              <FormMessage />
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
