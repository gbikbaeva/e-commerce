import clsx from "clsx";

const sizes = {
  md: "px-3.5 py-2.5 gap-x-1.5 h-10 text-sm",
  lg: "px-4 py-2.5 gap-x-2 h-11 text-base",
  xl: "px-5 py-3 gap-x-2 h-12 text-base",
  "2xl": "px-6 py-4 gap-x-3 h-15 text-lg",
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
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded font-medium outline-none cursor-pointer",
        "focus-outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/[.12]",
        "text-nowrap",
        isDisabled && "pointer-events-none",
        sizes[size],
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
