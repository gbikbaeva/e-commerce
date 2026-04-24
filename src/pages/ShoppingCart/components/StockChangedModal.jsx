import { useContext } from "react";
import { RiArrowRightLine } from "react-icons/ri";
import clsx from "clsx";

import { CartContext } from "../../../contexts/CartContext";
import ConfirmModal from "../../../components/ConfirmModal";
import Modal from "../../../components/Modal/Modal";
import Button from "../../../components/Button";
import { COLORS, SIZE } from "../../../constants";

const StockChangedModal = () => {
  const {
    stockChangedData,
    cartItems,
    acknowledgeStockChanged,
    showStockChangedModal,
  } = useContext(CartContext);

  if (!showStockChangedModal) {
    return null;
  }

  const modalBody = (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-xl text-neutral-900">
          Change of stock
        </h2>
        <span className="text-sm text-neutral-600">
          While you were browsing, certain stocks have become unavailable:
        </span>
      </div>

      <ul className={clsx("divide-y divide-dashed divide-neutral-300")}>
        {stockChangedData.map((item, index) => {
          const { unit, product, stock, cartQuantity } = item;
          return (
            <li
              key={product.name + unit.size + unit.color}
              className={clsx("flex gap-6", "py-8 first:pt-0 last:pb-0")}
            >
              <img
                className="size-20 rounded-lg object-cover"
                src={unit.image_url}
                alt={`${SIZE[unit.size]?.long ?? unit.size} ${
                  product.name
                } in ${unit.color}`}
              />
              <div className="flex flex-col gap-2 font-medium">
                <span className="text-xl">{product.name}</span>
                <span className="text-neutral-600">
                  {COLORS[unit.color].label}
                  {unit.size && (
                    <>
                      {" • "}
                      {SIZE[unit.size]?.long ?? unit.size}
                    </>
                  )}
                </span>
                <div
                  className={clsx(
                    "flex items-center gap-2",
                    "text-neutral-600",
                  )}
                >
                  <span>Quantity: {cartQuantity}</span>
                  <RiArrowRightLine className="size-3" />
                  <span>{stock}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <Button
        label="Ok"
        size="lg"
        className="flex-1"
        onClick={() => acknowledgeStockChanged(cartItems, stockChangedData)}
      />
    </div>
  );

  return <Modal isOpen={showStockChangedModal} children={modalBody} />;
};

export default StockChangedModal;
