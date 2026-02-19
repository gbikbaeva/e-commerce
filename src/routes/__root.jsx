import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useContext } from "react";

import Toast from "../components/Toast";
import { ToastContext } from "../contexts/ToastContext";

export const Route = createRootRoute({
  component: () => {
    const { toast } = useContext(ToastContext);

    return (
      <>
        <main className="min-h-screen mx-auto p-4 flex flex-col">
          {toast.show && <Toast message={toast.message} type={toast.type} />}
          <Outlet />
          <TanStackRouterDevtools />
        </main>
      </>
    );
  },
});
