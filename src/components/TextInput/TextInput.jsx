import clsx from "clsx";
import { useId } from "react";

const TextInput = ({
  type = "text",
  label,
  placeholder,
  value,
  disabled,
  required,
  hint,
  errorMessage,
  onChange,
}) => {
  const id = useId();
  const hasError = !!errorMessage;

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="font-medium text-sm text-neutral-700">
          {label}
        </label>
      )}

      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        required={required}
        className={clsx(
          "w-full block",
          "outline-none",
          "px-3.5 py-2.5",
          "border border-solid border-neutral-200 disabled:border-neutral-100",
          "rounded",
          "bg-neutral-50",
          "text-sm text-neutral-500 disabled:text-neutral-400",
          "placeholder:text-neutral-500 disabled:placeholder:text-neutral-400",
          "focus:outline-none",
          "focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/[.12] focus:ring-offset-0",
          hasError && "focus:border-red-600 focus:ring-red-600/[.12]",
          "disabled:pointer-events-none",
        )}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={`${id}-hint`}
        aria-invalid={hasError}
      />

      {(hint || errorMessage) && (
        <div
          id={`${id}-hint`}
          className={clsx(
            "text-sm text-neutral-500",
            hasError && "text-red-600",
          )}
        >
          {hint || errorMessage}
        </div>
      )}
    </div>
  );
};

export default TextInput;
