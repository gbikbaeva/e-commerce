import clsx from "clsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import OverallRating from "./OverallRating";
import ReviewList from "./ReviewList";
import { ReviewsContext } from "./contexts";

const Reviews = () => {
  const isDesktopView = useMediaQuery("(min-width: 1024px)");
  const limit = isDesktopView ? 12 : 10;

  const [reviews, setReviews] = useState(null);
  const [aggregate, setAggregate] = useState(null);
  const [pagination, setPagination] = useState({
    hasMore: false,
    total: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRating, setSelectedRating] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const getReviews = useCallback(
    async (initialFetching = false) => {
      if (initialFetching) {
        setIsInitialLoading(true);
      } else {
        setIsFetchingMore(true);
      }

      const response = await fetch(
        `/api/reviews?page=${currentPage}&per_page=${limit}${selectedRating ? `&rating=${selectedRating}` : ""}`,
      );
      const result = await response.json();

      if (result) {
        setReviews(
          currentPage === 1 ? result.data : (prev) => [...prev, ...result.data],
        );
        setAggregate(result.aggregate);
        setPagination({
          hasMore: result.pagination.has_more,
          total: result.pagination.total,
        });
        setCurrentPage(result.pagination.page);
      }

      setIsInitialLoading(false);
      setIsFetchingMore(false);
    },
    [currentPage, limit, selectedRating],
  );

  const loadMoreReviews = useCallback(() => {
    if (pagination.hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [pagination.hasMore]);

  const onRatingSelect = useCallback((rating) => {
    setSelectedRating(rating);
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    getReviews(isInitialLoading);
  }, [currentPage, selectedRating]);

  const value = useMemo(() => {
    return {
      reviews,
      aggregate,
      pagination,
      isInitialLoading,
      isFetchingMore,
      currentPage,
      selectedRating,
      loadMoreReviews,
      onRatingSelect,
    };
  }, [
    reviews,
    aggregate,
    pagination,
    isInitialLoading,
    isFetchingMore,
    currentPage,
    selectedRating,
    loadMoreReviews,
    onRatingSelect,
  ]);

  return (
    <ReviewsContext.Provider value={[value, () => {}]}>
      <div
        className={clsx(
          "h-[calc(100vh_-_232px)] overflow-y-auto",
          "flex flex-col gap-10 lg:flex-row lg:gap-8",
        )}
      >
        {isInitialLoading || !reviews ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="w-full lg:w-96 flex flex-col items-center">
              <OverallRating />
            </div>
            <div className="w-full flex-1 px-4 md:px-8 lg:pl-0 lg:pr-8">
              <ReviewList />
            </div>
          </>
        )}
      </div>
    </ReviewsContext.Provider>
  );
};

export default Reviews;
