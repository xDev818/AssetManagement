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
  CChart,
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
  const [condition,setCondition] = useState([])
  const [location,setLocation] = useState([])

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
          setLocation(response.result)

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

  return (

    <>
      <Grid
        templateAreas={`"header header"
                        "nav main"
                        "nav footer"`}
        gridTemplateRows={'50px 1fr 30px'}
        gridTemplateColumns={'315px 1fr'}
        h='200px'
        gap='1'
        color='blackAlpha.700'
        fontWeight='bold'
      >
        <GridItem bg='navy.800' area={'header'} >
          <center alignContent={"center"}>
            <Card justifyItems={"center"} bg='navy.800' >
            <Box height={"5px"} justifyContent={"space-between"} >
              <Text fontSize="30px" color={textColorDue} fontWeight="bold" alignContent={"center"}>
               OVERVIEW
              </Text>
          </Box>

            </Card>
          </center>
        </GridItem>
         <GridItem  area={'nav'} height={"800px"} width={"315px"} >
          <Card  maxW={{ sm: "315px", md: "100%" }} >
         
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
            <Box  maxHeight="440px" overflowY={"auto"} >
              <TableContainer >
                <Table >
                  <Thead >
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
                            log?.ImageFile
                          ? 
                          `http://localhost:5001/image/static/${log?.ImageFile}`
                            
                          :  imgDefault
                          }  
                        />
                        {/* {log.DisplayName} */}
                      </Td>
                      <Td>
                      {log.Department}
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
        </GridItem>

        <GridItem   area={'main'} width={"1250px"} >
          <SimpleGrid minChildWidth='315px' spacing='1px'>
          
            <Box  maxW={{ sm: "315px", md: "100%" }}  bgGradient='linear(to-r, red.800, red.300, pink.100)'  >
            <Flex direction="column">
              <Flex align="center" justify="space-between" p="10px">
                <Text fontSize="20px" color={textColorDue} fontWeight="bold">
                  Depreciated
                </Text>
                <Button height={"40px"}>
                  <Text fontSize="20px" color={'navy'} fontWeight="bold">
                    200
                  </Text>
                </Button>
              </Flex>
            </Flex>
            <Flex direction="column" >
              <Flex align="center" justify="space-between" p="10px">
                <Text fontSize="20px" color={textColorDue} fontWeight="bold">
                  Depreciated this Month
                </Text>
                <Button height={"40px"} >
                  <Text fontSize="20px" color={'navy'} fontWeight="bold">
                    25
                  </Text>
                </Button>
              </Flex>
            </Flex>
            <Flex direction="column" >
              <Flex align="center" justify="space-between" p="10px">
                <Text fontSize="20px" color={textColorDue} fontWeight="bold">
                  Due this Year
                </Text>
                <Button height={"40px"} >
                  <Text fontSize="20px" color={'navy'} fontWeight="bold">
                    1500
                  </Text>
                </Button>
              </Flex>
            </Flex>
            <Flex direction="column" >
              <Flex align="center" justify="space-between" p="10px">
                <Text fontSize="20px" color={textColorDue} fontWeight="bold">
                  Due Next Month
                </Text>
                <Button height={"40px"} >
                  <Text fontSize="20px" color={'navy'} fontWeight="bold">
                    3000
                  </Text>
                </Button>
              </Flex>
            </Flex>
            </Box>
          
          <Card  maxW={{ sm: "315px", md: "100%" }} >
         
            <Flex direction="column">
              <Flex align="center" justify="space-between" p="10px">
                <Text fontSize="lg" color={textColor} fontWeight="bold">
                 Asset Movement
                </Text>
                <Button variant="primary" maxH="30px">
                  SEE ALL
                </Button>
              </Flex>
            </Flex>
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

          <Card  maxW={{ sm: "315px", md: "100%" }} >
            <Flex direction="column">
                <Flex align="center" justify="space-between" p="10px">
                  <Text fontSize="lg" color={textColor} fontWeight="bold">
                  Asset Per Department
                  </Text>
                  <Button variant="primary" maxH="30px">
                    SEE ALL
                  </Button>
                </Flex>
            </Flex>
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

          <Card  maxW={{ sm: "315px", md: "100%" }} >
            <Flex direction="column">
                  <Flex align="center" justify="space-between" p="10px">
                    <Text fontSize="lg" color={textColor} fontWeight="bold">
                    Asset Status
                    </Text>
                    <Button variant="primary" maxH="30px">
                      SEE ALL
                    </Button>
                  </Flex>
            </Flex>
              <CChartBar
                  data={{
                            labels: assetstatus?.map(
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

          <Card   maxW={{ sm: "315px", md: "100%" }} >
          <Flex direction="column">
                <Flex align="center" justify="space-between" p="10px">
                  <Text fontSize="lg" color={textColor} fontWeight="bold">
                  Asset Category
                  </Text>
                  <Button variant="primary" maxH="30px">
                    SEE ALL
                  </Button>
                </Flex>
          </Flex>
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

          <Card  maxW={{ sm: "315px", md: "100%" }} >
          <Flex direction="column">
                <Flex align="center" justify="space-between" p="10px">
                  <Text fontSize="lg" color={textColor} fontWeight="bold">
                  Asset Deployed
                  </Text>
                  <Button variant="primary" maxH="30px">
                    SEE ALL
                  </Button>
                </Flex>
            </Flex>
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
            
          </SimpleGrid>

        </GridItem>
       
        <GridItem pl='2' bg='blue.300' area={'footer'} >
        </GridItem> 
       
{/* 
        <GridItem bg='blue.300' area={'footer'} height={"330px"}>
          <SimpleGrid minChildWidth='315px' spacing='1px'>
            <Card  maxW={{ sm: "250px", md: "100%" }} >
              <TableContainer >
                <Table >
                  <Thead position="sticky"  top={0}>
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
            <Card  maxW={{ sm: "250px", md: "100%" }} bg="yellow">
              {/* <TableContainer >
                <Table >
                  <Thead position="sticky"  top={0}>
                    <Tr >
                      <Th>Locations</Th>
                      <Th>Total</Th>
                      
                    </Tr>
                  </Thead>
                  <Tbody>
                    {location.map((loc) => (

                    <Tr key={loc.locationid}>
                      
                      <Td>
                        {loc.name}
                      </Td>
                      <Td>

                        {loc.count}
                      </Td>
                    </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer> */}
            {/* </Card> */}
          {/* </SimpleGrid> */}
        {/* </GridItem>  */}
      </Grid>
    </>
  );
}