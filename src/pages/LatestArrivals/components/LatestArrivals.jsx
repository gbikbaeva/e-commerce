import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import ProductCard from "../../../components/ProductCard";

const LatestArrivals = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = useCallback(async () => {
    setIsLoading(true);
    const result = await fetch("/api/products?collection=latest");
    const response = await result.json();
    setProducts(response.data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  if (isLoading) {
    return <div className={clsx("w-full h-full")}>Loading...</div>;
  }

  return (
    <div
      className={clsx(
        "w-full grid grid-cols-4 gap-x-4 gap-y-8 md:grid-cols-6 md:gap-x-8 lg:grid-cols-12",
      )}
    >
      {products.map((product) => (
        <div
          key={product.product_id}
          className={clsx("col-span-4 md:col-span-3")}
        >
          <ProductCard product={product}></ProductCard>
        </div>
      ))}
    </div>
  );
};

export default LatestArrivals;
