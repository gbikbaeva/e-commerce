import { RiArrowDownSFill } from "react-icons/ri";
import Button from "../Button";
import { useContext, useId, useRef, useState } from "react";
import clsx from "clsx";
import { DropdownButtonContext } from "./contexts";

const DropdownItem = ({ children, selected, onSelect }) => {
  const { isOpen, setIsOpen } = useContext(DropdownButtonContext);

  return (
    <div
      className={clsx(
        "cursor-pointer",
        "p-2 rounded",
        "border-none outline-none",
        "text-sm",
        "hover:bg-neutral-50",
        "focus:ring focus:ring-indigo-200",
        selected
          ? "font-medium text-indigo-700"
          : "font-normal text-neutral-600",
      )}
      onClick={() => {
        setIsOpen(false);
        if (onSelect) {
          onSelect();
        }
      }}
      role="menuitem"
      tabIndex={isOpen ? 0 : -1}
    >
      {children}
    </div>
  );
};

const DropdownButton = ({ label, size, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const id = useId();
  const dropdownRef = useRef(null);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        id={id}
        label={label}
        size={size}
        variant="secondary"
        endIcon={RiArrowDownSFill}
        onClick={() => setIsOpen(!isOpen)}
      ></Button>

      <div
        className={clsx(
          "z-dropdown absolute right-0 max-h-50 w-56 p-2 mt-2",
          "overflow-y-auto",
          "bg-white rounded-lg border border-solid border-neutral-200",
          "origin-top-right transform transition-all duration-300 ease-in-out",
          isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0",
        )}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby={id}
        tabIndex={-1}
      >
        <div className="flex flex-col gap-2">
          <DropdownButtonContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
          </DropdownButtonContext.Provider>
        </div>
      </div>
    </div>
  );
};

export { DropdownButton, DropdownItem };
