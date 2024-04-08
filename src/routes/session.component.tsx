import { SignedIn, SignedOut } from "@clerk/clerk-react";
import GamesLayout from "@/layouts/games-layout.tsx";
import { Navigate } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
import SessionPage from "@/pages/session-page.tsx";

export const component = function SessionPick() {
  return (
    <GamesLayout>
      <Helmet>
        <title>Pick | Pick'ems</title>
      </Helmet>
      <SignedIn>
        <SessionPage />
      </SignedIn>
      <SignedOut>
        <Navigate to="/login" params={{}} />
      </SignedOut>
    </GamesLayout>
  );
};
