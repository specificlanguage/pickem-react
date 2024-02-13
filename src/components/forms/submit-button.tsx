import { LuLoader2 } from "react-icons/lu";
import { Button } from "@/components/ui/button.tsx";
import { ReactNode } from "react";

export default function SubmitButton({
  isLoading,
  children,
  className,
}: {
  isLoading: boolean;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Button type="submit" disabled={isLoading} className={className}>
      {isLoading ? (
        <LuLoader2 className="mx-auto h-4 w-4 animate-spin" />
      ) : children ? (
        children
      ) : (
        "Submit"
      )}
    </Button>
  );
}
