import clsx from "clsx";
import { useNavigate } from "@tanstack/react-router";

import Button from "../../components/Button";
import LatestArrivals from "./components/LatestArrivals";

const LatestArrivalsPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className={clsx(
        "flex flex-col justify-start grow py-2",
        "bg-white rounded-md",
        "shadow-sm md:shadow-md lg:shadow-lg",
      )}
    >
      <div
        className={clsx(
          "w-full px-3 py-12 md:px-4 md:py-16 lg:px-24 lg:py-24",
          "flex flex-col items-center gap-8",
        )}
      >
        <div className="w-full flex grow justify-between">
          <h2 className="font-semibold text-2xl md:text-3xl text-neutral-900">
            Latest Arrivals
          </h2>
          <Button
            variant="secondary"
            size="lg"
            label="View All"
            onClick={() => navigate({ to: "/products/" })}
          ></Button>
        </div>

        <LatestArrivals />
      </div>
    </div>
  );
};

export default LatestArrivalsPage;
