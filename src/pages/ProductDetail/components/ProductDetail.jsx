import clsx from "clsx";
import { useContext } from "react";

import { ProductDetailContext } from "./contexts";
import ProductImages from "./ProductImages";
import ProductMetadata from "./ProductMetadata";

const ProductDetail = () => {
  const [productDetail] = useContext(ProductDetailContext);
  const { isProductLoading, product } = productDetail;

  if (!product || isProductLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="col-span-4 md:col-span-6">
        <ProductImages />
      </div>
      <div className="col-span-4 md:col-span-6">
        <ProductMetadata />
      </div>
    </>
  );
};

export default ProductDetail;
