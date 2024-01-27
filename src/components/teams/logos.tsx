import { useQuery } from "@tanstack/react-query";
import { getAllTeamInfo } from "@/lib/http/teams.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";

export interface TeamLogoProps {
  teamID: number;
  label?: string;
  height?: number;
  useLabel?: "none" | "city" | "team" | "abbr";
  imageScheme?: "spot" | "light" | "dark";
  imageOrientation?: "left" | "right";
}

const validTeamIDs = [
  108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 133,
  134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 158,
];

export function TeamLogo({
  teamID,
  label,
  height,
  useLabel,
  imageScheme,
  imageOrientation,
}: TeamLogoProps) {
  // Should be reused as necessary
  const { isLoading, isError, data } = useQuery({
    queryKey: ["teams"],
    queryFn: () => getAllTeamInfo(),
  });

  const finalHeight = height ?? 32;

  if (isLoading || isError || !validTeamIDs.includes(teamID)) {
    if (imageOrientation === "right") {
      return (
        <div className="flex justify-between space-x-2">
          {/* Loading team info */}
          <Skeleton
            className={`h-[${finalHeight - 16}px] w-[${finalHeight + 16}px]`}
          />
          {/* Loading image */}
          <Skeleton className={`h-[${finalHeight}px] w-[${finalHeight}px]`} />
        </div>
      );
    } else {
      return (
        <div className="flex justify-between space-x-2">
          {/* Loading image */}
          <Skeleton className={`h-[${finalHeight}px] w-[${finalHeight}px]`} />
          {/* Loading team info */}
          <Skeleton
            className={`h-[${finalHeight - 16}px] w-[${finalHeight + 16}px]`}
          />
        </div>
      );
    }
  }

  const teamInfo = data?.filter((team) => team.id === teamID)[0];

  let logoURL = "https://cdn-pickem.speclang.dev/";

  if (imageScheme === "dark") {
    logoURL += `dark_${teamID}.svg`;
  } else if (imageScheme === "light" || imageScheme === undefined) {
    logoURL += `light_${teamID}.svg`;
  } else {
    logoURL += `spot_${teamID}.png`;
  }

  const labelElement = (
    <div
      className={`mx-2 h-[${finalHeight}px] text-center leading-[${finalHeight}px]`}
    >
      <p className="inline-block align-middle">
        {label ? (
          label
        ) : (
          <>
            {useLabel === "city" && teamInfo?.cityName}
            {useLabel === "team" && teamInfo?.name}
            {useLabel === "abbr" && teamInfo?.abbr}
          </>
        )}
      </p>
    </div>
  );

  return (
    <div className="flex justify-between">
      {(useLabel || label) && imageOrientation === "right"
        ? labelElement
        : null}
      <img
        src={logoURL}
        height={finalHeight}
        width={finalHeight}
        alt={teamInfo?.name}
      />
      {(useLabel || label) && imageOrientation === "left" ? labelElement : null}
    </div>
  );
}
