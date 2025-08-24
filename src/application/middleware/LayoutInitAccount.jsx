import { Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { Button, Center, Circle } from "@chakra-ui/react";
import React, { useContext } from "react";
import Modal from "@common/components/modal/Modal";
import { FiAlertTriangle } from "react-icons/fi";
import { AppContext } from "@application/state/Provider";
import Notify from "@common/components/notify/Notify";
import LinkComponent from '@common/components/link/Link';


// this should be a middleware
// authDashboardMiddleware
function LayoutInitAccount({ children }) {
  const { auth } = useContext(AppContext);
  const { initAccount, accessToken, request, requireAuth } = auth;

  const message = {
    error: "There was an error loading your account. Please try again",
    loading: "Account data is loading please wait ",
  };

  return (
    <React.Fragment>
      
      {requireAuth ? (
        <Modal isOpen={true}>
          <Flex justifyContent="center" flexDir="column" p="20px 0px">
            <Circle w="fit-content" mb={4} bg="red.100">
              <Center bg="red.400" rounded="full" m={2}>
                <Icon
                  fontSize="20px"
                  color="white"
                  as={FiAlertTriangle}
                  m={3}
                />
              </Center>
            </Circle>

            <Heading fontSize="20px" fontWeight="500" mb={4}>
              Session Expired
            </Heading>
            <Text mb={4}>
              Your session has expired. Please login again using your
              credentials to have access to your dashboard
            </Text>
            <LinkComponent to="/auth/login" replace={true}>
            <Button w="fit-content">Sign-in</Button>
            </LinkComponent>
          
          </Flex>
        </Modal>
      ) : (
        <React.Fragment>
          {accessToken ? (
            <React.Fragment>{children}</React.Fragment>
          ) : (
            <Center minH="100%">
              {request.isPending && (
                <Notify
                  title="Loading Account Info"
                  message={message.loading}
                  messageWidth={"50%"}
                  status="loading"
                />
              )}

              {request.isError && (
                <Notify
                  title="Request Error"
                  message={message.error}
                  messageWidth={"50%"}
                  status="error"
                  btnAction={initAccount}
                  btnText="Try Again"
                />
              )}
            </Center>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default LayoutInitAccount;
