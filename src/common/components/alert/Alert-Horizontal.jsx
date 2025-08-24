import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { BaseButton } from "@common/components/button/Base-Button";
import React from "react";
import { FiAlertCircle, FiRefreshCcw } from "react-icons/fi";

export function AlertHorizontal({ title, message, btnAction, btnText }) {
  return (
    <Box p="20px 20px" pe="30px" rounded="md" bg="red.300" color="white" mb={10}>

      <Flex>
        <Icon fontSize="25px" mt="0px" as={FiAlertCircle} />
        <Box ms="20px">
          <Heading fontWeight="500" fontSize="20px">
           {title}
          </Heading>
          <Text fontWeight="500" mt={2}>
           {message}
          </Text>

          {btnAction && (
            <BaseButton
              mt={4}
              bg="white"
              color="black"
              rightIcon={<FiRefreshCcw />}
              onClick={btnAction}
            >
              {btnText}
            </BaseButton>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

