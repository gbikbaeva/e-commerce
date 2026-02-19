import clsx from "clsx";
import SubscriptionForm from "./SubscriptionForm";

const Footer = () => {
  return (
    <div
      className={clsx(
        "flex flex-col justify-start grow py-2",
        "bg-white rounded-md",
        "shadow-sm md:shadow-md lg:shadow-lg",
      )}
    >
      <footer className="flex flex-col justify-center gap-12 px-4 md:gap-16 py-12 md:py-16 lg:px-16 lg:py-24">
        <div className="grid grid-cols-4 gap-x-4 md:grid-cols-6 md:gap-x-8 lg:grid-cols-12 lg:gap-y-8">
          <div className="flex flex-col gap-2 col-span-4 md:col-span-6 lg:col-span-8">
            <span className="font-semibold text-xl text-neutral-900">
              Join our newsletter
            </span>
            <span className="font-normal text-base text-neutral-600">
              We’ll send you a nice letter once per week. No spam.
            </span>
          </div>

          <div className="col-span-4 mt-8 md:col-span-6 md:mt-5 lg:col-span-4 lg:mt-0">
            <SubscriptionForm />
          </div>

          <div
            className={clsx(
              "col-span-4 mt-12 md:col-span-3 md:mt-16 lg:col-span-4 lg:mt-0",
              "flex flex-col gap-6 md:gap-8",
            )}
          >
            <div>
              <img
                src="https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/logo.svg"
                alt="Stylenest's Logo"
                className="block h-8 w-auto"
              />
            </div>

            <p className="text-neutral-600">
              Craft stunning style journeys that weave more joy into every
              thread.
            </p>
          </div>

          <div className="col-span-3 hidden md:block lg:hidden" />

          <div
            className={clsx(
              "col-span-4 mt-8 md:col-span-3 md:mt-12 lg:col-start-7 lg:mt-0",
              "flex flex-col gap-4",
            )}
          >
            <span className="text-sm text-neutral-500">SHOP CATEGORIES</span>
          </div>

          <div className="col-span-4 mt-8 md:col-span-3 md:mt-12 lg:mt-0">
            <span className="text-sm text-neutral-500">SHOP COLLECTIONS</span>
          </div>
        </div>

        <div
          className={clsx(
            "pt-8 flex flex-col gap-8 md:flex-row md:items-center lg:justify-between",
            "border-t border-solid border-neutral-200",
          )}
        >
          <span className="text-neutral-500">
            &copy; {new Date().getFullYear()} Stylenest. All rights reserved.
          </span>
          <div className="flex gap-6"></div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
