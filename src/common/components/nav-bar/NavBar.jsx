import {
  Avatar,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import Drawer from "@common/components/drawer/Drawer";

// import Drawer from "@common/@components/drawer/Drawer";
import { Link } from "@common/components/link/Link";
import { TextLink } from "@common/components/link/Text-Link";
// import { IntroNavBar } from "@common/@components/nav-bar/Intro-Nav";

import React from "react";
import {
  FiChevronDown,
  FiHome,
  FiLock,
  FiMenu,
  FiShoppingBag,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";
import { constants } from "@common/constant";
import { hooks } from "@common/hooks/_index";
import { SectionWrapper } from "@common/components/wrappers/Section-Wrapper";
import { FaCar, FaUser } from "react-icons/fa";
import { BaseButton } from "@common/components/button/Base-Button";

const checkIsAuthRoute = (currentUrl) => {
  const isAuthRoute = currentUrl.startsWith("/auth");
  return isAuthRoute;
};

export const NavBar = ({ navLinks }) => {
  const menu = hooks.useToggle();
  const router = hooks.useRouter();
  const toggleMenu = () => menu.set(!menu.isOpen);

  const isAuthRoute = checkIsAuthRoute(router.url);

  return (
     <Box borderBottom="1px solid #00000020">
        <SectionWrapper py="20px">
          <Box display={{ base: "block", md: "none" }}>
            <IconButton
              size="sm"
              bg="#00000020"
              icon={<FiMenu />}
              // onClick={toggleMenu}
            />
          </Box>

          <Box display={{ base: "none", xl: "block" }}>
            <NavBarItems menu={menu} isAuthRoute={isAuthRoute} />
          </Box>

          <Flex
            display={{ base: "none", md: "flex", xl: "none" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <BrandLink />

            <Box>
              <IconButton
                size="sm"
                bg="#00000020"
                icon={<FiMenu />}
                // onClick={toggleMenu}
              />
            </Box>
          </Flex>
        </SectionWrapper>
      </Box>
  );
};

const BrandLink = ({ ...props }) => {
  return (
    <Link to={constants.appRoutes.home}>
      <Heading fontSize="20px" fontWeight="500">
        Ecommerce store
      </Heading>
      {/* <Image
        src={assets.logoColored}
        h={{ base: "40px", xl: "100%" }}
        minW={{ base: "40px", xl: "100%" }}
      /> */}
    </Link>
  );
};

const NavLink = ({ name, icon, url, ...props }) => {
  return (
    <Link
      to={url}
      me={{ xl: "44px" }}
      mt={{ base: "20px", xl: "0px" }}
      {...props}
    >
      <Flex alignItems="center">
        {icon && <Icon me={3} as={icon} />}
        <Text fontWeight="600">{name}</Text>
      </Flex>
    </Link>
  );
};

const NavBarItems = ({ menu, isAuthRoute, account }) => {
  const { navItems } = constants;
  return (
    <Flex
      flexDir={{ base: "column", xl: "row" }}
      alignItems={{ xl: "center" }}
      justifyContent={{ xl: "space-between" }}
    >
      <BrandLink />

      <Flex
        flexDir={{ base: "column", xl: "row" }}
        alignItems={{ xl: "center" }}
        mt={{ base: "50px", xl: "0px" }}
      >
        <NavLink name={navItems.home.name} url={navItems.home.url} />

        {!isAuthRoute && (
          <React.Fragment>
            <NavLink
              name={navItems.orders.name}
              url={navItems.orders.url}
              icon={FaCar}
            />
            {/* <NavLink
          name={navItems.account.name}
          url={navItems.account.url}
          icon={FiUser}
        /> */}

            <NavLink
              name={navItems.cart.name}
              url={navItems.cart.url}
              icon={FiShoppingCart}
            />

            {/* show the signin link if not signed */}
            {!account && (
              <Link to={constants.appRoutes.login}>
                <BaseButton bg="purple.500" color="white" size="md">
                  Sign in
                </BaseButton>
              </Link>
            )}

            {account && (
              <React.Fragment>
                <Menu>
                  <MenuButton
                    as={Button}
                    // bg="transparent"
                    _hover={{ bg: "transparent" }}
                    _active={{ bg: "transparent" }}
                    _expanded={{ bg: "transparent" }}
                    _focus={{ boxShadow: "none", bg: "transparent" }}
                    rightIcon={<FiChevronDown />}
                  >
                    <Avatar h="30px" w="30px" />
                  </MenuButton>

                  <MenuList>
                    <MenuItem>
                      <NavLink
                        name={navItems.account.name}
                        url={navItems.account.url}
                        icon={FaUser}
                      />
                    </MenuItem>
                    <MenuItem onClick={() => alert("clicked")}>
                      <NavLink name={"Log out"} url={"#"} icon={FiLock} />
                    </MenuItem>
                  </MenuList>
                </Menu>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </Flex>
    </Flex>
  );
};

{
  /* <Drawer isOpen={menu.isOpen} onClose={toggleMenu}>
        <SectionWrapper py="50px">
          <NavBarItem={scrolle} />
          <Box display={{ base: "block", lg: "none" }}>
            <IntroNavBar mt="30px" />
          </Box>
        </SectionWrapper>
      </Drawer> */
}
