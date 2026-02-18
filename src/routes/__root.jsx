import { createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import ProductListingPage from "../pages/ProductListing";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <main className="min-h-screen mx-auto p-4 flex flex-col">
          <ProductListingPage />
          <TanStackRouterDevtools />
        </main>
      </>
    );
  },
});
