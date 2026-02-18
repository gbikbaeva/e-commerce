import clsx from "clsx";
import { COLORS } from "../../constants";
import ColorSwatch from "../ColorSwatch";
import Link from "../Link";
import { useCallback, useMemo } from "react";
import { getUnavailableColors } from "../../utils";
import { useNavigate } from "@tanstack/react-router";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { inventory, colors } = product;
  const { color, list_price, sale_price, discount_percentage } = inventory[0];

  const hasDiscount = discount_percentage > 0;

  const unavailableColors = useMemo(
    () => getUnavailableColors(product),
    [product],
  );

  const productRoute = `/product/${product.product_id}`;
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        navigate(productRoute);
      }
    },
    [navigate, productRoute],
  );

  return (
    <div
      className={clsx(
        "w-full",
        "flex flex-col",
        "outline-none",
        "group",
        "focus:ring-4 focus:ring-indigo-600/[.12]",
      )}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <img
        className="w-full h-56 rounded-lg object-cover md:h-75"
        src={product.images[0].image_url}
        alt={`${product.name}'s image`}
        loading="lazy"
      />

      <div className="flex flex-col gap-3 py-4">
        <div className="flex flex-col gap-0.5">
          <span className="font-normal text-xs text-neutral-600">
            {COLORS[color]?.label}
          </span>
          <Link
            to={productRoute}
            className={clsx(
              "font-medium text-lg text-neutral-900",
              "group-hover:text-indigo-700",
            )}
          >
            {product.name}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg text-neutral-500">
            ${hasDiscount ? sale_price : list_price}
          </span>
          {hasDiscount && (
            <span className="text-xs line-through text-neutral-600">
              ${list_price}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1">
          {colors.map((color) => (
            <ColorSwatch
              key={color}
              color={COLORS[color].value}
              outOfStock={unavailableColors.includes(color)}
              size="sm"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
