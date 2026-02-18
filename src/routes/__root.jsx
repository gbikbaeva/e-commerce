import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <main className="min-h-screen mx-auto p-4 flex flex-col">
          <Outlet />
          <TanStackRouterDevtools />
        </main>
      </>
    );
  },
});
