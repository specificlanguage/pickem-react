import { Separator } from "@/components/ui/separator.tsx";
import LoadingSpinner from "@/components/loading-wheel.tsx";
import SettingsForms from "@/components/forms/settings/settings-form.tsx";
import { useAuth } from "@clerk/clerk-react";
import { usePrefs } from "@/lib/http/users.ts";

export default function SettingsPage() {
  const { getToken, userId } = useAuth();
  const { prefs, isLoading } = usePrefs(getToken(), userId ?? "");

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="font-bold text-2xl">Settings</h2>
      <Separator className="my-2" />
      {isLoading || !prefs ? (
        <LoadingSpinner size={48} />
      ) : (
        <SettingsForms preferences={prefs} />
      )}
    </div>
  );
}
