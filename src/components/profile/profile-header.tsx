import { Avatar, AvatarImage } from "@/components/ui/avatar.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { getUser } from "@/lib/http/users.ts";
import { useQuery } from "@tanstack/react-query";
import { useFetchTeams } from "@/lib/http/teams.ts";
import { TeamLogo } from "@/components/teams/logos.tsx";
import LoadingWheel from "@/components/loading-wheel.tsx";

export default function ProfileHeader({ username }: { username: string }) {
  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["userInfo", username],
    queryFn: () => getUser(username),
  });

  const { teams } = useFetchTeams();

  if (isLoading) {
    return (
      <div className="my-8">
        <LoadingWheel size={48} />
      </div>
    );
  }

  if (!userInfo) {
    return null;
  }

  const favoriteTeam = teams?.find(
    (team) => team.id === userInfo.favoriteTeam_id,
  );

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-rows-2 grid-flow-col gap-4">
          <div className="row-span-2 m-auto">
            <Avatar className="w-32 h-32 md:w-50 md:h-50">
              <AvatarImage src={userInfo.image_url} />
            </Avatar>
          </div>
          <div className="col-span-2">
            <h3
              id="profile-header-card-username"
              className="text-2xl font-bold"
            >
              {userInfo.username}
            </h3>
            {favoriteTeam && (
              <div className="flex justify-start gap-2">
                <p className="leading-9 align-middle">Favorite team:</p>
                <TeamLogo
                  imageOrientation={"left"}
                  useLabel={"team"}
                  team={favoriteTeam}
                  height={30}
                  imageScheme="spot"
                />
              </div>
            )}
          </div>
          <div className="col-span-2">
            {userInfo.description ? (
              <p>{userInfo.description}</p>
            ) : (
              <p className="italic text-neutral-500">
                This user hasn't set a description yet!
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
