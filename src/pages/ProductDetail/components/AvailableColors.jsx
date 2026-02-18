import { useContext, useMemo } from "react";

import ColorSwatch from "../../../components/ColorSwatch";
import COLORS from "../../../constants";
import { getUnavailableColors } from "../../../utils";
import { ProductDetailContext } from "./contexts";

const AvailableColors = () => {
  const [productDetail] = useContext(ProductDetailContext);
  const { product, selectedColor, setSelectedColor } = productDetail;

  const { colors } = product;
  const unavailableColors = useMemo(
    () => getUnavailableColors(product),
    [product],
  );

  return (
    <fieldset aria-label="Choose a color">
      <legend className="font-normal text-sm text-neutral-500">
        Available Colors
      </legend>
      <div className="mt-4 flex items-wrap gap-4">
        {colors.map((color) => (
          <ColorSwatch
            key={color}
            color={COLORS[color].value}
            selectedColor={COLORS[selectedColor]?.value}
            outOfStock={unavailableColors.includes(color)}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>
    </fieldset>
  );
};

export default AvailableColors;
