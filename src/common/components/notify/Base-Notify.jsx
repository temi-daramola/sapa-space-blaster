import { Box, Center, Flex, Heading, Icon, Text } from "@chakra-ui/react";

import { BaseButton } from "../button/Base-Button";
import { Button } from "../button/Button";

export const BaseNotify = ({
  title,
  message,
  view,
  children,
  action,
  btnText,
  baseProps,
  ...props
}) => {
  return (
    <Center {...baseProps}>
      <Box textAlign="center" w="100%" {...props}>
        <Flex justifyContent="center" mb="28px">
          {view}
        </Flex>
        <Heading fontWeight="500" mb="15px" fontSize="25px">
          {title}
        </Heading>

        <Text>{message}</Text>

        {action && (
          <Button mt="20px" mb={children && "20px"} onClick={action}>
            {btnText}
          </Button>
        )}

        {children}
      </Box>
    </Center>
  );
};
