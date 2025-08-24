import { Center, Spinner } from "@chakra-ui/react";
import React from "react";
import RoundedSpinner from "./BorderedSpinner";

function PageSpinner({ ...props }) {
  return (
    <Center {...props}>
      <RoundedSpinner />
    </Center>
  );
}

export default PageSpinner;
