import clsx from "clsx";

import CartButton from "../CartButton/CartButton";
import Link from "../Link";
import MobileNavMenu from "./MobileNavMenu";

const LINKS = [
  {
    name: "Shop all",
    href: "/products/",
  },
  {
    name: "Latest arrivals",
    href: "/latest-arrivals/",
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
        {LINKS.map((link) => (
          <Link key={link.href} to={link.href}>
            {link.name}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <CartButton />
        <MobileNavMenu links={LINKS} />
      </div>
    </div>
  );
};

export default Navbar;
