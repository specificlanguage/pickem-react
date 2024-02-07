import { LuLoader2 } from "react-icons/lu";
import { Button } from "@/components/ui/button.tsx";
import { ReactNode } from "react";

export default function SubmitButton({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children?: ReactNode;
}) {
  return (
    <Button type="submit" disabled={isLoading} className="float-right">
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
