import clsx from "clsx";
import { useState } from "react";

import Star from "./Star";

const Rating = ({ value, max = 5, onChange }) => {
  const [hoveredStar, setHoveredStar] = useState(null);

  const readOnlyMode = !onChange;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, index) => (
        <span
          key={index}
          tabIndex={readOnlyMode ? -1 : 0}
          className={clsx(!readOnlyMode && "cursor-pointer")}
          onClick={() => onChange?.(index + 1)}
          onMouseEnter={() => !readOnlyMode && setHoveredStar(index)}
          onMouseLeave={() => !readOnlyMode && setHoveredStar(null)}
        >
          <Star
            filled={
              hoveredStar !== null ? hoveredStar >= index : value >= index + 1
            }
            halfFilled={
              hoveredStar !== null ? false : value < index + 1 && value > index
            }
          />
        </span>
      ))}
    </div>
  );
};

export default Rating;
