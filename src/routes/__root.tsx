import { Outlet, RootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const Route = new RootRoute({
  component: () => (
    <div className="flex flex-col min-h-screen">
      <Outlet />
      {import.meta.env.DEV ? (
        <>
          <TanStackRouterDevtools />
          <ReactQueryDevtools />
        </>
      ) : null}
    </div>
  ),
});
