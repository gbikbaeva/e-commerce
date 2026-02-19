import { createFileRoute } from "@tanstack/react-router";
import LatestArrivalsPage from "../../pages/LatestArrivals";

export const Route = createFileRoute("/latest-arrivals/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <LatestArrivalsPage />;
}
