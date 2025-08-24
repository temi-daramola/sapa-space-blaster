import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import useRouter from '@common/hooks/useRouter';
import { constants } from "@common/constant";
import { hooks } from "@common/hooks/_index";
import { useAppContext } from "@application/context/App-Provider";


// AuthRedirect Middleware
function AuthRedirectGuard() {

  const context = useAppContext()
  const {auth} = context
  
  // GET THE DESTINATION URL AND SAVE TO LOCAL STORAGE
    const {useRouter} = hooks
  const router = useRouter();
  const destinationUrl = router.url
  localStorage.setItem("destinationUrl", destinationUrl);

  if (!auth.account) {
    // If user is not authenticated, redirect to the login page
    return <Navigate to={  constants.appRoutes.login} replace />;
  }

  return <Outlet />;
}

export default AuthRedirectGuard;
