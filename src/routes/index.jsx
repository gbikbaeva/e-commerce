import { createFileRoute } from "@tanstack/react-router";

import StorefrontPage from "../pages/Storefront";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <StorefrontPage />;
}
