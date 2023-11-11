/* 

 Date : 10 / 16 / 23
    Author : Jinshin
    Activities
    Purpose : 
      Imports:
          - import React, { useEffect, useLayoutEffect, useState } from "react";
          - import decoder from 'jwt-decode'
          - import axios from "axios";
          - import Logs from '../../components/Utils/logs_helper'
      Added:
          - const [ decoded, setDecode ] = useState()
          - useEffect
          - useLayoutEffect

  Date : 01 / 05 / 23
      Author : Nole
      Activities
      Purpose : 
        Load asset acquired by previous year
        import './style.scss'
        added style.scss ( @import "@coreui/chartjs/scss/coreui-chartjs"; )
            -- To display proper tooltip
        const [deployed,setDeployed] = useState([])
            -- view all asset deployed per department

  Date : 01 / 07 / 23
      Author : Nole
      Activities
      Purpose : 
        - Load logInfo Activity
        - import imgDefault from "../../assets/img/defaultImage.webp";
*/

// Chakra imports
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Grid,
  GridItem,
  Progress,
  SimpleGrid,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import bgAdmin from "assets/img/admin-background.png";

// Custom components
import Card from "components/Card/Card.js";
import BarChart from "components/Charts/BarChart";
//import LineChart from "components/Charts/LineChart";
import IconBox from "components/Icons/IconBox";

import './style.scss'

import imgDefault from "../../assets/img/defaultImage.webp";

// Custom icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
} from "components/Icons/Icons.js";
import React, { useEffect, useLayoutEffect, useState } from "react";
// Variables
import {
  barChartData,
  barChartOptions,
  //lineChartData,
  lineChartOptions,
} from "variables/charts";
import { pageVisits, socialTraffic } from "variables/general";

// Jinshin
import decoder from "jwt-decode";
import axios from "axios";
import Logs from "../../components/Utils/logs_helper";
import FourGraphs from "components/FourGraphs/FourGraphs";
import AssetViewer from "components2/Activity/AssetViewer";
// End Jinshin

import ITCheckoutViewer from "components2/Activity/ITCheckoutViewer";
//import DashBoardContent from "./DashboardContent"

import {
  CChartBar,
  CChartLine,
  CChartPie,
  CChartDoughnut,
  CChart,
} from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";

import randomColor from "randomcolor";
import DashboardIT from "./DashboardIT";
import DashboardUsers from "./DashboardUsers";

export default function Dashboard() {

  // Jinshin
  const [decoded, setDecode] = useState();
  const [user, setUser] = useState({
    userID: "",
    userRole: "",
  });


  useEffect(() => {

    try {
    const storage = localStorage;

    if (!storage.getItem("token") || !storage.getItem("token").length) {
      window.location.href = "/#/auth/signin";
    }

    const token = storage.getItem("token");

    axios
      .post("/users/verify", { token })
      .then((res) => {
        if (res.data.includes("Token is valid")) {
          const decoding = decoder(token);
          setDecode(decoding);
          setUser({...user,
            userID: decoding.result[0].userDisplayID,
            userRole: decoding.result[0].userRole })

         
        }
      })
      .catch((err) => {
        const errorStatus = err.code;

        if (errorStatus.includes("ERR_NETWORK")) {
          const verifyLogs = new Logs(
            "DB",
            "dashboard",
            "useEffect /users/verify" + errorStatus,
            err,
            ""
          );
          alert(verifyLogs.getMessage());
        }

        if (errorStatus.includes("ERR_BAD_REQUEST")) {
          //console.log(err);
          const verifyLogs = new Logs(
            "Error",
            "dashboard--",
            "useEffect /users/verify" + errorStatus,
            err.response.data.message,
            ""
          );

          axios
            .post("/log", verifyLogs.getLogs())
            .then((res) => {
              console.log("Log is: ", res.data);
              localStorage.removeItem("token");
              window.location.href = "/#/auth/signin";
            })
            .catch((err) => {
              const logStatus = err.code;

              if (logStatus.includes("ERR_NETWORK")) {
                const _logs = new Logs(
                  "DB",
                  "dashboard",
                  "useEffect /log",
                  err,
                  decoded.result[0].userDisplayID
                );
                alert(_logs.getMessage());
              }

              if (logStatus.includes("ERR_BAD_REQUEST")) {
                const _logs = new Logs(
                  "Error",
                  "dashboard",
                  "useEffect /log",
                  err.response.data.message,
                  ""
                );
                alert(_logs.getLogs());
              }
            });
        }
      });
    } catch(err) {
      alert(err)
    }
  }, [setDecode]);

  // useLayoutEffect(() => {
  //   decoded && console.log("user", decoded);
  // });
  // // End Jinshin

  // useEffect( async() => {

  
  //   try {
  
  //     const tokenStorage = localStorage.getItem("token");
      
 
  //     if (!storage.getItem("token") || !storage.getItem("token").length) {
  //           window.location.href = "/#/auth/signin";
  //     } else {
  //       const tokenDecoded = decoder(tokenStorage);
  //       setUser({...user,
  //         userID: tokenDecoded.result[0].userDisplayID,
  //         userRole: tokenDecoded.result[0].userRole })
  
  //     }

      
  //   } catch(err) {
  //     alert("dashboard")
  //   }
  
  // }, [])

  return (
<>

      { user?.userRole.trim() === "IT Admin" && <DashboardIT /> }
      { user?.userRole.trim() === "IT" && <DashboardIT /> }
      { user?.userRole.trim() === "User" && <DashboardUsers /> }
      { user?.userRole.trim() === "Supplier" && <DashboardUsers /> }

        </>
   
  );
}