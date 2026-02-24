import clsx from "clsx";

const spacings = {
  md: "gap-x-1.5",
  lg: "gap-x-2",
  xl: "gap-x-2",
  "2xl": "gap-x-3",
};

const fontSizes = {
  md: "text-sm",
  lg: "text-base",
  xl: "text-base",
  "2xl": "text-lg",
};

const heights = {
  md: "h-10",
  lg: "h-11",
  xl: "h-12",
  "2xl": "h-15",
};

const paddings = {
  md: "px-3.5 py-2.5",
  lg: "px-4 py-2.5",
  xl: "px-5 py-3",
  "2xl": "px-6 py-4",
};

const variants = {
  primary: clsx(
    "bg-indigo-700",
    "shadow-custom",
    "text-white",
    "hover:bg-indigo-800 focus:bg-indigo-800",
  ),
  secondary: clsx(
    "bg-white",
    "shadow-custom",
    "text-neutral-900",
    "border border-neutral-200",
    "hover:bg-neutral-50 focus:bg-neutral-50",
  ),
  tertiary: clsx(
    "bg-transparent",
    "text-indigo-700",
    "border-none",
    "hover:text-indigo-800 focus:text-indigo-800",
  ),
  link: clsx(
    "text-indigo-700",
    "hover:text-indigo-800 focus:text-indigo-800",
    "rounded focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/[.12]",
  ),
};

const variantsDisabled = {
  primary: clsx(
    "disabled:bg-neutral-100",
    "disabled:text-neutral-400",
    "disabled:shadow-none",
  ),
  secondary: clsx(
    "disabled:bg-neutral-100",
    "disabled:text-neutral-400",
    "disabled:shadow-none",
  ),
  tertiary: clsx("disabled:bg-none", "disabled:text-neutral-400"),
  link: clsx("disabled:text-neutral-400"),
};

const Button = ({
  className,
  label,
  isDisabled,
  variant = "primary",
  size = "md",
  startIcon: StartIcon,
  endIcon: EndIcon,
  iconClassName,
  ...props
}) => {
  const isLinkVariant = variant === "link";

  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded font-medium outline-none cursor-pointer",
        "focus-outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/[.12]",
        "text-nowrap",
        isDisabled && "pointer-events-none",
        !isLinkVariant && heights[size],
        !isLinkVariant && paddings[size],
        fontSizes[size],
        spacings[size],
        variants[variant],
        variantsDisabled[variant],
        className,
      )}
      disabled={isDisabled}
      {...props}
    >
      {StartIcon && (
        <StartIcon
          className={clsx("size-5 shrink-0 p-0.5", iconClassName)}
          aria-hidden="true"
        />
      )}
      {label}
      {EndIcon && (
        <EndIcon
          className={clsx("size-5 shrink-0 p-0.5", iconClassName)}
          aria-hidden="true"
        />
      )}
    </button>
  );
};

export default Button;
