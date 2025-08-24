import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router";
export const Link = ({ children, ...props }) => {
  return (
    <ChakraLink as={RouterLink} textDecor="none"   _hover={{ textDecoration: "none" }}  {...props} >
      {children}
    </ChakraLink>
  );
};
