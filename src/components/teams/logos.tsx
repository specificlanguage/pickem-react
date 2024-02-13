import { Team } from "@/lib/http/teams.ts";

export interface TeamLogoProps {
  team: Team;
  label?: string;
  height?: number;
  useLabel?: "none" | "city" | "team" | "abbr";
  imageScheme?: "spot" | "light" | "dark";
  imageOrientation?: "left" | "right" | "middle";
}

export function TeamLogo({
  team,
  label,
  height,
  useLabel,
  imageScheme,
  imageOrientation,
}: TeamLogoProps) {
  const finalHeight = height ?? 32;

  let logoURL = "https://cdn-pickem.speclang.dev/";

  if (imageScheme === "dark") {
    logoURL += `dark_${team.id}.svg`;
  } else if (imageScheme === "light" || imageScheme === undefined) {
    logoURL += `light_${team.id}.svg`;
  } else {
    logoURL += `spot_${team.id}.png`;
  }

  const labelElement = (
    <div className={`mx-2 text-center leading-[${finalHeight}px]`}>
      <p className="inline-block align-middle">
        {label ? (
          label
        ) : (
          <>
            {useLabel === "city" && team.cityName}
            {useLabel === "team" && team.name}
            {useLabel === "abbr" && team.abbr}
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
        className={imageOrientation === "middle" ? "mx-auto" : ""}
        src={logoURL}
        height={finalHeight}
        width={finalHeight}
        alt={team.name}
      />
      {(useLabel || label) && imageOrientation === "left" ? labelElement : null}
    </div>
  );
}
