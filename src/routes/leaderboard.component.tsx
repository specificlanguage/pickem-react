import GamesLayout from "@/layouts/games-layout.tsx";
import LeaderboardView from "@/components/leaderboard/leaderboard-view.tsx";

export const component = function Leaderboard() {
  return (
    <GamesLayout>
      <div className="justify-center max-w-2xl mx-auto my-6 space-y-4">
        <h3 className="text-3xl font-bold">Leaderboard</h3>
        <p className="text-sm">
          Please note that this table may not update immediately; check back
          later if a game has recently ended.
        </p>
        <div className="">
          <LeaderboardView />
        </div>
      </div>
    </GamesLayout>
  );
};
