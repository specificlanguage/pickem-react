import { RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { Label } from "@/components/ui/label.tsx";
import { ReactNode } from "react";
import { FaCheck } from "react-icons/fa";

interface OptionCardProps {
  children: ReactNode;
  value: string;
  className?: string;
  disabled?: boolean;
}

/**
 * OptionCard -- a component to render a card for a radio group option.
 * @param children - the content of the option
 * @param value - the value of the option
 * @param className - additional classes to add to the card
 * @param disabled - whether the option is disabled
 * @param props - any other props to pass to the radio group item
 * @constructor
 */
export function OptionCard({
  children,
  value,
  className,
  disabled,
  ...props
}: OptionCardProps) {
  return (
    <div className="my-1">
      <Label
        htmlFor={value}
        className={
          "flex flex-col items-center justify-between \
                      rounded-md border-2 border-muted bg-popover p-4 leading-8 \
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
        <span className="invisible peer-data-[state=checked]:visible [&:has([data-state=checked])]:visible bg-green-700 p-1 rounded-full absolute -right-1.5 -top-1.5">
          <FaCheck size={12} />
        </span>
        {children}
      </Label>
    </div>
  );
}
