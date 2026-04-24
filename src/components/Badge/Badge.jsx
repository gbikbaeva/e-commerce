import clsx from "clsx";

const sizes = {
  sm: clsx("h-5 px-1 py text-xs"),
  md: clsx("h-6 px-2 py text-sm"),
  lg: clsx("h-7 px-2.5 py-1 text-sm"),
};

const variants = {
  primary: clsx("bg-indigo-50", "border-indigo-200", "text-indigo-700"),
  danger: clsx("bg-red-50", "border-red-200", "text-red-600"),
  neutral: clsx("bg-gray-50", "border-neutral-200", "text-neutral-600"),
  success: clsx("bg-green-50", "border-green-200", "text-green-700"),
  warning: clsx("bg-amber-50 border-amber-200 text-amber-700"),
};

const Badge = ({ label, size = "md", variant = "neutral", className }) => {
  return (
    <div
      className={clsx(
        "rounded-full border border-solid text-center",
        className,
        variants[variant],
        sizes[size],
      )}
    >
      {label}
    </div>
  );
};

export default Badge;
