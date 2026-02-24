import clsx from "clsx";
import { createPortal } from "react-dom";
import { RiCloseLine } from "react-icons/ri";

const Modal = ({ isOpen, onClose, title, children, className }) => {
  return (
    <>
      {isOpen &&
        createPortal(
          <div
            className={clsx(
              "z-modal fixed inset-0",
              "flex justify-center items-center",
              "bg-neutral-950/70",
              "py-20",
            )}
            aria-modal="true"
            role="dialog"
          >
            <div
              className={clsx(
                "w-full max-w-85.5 md:max-w-130.5 lg:max-w-252",
                "p-6 lg:px-8",
                "bg-white rounded-lg",
                className,
              )}
            >
              {onClose && (
                <div
                  className={clsx(
                    "flex gap-4",
                    title
                      ? "justify-between items-center"
                      : "justify-center items-end",
                  )}
                >
                  {title && (
                    <div className="text-lg font-semibold">{title}</div>
                  )}
                  <button
                    className="text-black cursor-pointer"
                    aria-label="Close modal"
                    onClick={onClose}
                  >
                    <RiCloseLine className="size-6" />
                  </button>
                </div>
              )}

              <div className="overflow-y-auto">{children}</div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default Modal;
