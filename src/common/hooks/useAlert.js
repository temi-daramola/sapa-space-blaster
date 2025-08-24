
import { useState } from "react";

export const useAlert = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [props, setProps] = useState({status: null, message: null, title: null});

  const status = {
    success: "success",
    error: "error",
    info: "info",
    warning: "warning",
  };
  const toggle = (status, message, title = null) => {
    if(!title) title = status;
    const data = { status, message, title };
    setProps({ ...data });
    setIsOpen(true);
  };

  const reset = () => setIsOpen(false);

  return { states: status, reset, toggle, isOpen, ...props };
};
