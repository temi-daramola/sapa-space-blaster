import React, { useEffect } from "react";
import { NavLink } from "react-router";
import { Link as ChakraLink, Icon } from "@chakra-ui/react";

function SidebarItem2({ icon, name, to, isOpen }) {
  const activeLinkStyles = {
    color: "#ffffff",
    bg: "purple.500",
  };

  return (
    <ChakraLink
      as={NavLink}
      to={to}
      width={"100%"}
      fontSize={15}
      fontWeight="500"
      mb="8px"
      style={{
        display: "flex",
        justifyContent: isOpen ? "flex-start" : "center",
        alignItems: "center",
        padding: isOpen ? "14px 12px"  : "10px 0px",
        cursor: "pointer",
        borderRadius: "6px",
        transition: ".2s ease-out",
        width: "100%",
        textDecoration: "none",
      }}
      _activeLink={activeLinkStyles}
    >
      <Icon as={icon} fontSize={18} me={isOpen && 5} />
      {isOpen && name}
      {/* {name} */}
    </ChakraLink>
  );
}

export default SidebarItem2;
