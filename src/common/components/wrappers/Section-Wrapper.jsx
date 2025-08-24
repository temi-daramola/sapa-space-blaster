import { Box } from "@chakra-ui/react";
import React from "react";

export const SectionWrapper = ({ children, ...props }) => {
  return (
    <Box
      // p="110px 150px"
      margin="0px auto"
      // width={{base: "88%", '2xl': "55%"}}
      // maxW="1200px"
      // maxW={{ base: "85%", xl: "85%", '2xl': "1450px" }} 
          maxW={{ base: "85%", lg: "82%", xl: "88%",  "2xl": "1450px" }}
      mx="auto"
      py="100px"
      {...props}
    >
      {children}
    </Box>
  );
};
