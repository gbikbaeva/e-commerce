import { useContext, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useMediaQuery } from "usehooks-ts";
import { useInView } from "react-intersection-observer";
import { RiTShirt2Line } from "react-icons/ri";
import clsx from "clsx";

import ProductCard from "../../../components/ProductCard";
import Button from "../../../components/Button";
import { ProductListingContext } from "./contexts";

const PRODUCT_ROW_HEIGHT = 480;
const NUMBER_OF_PRODUCTS_PER_ROW = {
  DESKTOP: 3,
  TABLET: 2,
  MOBILE: 1,
};

const ProductListing = () => {
  const {
    products,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    resetFilters,
  } = useContext(ProductListingContext);

  const parentRef = useRef(null);

  const { ref: loadMoreRef } = useInView({
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  const isDesktopView = useMediaQuery("(min-width: 1024px)");
  const isMobileAndBelow = useMediaQuery("(max-width: 767px)");

  const productsPerRow = isDesktopView
    ? NUMBER_OF_PRODUCTS_PER_ROW.DESKTOP
    : isMobileAndBelow
      ? NUMBER_OF_PRODUCTS_PER_ROW.MOBILE
      : NUMBER_OF_PRODUCTS_PER_ROW.TABLET;

  const rowCount = isLoading ? 0 : Math.ceil(products.length / productsPerRow);

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => PRODUCT_ROW_HEIGHT,
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

  if (products.length === 0) {
    return (
      <div
        className={clsx(
          "h-full w-full",
          "col-span-4 md:col-span-6 lg:col-span-9",
          "flex flex-col items-center justify-center gap-5",
        )}
      >
        <div
          className={clsx(
            "size-12 rounded-full bg-white shadow",
            "flex items-center justify-center",
          )}
        >
          <RiTShirt2Line className="size-6 text-indigo-700" />
        </div>
        <div
          className={clsx(
            "flex flex-col items-center gap-2",
            "text-center text-neutral-900",
          )}
        >
          <span className="text-xl font-medium">Nothing found just yet</span>
          <span>
            Adjust your filters a bit, and let's see what we can find!
          </span>
        </div>
        <Button label="Reset filters" size="lg" onClick={resetFilters} />
      </div>
    );
  }

  return (
    <div ref={parentRef} className={clsx("w-full h-full overflow-auto")}>
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: "relative",
        }}
      >
        {virtualItems.map((virtualItem) => {
          const rowIndex = virtualItem.index;
          const start = rowIndex * productsPerRow;
          const rowProducts = products.slice(start, start + productsPerRow);
          const isLast = rowIndex === virtualItems.length - 1;

          return (
            <div
              key={virtualItem.key}
              data-index={rowIndex}
              ref={rowVirtualizer.measureElement}
              className={clsx(
                "w-full",
                "grid grid-cols-1 gap-x-4 md:grid-cols-2 md:gap-x-8 lg:grid-cols-3",
                !isLast && "pb-8",
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

      {isFetchingNextPage && (
        <div className="w-full text-center py-4">Loading...</div>
      )}

      {hasNextPage && (
        <div ref={loadMoreRef} className="h-px w-full" aria-hidden="true" />
      )}
    </div>
  );
};

export default ProductListing;
