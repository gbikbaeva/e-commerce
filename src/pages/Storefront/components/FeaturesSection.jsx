import clsx from "clsx";
import { RiExchangeLine, RiShieldCheckLine, RiTruckLine } from "react-icons/ri";

const FeaturesSection = () => {
  return (
    <section
      aria-describedby="features-section"
      className={clsx(
        "w-full px-3 py-12 md:px-4 md:py-16 lg:px-24 lg:py-24",
        "flex flex-col gap-12 md:gap-16",
      )}
    >
      <div className="flex flex-col gap-5 lg:px-40 text-center">
        <div className="flex flex-col justify-center gap-3 lg:px-10">
          <span className="font-semibold text-indigo-700">
            Elevate Your Experience
          </span>
          <h2 className="text-3xl font-semibold md:text-5xl">
            Our Commitment to Exceptional Service
          </h2>
        </div>
        <p id="features-section" className="text-xl text-neutral-600">
          We pride ourselves on a foundation of exceptional customer service,
          where every interaction is a testament to our dedication to
          excellence.
        </p>
      </div>

      <ul
        className={clsx(
          "grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12",
          "gap-x-4 gap-y-8 md:gap-x-8",
        )}
      >
        <li
          className={clsx(
            "col-span-4 md:col-span-6 lg:col-span-4",
            "flex flex-col items-center justify-center gap-5",
          )}
        >
          <div
            aria-hidden="true"
            className={clsx(
              "shadow-custom h-12 w-12 rounded-full bg-white",
              "flex items-center justify-center",
            )}
          >
            <RiTruckLine className="size-6 text-indigo-700" />
          </div>
          <div className="flex flex-col justify-center gap-2 self-stretch">
            <span className="text-center text-xl font-semibold text-neutral-900">
              Complimentary Shipping
            </span>
            <span className="text-center text-base font-normal text-neutral-600">
              Enjoy the convenience of free shipping for all orders. We believe
              in transparent pricing, and the price you see is the price you
              pay—no surprise fees
            </span>
          </div>
        </li>
        <li
          className={clsx(
            "col-span-4 md:col-span-6 lg:col-span-4",
            "flex flex-col items-center justify-center gap-5",
          )}
        >
          <div
            aria-hidden="true"
            className={clsx(
              "shadow-custom h-12 w-12 rounded-full bg-white",
              "flex items-center justify-center",
            )}
          >
            <RiShieldCheckLine className="size-6 text-indigo-700" />
          </div>
          <div className="flex flex-col justify-center gap-2 self-stretch">
            <span className="text-center text-xl font-semibold text-neutral-900">
              2-Year Quality Promise
            </span>
            <span className="text-center text-base font-normal text-neutral-600">
              Shop with confidence knowing that we stand behind our products.
              Should any issue arise within the first two years, rest assured
              we're here to help with a hassle-free replacement.
            </span>
          </div>
        </li>
        <li
          className={clsx(
            "col-span-4 md:col-span-6 lg:col-span-4",
            "flex flex-col items-center justify-center gap-5",
          )}
        >
          <div
            aria-hidden="true"
            className={clsx(
              "shadow-custom h-12 w-12 rounded-full bg-white",
              "flex items-center justify-center",
            )}
          >
            <RiExchangeLine className="size-6 text-indigo-700" />
          </div>
          <div className="flex flex-col justify-center gap-2 self-stretch">
            <span className="text-center text-xl font-semibold text-neutral-900">
              Easy Exchanges
            </span>
            <span className="text-center text-base font-normal text-neutral-600">
              If your purchase isn't quite right, pass it on to a friend who
              might love it, and let us know. We're happy to facilitate an
              exchange to ensure you have the perfect item to complement your
              lifestyle.
            </span>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default FeaturesSection;
