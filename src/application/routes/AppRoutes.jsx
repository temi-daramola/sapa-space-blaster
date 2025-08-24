import { Route, Routes, useLocation } from "react-router";
import { useEffect } from "react";
import { hooks } from "@common/hooks/_index";
import { constants } from "@common/constant";
import AuthRedirectGuard from "@application/middleware/AuthRedirectGuard";
import { NavLayout } from "@application/layout/AppLayout";
import { DashboardLayout } from "@application/layout/Dashboard-Layout";
import { LayoutInitAccount } from "@application/middleware/LayoutInitAccount-v2";
import Game from "@modules/snake/page/Space-Shooter";
import Home from "@modules/snake/page/Home";

function AppRoutes() {
  const location = useLocation();
  const { appRoutes } = constants;

  return (
    <Routes location={location} key={location.pathname}>
      <Route index path={"/"} element={<Home />} />
        <Route index path={"/game"} element={<Game />} />
    </Routes>
  );
}

export default AppRoutes;
