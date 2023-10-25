/*eslint-disable*/
import { HamburgerIcon } from "@chakra-ui/icons";
import "./Sidebar.css";
// chakra imports
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Divider,
  Link,
} from "@chakra-ui/react";
import IconBox from "components/Icons/IconBox";
import {
  renderThumbDark,
  renderThumbLight,
  renderTrack,
  renderTrackRTL,
  renderView,
  renderViewRTL,
} from "components/Scrollbar/Scrollbar";
import { HSeparator } from "components/Separator/Separator";
import { SidebarHelp } from "components/Sidebar/SidebarHelp";
import React from "react";
import { useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { NavLink, useLocation, Link as Anchor } from "react-router-dom";
import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "components/Icons/Icons";

import dashRoutes from "routes";

// FUNCTIONS
function Sidebar(props) {
  const [userDropdown, setUserDropdown] = useState(false);
  const [configDropdown, setConfigDropdown] = useState(false);

  //Dynamic Activity Submenus
  const activitySubmenu = dashRoutes.filter(
    (route) => route.submenu === "activity"
  );

  //Dynamic Configuration Submenus
  const configurationSubmenu = dashRoutes.filter(
    (route) => route.submenu === "configuration"
  );

  // to check for active Anchors and opened collapses
  let location = useLocation();
  // this is for the rest of the collapses
  const [state, setState] = React.useState({});
  const mainPanel = React.useRef();
  let variantChange = "0.2s linear";
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };

  console.log("active route: ", activeRoute);
  const { colorMode } = useColorMode;
  // this function creates the Anchors and collapses that appear in the sidebar (left menu)

  //  BRAND
  //  Chakra Color Mode
  let sidebarBg = useColorModeValue("white", "navy.800");
  let sidebarRadius = "20px";
  let sidebarMargins = "0px";
  var brand = (
    <Box pt={"25px"} mb="12px">
      <HSeparator my="26px" />
    </Box>
  );

  // SIDEBAR
  return (
    <Box ref={mainPanel}>
      <Box display={{ sm: "none", xl: "block" }} position="fixed">
        <Box
          // bg={"#5A57FF"}
          // color="white"
          bg={sidebarBg}
          transition={variantChange}
          w="260px"
          maxW="260px"
          ms={{
            sm: "16px",
          }}
          my={{
            sm: "16px",
          }}
          h="calc(100vh - 32px)"
          ps="20px"
          pe="20px"
          m={sidebarMargins}
          filter="drop-shadow(0px 5px 14px rgba(0, 0, 0, 0.05))"
          borderRadius={sidebarRadius}
        >
          <Scrollbars
            autoHide
            renderTrackVertical={
              document.documentElement.dir === "rtl"
                ? renderTrackRTL
                : renderTrack
            }
            renderThumbVertical={useColorModeValue(
              renderThumbLight,
              renderThumbDark
            )}
            renderView={
              document.documentElement.dir === "rtl"
                ? renderViewRTL
                : renderView
            }
          >
            <Box>
              <Heading fontSize="md" my={"4"} textAlign="center" width="100">
                Asset Management
              </Heading>
            </Box>
            <Divider />

            <Stack direction="column" mb="40px" mt={7} px="4">
              <Text fontWeight="bold" uppercase mb={5}>
                ASSETS
              </Text>
              <Box
                display="flex"
                flexDirection="column"
                fontWeight="bold"
                gap="5"
              >
                <Box display="flex" alignItems="center" gap="5">
                  <HomeIcon />
                  <NavLink to="/admin/dashboard">Dashboard</NavLink>
                </Box>
                {/* <Box display="flex" alignItems="center" gap="5">
                  <StatsIcon color="inherit" />
                  <Anchor to="/admin/tables">Tables</Anchor>
                </Box> */}
                <Box display="flex" alignItems="center" gap="5">
                  <PersonIcon />
                  <Text
                    cursor="pointer"
                    to="/admin/user"
                    onClick={() => setUserDropdown(!userDropdown)}
                  >
                    Activity
                  </Text>
                </Box>
                {userDropdown && (
                  <Stack pl={4} gap={4}>
                    {activitySubmenu.map((route, index) => (
                      <Anchor key={index} to={`/admin${route.path}`}>
                        {route.name}
                      </Anchor>
                    ))}
                  </Stack>
                )}
                <Box display="flex" alignItems="center" gap="5">
                  <CreditIcon />
                  <Text
                    cursor="pointer"
                    to="/admin/configuration"
                    onClick={() => setConfigDropdown(!configDropdown)}
                  >
                    Configuration
                  </Text>
                </Box>
                {configDropdown && (
                  <Stack pl={4} gap={4}>
                    {configurationSubmenu.map((route, index) => (
                      <Anchor key={index} to={`/admin${route.path}`}>
                        {route.name}
                      </Anchor>
                    ))}
                  </Stack>
                )}
                <Box display="flex" alignItems="center" gap="5">
                  <DocumentIcon />
                  <Text
                    cursor="pointer"
                    to="/admin/configuration"
                    onClick={() => setConfigDropdown(!configDropdown)}
                  >
                    Logs
                  </Text>
                </Box>
              </Box>
            </Stack>
            {/* <SidebarHelp sidebarVariant={sidebarVariant} /> */}
          </Scrollbars>
        </Box>
      </Box>
    </Box>
  );
}

