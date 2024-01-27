import { RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { Label } from "@/components/ui/label.tsx";
import { FaCalendar } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";

export function FrequencyCard({ children, value, ...props }) {
  return (
    <div className="p-2">
      <RadioGroupItem
        value={value}
        id={value}
        className="peer sr-only"
        {...props}
      />
      <Label
        htmlFor={value}
        className="flex flex-col items-center justify-between
                      rounded-md border-2 border-muted bg-popover p-4 leading-8
                      hover:bg-accent hover:text-accent-foreground
                      peer-data-[state=checked]:border-primary
                      [&:has([data-state=checked])]:border-primary relative"
      >
        {children}
        {/* TODO later: find a way to restore checkbox functionality from SelectableCard*/}
      </Label>
    </div>
  );
}
