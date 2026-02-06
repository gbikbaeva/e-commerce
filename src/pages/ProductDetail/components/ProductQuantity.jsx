import { useContext } from "react";
import CartControl from "../../../components/CartControl";
import { ProductDetailContext } from "./contexts";

const ProductQuantity = ({ availableStock }) => {
  const [productDetail] = useContext(ProductDetailContext);
  const { itemQuantity, incrementQuantity, decrementQuantity } = productDetail;

  return (
    <fieldset aria-label="Choose a quantity">
      <legend className="font-normal text-sm text-neutral-500">Quantity</legend>
      <div className="mt-4">
        <CartControl
          quantity={itemQuantity}
          increment={incrementQuantity}
          decrement={decrementQuantity}
          availableStock={availableStock}
        />
      </div>
    </fieldset>
  );
};

export default ProductQuantity;
