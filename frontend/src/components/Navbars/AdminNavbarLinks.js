// Chakra Icons
import { BellIcon } from "@chakra-ui/icons";
import { Icon, Image } from '@chakra-ui/react'
// Chakra Imports
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
// Custom Icons
import {
  ArgonLogoDark,
  ArgonLogoLight,
  ChakraLogoDark,
  ChakraLogoLight,
  ProfileIcon,
  SettingsIcon,
} from "components/Icons/Icons";
// Custom Components
import { ItemContent } from "components/Menu/ItemContent";
import { SearchBar } from "components/Navbars/SearchBar/SearchBar";
import { SidebarResponsive } from "components/Sidebar/Sidebar";
import React from "react";
import { NavLink } from "react-router-dom";
import routes from "routes.js";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useState } from "react";
import logout from "../../assets/img/Logout.ico"

import { RiLogoutCircleRLine } from "react-icons/ri";
import IconBox from "components/Icons/IconBox";

export default function HeaderLinks(props) {
  const [user, setUser] = useState();

  useEffect(() => {
    try {
    const token = window.localStorage.getItem("token");
    const data = jwtDecode(token);
    setUser(data);
    } catch(err) {
      
      alert(err)
      window.location.href = "/#/auth/signin";
    }
  }, []);
 

  const handleLogout = () => {
    try {
    const storage = localStorage;
    window.localStorage.removeItem("token");
    window.location.reload()
   // window.location.reload()
    // if (!storage.getItem("token")) {
    //  //window.location.href = "/#/auth/signin";
    //  window.location.reload()
    // }
  } catch(err) {
    alert(err)
  }
    
  };

  // useEffect(() => {}, []);
  const {
    variant,
    children,
    fixed,
    scrolled,
    secondary,
    onOpen,
    ...rest
  } = props;

  const { colorMode } = useColorMode();

  // Chakra Color Mode
  let navbarIcon =
    fixed && scrolled
      ? useColorModeValue("gray.700", "gray.200")
      : useColorModeValue("white", "gray.200");
  let menuBg = useColorModeValue("white", "navy.800");
  if (secondary) {
    navbarIcon = "white";
  }
  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
    >
      {user ? (
        <Flex mr={5} gap={3} alignItems="center">
          <Flex>
             {/* <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />  */}
            <Avatar
                          size='md'
                          name= {user.result[0]?.displayName}
                          src= {
                            user.result[0]?.imgFilename
                          ? 
                          `http://localhost:5001/image/static/${user.result[0]?.imgFilename}`
                            
                          :   <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />
                          }  
                        />
            <Text color="red">{user.result[0].Name}</Text>
          </Flex>
          <IconBox
                  borderRadius="50%"
                  as="box"
                  h={"45px"}
                  w={"45px"}
                  //bg={"white"}
                  cursor="pointer"
                  onClick={handleLogout} 
                >
                  <Image src={logout} size="lg" />
                </IconBox>
          
          {/* <Button size="sm" >
            Log Out
          </Button> */}
        </Flex>
      ) : (
        <NavLink to="/auth/signin">
          <Button
            ms="0px"
            px="0px"
            me={{ sm: "2px", md: "16px" }}
            color={navbarIcon}
            variant="no-effects"
            rightIcon={
              document.documentElement.dir ? (
                ""
              ) : (
                <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />
              )
            }
            leftIcon={
              document.documentElement.dir ? (
                <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />
              ) : (
                ""
              )
            }
          >
            <Text display={{ sm: "none", md: "flex" }}>Sign In</Text>
          </Button>
        </NavLink>
      )}

      <SidebarResponsive
        hamburgerColor={"white"}
        logo={
          <Stack direction="row" spacing="12px" align="center" justify="center">
            {colorMode === "dark" ? (
              <ArgonLogoLight w="74px" h="27px" />
            ) : (
              <ArgonLogoDark w="74px" h="27px" />
            )}
            <Box
              w="1px"
              h="20px"
              bg={colorMode === "dark" ? "white" : "gray.700"}
            />
            {colorMode === "dark" ? (
              <ChakraLogoLight w="82px" h="21px" />
            ) : (
              <ChakraLogoDark w="82px" h="21px" />
            )}
          </Stack>
        }
        colorMode={colorMode}
        secondary={props.secondary}
        routes={routes}
        {...rest}
      />
      {/* <SettingsIcon
        cursor="pointer"
        ms={{ base: "16px", xl: "0px" }}
        me="16px"
        onClick={props.onOpen}
        color={navbarIcon}
        w="18px"
        h="18px"
      /> */}
      <Menu>
        <MenuButton>
          <BellIcon color={navbarIcon} w="18px" h="18px" />
        </MenuButton>
        <MenuList p="16px 8px" bg={menuBg}>
          <Flex flexDirection="column">
            <MenuItem borderRadius="8px" mb="10px">
              <ItemContent
                time="13 minutes ago"
                info="from Alicia"
                boldInfo="New Message"
                aName="Alicia"
                aSrc={avatar1}
              />
            </MenuItem>
            <MenuItem borderRadius="8px" mb="10px">
              <ItemContent
                time="2 days ago"
                info="by Josh Henry"
                boldInfo="New Album"
                aName="Josh Henry"
                aSrc={avatar2}
              />
            </MenuItem>
            <MenuItem borderRadius="8px">
              <ItemContent
                time="3 days ago"
                info="Payment succesfully completed!"
                boldInfo=""
                aName="Kara"
                aSrc={avatar3}
              />
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
}
