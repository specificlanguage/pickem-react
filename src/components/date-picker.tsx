import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns-tz";
import { Calendar } from "@/components/ui/calendar.tsx";
import { differenceInCalendarDays } from "date-fns";
import { Row, RowProps } from "react-day-picker";

interface DatePickerProps {
  date: Date;
  setDate: (date: Date) => void;
}

const disabledDays = [
  {
    from: new Date(0),
    to: Math.max(new Date(), new Date(2024, 2, 19)),
  },
  {
    from: new Date(2024, 2, 22),
    to: new Date(2024, 2, 27),
  },
  {
    from: new Date(2024, 8, 29),
    to: new Date(2027, 1, 1),
  },
];

function isValidDate(date: Date) {
  return (
    differenceInCalendarDays(date, new Date(2024, 8, 30)) > 0 &&
    differenceInCalendarDays(date, new Date(2024, 3, 1))
  );
}

function OnlyFutureRow(props: RowProps) {
  const isPastRow = props.dates.every(isValidDate);
  if (isPastRow) return <></>;
  return <Row {...props} />;
}

export default function DatePicker({ date, setDate }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-lg text-lg justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-lg" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          defaultMonth={date}
          default={date}
          components={{ Row: OnlyFutureRow }}
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={disabledDays}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
