import clsx from "clsx";
import { useCallback, useEffect, useMemo, useState } from "react";

import { getUnavailableSizes } from "../../utils";
import { ProductDetailContext } from "./components/contexts";
import ProductDetail from "./components/ProductDetail";

const ProductDetailPage = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [itemQuantity, setItemQuantity] = useState(1);

  const decrementQuantity = useCallback(() => {
    setItemQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const incrementQuantity = useCallback(() => {
    setItemQuantity((prev) => prev + 1);
  }, []);

  const getProduct = useCallback(async () => {
    setIsProductLoading(true);
    const response = await fetch(`/api/products/${productId}`);
    const product = await response.json();
    setProduct(product);
    setSelectedColor(product.colors[0]);
    setIsProductLoading(false);
  }, [productId]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  useEffect(() => {
    if (!product || !selectedColor) {
      return;
    }

    const unavailableSizes = getUnavailableSizes({
      product,
      color: selectedColor,
    });
    const availableSizes = [...product.sizes].filter(
      (size) => !unavailableSizes.includes(size),
    );
    if (availableSizes.length > 0) {
      setSelectedSize(availableSizes[0]);
    }
  }, [selectedColor, product]);

  const value = useMemo(() => {
    return {
      isProductLoading,
      product,
      selectedColor,
      setSelectedColor,
      selectedSize,
      setSelectedSize,
      itemQuantity,
      decrementQuantity,
      incrementQuantity,
    };
  }, [
    isProductLoading,
    product,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    itemQuantity,
    decrementQuantity,
    incrementQuantity,
  ]);

  return (
    <div
      className={clsx(
        "flex flex-col justify-start grow py-2",
        "bg-white rounded-md",
        "shadow-sm md:shadow-md lg:shadow-lg",
      )}
    >
      <ProductDetailContext.Provider value={[value, () => {}]}>
        <div
          className={clsx(
            "w-full",
            "px-4 py-12 md:py-16 lg:p-24",
            "grid grid-cols-4 gap-x-4 gap-y-12 md:grid-cols-6 md:gap-x-8 lg:grid-cols-12",
          )}
        >
          <ProductDetail />
        </div>
      </ProductDetailContext.Provider>
    </div>
  );
};

export default ProductDetailPage;
