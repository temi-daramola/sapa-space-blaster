import React, { useEffect } from "react";
import { Modal as ChakraModal } from "@chakra-ui/react";
import { ModalOverlay as ChakraModalOverlay } from "@chakra-ui/react";
import { ModalContent, ModalHeader, ModalFooter } from "@chakra-ui/react";
import { ModalBody, ModalCloseButton } from "@chakra-ui/react";

function Modal({
  isOverlayClose = true,
  isCentered,
  size,
  isOpen,
  reset,
  children,
  contentProps,
}) {
  // const { isOverlayClose, isHideCloseButton, size, isCentered } = config;

  return (
    <ChakraModal
      size={size || "md"} // xs sm md lg xl full
      isOpen={isOpen}
      onClose={reset}
      blockScrollOnMount={true} /// blocks background scrolling
      scrollBehavior="outside" // inside
      isCentered={
        isCentered === null || isCentered === undefined ? true : isCentered
      }
      closeOnOverlayClick={isOverlayClose}
      motionPreset="slideInBottom" //scale slideInBotttom
    >
      <ChakraModalOverlay backdropFilter="blur(3px) hue-rotate(10deg)" />

      <ModalContent {...contentProps}>
        {reset && (
          <ModalHeader>
            <ModalCloseButton onClick={reset} />
          </ModalHeader>
        )}
        
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ChakraModal>
  );
}

export default Modal;
