import { useParams } from "@tanstack/react-router";
import GamesLayout from "@/layouts/games-layout.tsx";
import { Helmet } from "react-helmet-async";
import ProfilePicks from "@/components/profile/profile-picks.tsx";
import ProfileHeader from "@/components/profile/profile-header.tsx";
import { Separator } from "@/components/ui/separator.tsx";

interface ProfileParams {
  username: string; // user id
}

export const component = function Profile() {
  const { username } = useParams({ strict: false }) as ProfileParams;

  return (
    <GamesLayout>
      <Helmet>
        <title>{username} | Pick'ems</title>
      </Helmet>
      <div className="mx-auto max-w-2xl">
        <ProfileHeader username={username} />
        <h3 className="text-2xl mt-6 mb-2">Previous Picks</h3>
        <Separator />
        <ProfilePicks username={username} />
      </div>
    </GamesLayout>
  );
};
