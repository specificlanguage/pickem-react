import type { Meta, StoryObj } from "@storybook/react";
import PickForm from "@/components/games/picks/pick-form.tsx";
import BaseStoryDecorator from "@/stories/BaseStoryDecorator.tsx";

const GAME_ID = 746091;

const mockGame = {
  homeTeam_id: 146,
  awayTeam_id: 134,
  startTimeUTC: "2024-03-29T23:10:00",
  finished: false,
  series_num: 27,
  id: GAME_ID,
  date: "2024-03-29",
  venue: "loanDepot park",
  is_marquee: false,
  homeName: "Marlins",
  awayName: "Pirates",
};

const mockPick = {
  gameID: GAME_ID,
  pickedHome: true,
  isSeries: false,
};

const meta: Meta<typeof PickForm> = {
  component: PickForm,
  decorators: [
    (Story) => {
      return (
        <BaseStoryDecorator>
          <div className="max-w-lg">
            <Story />
          </div>
        </BaseStoryDecorator>
      );
    },
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
export const Disabled: PickFormStory = {
  name: "Disabled (Picked)",
  args: {
    game: mockGame,
    pick: mockPick,
  },
};

export const PastStartAndNotPicked: PickFormStory = {
  name: "Disabled (Past Start)",
  args: {
    game: mockGame,
  },
  parameters: {
    date: new Date("2024-03-29T23:11:00"), // After game has started
  },
};

export const PastStartAndPicked: PickFormStory = {
  name: "Disabled (Past Start, Picked)",
  args: {
    game: mockGame,
    pick: mockPick,
  },
  parameters: {
    date: new Date("2024-03-29T23:11:00"), // After game has started
  },
};
