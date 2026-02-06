import clsx from "clsx";
import OverallRating from "./OverallRating";
import ReviewList from "./ReviewList";

const Reviews = () => {
  return (
    <div className="flex flex-col">
      <div className={clsx("flex flex-1")}>
        <div className="w-96 flex flex-col items-center">
          <OverallRating />
        </div>
        <div>
          <ReviewList />
        </div>
      </div>
    </div>
  );
};

export default Reviews;
