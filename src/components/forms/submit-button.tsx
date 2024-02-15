import { LuLoader2 } from "react-icons/lu";
import { Button } from "@/components/ui/button.tsx";
import { ReactNode } from "react";

export default function SubmitButton({
  isLoading,
  children,
  className,
  form,
  disable,
}: {
  isLoading: boolean;
  children?: ReactNode;
  className?: string;
  form?: string;
  disable?: boolean;
}) {
  return (
    <Button
      type="submit"
      disabled={isLoading || disable}
      className={className}
      form={form ?? undefined}
    >
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
