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
  AbsoluteCenter,
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
import { useStepContext } from "@mui/material";

export default function DashboardIT() {

  const [purchases,setPurchases] = useState([])
  const [deployed,setDeployed] = useState([])
  const [loginfo,setLogInfo] = useState([])
  const [assetmovement,setMovement] = useState([])
  const [assetDept,setAssetDept] = useState([])
  const [assetstatus,setStatus] = useState([])
  const [assettype,setType] = useState([])
  const [category,setCategory] = useState([])
  const [condition,setCondition] = useState([])
  const [location,setLocation] = useState([])
  const [month,setMonth] = useState("")

  const [values,setPrevYear] = useState({
    prevyear: ""
  })

  // Chakra Color Mode
  const iconBlue = useColorModeValue("blue.500", "blue.500");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColorDue = useColorModeValue("white", "white");
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
            "dashboard IT",
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
            "dashboard IT",
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
  }, [setDecode]);

  // useLayoutEffect(() => {
  //   decoded && console.log("user", decoded);
  // });
  // // End Jinshin

  useEffect( async() => {


    var amount_prevYear = "";
    var userid = ""

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let monthIndex = (new Date().getMonth());
    setMonth(monthNames[monthIndex]);
  
  
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

        /*
        Asset Condition
        */ 
        const succesCondition = await axios.get("/dashboard/asset-Condition")
  
        .then((res) => {
          setCondition(res.data.result[0])
       
        })
        .catch((err) => {
          const InsertLogs = new Logs(
            "Error",
            "Dashboard",
            "Function /dashboard/asset-Condition",
            "useEffect ( Get All Asset Condition)",
            userid
          );
        });

      /*
        Asset Locations
        */ 
        const succesLocations = await axios.get("/dashboard/asset-Locations")
       // console.log(succesLocations)
        const response = await succesLocations.data;
        //alert(response.message)
       
        if (response.message.includes("Records Found")) { 
          setLocation(response.result[0])

        } else {
          setLocation([])
          const InsertLogs = new Logs(
            "Error",
            "Dashboard",
            "Function /dashboard/asset-Locations",
            "useEffect ( Get All Asset Locations)",
            userid
          );

          InsertLogs.getLogs();
          InsertLogs.insertLogs( InsertLogs.getLogs() )
        }

    } catch(err) {
      const errorStatus = err.code;
      //alert(errorStatus)
      if (errorStatus.includes("ERR_NETWORK")) {
        const useEffectLogs = new Logs(
          "Error",
          "Dashboard",
          "Function /dashboard/asset-Locations",
          err,
          userid
        );

        useEffectLogs.getLogs();
        useEffectLogs.insertLogs( useEffectLogs.getLogs() )
        
      }

      if (errorStatus.includes("ERR_BAD_REQUEST")) {
        const useEffectLogs = new Logs(
          "Error",
          "Dashboard",
          "Function /dashboard/asset-Locations",
          err.response.data.message,
          userid
        );
        useEffectLogs.getLogs();
        useEffectLogs.insertLogs( useEffectLogs.getLogs() )

      }

    }
  
  }, [])

  const graphCardBg = '#e6f2ff'
  const textColor = "#00334d"
  const textAmount = "white"


  return (
<>
        <Grid
        
          templateAreas={`"header header"
                          "nav main"
                          "nav footer"`}
          gridTemplateRows={'50px 1fr 10px'}
          gridTemplateColumns={'315px 1fr'}
          h='200px'
          gap='5'
          color='blackAlpha.700'
          fontWeight='bold'
        >
          <GridItem pl={"4"} area={'header'} height={"50px"}>
               
              <Card  bg={graphCardBg} height={"50px"} position='relative'>
                  <AbsoluteCenter>

                  <Text fontSize="20px" color={textColor} fontWeight="bold" >
                  OVERVIEW Users
                  </Text>

                  </AbsoluteCenter>
              </Card>

   
          </GridItem>
          <GridItem pl={"2"} area={'nav'}  width={"315px"} 
          height={{
            base: "100%", // 0-48em
            md: "50%", // 48em-80em,
            xl: "25%", // 80em+
          }}
          >
          <Card  
          // height={{
          //   base: "25em", // 0-48em
          //   md: "48em", // 48em-80em,
          //   xl: "88em", // 80em+
            
          // }} 
          height="980px"
           bg="white" bg={graphCardBg}  >
            
            <Flex direction="column">
              <Flex align="center" justify="space-between" p="5px">
              <Text fontSize="sm" color={textColor} fontWeight="bold" textTransform={"uppercase"}>
                  Recent Activity
                </Text>
                <Button variant="primary" maxH="30px">
                  SEE ALL
                </Button>
              </Flex>
            </Flex>
          
          <Card  
          // height={{
          //   base: "25em", // 0-48em
          //   md: "48em", // 48em-80em,
          //   xl: "88em", // 80em+
           
          // }}
           height="900px"
           bg={'white'} >

          
              <TableContainer overflowY={"scroll"} >
                <Table >
                  <Thead position={"sticky"}  >
                    <Tr >
                      <Th>User</Th>
                      <Th>Info</Th>
                      <Th>Dept</Th>
                      {/* <Th>Date</Th> */}
                      <Th>Module</Th>
                      <Th>Desc</Th>
                    </Tr>
                  </Thead>
                  <Tbody height="880px"  >
                    {loginfo.map((log) => (

                    <Tr key={log.logID}>
                      <Td > 
                        <Avatar
                          size='sm'
                          name= {log.displayName}
                          src= {
                            log?.ImageFile
                          ? 
                          `http://localhost:5001/image/static/${log?.ImageFile}`
                            
                          :  imgDefault
                          }  
                        />
                        {/* {log.DisplayName} */}
                      </Td>
                       <Td>
                      {log.logtype}
                      </Td>
                      <Td>
                      {log.Department}
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
          </Card>
            
          
          </Card> 
          </GridItem>
          <GridItem pl={"2"}  area={'main'} >
            <SimpleGrid columns={3} spacingX='20px' spacingY='20px' minChildWidth={'315px'}>
            <Card  maxW={{ sm: "400px", md: "100%" }} bg={graphCardBg} >
              <Flex direction="column">
                <Flex align="center" justify="space-between" p="10px">
                <Text fontSize="sm" color={textColor} fontWeight="bold" textTransform={"uppercase"}>
                    Depreciated
                  </Text>
                  <Button variant="primary" maxH="30px">
                    SEE ALL
                  </Button>
                </Flex>
              </Flex>
              <Card  height={'215px'} bg={'white'} >
              <Flex direction="column">
                <Flex align="center" justify="space-between" p="5px">
                  <Text color={textColor}  fontSize="md" fontWeight="bold" textTransform={"uppercase"}>
                    Jan - {month}
                  </Text>
                  <Button variant="secondary" color={textColor} maxH="30px" >
                    
                      2700
                   
                  </Button>
                </Flex>
              </Flex>
              <Flex direction="column" >
                <Flex align="center" justify="space-between" p="5px">
                <Text color={textColor}  fontSize="md" fontWeight="bold" textTransform={"uppercase"}>
                    This Month
                  </Text>
                  <Button variant="secondary" color={textColor} maxH="30px" >
                   
                      100
                  
                  </Button>
                </Flex>
              </Flex>
              <Flex direction="column" >
                <Flex align="center" justify="space-between" p="5px">
                <Text color={textColor}  fontSize="md" fontWeight="bold" textTransform={"uppercase"}>
                   Next Month
                  </Text>
                  <Button variant="secondary" color={textColor} maxH="30px" >
                   
                      200
                   
                  </Button>
                </Flex>
              </Flex>
              <Flex direction="column" >
                <Flex align="center" justify="space-between" p="5px">
                <Text color={textColor}  fontSize="md" fontWeight="bold" textTransform={"uppercase"}>
                    This Year
                  </Text>
                  <Button variant="secondary" color={textColor} maxH="30px" >
                   
                      3000
                    
                  </Button>
                </Flex>
              </Flex>
              </Card>
            </Card>
            <Card  maxW={{ sm: "315px", md: "100%" }} bg={graphCardBg} >
            
            <Flex direction="column">
              <Flex align="center" justify="space-between" p="10px">
              <Text fontSize="sm" color={textColor} fontWeight="bold" textTransform={"uppercase"}>
                  Asset Movement
                </Text>
                <Button variant="primary" maxH="30px">
                  SEE ALL
                </Button>
              </Flex>
            </Flex>
            <Card bg={'white'} height={'215px'} overflowY={"auto"}> 
              <CChartBar
                  data={{
                            labels: assetmovement?.map(
                              (status) => 
                              status.Movement
                            ),
                            datasets: [
                              {
                                label: "Movement ",
                                backgroundColor: ["yellow","blue","red","tomato"],
                                // assetmovement?.map((status) =>
                                //   randomColor()
                                //),
                                
                                data: [354,2416,2875,506],
                                // assetmovement?.map(
                                //   (asset) => asset.total
                                // ),
                              },
                            ],
                          }}
                          // labels="Movement"
              />
              </Card>
            </Card>
              
              <Card  maxW={{ sm: "315px", md: "100%" }} bg={graphCardBg} >
                <Flex direction="column">
                    <Flex align="center" justify="space-between" p="10px">
                    <Text fontSize="sm" color={textColor} fontWeight="bold" textTransform={"uppercase"}>
                      Asset Per Department
                      </Text>
                      <Button variant="primary" maxH="30px">
                        SEE ALL
                      </Button>
                    </Flex>
                </Flex>
                <Card bg={'white'} height={'215px'} overflowY={"auto"}> 
                <CChartBar
                    data={{
                              labels: assetDept?.map(
                                (dept) => dept.shortName
                              ),
                              datasets: [
                                {
                                  label: "Departmnt ",
                                  backgroundColor: ["yellow","blue","red","tomato","orange"],
                                  // assetmovement?.map((status) =>
                                  //   randomColor()
                                  //),
                                  
                                  data: [502,2416,2875,506,300,675,764,496],
                                  // assetDept?.map(
                                  //   (asset) => asset.assetdept
                                  // ),
                                },
                              ],
                            }}
                            labels="Departmnt"
                />
              </Card>
              </Card>

              <Card  maxW={{ sm: "315px", md: "100%" }} bg={graphCardBg}>
                <Flex direction="column">
                      <Flex align="center" justify="space-between" p="10px">
                      <Text fontSize="sm" color={textColor} fontWeight="bold" textTransform={"uppercase"}>
                        Asset Status
                        </Text>
                        <Button variant="primary" maxH="30px">
                          SEE ALL
                        </Button>
                      </Flex>
                </Flex>
                <Card bg={'white'} height={'215px'} overflowY={"auto"}> 
                  <CChartBar
                      data={{
                                labels:
                                 assetstatus?.map(
                                  (stat) => stat.statusName
                                ),
                                datasets: [
                                  {
                                    label: "Status ",
                                    backgroundColor: 
                                    ["yellow","blue","red","tomato","orange"],
                                    // assetmovement?.map((status) =>
                                    //   randomColor()
                                    // ),
                                    
                                    data:
                                    // [502,2416,2875,506,300,675,764,496],
                                    assetstatus?.map(
                                      (stat) => stat.CntStatus
                                    ),
                                  },
                                ],
                              }}
                              labels="Departmnt"
                  />
                </Card>
              </Card>

              <Card   maxW={{ sm: "315px", md: "100%" }} bg={graphCardBg} >
              <Flex direction="column">
                    <Flex align="center" justify="space-between" p="10px">
                    <Text fontSize="sm" color={textColor} fontWeight="bold" textTransform={"uppercase"}>
                      Asset Category
                      </Text>
                      <Button variant="primary" maxH="30px">
                        SEE ALL
                      </Button>
                    </Flex>
              </Flex>
                <Card bg={'white'} height={'215px'} overflowY={"auto"}> 
                  <CChartBar
                        data={{
                                  labels: category?.map(
                                    (stat) => stat.Category
                                  ),
                                  datasets: [
                                    {
                                      label: "Status ",
                                      backgroundColor: 
                                      ["yellow","blue","red","tomato","orange"],
                                      // category?.map((categ) =>
                                      //   randomColor()
                                      // ),
                                      
                                      data:
                                      // [502,2416,2875,506,300,675,764,496],
                                      category?.map(
                                        (categ) => categ.Current
                                      ),
                                    },
                                  ],
                                }}
                                labels="Departmnt"
                    />
                </Card>
              </Card>

              <Card  maxW={{ sm: "315px", md: "100%" }} bg={graphCardBg}>
              <Flex direction="column">
                    <Flex align="center" justify="space-between" p="10px">
                      <Text fontSize="sm" color={textColor} fontWeight="bold" textTransform={"uppercase"}>
                      Asset Deployed
                      </Text>
                      <Button variant="primary" color={'white'} maxH="30px" >
                        SEE ALL
                      </Button>
                    </Flex>
                </Flex>
                <Card bg={'white'} height={'215px'}> 
                <CChartBar
                  data={{
                            labels: deployed?.map(
                              (dept) => dept.shortName
                            ),
                            datasets: [
                              {
                                label: "Asset Deployed",
                                backgroundColor: ["blue","tomato","turquoise","green","violet","pink"],
                                
                                //'#f87979',
                                data: deployed?.map(
                                  (asset) => asset.Count
                                ),
                              },
                            ],
                          }}
                          labels="departmentName"
                />
                </Card>
              </Card>


            </SimpleGrid>
          </GridItem>

          <GridItem   area={'footer'} height={"250px"}     >
            <SimpleGrid minChildWidth='315px' spacing='20px'  >
              <Card height={"300px"} bg={graphCardBg}  >
             

                    <Card height={"290px"} bg={'white'} overflowY="auto" > 
                    <TableContainer   >
                      <Table >
                        <Thead position="sticky" >
                          <Tr >
                            <Th>Status</Th>
                            <Th>Total</Th>
                            <Th>Percentage</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {condition.map((conditions) => (

                          <Tr key={conditions.conditionID}>
                            <Td>
                            {conditions.ConditionName}
                            </Td>
                            <Td>
                              {conditions.Count_Condition}
                            </Td>
                            <Td>
                            <Flex align="center">
                                <Text
                                  color={conditions.colorscheme}
                                  fontWeight="bold"
                                  fontSize="sm"
                                  me="12px"
                                > {`${conditions.Count_Percentage}%`}</Text>
                                <Progress
                                  size="xs"
                                  colorScheme={conditions.colorscheme}
                                  value={conditions.Count_Percentage}
                                  minW="120px"
                                />
                              </Flex>

                              
                            </Td>
                          </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                    </Card>     
              </Card>
              <Card  height={"300px"} bg={graphCardBg} >
                <Card height={"260px"} bg={'white'} > 
                  <TableContainer  bg={'white'} overflowY="auto"  >
                    <Table >
                      <Thead >
                        <Tr >
                          <Th>Locations</Th>
                          <Th>Count</Th>
                          <Th>Percentage</Th>
                          <Th>Quota</Th>
                          
                        </Tr>
                      </Thead>
                      <Tbody>
                        {location.map((loc) => (

                        <Tr key={loc.LocationID}>
                          
                          <Td>
                            {loc.LocationName}
                          </Td>
                          <Td>
                            {loc.Count_Location}
                          </Td>
                          <Td>
                          <CircularProgress value={loc.Count_Percentage} color={loc.colorscheme}>
                            <CircularProgressLabel> 
                            {`${loc.Count_Percentage}%`}
                            </CircularProgressLabel>
                          </CircularProgress>
                            {}
                          </Td>
                          <Td>
                          {loc.Quota}
                          </Td>
                        </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Card>
                </Card>
            </SimpleGrid>
          </GridItem>
        </Grid>

        </>
   
  );
}