import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { DarkmodeToggle } from "@/components/navbar/darkmode-toggle.tsx";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import NavLink from "@/components/navbar/NavLink.tsx";
import { Button } from "@/components/ui/button.tsx";
import ProfileDropdown from "@/components/navbar/menus/profile-dropdown.tsx";

export default function UserNav() {
  return (
    <NavigationMenu className="text-lg container flex items-center">
      <NavigationMenuList className="lg:space-x-10 sm:space-x-6 flex align-middle">
        <NavigationMenuItem>
          <ProfileDropdown />
        </NavigationMenuItem>
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
