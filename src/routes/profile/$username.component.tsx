import { useParams } from "@tanstack/react-router";
import GamesLayout from "@/layouts/games-layout.tsx";
import { Helmet } from "react-helmet-async";
import ProfilePicks from "@/components/profile/profile-picks.tsx";

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
      <div className="mx-auto max-w-2xl">
        <h1>Profile</h1>
        <p>Username: {username}</p>
        <ProfilePicks username={username} />
      </div>
    </GamesLayout>
  );
};
