
import Modal from "@common/components/modal/Modal";
import React, { useEffect } from "react";

export const TransparentModal = ({ children, ...props }) => {
  const contentProps = {
    bg: "none",
    shadow: "none",
  };
  return (
    <Modal {...props} contentProps={contentProps}>
      {children}
    </Modal>
  );
};
