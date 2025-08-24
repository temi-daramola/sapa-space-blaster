import { store } from "@application/store/_index";
import { Box } from "@chakra-ui/react";
import { BaseButton } from "@common/components/button/Base-Button";
import { Link } from "@common/components/link/Link";
import Modal from "@common/components/modal/Modal";
import { IconViewNotify } from "@common/components/notify/Icon-View-Notify";
// import { Notify } from "@common/components/notify/Icon-View-Notify";

import { constants } from "@common/constant";
import { hooks } from "@common/hooks/_index";
import useRouter from "@common/hooks/useRouter";
import React, { useContext, useEffect, useState } from "react";
import { FiLock } from "react-icons/fi";

// Create a context to share modal state and functions
const AppContext = React.createContext();

// you could move this to the hooks page
export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};

function AppProvider({ children }) {
  const router = useRouter();
  const sidebarToggle = hooks.useToggle();

  // initialize the store modules
  // initialize the auth store module and the network hook
  const authStore = store.useAuthStore();
  hooks.useNetwork(authStore.setRequireAuth);

  const authModal = authStore.authModal;
  const authRedirect = () => {
    authModal.reset();
    router.navigate(constants.appRoutes.login);
  };

  const value = {
    common: { sidebar: sidebarToggle },
    auth: authStore,
  };

  useEffect(() => {
    sidebarToggle.set(true);
  }, []);

  return (
    <AppContext.Provider value={value} >
      <React.Fragment>{children}</React.Fragment>
    </AppContext.Provider>
  );
}

export default AppProvider;
