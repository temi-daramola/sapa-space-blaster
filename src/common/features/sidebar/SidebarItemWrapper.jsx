import { Text, Box } from "@chakra-ui/react";
import React from "react";
import Accordion from "../accordion/Accordion";

function SidebarItemWrapper({ title, children }) {
  return (
    <Box mb="20px">
      <Text
        p="18px 12px"
        borderBottom="1px solid #109EE790"
        fontSize="16px"
        mb="30px"
      >
        {title}
      </Text>
      <Accordion allowToggle={true}>{children}</Accordion>
    </Box>
  );
}

export default SidebarItemWrapper;
