import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { DarkmodeToggle } from "@/components/navbar/darkmode-toggle.tsx";
import {
  SignedIn,
  SignedOut,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";
import NavLink from "@/components/navbar/NavLink.tsx";
import { Button } from "@/components/ui/button.tsx";

export default function UserNav() {
  return (
    <NavigationMenu className="text-lg my-2 mx-4 container flex">
      <NavigationMenuList className="lg:space-x-10 sm:space-x-6 md:flex">
        <SignedIn>
          <div data-testid="userbutton">
            <UserButton afterSignOutUrl={"/"} />
          </div>
        </SignedIn>
        <NavigationMenuItem>
          <SignedOut>
            <div className={"space-x-6"}>
              <NavLink href={"/login"}>Log In</NavLink>
              <NavLink href={"/signup"}>Sign Up</NavLink>
            </div>
          </SignedOut>
          <SignedIn>
            <SignOutButton>
              <Button className="text-lg text-black" variant="link">
                Sign Out
              </Button>
            </SignOutButton>
          </SignedIn>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <DarkmodeToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
