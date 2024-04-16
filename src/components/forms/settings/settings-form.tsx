import * as z from "zod";
import { useAuth, useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Select } from "@/components/ui/select.tsx";
import {
  FavoriteTeamSelection,
  FormFeedbackMessage,
  FrequencyDescription,
  FrequencySelection,
} from "@/components/forms/settings/settings-form-components.tsx";
import { PreferencesResult, setPreferences } from "@/lib/http/users.ts";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { LuLoader2 } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";
import { Link } from "@tanstack/react-router";

interface SettingsFormsProps {
  preferences: PreferencesResult;
}

export default function SettingsForms({ preferences }: SettingsFormsProps) {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isError, setIsError] = useState(false);
  const qClient = useQueryClient();

  const settingsFormSchema = z.object({
    favoriteTeam: z.string().optional(),
    selectionTiming: z.string().optional(),
    description: z.string().optional(),
  });

  function showErrorMessage() {
    setIsError(true);
    setShowMessage(true);
  }

  async function onSubmit(values: z.infer<typeof settingsFormSchema>) {
    setLoading(true);
    setShowMessage(false);

    await setPreferences((await getToken()) ?? "", {
      ...(values.favoriteTeam
        ? { favoriteTeam: parseInt(values.favoriteTeam) }
        : {}),
      ...(values.selectionTiming
        ? { selectionTiming: values.selectionTiming }
        : {}),
      ...(values.description ? { description: values.description } : {}),
    })
      .then((result) => {
        if (result) {
          qClient.invalidateQueries({ queryKey: ["prefs"] });
          setLoading(false);
          setShowMessage(true);
          setTimeout(() => setShowMessage(false), 5000);
        } else {
          setLoading(false);
          showErrorMessage();
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        showErrorMessage();
      });
  }

  const settingsForm = useForm<z.infer<typeof settingsFormSchema>>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      favoriteTeam: preferences.favoriteTeam_id.toString(),
      selectionTiming: preferences.selectionTiming,
      description: preferences.description ?? "",
    },
  });

  return (
    <Form {...settingsForm}>
      <form
        onSubmit={settingsForm.handleSubmit(onSubmit)}
        className="my-5 space-y-10"
      >
        {/* ======= FAVORITE TEAM =============*/}
        <FormField
          control={settingsForm.control}
          name="favoriteTeam"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel className="font-bold text-xl tracking-tight">
                  Favorite Team
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FavoriteTeamSelection className="max-w-sm" />
                </Select>
              </div>
              <div className="h-5">
                <FormDescription>
                  You'll be picking games for this team every session. <br />{" "}
                  You don't have to pick a team, but you can change it later.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {/* ======= FREQUENCY =========*/}
        <FormField
          control={settingsForm.control}
          name="selectionTiming"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel className="font-bold text-xl tracking-tight">
                  Frequency
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FrequencySelection className="max-w-sm" />
                </Select>
              </div>
              <div className="h-32">
                <FrequencyDescription value={field.value ?? ""} />
              </div>
            </FormItem>
          )}
        />

        {/* ======= DESCRIPTION =========*/}
        <FormField
          control={settingsForm.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-xl tracking-tight">
                Description
              </FormLabel>
              <Textarea
                {...field}
                className="w-full h-24 p-2 border border-neutral-500 rounded-md"
              />
              <FormMessage {...field} />
              <FormDescription>
                This will show on your{" "}
                <Link
                  to={"/profile/$username"}
                  params={{ username: user?.username ?? "" }}
                >
                  <span className="text-primary">profile page.</span>
                </Link>
              </FormDescription>
            </FormItem>
          )}
        />

        <div className="flex justify-start items-center space-x-4">
          <Button type="submit" disabled={loading}>
            {loading ? (
              <LuLoader2 className="mx-auto h-4 w-4 animate-spin" />
            ) : (
              "Save options"
            )}
          </Button>
          {showMessage && (
            <div className="flex justify-start items-center space-x-2">
              <FaCheck color="green" />
              <FormFeedbackMessage
                isError={isError}
                message={
                  isError
                    ? "Something went wrong, try again later"
                    : "Preferences updated!"
                }
              />
            </div>
          )}
        </div>
      </form>
    </Form>
  );
}
