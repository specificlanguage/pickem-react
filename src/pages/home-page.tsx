import { useUser } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";
import Dashboard from "@/components/games/dashboard/dashboard.tsx";
import { Avatar, AvatarImage } from "@/components/ui/avatar.tsx";

export function HomePageAuthenticated() {
  const { user } = useUser();

  return (
    <div className="max-w-xl mx-auto my-6 space-y-2">
      <h1 className="scroll-m-20 text-2xl font-bold lg:text-3xl flex justify-between">
        Welcome, {user?.username}!
        <Avatar>
          <AvatarImage src={user?.imageUrl} alt={user?.username ?? ""} />
        </Avatar>
      </h1>
      <Dashboard />
    </div>
  );
}

export function HomePageNoAuth() {
  return (
    <div className="max-w-xl mx-auto my-6 space-y-2">
      <h1 className="scroll-m-20 text-2xl font-bold lg:text-3xl">
        Welcome to Pick'ems!
      </h1>
      <p className="text-lg">
        <Link className="text-blue-500 hover:underline" to={"/login"}>
          Sign in
        </Link>{" "}
        to get started.
      </p>
    </div>
  );
}
