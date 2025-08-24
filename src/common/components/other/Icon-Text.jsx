import { Box, Flex } from "@chakra-ui/react";

export const IconText = ({ icon, children, ...props }) => {
  return (
    <Flex alignItems="center" {...props} >
      {/* Icon can be an Image or icon itself */}
      <Box me="16px" minW={"fit-content"}>{icon}</Box>

      {/* the children is the text  */}
      {children}
    </Flex>
  );
};
