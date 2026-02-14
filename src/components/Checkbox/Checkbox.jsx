import clsx from "clsx";
import { useId } from "react";

const Checkbox = ({ label, value, disabled, onChange }) => {
  const id = useId();

  return (
    <div className="flex items-center gap-3">
      <div className="flex size-6 items-center justify-center">
        <input
          type="checkbox"
          id={id}
          className={clsx(
            "appearance-none cursor-pointer",
            "relative peer",
            "flex size-4 rounded",
            "border border-neutral-300",
            "checked:bg-indigo-600",
            "disabled:bg-neutral-200 disabled:cursor-not-allowed",
            "focus:outline-none focus:border-2 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/[.12] focus:ring-offset-0",
          )}
          checked={value}
          disabled={disabled}
          onChange={(event) => {
            if (!onChange) return;
            onChange(event.target.checked);
          }}
        />

        <svg
          className="absolute hidden peer-checked:block"
          width="9"
          height="7"
          viewBox="0 0 9 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.69471 0.292787C8.88218 0.480314 8.9875 0.734622 8.9875 0.999786C8.9875 1.26495 8.88218 1.51926 8.69471 1.70679L3.69471 6.70679C3.50718 6.89426 3.25288 6.99957 2.98771 6.99957C2.72255 6.99957 2.46824 6.89426 2.28071 6.70679L0.280712 4.70679C0.0985537 4.51818 -0.00224062 4.26558 3.78026e-05 4.00339C0.00231622 3.74119 0.107485 3.49038 0.292893 3.30497C0.478301 3.11956 0.729114 3.01439 0.99131 3.01211C1.25351 3.00983 1.50611 3.11063 1.69471 3.29279L2.98771 4.58579L7.28071 0.292787C7.46824 0.105316 7.72255 0 7.98771 0C8.25288 0 8.50718 0.105316 8.69471 0.292787Z"
            fill="white"
          />
        </svg>
      </div>

      <label
        htmlFor={id}
        className={clsx(
          "block",
          disabled ? "text-neutral-400" : "text-neutral-600",
        )}
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
