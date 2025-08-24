import React from "react";

import { Flex } from "@chakra-ui/react";

function SidebarWrapper({ width, children, title, isOpen, ...props }) {
  return (
    <Flex
      flexDir="column"
      bg="#00000010"
      // borderRight="1px solid #109EE750"
      p="60px 12px"
      w={width}
      transition="width .2s"
      shadow="sm"
      overflowY="scroll"
      alignItems={isOpen ? "start" : "center"}
      // overflowY="scroll"
      {...props}
      css={{
        "&::-webkit-scrollbar": {
          width: "7.6px",
        },
        "&::-webkit-scrollbar-track": {
          // background: "white",
          // background: "#d3d3d390",
          borderRadius: "0px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#00000030",
          borderRadius: "5px",
        },
      }}
    >
      {title}
      {children}
    </Flex>
  );
}

export default SidebarWrapper;

// css={{
//   "&::-webkit-scrollbar": {
//     width: "5px",
//   },
//   "&::-webkit-scrollbar-track": {
//     // background: "#d3d3d3",
//     background: "#d3d3d390",
//     borderRadius: "0px",
//   },
//   "&::-webkit-scrollbar-thumb": {
//     backgroundColor: "#00000015",
//     borderRadius: "2px",
//   },
// }}
