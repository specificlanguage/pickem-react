import { NavigationMenuItem } from "@/components/ui/navigation-menu.tsx";
import { Avatar, AvatarImage } from "@/components/ui/avatar.tsx";
import { SignedIn, useUser } from "@clerk/clerk-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "@tanstack/react-router";

export default function ProfileDropdown() {
  const { user, isSignedIn } = useUser();

  if (!isSignedIn) {
    return null;
  }

  return (
    <SignedIn>
      <NavigationMenuItem className="pt-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-full focus-visible:border-transparent"
            >
              <Avatar>
                <AvatarImage src={user.imageUrl} />
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" forceMount>
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-base font-medium leading-none">
                  {user.username}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="list-none">
              <Link
                to="/profile/$username"
                params={{ username: user.username ?? "" }}
              >
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <Link to={`/settings`}>
                <DropdownMenuItem>Settings </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </NavigationMenuItem>
    </SignedIn>
  );
}
