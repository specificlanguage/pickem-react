import GamesLayout from "@/layouts/games-layout.tsx";
import { Helmet } from "react-helmet-async";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate } from "@tanstack/react-router";

export const component = function Settings() {
  return (
    <GamesLayout>
      <Helmet>
        <title>Settings | Pick'ems</title>
      </Helmet>
      <SignedIn>
        <div className="mx-auto max-w-2xl">
          <h2 className="font-bold text-2xl">Settings</h2>
        </div>
      </SignedIn>
      <SignedOut>
        <Navigate to="/login" params={{}} />
      </SignedOut>
    </GamesLayout>
  );
};
