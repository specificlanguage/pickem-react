import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu.tsx";
import NavLink from "@/components/navbar/NavLink";

export default function MainNav() {
  return (
    <NavigationMenu className="text-lg container flex">
      <NavigationMenuList className="lg:space-x-10 sm:space-x-4 flex items-center">
        <NavigationMenuItem>
          <NavLink href="/" className="text-2xl font-bold">
            Pick'ems
          </NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavLink href="/session">Pick</NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavLink href="/games">Games</NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavLink href="/leaderboard">Leaderboard</NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>Clubs</NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
