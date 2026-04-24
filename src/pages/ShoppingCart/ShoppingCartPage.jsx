import clsx from "clsx";
import { useContext } from "react";

import OrderSummary from "./components/OrderSummary";
import CartItems from "./components/CartItems";
import { CartContext } from "../../contexts/CartContext";
import EmptyCart from "./components/EmptyCart";

const ShoppingCartPage = () => {
  const { cartItems, checkForStockChanged, isFetching } =
    useContext(CartContext);

  return (
    <div
      className={clsx(
        "w-full",
        "px-3 py-12 md:px-4 md:py-16 lg:px-24 lg:py-24",
        "flex flex-col gap-16",
      )}
    >
      <h2 className="font-semibold text-3xl text-neutral-900 md:text-5xl">
        Shopping cart
      </h2>

      {isFetching ? (
        <div>Loading...</div>
      ) : cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <form
          className={clsx(
            "grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12",
            "gap-x-4 gap-y-16 md:gap-x-8",
          )}
          onSubmit={(e) => {
            e.preventDefault();
            checkForStockChanged(cartItems);
          }}
        >
          <CartItems className="col-span-4 md:col-span-6 lg:col-span-8" />
          <OrderSummary className="col-span-4 md:col-span-6 lg:col-span-4" />
        </form>
      )}
    </div>
  );
};

export default ShoppingCartPage;
