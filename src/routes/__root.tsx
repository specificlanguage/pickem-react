import { Outlet, RootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import MainNav from "@/components/navbar/menus/MainNav.tsx";
import UserNav from "@/components/navbar/menus/UserNav.tsx";

export const Route = new RootRoute({
  component: () => (
    <div>
      <header className="w-full bg-primary">
        <div className="ml-auto flex items-center space-x-4 max-w-6xl mx-auto p-2 gap-2 text-white">
          <MainNav />
          <div className="flex-1 flex items-center space-x-4" />
          <UserNav />
        </div>
      </header>
      <div>
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </div>
  ),
});
