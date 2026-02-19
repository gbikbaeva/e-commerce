import { createFileRoute, Navigate } from "@tanstack/react-router";
import Footer from "../components/Footer";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Footer />;
}
