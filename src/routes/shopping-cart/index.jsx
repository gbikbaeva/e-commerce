import { createFileRoute } from "@tanstack/react-router";
import ShoppingCartPage from "../../pages/ShoppingCart";

export const Route = createFileRoute("/shopping-cart/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ShoppingCartPage />;
}
