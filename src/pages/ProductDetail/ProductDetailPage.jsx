import { useCallback, useEffect, useMemo, useState } from "react";

import { getUnavailableSizes } from "../../utils";
import ProductSpecification from "../../components/ProductSpecification";
import { ProductDetailContext } from "./components/contexts";
import ProductDetail from "./components/ProductDetail";
import ProductCollection from "./components/ProductCollection";

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
    <>
      <ProductDetailContext.Provider value={[value, () => {}]}>
        <ProductDetail />
      </ProductDetailContext.Provider>
      <ProductSpecification />
      <ProductCollection />
    </>
  );
};

export default ProductDetailPage;
