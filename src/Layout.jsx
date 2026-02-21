import { useContext } from "react";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Outlet } from "@tanstack/react-router";
import clsx from "clsx";

import { ToastContext } from "./contexts/ToastContext";
import Toast from "./components/Toast";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";

const Layout = () => {
  const { toast } = useContext(ToastContext);

  return (
    <>
      <Navbar />
      <main className="min-h-screen mx-auto p-4 flex flex-col">
        {toast.show && <Toast message={toast.message} type={toast.type} />}

        <div
          className={clsx(
            "flex flex-col justify-start grow",
            "bg-white rounded-md",
            "shadow-sm md:shadow-md lg:shadow-lg",
          )}
        >
          <Outlet />
          <Footer />
        </div>

        <TanStackRouterDevtools />
      </main>
    </>
  );
};

export default Layout;
