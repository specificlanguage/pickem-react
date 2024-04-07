import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import GamesLayout from "@/layouts/games-layout.tsx";
import { Helmet } from "react-helmet-async";

export const component = function Index() {
  const { user } = useUser();

  return (
    <GamesLayout>
      <Helmet>
        <title>Home | Pick'em</title>
      </Helmet>
      <div className="p-2">
        <SignedIn>
          <h3>Welcome Home, {user?.username}!</h3>
        </SignedIn>
        <SignedOut>
          <h3>Welcome Home!</h3>
        </SignedOut>
      </div>
    </GamesLayout>
  );
};
