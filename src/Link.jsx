import { Link as RouterLink } from "@tanstack/react-router";
import clsx from "clsx";

const Link = ({ children, className, disabled, ...props }) => {
  return (
    <RouterLink
      {...props}
      className={clsx(
        "rounded px-0.5 font-medium text-base text-neutral-600",
        "hover:text-neutral-900 focus:text-neutral-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/[.12]",
        {
          "pointer-events-none text-neutral-400": disabled,
        },
        className,
      )}
    >
      {children}
    </RouterLink>
  );
};

export default Link;
