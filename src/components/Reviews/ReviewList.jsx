import { useContext } from "react";
import clsx from "clsx";
import { RiChatSmile3Line } from "react-icons/ri";

import Button from "../Button";
import Avatar from "../Avatar";
import Rating from "../Rating";
import { ReviewsContext } from "./contexts";
import { formatDate } from "./utils";

const ReviewList = () => {
  const [reviewsData] = useContext(ReviewsContext);
  const { reviews } = reviewsData || {};

  if (!reviews || reviews.length === 0) {
    return (
      <div className="h-full flex flex-col justify-center items-center gap-5 grow p-6">
        <div
          className={clsx(
            "flex items-center justify-center",
            "size-12 bg-white rounded-full shadow",
            "text-indigo-700",
          )}
        >
          <RiChatSmile3Line className="size-6"></RiChatSmile3Line>
        </div>
        <div
          className={clsx(
            "flex flex-col items-center gap-2",
            "text-center text-neutral-900",
          )}
        >
          <span className="font-medium text-xl">No reviews yet!</span>
          <span className="font-normal text-base">
            Be the first to review this product
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center gap-6 grow">
      <div className="flex flex-col justify-center gap-8">
        {reviews.map((review) => (
          <div
            key={review.user.user_id + review.created_at}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-4">
              <Avatar
                src={review.user.avatar_url}
                name={review.user.name}
              ></Avatar>
              <div className="flex flex-col gap-1 grow">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-base text-neutral-900">
                    {review.user.name}
                  </h4>
                  <span className="font-normal text-xs text-neutral-600">
                    {formatDate(new Date(review.created_at))}
                  </span>
                </div>
                <Rating value={review.rating}></Rating>
              </div>
            </div>
            {review.content && (
              <p className="font-normal text-base text-neutral-600">
                {review.content}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col items-end px-4 py-6">
        <Button
          variant="secondary"
          label="Show 12 more reviews"
          size="lg"
          className="w-full"
        ></Button>
      </div>
    </div>
  );
};

export default ReviewList;
