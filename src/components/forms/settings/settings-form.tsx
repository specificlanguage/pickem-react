import * as z from "zod";
import { useUser } from "@clerk/clerk-react";
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
import { FavoriteTeamSelection } from "@/components/forms/settings/settings-form-components.tsx";

export default function SettingsForm() {
  const { isSignedIn } = useUser();

  const settingsFormSchema = z.object({
    favoriteTeam: z.string(),
    selectionTiming: z.string(),
    description: z.string(),
  });

  const settingsForm = useForm<z.infer<typeof settingsFormSchema>>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      favoriteTeam: "0",
      selectionTiming: "",
      description: "",
    },
  });

  async function onSubmit() {}

  if (!isSignedIn) {
    return null;
  }

  return (
    <Form {...settingsForm}>
      <form onSubmit={settingsForm.handleSubmit(onSubmit)}>
        {/* ======= FAVORITE TEAM =============*/}
        <FormField
          control={settingsForm.control}
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
      </form>
    </Form>
  );
}
