import clsx from "clsx";

const ToastTypes = {
  ERROR: "error",
  SUCCESS: "success",
};

const Toast = ({ type, message }) => {
  return (
    <div className={clsx("z-toast fixed inset-0 top-10")}>
      <div
        className={clsx(
          "mx-4 md:mx-auto md:w-max",
          "flex items-center gap-3",
          "p-1 pr-2.5",
          "rounded-full",
          "text-sm font-medium",
          type === ToastTypes.SUCCESS && "bg-green-50 text-green-700",
          type === ToastTypes.ERROR && "bg-red-50 text-red-600",
        )}
      >
        <div
          className={clsx(
            "flex items-center",
            "px-2.5 py-0.5",
            "h-6",
            "bg-white",
            "shadow",
            "rounded-full",
            "text-sm",
            type === ToastTypes.ERROR && "text-red-800",
            type === ToastTypes.SUCCESS && "text-green-700",
          )}
        >
          {type === ToastTypes.ERROR ? "Error" : "Success"}
        </div>

        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
