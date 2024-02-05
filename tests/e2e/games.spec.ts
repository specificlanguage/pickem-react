import { expect, test } from "@playwright/test";
import { format, utcToZonedTime } from "date-fns-tz";

const mockGamesResponse = [
  {
    homeTeam_id: 146,
    awayTeam_id: 134,
    startTimeUTC: "2024-03-29T23:10:00",
    finished: false,
    id: 746091,
    date: "2024-03-29",
    venue: "loanDepot park",
    series_num: 27,
    is_marquee: false,
    homeName: "A",
    awayName: "B",
  },
  {
    homeTeam_id: 139,
    awayTeam_id: 141,
    startTimeUTC: "2024-03-29T22:50:00",
    finished: false,
    id: 745117,
    date: "2024-03-29",
    venue: "Tropicana Field",
    series_num: 27,
    is_marquee: true,
    homeName: "C",
    awayName: "D",
  },
];

test("Games show correct information", async ({ page }) => {
  await page.route(
    "/api/games/date?year=2024&month=3&day=28",
    async (route) => {
      const json = mockGamesResponse;
      await route.fulfill({
        status: 200,
        body: JSON.stringify(json),
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    },
  );

  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const timeConverted = utcToZonedTime(
    new Date(mockGamesResponse[0].startTimeUTC + "Z"),
    timeZone,
  );

  await page.goto("/games");
  await expect(page.getByTestId("game-card")).toHaveCount(2);
  await expect(page.getByTestId(mockGamesResponse[0].id.toString())).toHaveText(
    /loanDepot park/i,
  );
  await expect(page.getByTestId(mockGamesResponse[0].id.toString())).toHaveText(
    new RegExp(format(timeConverted, "h:mmaa")),
  );
  await expect(page.getByTestId(mockGamesResponse[1].id.toString())).toHaveText(
    /MARQUEE/i,
  );
});
