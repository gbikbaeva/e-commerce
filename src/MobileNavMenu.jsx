import clsx from "clsx";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import { useState } from "react";
import { createPortal } from "react-dom";

import Link from "./Link";

const MobileNavMenu = ({ links }) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <button
        type="button"
        className={clsx(
          "block cursor-pointer rounded text-neutral-600 lg:hidden",
          "focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/[.12]",
        )}
        aria-label="Open mobile menu"
        aria-expanded={openMenu ? "true" : "false"}
        aria-controls="slideout-menu"
        onClick={() => setOpenMenu(!openMenu)}
      >
        <RiMenuLine className="size-5" aria-hidden="true" />
      </button>

      {openMenu &&
        createPortal(
          <nav
            id="slideout-menu"
            className={clsx(
              "z-fixed fixed inset-0 max-w-88 bg-white px-4 py-6 lg:hidden",
              "flex flex-col gap-6",
              "animate-navbar-menu",
            )}
          >
            <div className="flex justify-between items-center">
              <img
                src="https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/logo.svg"
                alt="StyleNest's logo"
              />
              <button
                aria-label="Close mobile menu"
                type="button"
                className={clsx(
                  "cursor-pointer rounded text-neutral-600",
                  "focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/[.12]",
                )}
                onClick={() => setOpenMenu(false)}
              >
                <RiCloseLine className="size-5" />
              </button>
            </div>
            <div className="flex flex-col gap-2 grow">
              {links.map((link) => (
                <Link to={link.href} className="px-3 py-2 text-sm">
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>,
          document.body,
        )}
    </>
  );
};
export default MobileNavMenu;
