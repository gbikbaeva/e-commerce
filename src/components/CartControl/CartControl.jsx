import clsx from "clsx";
import { RiAddFill, RiSubtractFill } from "react-icons/ri";

const CartControl = ({
  quantity = 0,
  availableStock,
  decrement,
  increment,
}) => {
  return (
    <div
      role="group"
      aria-label="Product quantity control"
      className={clsx(
        "h-9 w-31",
        "flex justify-center items-center gap-3",
        "p-0.5",
        "rounded-md bg-neutral-50 border border-solid border-neutral-200",
      )}
    >
      <button
        aria-label="Decrease quantity"
        type="button"
        className={clsx(
          "flex justify-center items-center rounded",
          "text-neutral-600 disabled:text-neutral-400",
          "cursor-pointer disabled:pointer-events-none",
        )}
        disabled={quantity <= 1}
        onClick={decrement}
      >
        <RiSubtractFill className="size-5 shrink-0 p-0.5" />
      </button>
      <span
        className={clsx(
          "flex-1",
          "text-center text-sm font-medium text-neutral-600",
        )}
      >
        {quantity}
      </span>
      <button
        aria-label="Increase quantity"
        type="button"
        className={clsx(
          "flex justify-center items-center rounded",
          "text-neutral-600 disabled:text-neutral-400",
          "cursor-pointer disabled:pointer-events-none",
        )}
        disabled={quantity >= availableStock}
        onClick={increment}
      >
        <RiAddFill className="size-5 shrink-0 p-0.5" />
      </button>
    </div>
  );
};

export default CartControl;
