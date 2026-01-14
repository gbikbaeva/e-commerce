import clsx from "clsx";

const ProductImages = () => {
  const images = [
    {
      src: "/e-commerce/api/images/product-img-secondary-1.png",
      alt: "Product Image 1",
    },
    {
      src: "/e-commerce/api/images/product-img-secondary-2.png",
      alt: "Product Image 2",
    },
    {
      src: "/e-commerce/api/images/product-img-secondary-3.png",
      alt: "Product Image 3",
    },
    {
      src: "/e-commerce/api/images/product-img-secondary-4.png",
      alt: "Product Image 4",
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      <img
        src="/e-commerce/api/images/product-img-main.png"
        alt="Product"
        className="h-100 w-full object-cover rounded-lg md:h-200"
      />
      <div className="flex gap-4 overflow-x-auto">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className={clsx(
              "block shrink-0 rounded-lg",
              "object-cover h-30 w-20 md:h-47.5 md:w-47 lg:w-40",
              "cursor-pointer",
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
