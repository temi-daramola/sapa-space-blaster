import React from "react";
import { Box, Flex, CloseButton, Text, Heading } from "@chakra-ui/react";

export function CustomAlert({
  isOpen,
  onClose,
  icon,
  title,
  message,
  reset,
  children,
  ...props
}) {
  return (
    <React.Fragment>
      {isOpen && (
        <Box
          bg="gray.100"
          p="15px 15px"
          pb="20px"
          mb="20px"
        
          rounded="md"
          {...props}
        >
          {onClose && (
            <Flex justifyContent="flex-end">
              <CloseButton onClick={onClose} mb="-8px" size="sm" />
            </Flex>
          )}

          <Flex> 
            <Box me={"20px"}>
              {icon}
              {/* <Spinner size="sm" me="20px" /> */}
            </Box>

            <Box>
              
              <Heading fontSize="17px" fontWeight="600" mb="10px" mt="-1px">
                {/* Submitting File */}
                {title}
              </Heading>

              <Text fontSize="14.5px">
                {/* Please waiit while your submission for the project is uploaded
     and completed */}
                {message}
              </Text>

              {children}
            </Box>
          </Flex>
        </Box>
      )}
    </React.Fragment>
  );
}
