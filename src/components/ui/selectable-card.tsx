import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { cn } from "@/lib/utils.ts";

export interface SelectableCardProps {
  onSelect: () => void;
  onUnselect: () => void;
  children: React.ReactNode;
  className?: string;
}

/**
 * Creates a selectable card that when clicked, does something.
 * You must update the card
 * @param onSelect - What should be done when selected
 * @param onUnselect - What should be done when unselected
 * @param children
 * @param className
 * @constructor
 */
export default function SelectableCard({
  onSelect,
  onUnselect,
  children,
  className,
}: SelectableCardProps) {
  const [selected, setSelected] = useState(false);

  async function onClick() {
    if (selected) {
      setSelected(false);
      onUnselect();
    } else {
      setSelected(true);
      onSelect();
    }
  }

  return (
    <button
      className={cn(
        "rounded-lg border border-2 border-card bg-card text-card-foreground shadow-sm relative" +
          (selected ? " border-primary bg-neutral-300" : "") +
          " " +
          className,
      )}
      onClick={onClick}
    >
      {selected && (
        <div className="absolute -top-2 -right-2 p-1 bg-green-700 flex justify-center rounded-full">
          <FaCheck size={10} />
        </div>
      )}
      <div className="p-2">{children}</div>
    </button>
  );
}
