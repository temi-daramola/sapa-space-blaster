import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Flex, Heading, IconButton } from "@chakra-ui/react";
import { SidebarLinks } from "@common/features/sidebar/Sidebar-Links";
// import SidebarWrapper from "@common/features/sidebar/SidebarWrapper";
import { useAppContext } from "@application/context/App-Provider";
import SidebarWrapper from "./SidebarWrapper";

function Sidebar() {

  const context = useAppContext()
  const toggle = context.common.sidebar

  return (
    <SidebarWrapper
      width={toggle.isOpen ? "21%" : "8%"}
      isOpen={!toggle.isOpen}
    >

      {toggle.isOpen && (
        <Flex justifyContent={toggle.isOpen ? "flex-start" : "center"} w="100%">
          <Heading fontSize="20px" fontWeight="600" mb={10} mt="0px">
            Dashboard
          </Heading>
        </Flex>
      )}


      <Flex justifyContent={toggle.isOpen ? "flex-start" : "center"} w="100%" mb="48px">
        <IconButton
          size="sm"
          icon={<FiMenu />}
          onClick={() => toggle.set(!toggle.isOpen)}
        />
      </Flex>

      {/* THIS is supposed to be a children */}
      <SidebarLinks isOpen={toggle.isOpen} />

    </SidebarWrapper>
  );
}

export default Sidebar;
