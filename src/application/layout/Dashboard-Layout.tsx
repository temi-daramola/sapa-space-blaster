import { Box, Flex } from "@chakra-ui/react";

import Sidebar from "@common/features/sidebar/Sidebar";

import { Outlet } from "react-router";

export const DashboardLayout = () => {
    return (
        <Flex h="100vh">
            <Sidebar />
            <Box overflowY="scroll" w="100%" p="60px 35px" pb="250px" bg="#ffffff">
                <Outlet />

            </Box>
        </Flex>
    );
};
