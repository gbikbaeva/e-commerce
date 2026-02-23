import { useMediaQuery } from "usehooks-ts";
import { useContext, useMemo } from "react";

import Badge from "../../../components/Badge";
import Rating from "../../../components/Rating";
import Link from "../../../components/Link";
import Button from "../../../components/Button";
import { getInventoryData } from "../../../utils";
import AvailableColors from "./AvailableColors";
import ProductInfo from "./ProductInfo";
import ProductQuantity from "./ProductQuantity";
import { ProductDetailContext } from "./contexts";
import AvailableSizes from "./AvailableSizes";
import { CartContext } from "../../../contexts/CartContext";

const ProductMetadata = () => {
  const [productDetail] = useContext(ProductDetailContext);
  const [cartItems, addToCart] = useContext(CartContext);

  const { product, selectedColor, selectedSize, itemQuantity } = productDetail;
  const { description, name, reviews, rating } = product;

  const inventoryData = useMemo(
    () =>
      getInventoryData({ product, color: selectedColor, size: selectedSize }),
    [product, selectedColor, selectedSize],
  );

  const { stock, list_price, discount_percentage, sale_price } = inventoryData;

  const hasDiscount = !!discount_percentage;
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
              {name}
            </h1>
            <div>
              <div className="flex items-end gap-2">
                <span className="font-medium text-3xl text-neutral-600">
                  ${hasDiscount ? sale_price : list_price}
                </span>
                {hasDiscount && (
                  <span className="font-medium text-lg line-through text-neutral-400">
                    ${list_price}
                  </span>
                )}
              </div>
              {hasDiscount && (
                <div className="mt-2">
                  <Badge
                    label={`${discount_percentage}% OFF`}
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
              {reviews > 0 ? (
                <Link to="#" className="text-sm" variant="primary">
                  See all {reviews} reviews
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

        <p className="text-neutral-600">{description}</p>
      </section>

      <section aria-labelledby="product-options">
        <form className="flex flex-col gap-8">
          <AvailableColors />
          <AvailableSizes />
          <ProductQuantity availableStock={stock} />
          <Button
            label="Add to Cart"
            size={isMobileAndBelow ? "xl" : "2xl"}
            isDisabled={itemQuantity === 0 || stock === 0}
            onClick={(e) => {
              e.preventDefault();
              addToCart({
                id: product.id,
                size: selectedSize,
                color: selectedColor,
                quantity: itemQuantity,
              });
            }}
          ></Button>
        </form>
      </section>

      <section aria-labelledby="product-info">
        <ProductInfo />
      </section>
    </div>
  );
};

export default ProductMetadata;
