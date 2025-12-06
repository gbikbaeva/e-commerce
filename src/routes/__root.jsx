import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Navbar from "../Navbar";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <main className="min-h-screen">
          <Navbar />
          <TanStackRouterDevtools />
        </main>
      </>
    );
  },
});
