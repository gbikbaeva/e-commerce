import clsx from "clsx";
import { useMediaQuery } from "usehooks-ts";

import Button from "../../../components/Button";
import { useNavigate } from "@tanstack/react-router";

const HeroSection = () => {
  const navigate = useNavigate();
  const isMobileAndBelow = useMediaQuery("(max-width: 767px)");

  return (
    <section
      aria-describedby="hero-section"
      className={clsx(
        "w-full px-3 py-12 md:px-4 md:py-16 lg:px-24 lg:py-24",
        "grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12",
        "gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-8",
      )}
    >
      <div
        className={clsx(
          "col-span-4 md:col-span-6 lg:col-span-5",
          "flex flex-col justify-center gap-16",
        )}
      >
        <div className="flex flex-col justify-center gap-4 md:gap-6">
          <span className="text-4xl font-semibold md:text-5xl lg:text-6xl">
            Summer styles are finally here
          </span>
          <span className="text-xl text-neutral-600">
            This year, our new summer collection will be your haven from the
            world's harsh elements.
          </span>
        </div>

        <div className="w-38 md:w-54 lg:w-44">
          <Button
            label="Shop now"
            size={isMobileAndBelow ? "xl" : "2xl"}
            className="w-full"
            onClick={() => navigate({ to: "/products" })}
          />
        </div>
      </div>

      <img
        src="https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/banner.jpg"
        alt="Storefront hero banner"
        className={clsx(
          "col-span-4 md:col-span-6 lg:col-span-7",
          "object-cover py-8 rounded-lg md:py-16 md:rounded-2xl",
        )}
      ></img>
    </section>
  );
};

export default HeroSection;
