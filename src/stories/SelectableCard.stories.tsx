import type { Meta, StoryObj } from "@storybook/react";

import SelectableCard from "../components/ui/selectable-card";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

const meta: Meta<typeof SelectableCard> = {
  component: SelectableCard,
};

export default meta;

type SelectableCardStory = StoryObj<typeof SelectableCard>;

export const Basic: SelectableCardStory = {
  args: {
    children: "Hello world!",
    onSelect: () => console.log("Clicked!"),
    onUnselect: () => console.log("Unclicked!"),
  },
};

export const CardContext: SelectableCardStory = {
  args: {
    children: (
      <>
        <CardHeader className="text-left">
          <CardTitle>Series</CardTitle>
          <CardDescription>Predict games by series at a time.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-left">
            Series are a collection of games that are played in a row. You would
            be selecting <i>four</i> series, twice per week.
          </p>
        </CardContent>
      </>
    ),
    onSelect: () => console.log("Clicked!"),
    onUnselect: () => console.log("Unclicked!"),
    className: "max-w-sm text-sm",
  },
};
