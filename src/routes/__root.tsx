import { Outlet, RootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import MainNav from "@/components/navbar/menus/MainNav.tsx";
import UserNav from "@/components/navbar/menus/UserNav.tsx";

export const Route = new RootRoute({
  component: () => (
    <div className="flex flex-col min-h-screen">
      <header className="w-full bg-white dark:bg-neutral-900">
        <div className="ml-auto flex items-center space-x-4 max-w-6xl mx-auto p-2 gap-2">
          <MainNav />
          <div className="flex-1 flex items-center space-x-4" />
          <UserNav />
        </div>
      </header>
      <main className="flex-grow bg-gradient-to-br from-[#026d37] to-[#142b1c]">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </div>
  ),
});
