// Chakra imports
import {
  Portal,
  useDisclosure,
  Stack,
  Box,
  useColorMode,
  StatLabel,
  Text,
} from "@chakra-ui/react";
import Configurator from "components/Configurator/Configurator";
import Footer from "components/Footer/Footer.js";
import {
  ArgonLogoDark,
  ArgonLogoLight,
  ChakraLogoDark,
  ChakraLogoLight,
} from "components/Icons/Icons";
// Layout components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import React, { useState,useEffect } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";

import jwtDecode from "jwt-decode";



import routes from "routes.js";
// Custom Chakra theme
import FixedPlugin from "../components/FixedPlugin/FixedPlugin";
// Custom components
import MainPanel from "../components/Layout/MainPanel";
import PanelContainer from "../components/Layout/PanelContainer";
import PanelContent from "../components/Layout/PanelContent";
import bgAdmin from "assets/img/AssetBackground.webp";
import FourGraphs from "components/FourGraphs/FourGraphs";
import FourGraphsUsers from "components/FourGraphs/FourGraphsUsers";


export default function Dashboard(props) {

  const [user, setUser] = useState({
    userID: "",
    userRole: "",
  });

  const [userGroup,setUserGroup ]= useState(false)

  const location = useLocation();
 // console.log("location", location.pathname);

  const { ...rest } = props;
  // states and functions
  const [fixed, setFixed] = useState(false);
  const { colorMode } = useColorMode();

  useEffect(() => {
    try {
    const token = window.localStorage.getItem("token");
    const data = jwtDecode(token);

     setUser({...user,
      userID: data.result[0].userDisplayID,
      userRole: data.result[0].userRole })
     
      // const val = data.result[0].userRole

      // if(data.result[0].userRole === val) {
      //   // alert(data.result[0].userRole)
      //   setUserGroup( true)
      // } else {
      //   setUserGroup( false)
      // }
   // setUser(data.result);
   // console.log(data.result)

    } catch(err) {
      window.location.href = "/#/auth/signin";
    }
  }, []);

  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== "/admin/full-screen-maps";
  };
  const getActiveRoute = (routes) => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].views);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  // This changes navbar state(fixed or not)
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].views);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          if (routes[i].secondaryNavbar) {
            return routes[i].secondaryNavbar;
          }
        }
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.category === "account") {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  document.documentElement.dir = "ltr";
  // Chakra Color Mode

  const dashboardBg = 'linear(to-tl, #1a75ff, #80b3ff, #cce0ff)'

  return (
    <Box  h='100vh' bgGradient={dashboardBg}>
      {/*
      bgGradient='linear(to-tl, #4db8ff, #80ccff, #ccebff)'
      <Box
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="convert"
        h="115vh"

        w="100%"
        position="absolute"
        bgImage={colorMode === "light" ? bgAdmin : "none"}
        bg={colorMode === "light" ? bgAdmin : "navy.900"}
        bgSize="cover"
        top="0"
        // bg={"#96BFE6"}
      /> */}

      <Sidebar
        routes={routes}
        logo={
          <Stack direction="row" spacing="12px" align="center" justify="center">
            {/* {colorMode === "dark" ? (
              <ArgonLogoLight w="74px" h="27px" />
            ) : (
              <ArgonLogoDark w="74px" h="27px" />
            )} */}
            <Box
              w="1px"
              h="20px"
              bg={ "gray.700"}
            />
            {/* {colorMode === "dark" ? (
              <ChakraLogoLight w="82px" h="21px" />
            ) : (
              <ChakraLogoDark w="82px" h="21px" />
            )} */}
          </Stack>
        }
        display="none"
        {...rest}
      />

      <MainPanel
        w={{
          base: "100%",
          xl: "calc(100% - 275px)",
        }}
      >
        {/* Four Graphs */}
        
        <Stack mt={{ base: 140, md: 100 }} px={{ base: 4, md: 7, lg: 10 }} >
       
          { user?.userRole.trim() === "IT Admin" && <FourGraphs /> }
          { user?.userRole.trim() === "IT" && <FourGraphs /> }
          { user?.userRole.trim() === "User" && <FourGraphsUsers /> }
          { user?.userRole.trim() === "Supplier" && <FourGraphsUsers /> }

        </Stack>
        <Portal>
          <AdminNavbar
            onOpen={onOpen}
            brandText={getActiveRoute(routes)}
            secondary={getActiveNavbar(routes)}
            fixed={fixed}
            {...rest}
          />
        </Portal>
        {getRoute() ? (
          <PanelContent>
            <PanelContainer>
              <Switch>
                {getRoutes(routes)}
                  {/* <Redirect from="/admin" to="/admin/dashboard" />  */}
                {/* { user?.userRole.trim() === "IT Admin" && <Redirect from="/admin" to="/admin/dashboardit" /> }
                { user?.userRole.trim() === "IT" && <Redirect from="/admin" to="/admin/dashboardit" /> }
                { user?.userRole.trim() === "User" && <Redirect from="/admin" to="/admin/dashboardusers" /> } */}
                 <Redirect from="/admin" to="/admin/dashboardusers" />
                
              </Switch>
             
            </PanelContainer>
            
          </PanelContent>
        ) : null}

        <Portal>
          <FixedPlugin
            secondary={getActiveNavbar(routes)}
            fixed={fixed}
            onOpen={onOpen}
          />
        </Portal>
      </MainPanel>
    </Box>
  );
}
