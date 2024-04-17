import { SignedIn, SignedOut } from "@clerk/clerk-react";
import GamesLayout from "@/layouts/games-layout.tsx";
import { Helmet } from "react-helmet-async";
import { HomePageAuthenticated, HomePageNoAuth } from "@/pages/home-page.tsx";

export const component = function Index() {
  return (
    <GamesLayout>
      <Helmet>
        <title>Home | Pick'ems</title>
      </Helmet>
      <div className="p-2">
        <SignedIn>
          <HomePageAuthenticated />
        </SignedIn>
        <SignedOut>
          <HomePageNoAuth />
        </SignedOut>
      </div>
    </GamesLayout>
  );
};
