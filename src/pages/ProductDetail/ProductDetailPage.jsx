import clsx from "clsx";
import { useState } from "react";

import { ProductDetailContext } from "./contexts";
import ProductImages from "./ProductImages";
import ProductMetadata from "./ProductMetadata";

const ProductDetailPage = () => {
  const productDetailHook = useState({
    info: [
      {
        title: "Features",
        description: [
          "Designed for comfort and durability.",
          "Soft, breathable fabric ideal for travel and adventure.",
          "Large front pocket and adjustable hood.",
          "Minimalist design pairs well with any style.",
          "Made with eco-conscious materials.",
        ],
      },
      {
        title: "Fabric & Care",
        description: [
          "Machine wash cold on a gentle cycle.",
          "Tumble dry low or hang to dry.",
          "Do not use fabric softeners or bleach.",
          "Iron on a low setting if necessary.",
        ],
      },
      {
        title: "Shipping",
        description: [
          "Free standard shipping on all orders - no minimum spend required.",
          "Expedited shipping available at an additional cost.",
          "Packaged in biodegradable materials to reduce environmental impact.",
        ],
      },
    ],
  });
  return (
    <div className="flex flex-col min-h-screen mx-auto p-4">
      <div
        className={clsx(
          "flex flex-1 rounded-md bg-white",
          "shadow-sm md:shadow-md lg:shadow-lg",
        )}
      >
        <ProductDetailContext value={productDetailHook}>
          <div
            className={clsx(
              "w-full",
              "px-4 py-12 md:py-16 lg:p-24",
              "grid grid-cols-4 gap-x-4 gap-y-12 md:grid-cols-6 md:gap-x-8 lg:grid-cols-12",
            )}
          >
            <div className="col-span-4 md:col-span-6">
              <ProductImages />
            </div>
            <div className="col-span-4 md:col-span-6">
              <ProductMetadata />
            </div>
          </div>
        </ProductDetailContext>
      </div>
    </div>
  );
};

export default ProductDetailPage;
