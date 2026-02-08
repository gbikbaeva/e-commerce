import clsx from "clsx";
import OverallRating from "./OverallRating";
import ReviewList from "./ReviewList";
import { ReviewsContext } from "./contexts";
import { useCallback, useEffect, useMemo, useState } from "react";

const Reviews = () => {
  const [reviews, setReviews] = useState(null);
  const [isReviewsLoading, setIsReviewsLoading] = useState(false);
  const [aggregate, setAggregate] = useState(null);

  const getReviews = useCallback(async () => {
    setIsReviewsLoading(true);
    const data = await fetch(import.meta.env.BASE_URL + "/reviews.json");
    const result = await data.json();
    setReviews(result.data);
    setAggregate(result.aggregate);
    setIsReviewsLoading(false);
  }, []);

  useEffect(() => {
    getReviews();
  }, [getReviews]);

  const value = useMemo(() => {
    return { reviews, aggregate };
  }, [reviews, aggregate]);

  return (
    <ReviewsContext.Provider value={[value, () => {}]}>
      <div
        className={clsx(
          "h-[calc(100vh_-_232px)]",
          "flex flex-col gap-10 lg:flex-row lg:gap-8",
        )}
      >
        {isReviewsLoading || !reviews ? (
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
