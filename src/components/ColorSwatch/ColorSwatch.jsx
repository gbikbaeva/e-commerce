import clsx from "clsx";
import { COLORS } from "../../constants";

const innerSizes = {
  sm: "size-4",
  md: "size-8.5",
};

const outerSizes = {
  sm: "size-6",
  md: "size-14",
};

const ringSizes = {
  sm: "focus:ring-2",
  md: "focus:ring-4",
};

const strokeSizes = {
  sm: "h-0.5 w-5",
  md: "h-px w-5",
};

const ColorSwatch = ({
  color,
  selectedColor,
  size = "md",
  onClick,
  outOfStock,
  type = "radio",
}) => {
  const isWhite = color === COLORS.white.value;
  const selected = selectedColor === color;
  const readOnly = !onClick || outOfStock;

  return (
    <label
      key={color}
      aria-label={color}
      className={clsx(
        "flex items-center justify-center",
        "rounded-full",
        outerSizes[size],
        readOnly ? "pointer-events-none" : "cursor-pointer",
      )}
    >
      <input
        type={type}
        name="color-choice"
        className="sr-only"
        value={color}
        checked={selected}
        disabled={outOfStock}
        onChange={() => {
          if (!onClick) {
            return;
          }
          onClick(color);
        }}
        aria-checked={selected}
        tabIndex="-1"
      />
      <div
        aria-hidden="true"
        className={clsx(
          "relative",
          "flex items-center justify-center",
          "rounded-full",
          innerSizes[size],
          isWhite && "border border-neutral-200",
          selected
            ? "border-2 border-white outline outline-1 outline-indigo-600"
            : !readOnly && [
                "hover:border-2 hover:border-indigo-200",
                "focus:border-none focus:outline-none focus:ring-indigo-600/[.12]",
                ringSizes[size],
              ],
        )}
        style={{ backgroundColor: color }}
        tabIndex={readOnly || selected ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onClick(color);
          }
        }}
      >
        {selectedColor === color && !outOfStock && (
          <svg
            className={clsx(isWhite ? "fill-black" : "fill-white")}
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11.6673 17.6993L22.3918 6.97485L24.0417 8.62477L11.6673 20.9991L4.24268 13.5745L5.89259 11.9246L11.6673 17.6993Z" />
          </svg>
        )}

        {outOfStock && (
          <div
            className={clsx(
              "absolute -rotate-45 bg-neutral-600",
              strokeSizes[size],
            )}
          ></div>
        )}
      </div>
    </label>
  );
};

export default ColorSwatch;
