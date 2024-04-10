import GamesLayout from "@/layouts/games-layout.tsx";
import { Helmet } from "react-helmet-async";

export const component = function Settings() {
  return (
    <GamesLayout>
      <Helmet>
        <title>Settings | Pick'ems</title>
      </Helmet>
      <div className="mx-auto max-w-2xl">
        <p>Test Settings Page</p>
      </div>
    </GamesLayout>
  );
};
