import { RiShoppingBag3Line } from "react-icons/ri";
import { Link as RouterLink } from "@tanstack/react-router";
import clsx from "clsx";
import { useContext } from "react";

import { CartContext } from "../../contexts/CartContext";

const CartButton = ({ disabled }) => {
  const { cartItems } = useContext(CartContext);
  const cartItemCount = cartItems.length;

  return (
    <RouterLink
      to={"/shopping-cart/"}
      className={clsx(
        "relative cursor-pointer rounded text-neutral-600",
        "focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/[.12]",
        {
          "pointer-events-none text-neutral-400": disabled,
        },
      )}
    >
      <RiShoppingBag3Line className="size-5" aria-hidden="true" />

      {cartItemCount > 0 && (
        <div
          className={clsx(
            "absolute -right-1.5 -top-1.5 w-4.5 h-4.5 rounded-full text-center text-xs font-semibold",
            "flex justify-center items-center",
            {
              "bg-indigo-700 text-white": !disabled,
              "bg-neutral-100 text-neutral-400": disabled,
            },
          )}
        >
          {cartItemCount}
        </div>
      )}
    </RouterLink>
  );
};

export default CartButton;
