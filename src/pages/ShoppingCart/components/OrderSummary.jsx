import clsx from "clsx";
import { useMediaQuery } from "usehooks-ts";

import Button from "../../../components/Button";
import CouponCode from "./CouponCode";
import { useContext, useMemo } from "react";
import { CartContext } from "../../../contexts/CartContext";
import { getFinalAmount, getTotalAmount } from "../utils";
import StockChangedModal from "./StockChangedModal";

const OrderSummary = ({ className }) => {
  const isMobileAndBelow = useMediaQuery("(max-width: 767px)");
  const { cartItems, discount, checkingStock } = useContext(CartContext);
  const subtotal = useMemo(() => getTotalAmount(cartItems), [cartItems]);
  const finalPrice = useMemo(
    () => getFinalAmount(subtotal, discount),
    [subtotal, discount],
  );

  return (
    <section
      aria-describedby="cart-summey"
      className={clsx(
        "flex flex-col gap-8 p-4 bg-white rounded-lg md:p-8",
        "border border-solid border-neutral-200",
        className,
      )}
    >
      <h3 className="font-semibold text-2xl text-neutral-900">Order Summary</h3>

      <div
        className={clsx(
          "flex flex-col",
          "divide-y divide-dashed divide-neutral-300",
        )}
      >
        <div className="flex flex-col gap-4 pb-8">
          <div className="flex justify-between items-center gap-2">
            <span className="text-base text-neutral-600">Subtotal</span>
            <span className="font-semibold text-lg text-right text-neutral-900">
              ${subtotal}
            </span>
          </div>
          <div className="flex justify-between items-center gap-2">
            <span className="text-base text-neutral-600">Shipping</span>
            <span className="font-semibold text-lg text-right text-neutral-900">
              FREE
            </span>
          </div>
          <div className="flex items-center justify-end gap-2">
            <CouponCode />
          </div>
        </div>

        <div className="flex flex-col gap-8 pt-8">
          <div className="flex gap-4 justify-between items-center text-neutral-900">
            <span className="font-medium text-2xl">Total</span>
            <span className="font-semibold text-4xl text-right">
              ${finalPrice}
            </span>
          </div>
          <Button
            type="submit"
            label="Checkout"
            isDisabled={checkingStock}
            size={isMobileAndBelow ? "xl" : "2xl"}
          ></Button>
        </div>
      </div>

      <StockChangedModal />
    </section>
  );
};

export default OrderSummary;
