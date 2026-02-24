import clsx from "clsx";
import { useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";

import Link from "../Link";

const variants = {
  primary: clsx("max-w-145 h-145"),
  secondary: clsx("max-w-145 h-84 md:h-69"),
};

const CollectionCard = ({ collection, variant = "primary" }) => {
  const navigate = useNavigate();
  const collectionUrl = `/products?collectionId=${collection.collection_id}`;

  const onKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        navigate({ to: collectionUrl });
      }
    },
    [navigate, collectionUrl],
  );

  return (
    <div
      tabIndex={0}
      className={clsx(
        "relative",
        "rounded-lg",
        "focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/[.12]",
      )}
      onKeyDown={onKeyDown}
    >
      <img
        loading="lazy"
        className={clsx("w-full object-cover", variants[variant])}
        src={collection.image_url}
        alt={`${collection.name}'s image`}
      ></img>

      <Link
        tabIndex={-1}
        to={collectionUrl}
        variant="unstyled"
        className="bg-collection hover:bg-collection-hover absolute inset-0 transition-all duration-300"
      >
        <div
          className={clsx(
            "absolute inset-x-4 bottom-4",
            "flex flex-col",
            "text-white",
          )}
        >
          <span className="text-sm">{collection.name}</span>
          <span className="text-lg font-medium">{collection.description}</span>
        </div>
      </Link>
    </div>
  );
};

export default CollectionCard;
