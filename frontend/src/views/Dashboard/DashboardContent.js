/* 

 Date : 10 / 16 / 23
    Author : Jinshin
    Activities

*/

import {
  Avatar,
  Box,
  Button,
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


// Jinshin
import decoder from "jwt-decode";
import axios from "axios";
import Logs from "../../components/Utils/logs_helper";
import FourGraphs from "components/FourGraphs/FourGraphs";
import AssetViewer from "components2/Activity/AssetViewer";
// End Jinshin

import ITCheckoutViewer from "components2/Activity/ITCheckoutViewer";
import PulloutViewer from "components2/Activity/PulloutViewer";


export default function Dashboard() {

 

  // Jinshin
  const [decoded, setDecode] = useState();

  useEffect(() => {
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
        }
      })
      .catch((err) => {
        const errorStatus = err.code;

        if (errorStatus.includes("ERR_NETWORK")) {
          const verifyLogs = new Logs(
            "DB",
            "dashboard",
            "useEffect /users/verify",
            err,
            ""
          );
          alert(verifyLogs.getMessage());
        }

        if (errorStatus.includes("ERR_BAD_REQUEST")) {
          //console.log(err);
          const verifyLogs = new Logs(
            "Error",
            "dashboard",
            "useEffect /users/verify",
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
  }, [setDecode]);

// useEffect(() => {
//   return () => {
//     const ifameData=document.getElementById("iframeId")
//         const lat=1.305385;
//         const lon=30.923029;
//         ifameData.src=`https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`
//   };
// })
  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: 0 }}>
      <Grid
        templateColumns={{ sm: "1fr", lg: "2fr 1fr" }}
        templateRows={{ lg: "repeat(2, auto)" }}
        gap="20px"
        
      >
  
        <GridItem colSpan={2} width={"82.5vw"}>
          <AssetViewer/>
        </GridItem>
        
        <Card p="0px" maxW={{ sm: "320px", md: "100%" }}>
          <Flex direction="column">
            {/* <Flex align="center" justify="space-between" p="22px">
              <Text fontSize="lg" color={textColor} fontWeight="bold">
                Page visits
              </Text>
              <Button variant="primary" maxH="30px">
                SEE ALL
              </Button>
            </Flex> */}
            <Card maxW={{ sm: "320px", md: "1000px" }}>
            <Text fontSize="lg" color={"blue"} fontWeight="bold">
                Checkout
              </Text>
            <ITCheckoutViewer />
          </Card>

          </Flex>
        </Card>
    
      </Grid>
    </Flex>
  );
}