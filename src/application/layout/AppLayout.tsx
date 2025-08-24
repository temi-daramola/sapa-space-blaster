
import React from "react";
import { Outlet } from "react-router";

export const NavLayout = () => {
  return (
    <React.Fragment>
      {/* <NavBar navLinks={constants.navLinks} /> */}
      <Outlet />;
    </React.Fragment>
  );
};
