import type { Meta, StoryObj } from "@storybook/react";
import PickForm from "@/components/games/picks/pick-form.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const mockGame = {
  homeTeam_id: 146,
  awayTeam_id: 134,
  startTimeUTC: "2024-03-29T23:10:00",
  finished: false,
  series_num: 27,
  id: 746091,
  date: "2024-03-29",
  venue: "loanDepot park",
  is_marquee: false,
  homeName: "Marlins",
  awayName: "Pirates",
};

const queryClient = new QueryClient();

const meta: Meta<typeof PickForm> = {
  component: PickForm,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export default meta;
type PickFormStory = StoryObj<typeof PickForm>;

export const Default: PickFormStory = {
  args: {
    game: mockGame,
  },
};

// TODO later: add story for when team query is not present.
