import { Box, FormLabel, Textarea as ChakraInput } from "@chakra-ui/react";
import { constants } from '@constants/index';
import React from "react";

export const TextArea = ({ label, inputProps, ...props }) => {
  return (
    <Box {...props}>
      {label && <FormLabel>{label}</FormLabel>}
      <ChakraInput {...inputProps} />
    </Box>
  );
};
