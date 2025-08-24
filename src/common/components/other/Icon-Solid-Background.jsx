import { Box, Center, Flex, Icon } from "@chakra-ui/react";

export const IconSolid = ({ icon, children, iconProps, ...props }) => {
  return (
    <Center rounded="full" bg="#00000020" {...props}>
      <Icon as={icon} fontSize="35px" color="black" m="15px" {...iconProps} />
    </Center>
  );
};
