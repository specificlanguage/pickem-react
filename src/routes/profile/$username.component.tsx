import { useParams } from "@tanstack/react-router";
import GamesLayout from "@/layouts/games-layout.tsx";
import { Helmet } from "react-helmet-async";

interface ProfileParams {
  username: string; // user id
}

export const component = function Profile() {
  const { username } = useParams({ strict: false }) as ProfileParams;

  return (
    <GamesLayout>
      <Helmet>
        <title>Profile | Pick'ems</title>
      </Helmet>
      <div>
        <h1>Profile</h1>
        <p>Username: {username}</p>
      </div>
    </GamesLayout>
  );
};
