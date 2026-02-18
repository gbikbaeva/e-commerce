import { useContext, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import clsx from "clsx";

import ProductCard from "../../../components/ProductCard";
import { ProductListingContext } from "./contexts";
import { useMediaQuery } from "usehooks-ts";

const ProductListing = () => {
  const { products, isLoading } = useContext(ProductListingContext);
  const parentRef = useRef(null);

  const isDesktopView = useMediaQuery("(min-width: 1024px)");
  const isMobileAndBelow = useMediaQuery("(max-width: 767px)");

  const productsPerRow = isDesktopView ? 3 : isMobileAndBelow ? 1 : 2;
  const rowCount = isLoading ? 0 : Math.ceil(products.length / productsPerRow);

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 480,
    measureElement: (el) => el.getBoundingClientRect().height,
  });
  const virtualItems = rowVirtualizer.getVirtualItems();

  if (isLoading) {
    return (
      <div
        className={clsx(
          "w-full h-full",
          "grid grid-cols-4 gap-8 md:grid-cols-6 lg:grid-cols-9",
        )}
      >
        Loading...
      </div>
    );
  }

  return (
    <div ref={parentRef} className={clsx("w-full h-full")}>
      <div
        className={clsx(
          "w-full grid grid-cols-4 gap-8 md:grid-cols-6 lg:grid-cols-9",
        )}
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: "relative",
        }}
      >
        {virtualItems.map((virtualItem) => {
          const rowIndex = virtualItem.index;
          const start = rowIndex * productsPerRow;
          const rowProducts = products.slice(start, start + productsPerRow);
          return (
            <div
              key={virtualItem.key}
              data-index={rowIndex}
              ref={rowVirtualizer.measureElement}
              className={clsx(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
                "w-full",
              )}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {rowProducts.map((product) => (
                <ProductCard key={product.product_id} product={product} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductListing;
