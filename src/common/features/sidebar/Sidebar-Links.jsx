import React from "react";
import {
  FiBarChart2,
  FiBook,
  FiClipboard,
  FiClock,
  FiGrid,
  FiList,
  FiMessageCircle,
  FiSettings,
  FiTag,
  FiTrendingUp,
  FiUser,
  FiUserPlus,
  FiUsers,
  FiVideo,
} from "react-icons/fi";
import SidebarItem2 from "./SidebarItem2";
// import { appRoutes, sharedMenu, studentSidebar } from "@common/constant";

import { FaFileVideo, FaMicrophone } from "react-icons/fa";
import { Box, Divider } from "@chakra-ui/react";
import { constants } from "@common/constant";
import { AiFillDashboard } from "react-icons/ai";
// import HorizontalLine from "@common/components/_others/Horizontal-Line

const appRoutes = constants.appRoutes;

export function SidebarLinks({ isOpen }) {
  return (
    <React.Fragment>
      <SidebarItem2
        to={appRoutes.dashboard}
        icon={AiFillDashboard}
        name={"Dashboard"}
        isOpen={isOpen}
      />

      <SidebarItem2
        to={appRoutes.categories}
        icon={FiGrid}
        name={"Category"}
        isOpen={isOpen}
      />

      
      <SidebarItem2
        to={appRoutes.products}
        icon={FiList}
        name={"Products"}
        isOpen={isOpen}
      />

     
      {/* <SidebarItem2 to={appRoutes.me} icon={FiUser} name={studentSidebar.me} /> */}
    </React.Fragment>
  );
}


