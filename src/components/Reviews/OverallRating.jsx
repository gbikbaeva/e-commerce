import { useContext, useState } from "react";
import clsx from "clsx";

import Button from "../Button";
import Rating from "../Rating";
import { ReviewsContext } from "./contexts";
import ProgressBar from "../ProgressBar";

const RATINGS = {
  excellent: 5,
  good: 4,
  average: 3,
  below_average: 2,
  poor: 1,
};

const OverallRating = () => {
  const [reviewsData] = useContext(ReviewsContext);
  const [selectedRating, setSelectedRating] = useState(null);
  const { aggregate } = reviewsData;
  const { counts, rating, total } = aggregate || {};

  const ratings = [
    {
      label: "Excellent",
      color: "bg-green-600",
      rating: RATINGS.excellent,
      value: counts?.find((item) => item.rating === RATINGS.excellent)?.count,
    },
    {
      label: "Good",
      color: "bg-green-500",
      rating: RATINGS.good,
      value: counts?.find((item) => item.rating === RATINGS.good)?.count,
    },
    {
      label: "Average",
      color: "bg-yellow-300",
      rating: RATINGS.average,
      value: counts?.find((item) => item.rating === RATINGS.average)?.count,
    },
    {
      label: "Below Average",
      color: "bg-yellow-500",
      rating: RATINGS.below_average,
      value: counts?.find((item) => item.rating === RATINGS.below_average)
        ?.count,
    },
    {
      label: "Poor",
      color: "bg-gray-200",
      rating: RATINGS.poor,
      value: counts?.find((item) => item.rating === RATINGS.poor)?.count,
    },
  ];

  return (
    <div className="flex flex-col gap-6 px-8">
      <div className="flex flex-col gap-2">
        <div className="font-semibold text-xl text-neutral-900">
          Overall Rating
        </div>
        <div className="flex justify-center items-center gap-2">
          <span className="font-semibold text-base text-neutral-900">4.1</span>
          <Rating value={rating} />
          <span className="font-normal text-sm text-neutral-600">
            Based on {total} reviews
          </span>
        </div>
      </div>

      <fieldset className="flex flex-col gap-4 py-4">
        <legend className="sr-only">Filter reviews by rating</legend>
        {ratings.map(({ label, color, rating, value }) => {
          const percentage = aggregate?.total
            ? Math.floor((value / aggregate.total) * 100)
            : 0;
          const hasReviews = percentage > 0;

          return (
            <button
              key={rating}
              className={clsx(
                "flex items-center gap-2",
                "text-base text-neutral-600 disabled:text-neutral-400",
                "cursor-pointer disabled:pointer-events-none",
              )}
              disabled={!hasReviews}
              aria-label={`Filter by ${rating} stars`}
              aria-pressed={selectedRating === rating}
              onClick={() => setSelectedRating(rating)}
            >
              <span
                className={clsx(
                  "w-30 px-0.5 text-left font-medium",
                  "hover:text-neutral-900",
                  selectedRating === rating && "text-indigo-700",
                )}
              >
                {label}
              </span>
              <ProgressBar color={color} value={percentage}></ProgressBar>
              <span className="w-10.5 text-right font-normal">
                {percentage}%
              </span>
            </button>
          );
        })}
      </fieldset>

      <div className="flex justify-center gap-6">
        {selectedRating && (
          <Button variant="tertiary" label="Clear filter" size="xl"></Button>
        )}
        <Button variant="secondary" label="Write a review" size="xl"></Button>
      </div>
    </div>
  );
};

export default OverallRating;
