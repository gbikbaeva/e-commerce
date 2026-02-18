import { createFileRoute } from "@tanstack/react-router";
import ProductDetailPage from "../../pages/ProductDetail/ProductDetailPage";

export const Route = createFileRoute("/products/$productId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { productId } = Route.useParams();
  return <ProductDetailPage productId={productId} />;
}
