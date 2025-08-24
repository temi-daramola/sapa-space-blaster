import { Center, Spinner } from "@chakra-ui/react";
import React from "react";
import RoundedSpinner from "./RoundedSpinner";

function ModalSpinner({ ...props }) {
  return (
    <Center {...props}>
      <RoundedSpinner />
    </Center>
  );
}

export default ModalSpinner;
