import { createContext, useCallback, useMemo, useState } from "react";

export const ToastContext = createContext({
  toast: { show: false, type: "", message: "" },
  showToast: () => {},
});

const ToastContextProvider = ({ children }) => {
  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  const showToast = useCallback((type, message) => {
    setToast({
      show: true,
      type,
      message,
    });
    setTimeout(() => {
      setToast({
        show: false,
        type: "",
        message: "",
      });
    }, 10000);
  }, []);

  const value = useMemo(() => {
    return {
      toast,
      showToast,
    };
  }, [toast, showToast]);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};

export default ToastContextProvider;