// FUNCTIONS

export function SidebarResponsive(props) {
  //Dynamic Activity Submenus
  const activitySubmenu = dashRoutes.filter(
    (route) => route.submenu === "activity"
  );

  //Dynamic Configuration Submenus
  const configurationSubmenu = dashRoutes.filter(
    (route) => route.submenu === "configuration"
  );
  // to check for active Anchors and opened collapses
  let location = useLocation();
  const { logo, routes, colorMode, hamburgerColor, ...rest } = props;

  // this is for the rest of the collapses
  const [state, setState] = React.useState({});
  const mainPanel = React.useRef();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };
  // Chakra Color Mode
  let activeBg = useColorModeValue("white", "navy.700");
  let inactiveBg = useColorModeValue("white", "navy.700");
  let activeColor = useColorModeValue("gray.700", "white");
  let inactiveColor = useColorModeValue("gray.400", "white");
  let sidebarActiveShadow = useColorModeValue(
    "0px 7px 11px rgba(0, 0, 0, 0.04)",
    "none"
  );
  let sidebarBackgroundColor = useColorModeValue("white", "navy.800");

  // this function creates the Anchors and collapses that appear in the sidebar (left menu)
  const createAnchors = (routes) => {
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.category) {
        var st = {};
        st[prop["state"]] = !state[prop.state];
        return (
          <>
            <Text
              key={key}
              color={activeColor}
              fontWeight="bold"
              mb={{
                xl: "6px",
              }}
              mx="auto"
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              py="12px"
            >
              {document.documentElement.dir === "rtl"
                ? prop.rtlName
                : prop.name}
            </Text>
            {createAnchors(prop.views)}
          </>
        );
      }
      return (
        <NavLink to={prop.layout + prop.path} key={key}>
          {activeRoute(prop.layout + prop.path) === "active" ? (
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg={activeBg}
              boxShadow={sidebarActiveShadow}
              mb={{
                xl: "6px",
              }}
              mx={{
                xl: "auto",
              }}
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              py="12px"
              borderRadius="15px"
              _hover="none"
              w="100%"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}
            >
              <Flex>
                {typeof prop.icon === "string" ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <IconBox
                    bg="blue.500"
                    color="white"
                    h="30px"
                    w="30px"
                    me="12px"
                  >
                    {prop.icon}
                  </IconBox>
                )}
                <Text color={activeColor} my="auto" fontSize="sm">
                  {document.documentElement.dir === "rtl"
                    ? prop.rtlName
                    : prop.name}
                </Text>
              </Flex>
            </Button>
          ) : (
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg="transparent"
              mb={{
                xl: "6px",
              }}
              mx={{
                xl: "auto",
              }}
              py="12px"
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              borderRadius="15px"
              _hover="none"
              w="100%"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}
            >
              <Flex>
                {typeof prop.icon === "string" ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <IconBox
                    bg={inactiveBg}
                    color="blue.500"
                    h="30px"
                    w="30px"
                    me="12px"
                  >
                    {prop.icon}
                  </IconBox>
                )}
                <Text color={inactiveColor} my="auto" fontSize="sm">
                  {document.documentElement.dir === "rtl"
                    ? prop.rtlName
                    : prop.name}
                </Text>
              </Flex>
            </Button>
          )}
        </NavLink>
      );
    });
  };

  var Anchors = <>{createAnchors(routes)}</>;
  {
    console.log("Anchors", Anchors);
  }

  //  BRAND

  var brand = (
    <Box pt={"35px"} mb="8px">
      {logo}
      <HSeparator my="26px" />
    </Box>
  );

  // SIDEBAR
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userDropdown, setUserDropdown] = useState(false);
  const [configDropdown, setConfigDropdown] = useState(false);
  const btnRef = React.useRef();
  // Color variables
  return (
    <Flex
      display={{ sm: "flex", xl: "none" }}
      ref={mainPanel}
      alignItems="center"
    >
      <HamburgerIcon
        color={hamburgerColor}
        w="18px"
        h="18px"
        ref={btnRef}
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={document.documentElement.dir === "rtl" ? "right" : "left"}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          w="250px"
          maxW="250px"
          ms={{
            sm: "16px",
          }}
          my={{
            sm: "16px",
          }}
          borderRadius="16px"
          bg={sidebarBackgroundColor}
        >
          <DrawerCloseButton
            _focus={{ boxShadow: "none" }}
            _hover={{ boxShadow: "none" }}
          />
          <DrawerBody maxW="250px" px="1rem">
            <Box>
              <Heading fontSize="md" my={"4"} textAlign="center" width="100">
                Asset Management
              </Heading>
            </Box>
            <Divider />

            <Stack direction="column" mb="40px" mt={7} px="4">
              <Text fontWeight="bold" uppercase mb={5}>
                ASSETS
              </Text>
              <Box
                display="flex"
                flexDirection="column"
                fontWeight="bold"
                gap="5"
              >
                <Box display="flex" alignItems="center" gap="5">
                  <Link to="/admin/dashboard">
                    <HomeIcon />
                    Dashboard
                  </Link>
                </Box>
                {/* <Box display="flex" alignItems="center" gap="5">
                  <StatsIcon color="inherit" />
                  <Anchor to="/admin/tables">Tables</Anchor>
                </Box> */}
                <Box display="flex" alignItems="center" gap="5">
                  <PersonIcon />
                  <Text
                    cursor="pointer"
                    to="/admin/user"
                    onClick={() => setUserDropdown(!userDropdown)}
                  >
                    Activity
                  </Text>
                </Box>
                {userDropdown && (
                  <Stack pl={4} gap={4}>
                    {activitySubmenu.map((route, index) => (
                      <Anchor key={index} to={`/admin${route.path}`}>
                        {route.name}
                      </Anchor>
                    ))}
                  </Stack>
                )}
                <Box display="flex" alignItems="center" gap="5">
                  <CreditIcon />
                  <Text
                    cursor="pointer"
                    to="/admin/configuration"
                    onClick={() => setConfigDropdown(!configDropdown)}
                  >
                    Configuration
                  </Text>
                </Box>
                {configDropdown && (
                  <Stack pl={4} gap={4}>
                    {configurationSubmenu.map((route, index) => (
                      <Anchor key={index} to={`/admin${route.path}`}>
                        {route.name}
                      </Anchor>
                    ))}
                  </Stack>
                )}
                <Box display="flex" alignItems="center" gap="5">
                  <DocumentIcon />
                  <Text
                    cursor="pointer"
                    to="/admin/configuration"
                    onClick={() => setConfigDropdown(!configDropdown)}
                  >
                    Logs
                  </Text>
                </Box>
              </Box>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default Sidebar;
