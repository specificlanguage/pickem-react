import GamesLayout from "@/layouts/games-layout.tsx";
import { Helmet } from "react-helmet-async";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate } from "@tanstack/react-router";
import SettingsPage from "@/pages/settings-page.tsx";

export const component = function Settings() {
  return (
    <GamesLayout>
      <Helmet>
        <title>Settings | Pick'ems</title>
      </Helmet>
      <SignedIn>
        <SettingsPage />
      </SignedIn>
      <SignedOut>
        <Navigate to="/login" params={{}} />
      </SignedOut>
    </GamesLayout>
  );
};
