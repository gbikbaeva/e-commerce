import clsx from "clsx";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { RiCloseLine } from "react-icons/ri";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen &&
        createPortal(
          <div
            className={clsx(
              "z-modal fixed inset-0",
              "flex justify-center items-center",
              "opacity-[0.70] bg-neutral-950",
              "py-20",
            )}
            aria-modal="true"
            role="dialog"
          >
            <div
              className={clsx(
                "w-full max-w-85.5 md:max-w-130.5 lg:max-w-252",
                "bg-white rounded-lg",
              )}
            >
              <div className="flex flex-col justify-center items-end p-6 lg:px-8">
                <button
                  className="text-black cursor:pointer"
                  aria-label="Close modal"
                  onClick={onClose}
                >
                  <RiCloseLine className="size-6" />
                </button>
              </div>
              <div className="overflow-y-auto">{children}</div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default Modal;
