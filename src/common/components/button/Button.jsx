import { Button as ChakraButton } from "@chakra-ui/react";

export const Button = ({ children, ...props }) => {
  return (
    <ChakraButton
      // minH="52px"
      bg="black"
      color="white"
      _hover={{
        bg: "none",
        color: "black",
        border: "1px solid #000000"
      }}
      {...props}
    >
      {children}
    </ChakraButton>
  );
};
