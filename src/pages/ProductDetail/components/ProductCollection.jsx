import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";

import ProductGrid from "../../../components/ProductGrid";

const ProductCollection = () => {
  const [products, setProducts] = useState([]);
  const [isCollectionLoading, setIsCollectionLoading] = useState(false);

  const getProducts = useCallback(async () => {
    setIsCollectionLoading(true);

    const result = await fetch("/api/products?collection=latest&per_page=4");
    const response = await result.json();

    setProducts(response.data);
    setIsCollectionLoading(false);
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div
      className={clsx(
        "flex flex-col gap-8",
        "px-3 py-12 md:px-4 md:py-16 lg:p-24",
      )}
    >
      <p className="font-semibold text-2xl text-neutral-900 md:text-3xl">
        In this collection
      </p>

      {isCollectionLoading ? (
        <div className="flex items-center justify-center">Loading...</div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
};

export default ProductCollection;
