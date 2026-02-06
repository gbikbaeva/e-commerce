import { createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import Modal from "../components/Modal";
import Reviews from "../components/Reviews";

export const Route = createRootRoute({
  component: () => {
    const isOpen = true;
    return (
      <>
        <main className="min-h-screen">
          <Modal isOpen={isOpen} onClose={() => {}}>
            <Reviews />
          </Modal>
          <TanStackRouterDevtools />
        </main>
      </>
    );
  },
});
