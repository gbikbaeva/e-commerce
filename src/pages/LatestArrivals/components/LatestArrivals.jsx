import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";

import ProductGrid from "../../../components/ProductGrid";

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

  return <ProductGrid products={products} />;
};

export default LatestArrivals;
