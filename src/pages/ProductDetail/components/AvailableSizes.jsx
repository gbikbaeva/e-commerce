import clsx from "clsx";
import { useContext, useMemo } from "react";

import { getUnavailableSizes } from "../../../utils";
import { ProductDetailContext } from "./contexts";

const SIZE_MAP = {
  xs: "XS",
  sm: "S",
  md: "M",
  lg: "L",
  xl: "XL",
};

const AvailableSizes = () => {
  const [productDetail] = useContext(ProductDetailContext);
  const { product, selectedColor, selectedSize, setSelectedSize } =
    productDetail;
  const { sizes } = product;

  const unavailableSizes = useMemo(
    () =>
      getUnavailableSizes({
        product,
        color: selectedColor,
      }),
    [product, selectedColor],
  );

  return (
    <fieldset aria-label="Choose a size">
      <legend className="font-normal text-sm text-neutral-500">
        Available Sizes
      </legend>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        {sizes.map((size) => {
          const outOfStock = unavailableSizes.includes(size);
          return (
            <label
              key={size}
              className={clsx(
                outOfStock ? "pointer-events-none" : "cursor-pointer",
              )}
            >
              <input
                aria-checked={selectedSize === size}
                type="radio"
                name="size"
                disabled={outOfStock}
                value={size}
                className="sr-only"
                tabIndex={-1}
                onChange={() => setSelectedSize(size)}
              />
              <span
                aria-hidden="true"
                tabIndex={selectedSize === size ? 0 : -1}
                className={clsx(
                  "h-12 w-16",
                  "flex justify-center items-center gap-1.5",
                  "px-5 py-3",
                  "font-medium uppercase",
                  "rounded border",
                  "focus:outline-none",
                  outOfStock
                    ? [
                        "text-neutral-400",
                        "pointer-events-none",
                        "bg-neutral-100",
                      ]
                    : [
                        "text-neutral-900",
                        "cursor-pointer",
                        "bg-white hover:bg-neutral-10 focus:bg-neutral-50",
                      ],
                  selectedSize === size
                    ? "border-indigo-600"
                    : "border-neutral-200",
                  outOfStock && selectedSize !== size && "border-none",
                )}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedSize(size);
                  }
                }}
              >
                {SIZE_MAP[size]}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};

export default AvailableSizes;
