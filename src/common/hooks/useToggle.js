import { useState } from "react";

export const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const set = (status) => setIsOpen(status);
  const reset = () => setIsOpen(false);

  return { isOpen, set, reset };
};
