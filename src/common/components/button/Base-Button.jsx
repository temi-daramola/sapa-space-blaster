import { Button } from "@chakra-ui/react";

export const BaseButton = ({ children, ...props }) => {
  return (
    <Button
      // minH="52px"
      color="white"
      _hover={{
        bg: "black",
        color: "white",
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
