import { Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { Button, Center, Circle } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import Modal from "@common/components/modal/Modal";
import { FiAlertTriangle } from "react-icons/fi";
import { Outlet } from "react-router";
import StatusNotify from "@common/components/notify/Status-Notify";
import { useAppContext } from "@application/context/App-Provider";
import { Link } from "@common/components/link/Link";

// this should be a middleware
// authDashboardMiddleware
export const LayoutInitAccount = () => {
  const context = useAppContext();
  const { auth } = context;
  const { initAccount, accessToken, request, requireAuth } = auth;

  const message = {
    error: "There was an error loading your account. Please try again",
    loading: "Account data is loading please wait ",
  };

  useEffect(() => {
    // Only initialize the account if the access token is not
    //  present in the application state
    if (!accessToken) initAccount();
  }, []);

  //   If access token exist in the state then return the outlet
  if (accessToken) {
    console.log("access token ", accessToken);
    return <Outlet />;
  }

  //   if accessToken is null or undefined then you init the account request
  return (
    <React.Fragment>
      {request.isLoading && (
        <Center bg="#00000008" h="80vh">
          <StatusNotify
            title="Loading Account Info"
            message={message.loading}
            status="loading"
          />
        </Center>
      )}

      {request.isError && (
        <Flex
          alignItems="center"
          justifyContent="center"
          bg="#00000008"
          h="80vh"
        >
          <StatusNotify
            title="Request Error"
            baseProps={{w: "40%"}}
            message={message.error}
            status="error"
            action={initAccount}
            btnText="Try Again"
          />
        </Flex>
      )}
    </React.Fragment>
  );

  //   return (
  //     <React.Fragment>
  //       <React.Fragment>
  //         {accessToken ? (
  //           <Outlet />
  //         ) : (
  //           <Center minH="100%">
  //             {request.isPending && (
  //               <Notify
  //                 title="Loading Account Info"
  //                 message={message.loading}
  //                 messageWidth={"50%"}
  //                 status="loading"
  //               />
  //             )}

  //             {request.isError && (
  //               <Notify
  //                 title="Request Error"
  //                 message={message.error}
  //                 messageWidth={"50%"}
  //                 status="error"
  //                 btnAction={initAccount}
  //                 btnText="Try Again"
  //               />
  //             )}
  //           </Center>
  //         )}
  //       </React.Fragment>
  //     </React.Fragment>
  //   );
};
