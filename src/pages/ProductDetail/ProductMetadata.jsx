import { useMediaQuery } from "usehooks-ts";

import Badge from "../../components/Badge";
import Rating from "../../components/Rating";
import Link from "../../components/Link";
import Button from "../../components/Button";

import AvailableColors from "./AvailableColors";
import ProductInfo from "./ProductInfo";

const ProductMetadata = () => {
  const price = 76;
  const originalPrice = 95;
  const discountPercentage = 20;
  const rating = 4.1;
  const reviewsCount = 62;

  const hasDiscount = !!discountPercentage;
  const roundedRating = Math.round(rating * 10) / 10;

  const isMobileAndBelow = useMediaQuery;

  return (
    <div className="flex flex-col gap-10">
      <section
        className="flex flex-col gap-8"
        aria-labelledby="product-info-heading"
      >
        <div className="flex flex-col items-start gap-8">
          <div className="flex flex-col items-start gap-5">
            <h1
              id="product-info-heading"
              className="font-semibold text-3xl text-neutral-900 md:text-5xl"
            >
              Voyager Hoodie
            </h1>
            <div>
              <div className="flex items-end gap-2">
                <span className="font-medium text-3xl text-neutral-600">
                  ${hasDiscount ? price : originalPrice}
                </span>
                {hasDiscount && (
                  <span className="font-medium text-lg line-through text-neutral-400">
                    ${originalPrice}
                  </span>
                )}
              </div>
              {hasDiscount && (
                <div className="mt-2">
                  <Badge
                    label={`${discountPercentage}% OFF`}
                    size="lg"
                    variant="warning"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-normal text-xl text-neutral-900">
                {roundedRating ?? 0}
              </span>
              <Rating value={roundedRating ?? 0} />
              {reviewsCount > 0 ? (
                <Link to="#" className="text-sm" variant="primary">
                  See all {reviewsCount} reviews
                </Link>
              ) : (
                <div className="flex gap-0.5">
                  <span className="text-sm text-neutral-900">
                    No reviews yet.
                  </span>
                  <Link to="#" className="text-sm" variant="primary">
                    Be the first.
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="text-neutral-600">
          The Voyager Hoodie is for the explorer at heart. Its durable fabric
          and roomy pockets are perfect for those who are always searching for
          the next adventure.
        </p>
      </section>

      <section aria-labelledby="product-options">
        <AvailableColors />
        <Button label="Add to Cart"></Button>
      </section>

      <section aria-labelledby="product-info">
        <ProductInfo />
      </section>
    </div>
  );
};

export default ProductMetadata;
