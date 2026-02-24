import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";

import ProductGrid from "../ProductGrid";
import Button from "../Button";

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

  return (
    <section
      aria-describedby="latest-arrivals-description"
      className={clsx(
        "w-full px-3 py-12 md:px-4 md:py-16 lg:px-24 lg:py-24",
        "flex flex-col items-center gap-8",
      )}
    >
      <div className="w-full flex grow justify-between">
        <p
          id="latest-arrivals-description"
          className="font-semibold text-2xl md:text-3xl text-neutral-900"
        >
          Latest Arrivals
        </p>
        <Button
          variant="secondary"
          size="lg"
          label="View All"
          onClick={() => navigate({ to: "/products/" })}
        ></Button>
      </div>

      {isLoading ? (
        <div className={clsx("w-full h-full flex items-center justify-center")}>
          Loading...
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </section>
  );
};

export default LatestArrivals;
