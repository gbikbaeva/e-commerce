import { useContext, useRef } from "react";
import { RiChatSmile3Line } from "react-icons/ri";
import { useVirtualizer } from "@tanstack/react-virtual";
import clsx from "clsx";

import Button from "../Button";
import Avatar from "../Avatar";
import Rating from "../Rating";
import { ReviewsContext } from "./contexts";
import { formatDate } from "./utils";

const ReviewList = () => {
  const [reviewsData] = useContext(ReviewsContext);
  const { reviews, pagination, currentPage, isFetchingMore, loadMoreReviews } =
    reviewsData || {};

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

  if (currentPage === 1 && isFetchingMore) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-5">
        Loading...
      </div>
    );
  }

  const parentRef = useRef(null);
  const rowVirtualizer = useVirtualizer({
    count: reviews.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 130,
    measureElement: (el) => el.getBoundingClientRect().height,
  });
  const virtualItems = rowVirtualizer.getVirtualItems();

  return (
    <div
      className="flex flex-col justify-center gap-6 grow pb-6"
      ref={parentRef}
    >
      <div
        className="w-full relative"
        style={{ height: rowVirtualizer.getTotalSize() }}
      >
        {virtualItems.map((virtualItem, index) => {
          const review = reviews[virtualItem.index];
          const isLast = index === virtualItems.length - 1;

          return (
            <div
              key={review.user.user_id + review.created_at}
              data-index={virtualItem.index}
              ref={rowVirtualizer.measureElement}
              className={clsx(
                "flex flex-col gap-4 absolute top-0 left-0 w-full",
                !isLast && "pb-8",
              )}
              style={{
                transform: `translateY(${virtualItem.start}px)`,
              }}
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
          );
        })}
      </div>

      {pagination.hasMore && (
        <div className="flex flex-col items-end px-4 pt-6">
          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            label={`Show ${pagination.total - reviews.length} more reviews`}
            disabled={isFetchingMore}
            onClick={loadMoreReviews}
          ></Button>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
