import { Link } from "@tanstack/react-router";
import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu.tsx";

interface NavLinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export default function NavLink({ href, ...props }: NavLinkProps) {
  return (
    <Link
      className="transition-all ease-in-out duration-100 hover:font-bold"
      to={href}
      activeProps={{
        style: {
          fontWeight: "bold",
        },
      }}
    >
      <NavigationMenuLink className={navigationMenuTriggerStyle()} {...props} />
    </Link>
  );
}
