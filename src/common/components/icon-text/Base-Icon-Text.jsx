import { Box, Flex, Text } from "@chakra-ui/react";
import { constants } from '@constants/index';

export const BaseIconText = ({ icon, title, textProps, ...props }) => {
  return (
    <Flex alignItems="center" {...props}>
      {icon}
      <Text  ms="12px" {...textProps}>{title}</Text>
    </Flex>
  );
};
