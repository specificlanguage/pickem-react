import GamesLayout from "@/layouts/games-layout.tsx";
import { Helmet } from "react-helmet-async";
import GamePage from "@/pages/game-page.tsx";

export const component = function Games() {
  // Note: undefined will *never* occur, it is only used for type checking purposes.

  // Picks query
  return (
    <GamesLayout>
      {/* Head layout */}
      <Helmet>
        <title>Games | Pick'ems</title>
      </Helmet>
      <GamePage />
    </GamesLayout>
  );
};
