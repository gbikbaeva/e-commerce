import { createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import ProductSpecification from "../components/ProductSpecification";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <main className="min-h-screen">
          <ProductSpecification />
          <TanStackRouterDevtools />
        </main>
      </>
    );
  },
});
