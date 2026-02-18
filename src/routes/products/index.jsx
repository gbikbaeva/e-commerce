import { createFileRoute } from "@tanstack/react-router";
import ProductListingPage from "../../pages/ProductListing";

export const Route = createFileRoute("/products/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProductListingPage />;
}
