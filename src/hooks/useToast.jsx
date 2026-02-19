import { useContext } from "react";
import { ToastContext } from "../contexts/ToastContext";

const useToast = () => {
  const { showToast } = useContext(ToastContext);

  const error = (message) => showToast("error", message);
  const success = (message) => showToast("success", message);

  return { error, success };
};

export default useToast;
