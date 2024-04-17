import { Separator } from "@/components/ui/separator.tsx";
import LoadingSpinner from "@/components/loading-wheel.tsx";
import SettingsForms from "@/components/forms/settings/settings-form.tsx";
import { useAuth } from "@clerk/clerk-react";
import { usePrefs } from "@/lib/http/users.ts";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { AuthSettingsForm } from "@/components/forms/settings/auth-settings-form.tsx";

export default function SettingsPage() {
  const { getToken, userId } = useAuth();
  const { prefs, isLoading } = usePrefs(getToken(), userId ?? "");

  const [settingsScreen, setSettingsScreen] = useState("main");

  function SettingsHeader() {
    return (
      <div className="flex h-5 items-center space-x-4 text-sm">
        <Button
          className={
            "px-2 py-0 text-primary hover:text-primary-foreground-hover " +
            (settingsScreen === "main" ? "font-bold" : "")
          }
          variant="link"
          onClick={() => setSettingsScreen("main")}
        >
          Preferences
        </Button>
        <Separator orientation="vertical" />
        <Button
          className={
            "px-2 py-0 text-primary hover:text-primary-foreground-hover " +
            (settingsScreen === "auth" ? "font-bold" : "")
          }
          variant="link"
          onClick={() => setSettingsScreen("auth")}
        >
          Authentication
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="font-bold text-2xl">Settings</h2>
      {isLoading || !prefs ? (
        <LoadingSpinner size={48} />
      ) : (
        <div className="space-y-4">
          <div>
            <Separator className="my-2" />
            <SettingsHeader />
            <Separator className="my-2" />
          </div>
          {settingsScreen === "main" ? (
            <SettingsForms preferences={prefs} />
          ) : (
            <AuthSettingsForm />
          )}
        </div>
      )}
    </div>
  );
}
