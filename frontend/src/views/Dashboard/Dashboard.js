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
  useToast
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
//import axios from "axios";
import { placeHolderAPI } from "index";

import Logs from "../../components/Utils/logs_helper";
import FourGraphs from "components/FourGraphs/FourGraphs";
import AssetViewer from "components2/Activity/AssetViewer";
// End Jinshin

import ITCheckoutViewer from "components2/Activity/ITCheckoutViewer";
//import DashBoardContent from "./DashboardContent"

import React, { useEffect, useLayoutEffect, useState,lazy,Suspense } from "react";

import {
  CChartBar,
  CChartLine,
  CChartPie,
  CChartDoughnut,
  CChart,
} from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";

import randomColor from "randomcolor";
// import DashboardIT from "./DashboardIT";
// import DashboardUsers from "./DashboardUsers";

const DashboardIT = React.lazy(() => import("./DashboardIT"));
const DashboardUsers = React.lazy(() => import("./DashboardUsers"));

export default function Dashboard() {

  const toast = useToast()

  // Jinshin
  const [decoded, setDecode] = useState();
  const [user, setUser] = useState({
    userID: "",
    userRole: "",
  });


  function showToast(title,desc,status) {
    
    return (
      
          toast({
            title: title,
            description: desc,
            status: status,
            duration: 3000,
            //isClosable: true,
            position: "top"
          })

     
     
    )
  }


  useEffect(() => {

    var userID = ""
    try {
    const storage = localStorage;
  

    if (!storage.getItem("token") || !storage.getItem("token").length) {
      window.location.href = "/#/auth/signin";
    }

    const token = storage.getItem("token");

    placeHolderAPI
      .post("/users/verify", { token })
      .then((res) => {
        if (res.data.includes("Token is valid")) {
          const decoding = decoder(token);
          setDecode(decoding);
          setUser({...user,
            userID: decoding.result[0].userDisplayID,
            userRole: decoding.result[0].userRole })

            userID = decoding.result[0].userDisplayID
         
        }
      })
      .catch((err) => {
        const errorStatus = err.code;

        if (errorStatus.includes("ERR_NETWORK")) {

          showToast("Error in user verification",
                err,
                'warning')
        } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
         
          const verifyLogs = new Logs(
            "Error",
            "dashboard",
            "useEffect /users/verify" + errorStatus,
            err.response.data.message,
            userID
          );
          verifyLogs.insertLogs(verifyLogs)
          showToast("Error user verification",
          'Please wait while we are logging error',
          'warning')
        } else {
          const verifyLogs = new Logs(
            "Error",
            "dashboard",
            "useEffect /users/verify" + errorStatus,
            err,
            userID
          );
          verifyLogs.insertLogs(verifyLogs)
          showToast("Error user verification",
          'Please wait while we are logging error',
          'warning')
        }
      });
    } catch(err) {
      alert(err)
      const errorStatus = err.code;

      if (errorStatus.includes("ERR_NETWORK")) {

        showToast("Error in user verification",
              err,
              'warning')
      } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
       
        const verifyLogs = new Logs(
          "Error",
          "dashboard",
          "useEffect (catch) /users/verify" + errorStatus,
          err.response.data.message,
          userID
        );
        verifyLogs.insertLogs(verifyLogs)
        showToast("Error user verification",
        'Please wait while we are logging error',
        'warning')
      } else {
        const verifyLogs = new Logs(
          "Error",
          "dashboard",
          "useEffect (catch) /users/verify" + errorStatus,
          err,
          userID
        );
        verifyLogs.insertLogs(verifyLogs)
        showToast("Error user verification",
        'Please wait while we are logging error',
        'warning')
      }
    }
  }, [setDecode]);

  useLayoutEffect(() => {
    decoded 
  });

  return (
<>

        { user?.userRole.trim() === "IT Admin" &&  
          <Suspense fallback={
            <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <CircularProgress  h={'150px'} w={'150px'} isIndeterminate color='green.300' />
            </div>
            
          }>
            <DashboardIT/> 
          </Suspense>
        }

        { user?.userRole.trim() === "IT" &&  
          <Suspense fallback={
            <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <CircularProgress  h={'150px'} w={'150px'}  isIndeterminate color='green.300' />
            </div>
            
          }>
            <DashboardIT/> 
          </Suspense>
        }
        
        { user?.userRole.trim() === "User" &&  
          <Suspense fallback={
            <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <CircularProgress  h={'150px'} w={'150px'}  isIndeterminate color='green.300' />
            </div>
            
          }>
            <DashboardUsers/> 
          </Suspense>
        }
        { user?.userRole.trim() === "Supplier" &&  
          <Suspense fallback={
            <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <CircularProgress h={'150px'} w={'150px'}  isIndeterminate color='green.300' />
            </div>
            
          }>
            <DashboardUsers/> 
          </Suspense>
        }

        </>
   
  );
}