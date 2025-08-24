import React from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  Link as ChakraLink,
  Circle,
  Flex,
  HStack,
  Icon,
  Text,
} from "@chakra-ui/react";
import { FiArrowDownRight, FiGrid } from "react-icons/fi";
import AccordionItem from "../accordion/Accordion-Item";
import SidebarItem2 from "./SidebarItem2";

function SidebarLabel({ title }) {
  const activeLinkStyles = {
    color: "#000000",
    bg: "#BAE4FD",
  };

  return (
    <AccordionItem
      title={
        <Flex
          width="100%"
          fontWeight="500"
          p="12px 12px"
          rounded="5px"
          bg={activeLinkStyles.bg}
          justifyContent="space-between"
          alignItems="center"
          cursor="pointer"
        >
          <HStack>
            <Circle w="12px" h="12px" me="10px" bg="#04619B" />
            <Text>Student</Text>
          </HStack>

          <Icon as={FiArrowDownRight} fontSize={18} />
        </Flex>
      }
    >
    
     <Box mt="10px">
                <SidebarItem2
                  to="/student/overview"
                  icon={FiGrid}
                  name="All Students"
                  // isCollapse={isCollapse}
                />
                <SidebarItem2
                  to="/student/add"
                  icon={FiGrid}
                  name="Add Student"
                  // isCollapse={isCollapse}
                />
              </Box>
    </AccordionItem>
  );
}

export default SidebarLabel;
