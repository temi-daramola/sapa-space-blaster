import React, { useEffect, useState } from "react";
import { Alert as ChakraAlert, Box, Flex, CloseButton, Text } from "@chakra-ui/react";
import { AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react";

function Alert({ status, isOpen, title=null, message, reset, ...props }) {

  const defaultStatus = status || "";
  return (
    <React.Fragment>
      {isOpen && (
        <Box {...props}>
          <ChakraAlert status={status} borderRadius={3} py={3}>
            <Box w="100%">
              <Flex alignItems="center" justifyContent="space-between" mb={2}>
                <Flex alignItems="center">
                  <AlertIcon h={5} w={5} />
                  <AlertTitle
                    fontSize={16}
                    fontWeight="600"
                    textTransform="capitalize"
                    mb="2px"
                  >
                    {title || defaultStatus}
                  </AlertTitle>
                </Flex>

                {reset && <CloseButton onClick={reset} />}
              </Flex>
              <Box textAlign="start" >
              <AlertDescription fontSize={15}  fontFamily='mont'>{message}</AlertDescription>
              </Box>
            
            </Box>
          </ChakraAlert>
        </Box>
      )}
    </React.Fragment>
  );
}

export default Alert;
