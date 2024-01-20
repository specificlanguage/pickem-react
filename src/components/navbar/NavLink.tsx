import { Link } from "@tanstack/react-router";

interface NavLinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export default function NavLink({ href, children, ...props }: NavLinkProps) {
  return (
    <Link
      className="transition-all ease-in-out duration-100 hover:text-neutral-500"
      to={href}
      activeProps={{
        style: {
          fontWeight: "bold",
        },
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
