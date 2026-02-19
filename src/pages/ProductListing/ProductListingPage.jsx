import clsx from "clsx";
import { useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import Filter from "./components/Filter";
import ProductListing from "./components/ProductListing";
import { ProductListingContext } from "./components/contexts";
import Sort from "./components/Sort";
import { useProductFilters } from "./hooks/useProductFilters";

const PRODUCTS_PER_PAGE = 10;

const ProductListingPage = () => {
  const [selectedSort, setSelectedSort] = useState({
    value: "created",
    direction: "desc",
  });

  const {
    selectedCollections,
    selectedCategories,
    selectedColors,
    selectedRatings,
    ...filterActions
  } = useProductFilters();

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: [
        "products",
        selectedSort,
        [...selectedCollections],
        [...selectedCategories],
        [...selectedColors],
        [...selectedRatings],
      ],
      queryFn: async ({ pageParam }) => {
        const searchParams = new URLSearchParams();
        searchParams.set("page", String(pageParam));
        searchParams.set("per_page", String(PRODUCTS_PER_PAGE));
        searchParams.set("direction", selectedSort.direction);
        searchParams.set("sort", selectedSort.value);

        if (selectedCollections.size > 0) {
          searchParams.set(
            "collection",
            Array.from(selectedCollections).join(","),
          );
        }

        if (selectedCategories.size > 0) {
          searchParams.set(
            "category",
            Array.from(selectedCategories).join(","),
          );
        }

        if (selectedColors.size > 0) {
          searchParams.set("color", Array.from(selectedColors).join(","));
        }

        if (selectedRatings.size > 0) {
          searchParams.set("rating", Array.from(selectedRatings).join(","));
        }

        const result = await fetch(`/api/products?${searchParams.toString()}`);
        const response = await result.json();
        return response;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const { has_more, page } = lastPage?.pagination ?? {};
        return has_more ? page + 1 : undefined;
      },
    });

  const products = useMemo(
    () => data?.pages?.flatMap((p) => p.data) ?? [],
    [data],
  );

  const value = useMemo(() => {
    return {
      products,
      selectedCategories,
      selectedCollections,
      selectedColors,
      selectedRatings,
      selectedSort,
      setSelectedSort,
      isLoading,
      isFetchingNextPage,
      hasNextPage,
      fetchNextPage,
      ...filterActions,
    };
  }, [
    products,
    selectedSort,
    selectedCategories,
    selectedCollections,
    selectedColors,
    selectedRatings,
    filterActions,
    setSelectedSort,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  ]);

  return (
    <div
      className={clsx(
        "flex flex-col justify-start grow py-2",
        "bg-white rounded-md",
        "shadow-sm md:shadow-md lg:shadow-lg",
      )}
    >
      <ProductListingContext.Provider value={value}>
        <div
          className={clsx(
            "w-full",
            "px-3 py-12 md:px-4 md:py-16 lg:px-24 lg:py-24",
            "grid grid-cols-4 gap-x-4 gap-y-8 md:grid-cols-6 lg:grid-cols-12",
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
            <ProductListing />
          </div>
        </div>
      </ProductListingContext.Provider>
    </div>
  );
};

export default ProductListingPage;
