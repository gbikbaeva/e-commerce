import clsx from "clsx";
import { createPortal } from "react-dom";
import { RiCloseLine } from "react-icons/ri";

const SlideOut = ({ children, title, trigger, isOpen, onClose }) => {
  return (
    <>
      {trigger}

      {isOpen &&
        createPortal(
          <div
            className="z-modal fixed inset-0 lg:hidden"
            role="dialog"
            aria-modal="true"
          >
            <div
              className={clsx(
                "fixed inset-0 bg-neutral-950 opacity-70",
                "lg:hidden",
              )}
              aria-hidden="true"
            />
            <div
              id="slideout"
              className={clsx(
                "z-fixed fixed inset-0 max-w-90 p-6 bg-white",
                "animate-slideout",
                "overflow-auto",
              )}
            >
              <div className="flex flex-col gap-6 pb-6">
                <div
                  className={clsx(
                    "flex justify-between",
                    !!title ? "justify-between" : "justify-end",
                  )}
                >
                  {title}
                  <button
                    type="button"
                    className={clsx(
                      "cursor-pointer rounded text-neutral-600",
                      "focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/[.12]",
                    )}
                    onClick={onClose}
                    aria-label="Close slideout"
                  >
                    <RiCloseLine className="size-5" />
                  </button>
                </div>
                <div className="h-[1px] w-full bg-neutral-200" />
              </div>
              {children}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default SlideOut;
