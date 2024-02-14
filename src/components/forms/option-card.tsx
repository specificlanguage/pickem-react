import { RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { Label } from "@/components/ui/label.tsx";
import { ReactNode } from "react";
import { FaCheck } from "react-icons/fa";

interface FrequencyCardProps {
  children: ReactNode;
  value: string;
  className?: string;
}

export function OptionCard({
  children,
  value,
  className,
  ...props
}: FrequencyCardProps) {
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
