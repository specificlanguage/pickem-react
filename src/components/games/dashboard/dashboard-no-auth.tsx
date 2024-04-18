import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";
import { Link } from "@tanstack/react-router";
import { IoPersonCircle } from "react-icons/io5";

export function DashboardNoAuth() {
  function NotLoggedInAlert() {
    return (
      <Alert className="border-blue-500 bg-blue-50 dark:text-accent">
        <IoPersonCircle color="black" size={20} />
        <AlertTitle>Oops! You're not logged in!</AlertTitle>
        <AlertDescription>
          Go{" "}
          <Link to={"/login"}>
            <span className="text-blue-500 hover:underline">log in</span>
          </Link>
          {" or "}
          <Link to={"/signup"}>
            <span className="text-blue-500 hover:underline">register</span>
          </Link>{" "}
          to do today's picks.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col space-y-4 w-full">
      <NotLoggedInAlert />
    </div>
  );
}
