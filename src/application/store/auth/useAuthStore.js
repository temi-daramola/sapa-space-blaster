import { useEffect, useState } from "react";
import { hooks } from "@common/hooks/_index";
import { initAccount as initAccountApi } from "./api";

export const useAuthStore = () => {
  // get the user email from local storage
  let localStorageUserEmail = localStorage.getItem("user");
  if (localStorageUserEmail == "" || localStorageUserEmail === undefined) {
    localStorageUserEmail = null;
  }

  // initialize the necessary states
  const [requireAuth, setRequireAuth] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [account, setAccount] = useState(null);

  const { useToggle, useRequestV2 } = hooks;
  const authModal = useToggle();

  // set up the request and other functions
  const request = useRequestV2(initAccountApi);
  const initAccount = () => {
    request.init("initAccount", localStorageUserEmail, true);
  };
  // monitor side effects for the initAccountRequest success and update the state
  // NOTE only the email is saved to local storage not the access token
  // access token is only saved to the application state
  useEffect(() => {
    if (request.isSuccess) {
      // returns the token and account from the api call just like the login success
      const response = request.data;
      const { token, account } = response?.data;
      setAccessToken(token);
      setAccount(account);
      // SAVE THE USER EMAIL TO THE LOCAL STORAGE FOR PAGE PERSISTENCE
      localStorage.setItem("user", account.email);
    }
  }, [request.isSuccess]);

  // funtion to reset the auth states when user logs out
  const resetAuth = () => {
    setAccessToken(null);
    setAccount(null);
    setRequireAuth(true);
  };

  return {
    userId: localStorageUserEmail, /// the email is used as the user id for auto signin
    request,
    initAccount,
    accessToken,
    setAccessToken,
    account,
    setAccount,
    requireAuth,
    setRequireAuth,
    reset: resetAuth,
    // checkIsAuthenticated,
    authModal,
  };
};

// const checkIsAuthenticated = (showModal = true) => {
//   if (!account || !accessToken) {
//     if (showModal) authModal.set(true);
//     return false;
//   }
//   return true;
// };
