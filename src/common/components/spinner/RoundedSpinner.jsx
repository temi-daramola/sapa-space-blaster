import { Center, Spinner } from "@chakra-ui/react";
import React from "react";

function RoundedSpinner({ ...props }) {
  return (
    <Center
      w="fit-content"
      h="fit-content"
      bg="white"
      rounded="full"
      shadow="md"
      border="1px solid #00000020"
      pos="absolute"
      zIndex="500"
      top="55px"
      left="50%"
      transform="translateX(-50%)"
      // top="50%" left="50%"
      // transform="translate(-50%, -50%)"
      {...props}
    >
      <Spinner
        thickness="3px"
        color="purple.500"
        size="md"
        speed=".6s"
        m="10px"
      />
    </Center>
  );
}

export default RoundedSpinner;
