import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavLink from "@/components/navbar/NavLink";
import { FIREBASE_AUTH } from "@/components/firebase.ts";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "@tanstack/react-router";
import { DarkmodeToggle } from "@/components/navbar/darkmode-toggle.tsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

export default function UserNav() {
  function LoggedOutNav() {
    return (
      <div className={"space-x-6"}>
        <NavLink href={"/login"} className="text-[12pt]">
          Log In
        </NavLink>
        <NavLink href={"/signup"} className="text-[12pt]">
          Sign Up
        </NavLink>
      </div>
    );
  }

  const auth = getAuth();
  const [user] = useAuthState(FIREBASE_AUTH);
  const navigate = useNavigate();

  function logOut() {
    auth.signOut();
    navigate({ to: "/" });
  }

  return (
    <NavigationMenu className="text-lg my-2 mx-4 container flex">
      <NavigationMenuList className="lg:space-x-10 sm:space-x-6 md:flex">
        {user ? (
          <Avatar>
            {user.photoURL ? (
              <AvatarImage src={user.photoURL} />
            ) : (
              <AvatarFallback className="bg-neutral-500">
                {user.displayName?.at(0) ?? "?"}
              </AvatarFallback>
            )}
          </Avatar>
        ) : null}
        <NavigationMenuItem>
          {user ? (
            <Button
              variant="ghost"
              onClick={() => logOut()}
              className="text-lg"
            >
              Sign Out
            </Button>
          ) : (
            <LoggedOutNav />
          )}
        </NavigationMenuItem>
        <NavigationMenuItem>
          <DarkmodeToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
