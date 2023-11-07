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

import {
  CChartBar,
  CChartLine,
  CChartPie,
  CChartDoughnut,
} from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
import randomColor from "randomcolor";

export default function Dashboard() {

  const [purchases,setPurchases] = useState([])
  const [deployed,setDeployed] = useState([])
  const [loginfo,setLogInfo] = useState([])
  const [assetmovement,setMovement] = useState([])
  const [assetDept,setAssetDept] = useState([])
  const [assetstatus,setStatus] = useState([])
  const [assettype,setType] = useState([])
  const [category,setCategory] = useState([])

  const [values,setPrevYear] = useState({
    prevyear: ""
  })

  // Chakra Color Mode
  const iconBlue = useColorModeValue("blue.500", "blue.500");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColorDue = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textTableColor = useColorModeValue("gray.500", "white");

  const { colorMode } = useColorMode();

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
          console.log(err);
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
                  ""
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

  // useLayoutEffect(() => {
  //   decoded && console.log("user", decoded);
  // });
  // // End Jinshin

  useEffect( async() => {


    var amount_prevYear = "";
    var userid = ""
  
 
    try {
  
      const tokenStorage = localStorage.getItem("token");
      const tokenDecoded = decoder(tokenStorage);
      userid = tokenDecoded.result[0].userDisplayID;
  
      const PrevYearAmount = await axios.get("/dashboard/asset-acquired-PrevYear")
  
      .then((res) => {
        amount_prevYear = res.data.result[0].Amount;
        
        setPrevYear({...values,
          prevyear: amount_prevYear})
      })
      .catch((err) => {
        const InsertLogs = new Logs(
          "Error",
          "Dashboard",
          "Function /dashboard/asset-acquired-PrevYear",
          "useEffect ( Asset Acquired )",
          userid
        );
      });
  
      /* 
        Acquired Current Year Assets
      */
  
         const CurrentYearAcuired = await axios.get("/dashboard/asset-acquired-CurrentYear")
  
        .then((res) => {
          
          setPurchases(res.data.result[0])
       
  
        })
        .catch((err) => {
          const InsertLogs = new Logs(
            "Error",
            "Dashboard",
            "Function /dashboard/asset-acquired-PrevYear",
            "useEffect ( Asset Acquired )",
            userid
          );
        });
  

      /* 
        Asset Deploy
      */
        const assetDeploy = await axios.get("/dashboard/asset-deploy")
  
        .then((res) => {
          //console.log(res.data.result)
          setDeployed(res.data.result)
       
        })
        .catch((err) => {
          const InsertLogs = new Logs(
            "Error",
            "Dashboard",
            "Function /dashboard/asset-deploy",
            "useEffect ( Asset Deployed )",
            userid
          );
        });

        /*
        Log Info 
        */
        const successLogInfo = await axios.get("/dashboard/loginfo")
  
        .then((res) => {
          setLogInfo(res.data.result)
       
        })
        .catch((err) => {
          const InsertLogs = new Logs(
            "Error",
            "Dashboard",
            "Function /dashboard/loginfo",
            "useEffect ( Get All LogInfo)",
            userid
          );
        });

        /*
        Asset Movement
        */
        const successAssetMovement = await axios.get("/dashboard/asset-movement")
  
        .then((res) => {
          setMovement(res.data.result[0])
       
        })
        .catch((err) => {
          const InsertLogs = new Logs(
            "Error",
            "Dashboard",
            "Function /dashboard/asset-movement",
            "useEffect ( Get All Asset Movement)",
            userid
          );
        });

        /*
        Asset Per Department
        */ 
        const successAssetPerDept = await axios.get("/dashboard/asset-perDept")
  
        .then((res) => {
          setAssetDept(res.data.result)
       
        })
        .catch((err) => {
          const InsertLogs = new Logs(
            "Error",
            "Dashboard",
            "Function /dashboard/asset-perDept",
            "useEffect ( Get All Asset Per Dept)",
            userid
          );
        });
        
        
        /*
        Asset Status
        */ 
        const successStatus = await axios.get("/dashboard/asset-Status")
  
        .then((res) => {
          setStatus(res.data.result)
       
        })
        .catch((err) => {
          const InsertLogs = new Logs(
            "Error",
            "Dashboard",
            "Function /dashboard/asset-Status",
            "useEffect ( Get All Asset Status)",
            userid
          );
        });

        /*
        Asset Type
        */ 
        const succesType = await axios.get("/dashboard/asset-Type")
  
        .then((res) => {
          setType(res.data.result)
       
        })
        .catch((err) => {
          const InsertLogs = new Logs(
            "Error",
            "Dashboard",
            "Function /dashboard/asset-Type",
            "useEffect ( Get All Asset Type)",
            userid
          );
        });

 /*
        Asset CATEGORY
        */ 
        const succesCategory = await axios.get("/dashboard/asset-Category")
  
        .then((res) => {
          setCategory(res.data.result)
       
        })
        .catch((err) => {
          const InsertLogs = new Logs(
            "Error",
            "Dashboard",
            "Function /dashboard/asset-Category",
            "useEffect ( Get All Asset Category)",
            userid
          );
        });
    } catch(err) {
      alert(err)
    }
  
  }, [])

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: 0 }}>
      <Grid
        templateColumns={{ sm: "1fr", lg: "2fr 1fr" }}
        templateRows={{ lg: "repeat(2, auto)" }}
        gap="20px"
        
      >
  
        <GridItem colSpan={2}>
        
          <Card  minH="500px" minW={"400px"}>
            {/* <AssetViewer /> */}
            <GridItem colSpan={2} bg='navy.800' alignItems={"center"} >
                <Flex align="center" justify="space-between" p="22px">
                <Text fontSize="30px" color={textColorDue} fontWeight="bold">
                  Overview
                </Text>
                </Flex>
            </GridItem>
            <Grid
                h='1050px'
                templateRows='repeat(4, 1fr)'
                templateColumns='repeat(5, 1fr)'
                gap={2}

              >
                <GridItem rowSpan={2} colSpan={1} bg='tomato' >
                <Card p="0px" maxW={{ sm: "320px", md: "100%" }} >
                    <Flex direction="column">
                      <Flex align="center" justify="space-between" p="22px">
                        <Text fontSize="lg" color={textColor} fontWeight="bold">
                          Recent Activity
                        </Text>
                        <Button variant="primary" maxH="30px">
                          SEE ALL
                        </Button>
                      </Flex>
                    </Flex>
                  <Card p="0px" maxW={{ sm: "320px", md: "100%"}}   minH="450px">
                    <Box  maxHeight="450px"  maxW={"400px"} overflowY="auto">
                        <TableContainer >
                          <Table >
                            <Thead position="sticky"  top={0}>
                              <Tr >
                                <Th>User</Th>
                                <Th>Dept</Th>
                                <Th>Info</Th>
                                {/* <Th>Date</Th> */}
                                <Th>Module</Th>
                                <Th>Desc</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {loginfo.map((log) => (

                              <Tr key={log.logID}>
                                <Td > 
                                  <Avatar
                                    size='sm'
                                    name= {log.displayName}
                                    src= {
                                      log?.imgFilename
                                    ? 
                                    `http://localhost:5001/image/static/${log?.imgFilename}`
                                      
                                    :  imgDefault
                                    }  
                                  />
                                  {/* {log.displayName} */}
                                </Td>
                                <Td>
                                {log.shortName}
                                </Td>
                                <Td>
                                {log.logtype}
                                </Td>
                                {/* <Td >
                                  {log.dateatecreated}
                                </Td> */}
                                <Td>
                                  {log.module}
                                </Td>
                                <Td>
                                  {log.logfunction}
                                </Td>
                              </Tr>
                              ))}
                            </Tbody>
                          </Table>
                        </TableContainer>

                    </Box>
                  </Card>
      
                </Card>
                </GridItem>
                <GridItem colSpan={2} bg='blue'>
                <Card p="5px" maxW={{ sm: "20px", md: "100%" }}  minH={"20px"} bg='blue'>
                    <Flex direction="column">
                      <Flex align="center" justify="space-between" p="2px">
                        <Text fontSize="lg" color={textColorDue} fontWeight="bold">
                         Depreciated
                        </Text>
                        <Text fontSize="lg" color={textColorDue} fontWeight="bold">
                        Due This Year
                        </Text>
                      </Flex>
                      <Flex align="center" justify="space-between" p="2px">
                        <Text fontSize="40px" color={'red'} fontWeight="bold">
                        56
                        </Text>
                        <Text fontSize="40px" color={'red'} fontWeight="bold">
                         4000
                        </Text>
                      </Flex>
                    </Flex>
                </Card>
                    
                </GridItem>
                <GridItem colSpan={2} bg='#006633' minH={"20px"}>
                <Card p="5px" maxW={{ sm: "20px", md: "100%" }}  minH={"20px"} bg='#006633'>
                <Flex direction="column">
                      <Flex align="center" justify="space-between" p="2px">
                        <Text fontSize="lg" color={textColorDue} fontWeight="bold">
                         Depreciated this Month
                        </Text>
                        <Text fontSize="lg" color={textColorDue} fontWeight="bold">
                        Asset Due Next Month
                        </Text>
                      </Flex>
                      <Flex align="center" justify="space-between" p="2px">
                        <Text fontSize="40px" color={'red'} fontWeight="bold">
                         4
                        </Text>
                        <Text fontSize="40px" color={'red'} fontWeight="bold">
                        2500
                        </Text>
                      </Flex>
                    </Flex>
                </Card>
                </GridItem>



                <GridItem colSpan={2} bg='blue' minH={"340px"} >
                  <Card p="0px" maxW={{ sm: "20px", md: "100%" }} >
                    <Flex direction="column">
                      <Flex align="center" justify="space-between" p="22px">
                        <Text fontSize="lg" color={textColor} fontWeight="bold">
                         Asset Movement
                        </Text>
                        {/* <Button variant="primary" maxH="30px">
                          SEE ALL
                        </Button> */}
                      </Flex>
                    </Flex>
                    <Card  maxW={{ sm: "20px", md: "500px"}}   >
                      <>
                      <CChartBar
                        
                          data={{
                                    labels: assetmovement?.map(
                                      (status) => 
                                      status.Movement
                                    ),
                                    datasets: [
                                      {
                                        label: "Movement ",
                                        backgroundColor: assetmovement?.map((status) =>
                                          randomColor()
                                        ),
                                       
                                        data: [354,2416,2875,506],
                                        // assetmovement?.map(
                                        //   (asset) => asset.total
                                        // ),
                                      },
                                    ],
                                  }}
                                 // labels="Movement"
                      />
                      </>
                    </Card>
                  </Card>
                </GridItem>

                <GridItem colSpan={2} bg='papayawhip'  minH={"340px"} >
                  <Card p="0px" maxW={{ sm: "150px", md: "100%" }}   >
                      <Flex direction="column">
                            <Flex align="center" justify="space-between" p="22px">
                              <Text fontSize="lg" color={textColor} fontWeight="bold">
                                Asset Per Department
                              </Text>
                              {/* <Button variant="primary" maxH="30px">
                                SEE ALL
                              </Button> */}
                            </Flex>
                      </Flex>
                      <Card maxW={{ md: "500px"}}  >
                      <>
                        <CChartBar
                          
                            data={{
                                      labels: assetDept?.map(
                                        (dept) => dept.shortName
                                      ),
                                      datasets: [
                                        {
                                          label: "Department",
                                          backgroundColor: assetDept?.map((dept) =>
                                            randomColor()
                                          ),
                                          //'#f87979',
                                          data: [80,23,12,56,45,45,100,200]
                                          // assetDept?.map(
                                          //   (asset) => asset.assetdept
                                          // ),
                                        },
                                      ],
                                    }}
                                    labels="shortName"
                        />
                        </>
                      </Card>
                  </Card>
                </GridItem>

                <GridItem rowSpan={2} colSpan={1} bg='pink' minH={"330px"} >
                <Card p="0px" maxW={{ sm: "320px", md: "100%" }}>
                    <Flex direction="column">
                      <Flex align="center" justify="space-between" p="22px">
                        <Text fontSize="lg" color={textColor} fontWeight="bold">
                          Asset Type
                        </Text>
                        {/* <Button variant="primary" maxH="30px">
                          SEE ALL
                        </Button> */}
                      </Flex>
                    </Flex>
                  <Card p="0px" maxW={{ sm: "320px", md: "100%"}}  overflow="auto" minH="450px">
                    <Box  maxHeight="270px"  maxW={"600px"} >
                        <TableContainer >
                          <Table >
                            <Thead position="sticky"  top={0}>
                              <Tr >
                                <Th>Type</Th>
                                <Th>Count</Th>
                                {/* <Th>Info</Th>
                                <Th>Date</Th>
                                <Th>Module</Th>
                                <Th>Desc</Th> */}
                              </Tr>
                            </Thead>
                            <Tbody>
                              {assettype.map((type) => (

                              <Tr key={type.typeID}>
                                <Td>
                                  {type.typeName}
                                </Td>
                                <Td>
                                  {type.Current}
                                </Td>
                              </Tr>
                              ))}
                            </Tbody>
                          </Table>
                        </TableContainer>

                    </Box>
                  </Card>
      
                </Card>

                </GridItem>

                <GridItem colSpan={2} bg='green' minH={"340px"}>
                <Card p="0px" maxW={{ sm: "150px", md: "100%" }}   >
                      <Flex direction="column">
                            <Flex align="center" justify="space-between" p="22px">
                              <Text fontSize="lg" color={textColor} fontWeight="bold">
                                Asset Status
                              </Text>
                              {/* <Button variant="primary" maxH="30px">
                                SEE ALL
                              </Button> */}
                            </Flex>
                      </Flex>
                      <Card maxW={{ md: "500px"}}  >
                      <>
                        <CChartBar
                          
                            data={{
                                      labels: assetstatus?.map(
                                        (stat) => 
                                        stat.CntStatus + "  " + stat.statusName
                                      ),
                                      datasets: [
                                        {
                                          label: "Status",
                                          backgroundColor: assetstatus?.map((stat) =>
                                            randomColor()
                                          ),
                                          //'#f87979',
                                          data: 
                                          //[80,23,12,56,45,45,100,200]
                                          assetstatus?.map(
                                            (stat) => stat.CntStatus
                                          ),
                                        },
                                      ],
                                    }}
                                    labels="shortName"
                        />
                        </>
                      </Card>
                  </Card>
                </GridItem>
                <GridItem colSpan={2} bg='yellow' minH={"340px"}>
                <Card p="0px" maxW={{ sm: "320px", md: "100%" }}>
                    <Flex direction="column">
                      <Flex align="center" justify="space-between" p="22px">
                        <Text fontSize="lg" color={textColor} fontWeight="bold">
                          Deployed
                        </Text>
                        <Button variant="primary" maxH="30px">
                          SEE ALL
                        </Button>
                      </Flex>
                    </Flex>
                  <Card p="0px" maxW={{ sm: "320px", md: "100%"}}  overflow="auto" minH="270px">
                    <Box maxH="50px"  maxW={"350px"} >
                    <CChartBar
                      data={{
                                labels: deployed?.map(
                                  (dept) => dept.shortName
                                ),
                                datasets: [
                                  {
                                    label: "Asset Deployed",
                                    backgroundColor: deployed?.map((dept) =>
                                      randomColor()
                                    ),
                                    //'#f87979',
                                    data: deployed?.map(
                                      (asset) => asset.Count
                                    ),
                                  },
                                ],
                              }}
                              labels="departmentName"
                    />


                    </Box>
                  </Card>
      
                </Card>                  

                </GridItem>

                <GridItem colSpan={2} bg='red'>
                  <Text fontSize="lg" color={textColorDue} fontWeight="bold">
                    On Development Stage
                  </Text>
                </GridItem>
                <GridItem colSpan={2} bg='violet'>
                <Text fontSize="lg" color={textColorDue} fontWeight="bold">
                    On Development Stage
                  </Text>
                </GridItem>
                
                {/* <GridItem colSpan={4} bg='tomato' /> */}
            </Grid>
          </Card>
        </GridItem>
        
         {/*
        <GridItem>
          <Card maxW={{ sm: "320px", md: "1000px" }}>
            <AssetViewer />
          </Card>
        </GridItem>
        <GridItem>
          <Card>
            <Flex direction="column" mb="40px" p="28px 0px 0px 22px">
              <Text color="gray.400" fontSize="sm" fontWeight="bold" mb="6px">
                PERFORMANCE
              </Text>
              <Text color={textColor} fontSize="lg" fontWeight="bold">
                Total orders
              </Text>
            </Flex>
            <Box minH="520px">
              <BarChart
                chartData={barChartData}
                chartOptions={barChartOptions}
              />
            </Box>
          </Card>
        </GridItem> */}
 
        <Card
          bg={
            colorMode === "dark"
              ? "blue.800"
              : "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
          }
          p="0px"
          maxW={{ sm: "320px", md: "100%" }}
        >
          <Flex direction="column" mb="40px" p="28px 0px 0px 22px">
            <Text color="#fff" fontSize="lg" fontWeight="bold" mb="6px">
            Asset Acquisition per Year
            </Text>
            <Text color="#fff" fontSize="sm">
              <Text as="span" color="green.400" fontWeight="bold">
              { " Previous Year "}
              </Text>
              {"(  " } {values.prevyear} {"  )"}  
            </Text>
          </Flex>
          <Box minH="300px">
            <CChartLine
              style={{ height: "300px", marginTop: "40px" }}
              data={{
                labels: purchases?.map(
                  (purchase) => purchase.MonthName
                ),
                datasets: [
                  {
                    label: "Asset Acquisition",
                    // backgroundColor: hexToRgba(
                    //   getStyle("success"),
                    //   10
                    // ),
                      backgroundColor:  "#8080ff",
                    borderColor: getStyle("success"),
                    pointHoverBackgroundColor:
                      getStyle("success"),
                    borderWidth: 2,
                    data: purchases?.map(
                      (purchase) =>
                        purchase.Acquired
                    ),
                    fill: true,
                  },
                  {
                    label: "Supplier",
                    backgroundColor: "#0080ff",
                    borderColor: getStyle("warning"),
                    pointHoverBackgroundColor:
                      getStyle("warning"),
                    borderWidth: 2,
                    data: purchases?.map(
                      (purchase) =>
                        purchase.supplier
                    ),
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      drawOnChartArea: false,
                    },
                  },
                  y: {
                    ticks: {
                      beginAtZero: true,
                      maxTicksLimit: 5,
                      stepSize: Math.ceil(250 / 5),
                      max: 250,
                    },
                  },
                },
                elements: {
                  line: {
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                    hoverBorderWidth: 3,
                  },
                },
              }}
            />

          </Box>
        </Card>
        <Card p="0px" maxW={{ sm: "320px", md: "100%" }}   >
          <Flex direction="column" mb="40px" p="28px 0px 0px 22px">
            {/* <Text color="gray.400" fontSize="sm" fontWeight="bold" mb="6px">
            Asset Deploy per Department
            </Text> */}
            <Text color={textColor} fontSize="lg" fontWeight="bold">
            Category
            </Text>
          </Flex>
          <Card p="0px" maxW={{ sm: "20px", md: "100%" }} maxH={"300px"} > 
            <Box maxH={"300px"}  overflowY="auto" >
              <CChartPie 
                data={{
                  labels: 
                  category?.map(
                    (categ) => categ.Category
                  ),
                  datasets: [
                    {
                      data: category?.map(
                        (categ) =>
                        // categ.Category + " ( " +  categ.Current + " )"
                        categ.Current 
                      ),
                      backgroundColor: category?.map(
                        (categ) => randomColor() 
                      ),
                      //hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    },
                  ],
                }}
              />
           </Box>
          </Card>
        </Card>
        <GridItem colSpan={2}>
          <Card mb="30px">
            <AssetViewer />
          </Card>
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
            <Text fontSize="lg" color={textColor} fontWeight="bold">
                Checkout
              </Text>
            <ITCheckoutViewer />
          </Card>
          
          </Flex>
        </Card>
        <Card p="0px" maxW={{ sm: "320px", md: "100%" }}>
          <Flex direction="column">
            <Flex align="center" justify="space-between" p="22px">
              <Text fontSize="lg" color={textColor} fontWeight="bold">
                Social traffic
              </Text>
              <Button variant="primary" maxH="30px">
                SEE ALL
              </Button>
            </Flex>
          </Flex>
          <Box overflow={{ sm: "scroll", lg: "hidden" }}>
            <Table>
              <Thead>
                <Tr bg={tableRowColor}>
                  <Th color="gray.400" borderColor={borderColor}>
                    Referral
                  </Th>
                  <Th color="gray.400" borderColor={borderColor}>
                    Visitors
                  </Th>
                  <Th color="gray.400" borderColor={borderColor}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {socialTraffic.map((el, index, arr) => {
                  return (
                    <Tr key={index}>
                      <Td
                        color={textTableColor}
                        fontSize="sm"
                        fontWeight="bold"
                        borderColor={borderColor}
                        border={index === arr.length - 1 ? "none" : null}
                      >
                        {el.referral}
                      </Td>
                      <Td
                        color={textTableColor}
                        fontSize="sm"
                        borderColor={borderColor}
                        border={index === arr.length - 1 ? "none" : null}
                      >
                        {el.visitors}
                      </Td>
                      <Td
                        color={textTableColor}
                        fontSize="sm"
                        borderColor={borderColor}
                        border={index === arr.length - 1 ? "none" : null}
                      >
                        <Flex align="center">
                          <Text
                            color={textTableColor}
                            fontWeight="bold"
                            fontSize="sm"
                            me="12px"
                          >{`${el.percentage}%`}</Text>
                          <Progress
                            size="xs"
                            colorScheme={el.color}
                            value={el.percentage}
                            minW="120px"
                          />
                        </Flex>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Box>
        </Card>
      </Grid>
    </Flex>
  );
}