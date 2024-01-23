import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { DarkmodeToggle } from "@/components/navbar/darkmode-toggle.tsx";
import { SignedIn, SignedOut, useClerk, UserButton } from "@clerk/clerk-react";
import NavLink from "@/components/navbar/NavLink.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "@tanstack/react-router";

export default function UserNav() {
  const clerk = useClerk();
  const navigate = useNavigate();

  return (
    <NavigationMenu className="text-lg my-2 mx-4 container flex">
      <NavigationMenuList className="lg:space-x-10 sm:space-x-6 md:flex">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <NavigationMenuItem>
          <SignedOut>
            <div className={"space-x-6"}>
              <NavLink href={"/login"}>Log In</NavLink>
              <NavLink href={"/signup"}>Sign Up</NavLink>
            </div>
          </SignedOut>
          <SignedIn>
            <Button
              className="text-lg text-black"
              variant="link"
              onClick={() => {
                clerk.signOut();
                navigate({ to: "/" });
              }}
            >
              Sign Out
            </Button>
          </SignedIn>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <DarkmodeToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
