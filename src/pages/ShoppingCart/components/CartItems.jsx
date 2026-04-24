import clsx from "clsx";
import { useContext, useState } from "react";

import Link from "../../../components/Link";
import Button from "../../../components/Button";
import CartControl from "../../../components/CartControl";
import { formatPrice } from "../../../utils";
import { COLORS, SIZE } from "../../../constants";
import { CartContext } from "../../../contexts/CartContext";
import ConfirmModal from "../../../components/ConfirmModal";

const CartItems = ({ className }) => {
  const { cartItems, incrementQuantity, decrementQuantity, removeFromCart } =
    useContext(CartContext);

  const [removalConfirmation, setRemovalConfirmation] = useState({
    show: false,
    onAction: () => {},
  });

  const closeRemovalConfirmation = () => {
    setRemovalConfirmation({
      show: false,
      onAction: () => {},
    });
  };

  const openRemovalConfirmation = (item) => {
    setRemovalConfirmation({
      show: true,
      onAction: () => {
        removeFromCart(item);
        closeRemovalConfirmation();
      },
    });
  };

  return (
    <section aria-describedby="cart-items-section" className={clsx(className)}>
      <h2 className="sr-only">Items in your shopping cart</h2>

      <ul className={clsx("divide-y divide-dashed divide-neutral-300")}>
        {cartItems.map((item) => {
          const productUrl = `/products/${item.id}`;
          const {
            product,
            unit,
            quantity,
            total_list_price,
            total_sale_price,
          } = item;
          const { size, color, stock, image_url } = unit;
          const { product_id, name, description } = product;
          const hasDiscount =
            !!total_sale_price && total_sale_price !== total_list_price;

          return (
            <li
              key={product_id + size + color}
              className={clsx(
                "flex flex-col gap-4 md:flex-row md:gap-8",
                "py-4 first:pt-0 last:pb-0",
              )}
            >
              <div className="relative">
                <img
                  src={image_url}
                  alt={`${SIZE[size]?.long ?? size} ${name} in ${color}`}
                  className="h-[200px] w-full rounded-lg object-cover md:min-w-[280px]"
                />
                <Link
                  to={productUrl}
                  variant="unstyled"
                  className="absolute inset-0"
                />
              </div>

              <div className="flex flex-col gap-4">
                <Link
                  to={productUrl}
                  className="text-2xl font-medium"
                  variant="unstyled"
                >
                  {name}
                </Link>
                <span className="font-medium text-neutral-600">
                  {COLORS[color].label}
                  {size && (
                    <>
                      {" • "}
                      {SIZE[size]?.long ?? size}
                    </>
                  )}
                </span>
                <span className="text-sm text-neutral-600">{description}</span>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <CartControl
                      quantity={quantity}
                      increment={() => incrementQuantity(item)}
                      decrement={() => decrementQuantity(item)}
                      availableStock={stock}
                    />
                    <Button
                      label="Remove"
                      variant="gray-link"
                      onClick={() => openRemovalConfirmation(item)}
                    />
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-right text-lg font-medium text-neutral-900">
                      $
                      {hasDiscount
                        ? formatPrice(total_sale_price)
                        : formatPrice(total_list_price)}
                    </span>
                    {hasDiscount && (
                      <span className="text-xs text-neutral-600 line-through">
                        ${formatPrice(total_list_price)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {removalConfirmation.show && (
        <ConfirmModal
          isOpen={removalConfirmation.show}
          title="Remove Item"
          description="Are you sure you want to remove this item from your cart?"
          confirmLabel="Yes, Remove"
          cancelLabel="No, Keep"
          onClose={closeRemovalConfirmation}
          onAction={removalConfirmation.onAction}
        />
      )}
    </section>
  );
};

export default CartItems;
