import { Team } from "@/lib/http/teams.ts";

export interface TeamLogoProps {
  team: Team;
  label?: string;
  height?: number;
  useLabel?: "none" | "city" | "team" | "abbr";
  imageScheme?: "spot" | "light" | "dark";
  imageOrientation?: "left" | "right" | "middle";
  textSize?: "sm" | "md" | "lg";
}

export function TeamLogo({
  team,
  label,
  height,
  useLabel,
  imageScheme,
  imageOrientation,
  textSize,
}: TeamLogoProps) {
  const finalHeight = height ?? 32;
  const finalSize = textSize ?? "md";

  let logoURL = "https://cdn-pickem.speclang.dev/";

  if (imageScheme === "dark") {
    logoURL += `dark_${team.id}.svg`;
  } else if (imageScheme === "light" || imageScheme === undefined) {
    logoURL += `light_${team.id}.svg`;
  } else {
    logoURL += `spot_${team.id}.png`;
  }

  const labelElement = (
    <div className={`ml-2 text-center leading-[${finalHeight}px]`}>
      <p
        className={
          `inline-block align-middle leading-[${finalHeight}px] text-` +
          finalSize
        }
      >
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
    <div className="flex justify-start">
      {(useLabel || label) && imageOrientation === "right"
        ? labelElement
        : null}
      <img
        className={
          imageOrientation === "middle"
            ? "mx-auto"
            : "" +
              ` w-[${finalHeight}px] h-[${finalHeight}px] mt-0.5 align-middle`
        }
        src={logoURL}
        alt={team.name}
      />
      {(useLabel || label) && imageOrientation === "left" ? labelElement : null}
    </div>
  );
}
