import clsx from "clsx";

import CartButton from "../CartButton/CartButton";
import MobileNavMenu from "./MobileNavMenu";
import Link from "../Link";

const links = [
  {
    name: "Shop all",
    href: "#",
  },
  {
    name: "Latest arrivals",
    href: "#",
  },
];

const Navbar = () => {
  return (
    <div
      className={clsx(
        "px-4 md:px-8 lg:px-28 py-3 pt-4",
        "flex justify-between items-center self-stretch lg:gap-20",
      )}
    >
      <div className="h-8 flex">
        <img
          src="https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/logo.svg"
          alt="StyleNest's logo"
        />
      </div>
      <nav className={clsx("hidden flex-1 gap-8", "lg:flex")}>
        {links.map((link) => (
          <Link to={link.href}>{link.name}</Link>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <CartButton count={1} />
        <MobileNavMenu links={links} />
      </div>
    </div>
  );
};

export default Navbar;
