import { RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { Label } from "@/components/ui/label.tsx";
import { ReactNode } from "react";

interface OptionCardProps {
  children: ReactNode;
  value: string;
  fillPct?: number;
  className?: string;
  disabled?: boolean;
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
  ...props
}: OptionCardProps) {
  return (
    <div className="my-1 relative">
      {fillPct ? (
        <div
          className={`absolute top-0 left-0 p-0.25 rounded-tl-sm h-full bg-neutral-300 dark:bg-neutral-800 w-[${fillPct}%]`}
        ></div>
      ) : null}
      <Label
        htmlFor={value}
        className={
          "flex flex-col items-center justify-between \
                      rounded-md border-2 border-muted bg-popover p-2.5 leading-8 \
                      hover:bg-accent hover:text-accent-foreground \
                      peer-data-[state=checked]:border-primary \
                      [&:has([data-state=checked])]:border-primary relative peer " +
          className
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
        {fillPct ? <p className="justify-end mt-3 leading-3">96%</p> : null}
      </Label>
    </div>
  );
}
