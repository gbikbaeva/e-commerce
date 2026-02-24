import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";

import CollectionCard from "./CollectionCard";

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [isLoadingCollections, setIsLoadingCollections] = useState(false);

  const getCollections = useCallback(async () => {
    setIsLoadingCollections(true);
    const response = await fetch("/api/collections");
    const result = await response.json();
    setCollections(result.data);
    setIsLoadingCollections(false);
  }, []);

  useEffect(() => {
    getCollections();
  }, [getCollections]);

  return (
    <section
      aria-describedby="collections-description"
      className={clsx(
        "w-full px-3 py-12 md:px-4 md:py-16 lg:px-24 lg:py-24",
        "flex flex-col gap-8",
      )}
    >
      <p id="collections-description" className="text-3xl font-semibold">
        Our Collections
      </p>

      {isLoadingCollections ? (
        <div className={clsx("w-full h-full flex items-center justify-center")}>
          Loading...
        </div>
      ) : (
        collections.length > 2 && (
          <div className="flex gap-7 flex-col md:flex-row">
            <div className="flex-1">
              <CollectionCard collection={collections[0]}></CollectionCard>
            </div>

            <div className="flex flex-col gap-7 flex-1">
              <div className="flex-1">
                <CollectionCard
                  collection={collections[1]}
                  variant="secondary"
                ></CollectionCard>
              </div>
              <div className="flex-1">
                <CollectionCard
                  collection={collections[2]}
                  variant="secondary"
                ></CollectionCard>
              </div>
            </div>
          </div>
        )
      )}
    </section>
  );
};

export default Collections;
