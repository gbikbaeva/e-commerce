import { createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import Navbar from "../components/Navbar";
import ProductDetailPage from "../pages/ProductDetail";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <main className="min-h-screen">
          <ProductDetailPage />
          <TanStackRouterDevtools />
        </main>
      </>
    );
  },
});
