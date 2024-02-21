import { RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { Label } from "@/components/ui/label.tsx";
import { ReactNode } from "react";

interface OptionCardProps {
  children: ReactNode;
  value: string;
  fillPct?: number;
  className?: string;
  disabled?: boolean;
  showHighlight?: boolean;
}

/**
 * OptionCard -- a component to render a card for a radio group option.
 * @param children - the content of the option
 * @param value - the value of the option
 * @param fillPct - the percentage of the card to fill with a color -- if not present, it won't be filled.
 * @param className - additional classes to add to the card
 * @param disabled - whether the option is disabled
 * @param props - any other props to pass to the radio group item
 * @constructor
 */
export function OptionCard({
  children,
  value,
  fillPct,
  className,
  disabled,
  showHighlight,
  ...props
}: OptionCardProps) {
  return (
    <div className="my-1 relative">
      <div
        className={`absolute top-0 left-0 rounded-xl bg-neutral-300 dark:bg-neutral-900 h-full`}
        style={{ width: `${fillPct ?? 0}%` }}
      />
      <Label
        htmlFor={value}
        className={
          `flex flex-col items-center justify-between \
                      rounded-md border-2 border-muted bg-popover p-2.5 leading-8 relative peer \
                      ${fillPct === undefined ? "hover:bg-accent hover:text-accent-foreground" : ""} 
                      ${showHighlight ? "border-primary" : ""} ` + className
        }
      >
        <RadioGroupItem
          disabled={disabled}
          value={value}
          id={value}
          className="peer sr-only"
          {...props}
        />
        {children}
      </Label>
    </div>
  );
}
