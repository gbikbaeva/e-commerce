import clsx from "clsx";
import Filter from "./components/Filter";
import ProductListing from "./components/ProductListing";
import { ProductListingContext } from "./components/contexts";
import Sort from "./components/Sort";

const ProductListingPage = () => {
  return (
    <div
      className={clsx(
        "flex flex-col justify-center grow py-2",
        "bg-white rounded-md",
        "shadow-sm md:shadow-md lg:shadow-lg",
      )}
    >
      <ProductListingContext.Provider value={[[], function () {}]}>
        <div
          className={clsx(
            "w-full",
            "px-3 py-12 md:px-4 md:py-16 lg:px-24 lg:py-24",
            "grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12",
          )}
        >
          <div
            className={clsx(
              "col-span-4 md:col-span-6 lg:col-span-3",
              "lg:pr-4 lg:pt-4 lg:pb-4",
              "flex justify-between",
            )}
          >
            <Filter />
            <div className="block lg:hidden">
              <Sort />
            </div>
          </div>

          <div
            className={clsx(
              "col-span-4 md:col-span-6 lg:col-span-9",
              "flex flex-col items-end gap-8",
            )}
          >
            <div className="hidden lg:block">
              <Sort />
            </div>
            <div
              className={clsx(
                "w-full h-full",
                "grid grid-cols-4 gap-8 md:grid-cols-6 lg:grid-cols-9",
              )}
            >
              <ProductListing />
            </div>
          </div>
        </div>
      </ProductListingContext.Provider>
    </div>
  );
};

export default ProductListingPage;
