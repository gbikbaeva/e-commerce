import clsx from "clsx";
import { useContext, useMemo, useState } from "react";

import { ProductDetailContext } from "./contexts";
import { getSelectedColorImages } from "../utils";

const ProductImages = () => {
  const [productDetail] = useContext(ProductDetailContext);
  const [selectedPreview, setSelectedPreview] = useState(0);
  const { product, selectedColor } = productDetail;

  const images = useMemo(
    () => getSelectedColorImages({ product, color: selectedColor }),
    [product, selectedColor],
  );

  const safeIndex = images.length
    ? Math.min(selectedPreview, images.length - 1)
    : 0;

  return (
    <div className="flex flex-col gap-6">
      <img
        src={images[safeIndex].image_url}
        alt="Selected preview"
        loading="lazy"
        className="h-100 w-full object-cover rounded-lg md:h-200"
      />
      <div className="flex gap-4 overflow-x-auto">
        {images.map((image, index) => (
          <img
            key={image.image_url + index}
            src={image.image_url}
            alt={`Preview ${index + 1}`}
            className={clsx(
              "block shrink-0 rounded-lg",
              "object-cover h-30 w-20 md:h-47.5 md:w-47 lg:w-40",
              "cursor-pointer",
              index === selectedPreview && "border-[3px] border-indigo-600",
            )}
            onClick={() => setSelectedPreview(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
