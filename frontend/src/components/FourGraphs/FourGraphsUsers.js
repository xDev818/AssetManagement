/* -------------------------------------------------------------------------- */
/*                                See Info Below                              */
/*               Write Updates , Activities and Comments Below                */
/*                              Before Coding                                 */
/* -------------------------------------------------------------------------- */

/* 


    Date : 10 / 24 / 23
    Author : Nole
    Activities
    Purpose : 
      For Common User

*/
import Logs from "components/Utils/logs_helper";
import { useEffect, useState } from "react";
import axios from "axios";
import decoder from "jwt-decode";

import {
  Box,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import IconBox from "components/Icons/IconBox";
import React from "react";
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
} from "components/Icons/Icons.js";

//import Performance from "components2/Graphs/Dashboard/Performance";


import useFourGraphsStore from "store/useFourGraphsStore";
import assetico from "../../assets/img/asset.ico"


//import Performance from "components2/Graphs/Dashboard/Performance";

import BarChart from "components/Charts/BarChart";
import { barChartData } from "variables/charts";
import { barChartOptions } from "variables/charts";

export default function FourGraphsUsers() {
  const iconBlue = useColorModeValue("blue.500", "blue.500");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();


  const { amount, getAmount } = useFourGraphsStore((state) => state);

  // useEffect(async () => {
  //   const amountAssets = await getAmount("fourgraphs/total-asset-available");
  //   console.log("zx", amount);
  // }, []);


  const [userdata, setUser] = useState({
    userid: "",
  });

  const [fourgraphs, setAssetsTotal] = useState({
    amount: "",
    totalNo: "",
    available: "",
    fordeploy: "",
    //pullout: "",
    notavailable :"",
    forpullout:""
  });

  const SetUsers = async () => {
    const tokenStorage = localStorage.getItem("token");
    const tokenDecoded = decoder(tokenStorage);

    setUser({
      ...userdata,

      userid: tokenDecoded.result[0].userDisplayID,
    });
  };

  useEffect(async () => {
    try {

      SetUsers();
      var amount = "";
      //var total = ""
      var totalNo = "";
      var available = "";
      var fordeploy = "";
      //var pullout = "";
      var notAvailable = ""
      var ForPullout = ""

     const successAmount = await axios

        .get("/fourgraphs/totalAmount-asset-available")


        .then((res) => {
          amount = res.data.result[0].Amount;
        })
        .catch((err) => {
          const InsertLogs = new Logs(
            "Error",
            "PositionViewer",
            "Function /LoadAllPositions",
            "LoadAllPositions",
            userdata.userid
          );
        });

      const successTotal = await axios
        .get("/fourgraphs/totalno-asset-deployed")
        .then((res) => {
          totalNo = res.data.result[0].Count;
        })
        .catch((err) => {
          const InsertLogs = new Logs(
            "Error",
            "PositionViewer",
            "Function /LoadAllPositions",
            "LoadAllPositions",
            userdata.userid
          );
        });

      const successAvailable = await axios
        .get("/fourgraphs/totalno-asset-available")
        .then((res) => {
          available = res.data.result[0].Available;
        })
        .catch((err) => {
          const InsertLogs = new Logs(
            "Error",
            "PositionViewer",
            "Function /LoadAllPositions",
            "LoadAllPositions",
            userdata.userid
          );
        });

      /*
       For Deploy  
      */
      const successForDeploy = await axios
        .get("/fourgraphs/totalno-asset-fordeploy")
        .then((res) => {
          fordeploy = res.data.result[0].ForDeploy;
         
        })
        .catch((err) => {
          const InsertLogs = new Logs(
            "Error",
            "PositionViewer",
            "Function /LoadAllPositions",
            "LoadAllPositions",
            userdata.userid
          );
        });

      // const successPullout = await axios
      //   .get("/fourgraphs/totalno-asset-pullout")
      //   .then((res) => {
      //     pullout = res.data.result[0].Pullout;
         
      //   })
      //   .catch((err) => {
      //     const InsertLogs = new Logs(
      //       "Error",
      //       "PositionViewer",
      //       "Function /LoadAllPositions",
      //       "LoadAllPositions",
      //       userdata.userid
      //     );
      //   });

        const successNotAvailable = await axios
        .get("/fourgraphs/totalno-asset-Not-available")
        .then((res) => {
          notAvailable = res.data.result[0].NotAvailable;
         
        })
        .catch((err) => {
          const InsertLogs = new Logs(
            "Error",
            "PositionViewer",
            "Function /LoadAllPositions",
            "LoadAllPositions",
            userdata.userid
          );
        });

        const successForPullout = await axios
        .get("/fourgraphs/totalno-asset-For-Pullout")
        .then((res) => {
          ForPullout = res.data.result[0].ForPullout;
         
        })
        .catch((err) => {
          const InsertLogs = new Logs(
            "Error",
            "PositionViewer",
            "Function /LoadAllPositions",
            "LoadAllPositions",
            userdata.userid
          );
        });


      setAssetsTotal({
              ...fourgraphs,
              amount: amount,
         //     total : total,
              totalNo: totalNo,
              available: available,
              fordeploy: fordeploy,
             // pullout: pullout,
              notavailable: notAvailable,
              forpullout: ForPullout
            });

    } catch (err) {
      alert(err);
    }
  }, []);

  //console.log("four", fourgraphs);

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, xl: 4 }}
      spacing="24px"
      mb="0"
      display={{ base: "none", md: "grid" }}
    >
      <Card minH="125px"  bgGradient='linear(to-bl, red.500, red.300, red.100)'>
        <Flex direction="column">
          <Flex
            flexDirection="row"
            align="center"
            justify="center"
            w="100%"
            mb="25px"
          >
            <Stat me="auto">
              <StatLabel
                fontSize="md"
                color="white"
                fontWeight="bold"
                textTransform="uppercase"
              >
                Department Assets 
              
              </StatLabel>
              
              <Box justifyItems={"center"} >
              <Flex>
                <StatNumber fontSize="30px" color={textColor} fontWeight="bold" alignContent={"center"}>
                  {/* {fourgraphs.amount} */}
                  15
                </StatNumber>
              </Flex>
              </Box>
            
            </Stat>

            <Menu>
              <MenuButton>
                <IconBox
                  borderRadius="50%"
                  as="box"
                  h={"45px"}
                  w={"45px"}
                  bg={"white"}
                  cursor="pointer"
                >
                  <Image src={assetico}  h={"24px"} w={"24px"} color={iconBlue} />


                   {/* <WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} /> */}
                </IconBox>
                
              </MenuButton>
              <MenuList>
                <MenuItem colorScheme="twitter">PDF </MenuItem>
                <MenuItem colorScheme="twitter">Excel</MenuItem>
                <MenuItem colorScheme="twitter" onClick={onOpen}>
                  Show Graph
                </MenuItem>
              </MenuList>
            </Menu>
           
          </Flex>
        </Flex>
        {/* performance */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent w="100%" h="500px">
            <ModalHeader>Graph</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box minH="300px" minW={"100%"}>
                <BarChart
                  chartData={barChartData}
                  chartOptions={barChartOptions}
                />
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button>PDF</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* performance */}
      </Card>
      <Card minH="125px" bgGradient='linear(to-bl, blue, blue.500, blue.100)'>
        <Flex direction="column">
          <Flex
            flexDirection="row"
            align="center"
            justify="center"
            w="100%"
            mb="25px"
          >
            <Stat me="auto">
              <StatLabel
                fontSize="md"
                color="white"
                fontWeight="bold"
                textTransform="uppercase"
              >
                No. of Assets Deployed
              </StatLabel>
              <Flex>
                <StatNumber fontSize="30px" color={textColor} fontWeight="bold">
                  {fourgraphs.totalNo}
                </StatNumber>
              </Flex>
            </Stat>
            <IconBox
              borderRadius="50%"
              as="box"
              h={"45px"}
              w={"45px"}
              bg={"white"}
            >
              <GlobeIcon h={"24px"} w={"24px"} color={iconBlue} />
            </IconBox>
          </Flex>
          <Text color="white" fontSize="sm">
            <Text as="span" color="red.400" fontWeight="bold" fontSize="30px">
              {fourgraphs.fordeploy} { "  " }
            </Text>
            Schedule For Deployment
          </Text>
        </Flex>
      </Card>
      <Card minH="125px" bgGradient='linear(to-bl, #ffcc00, #ffe066, #fff0b3)'>
        <Flex direction="column">
          <Flex
            flexDirection="row"
            align="center"
            justify="center"
            w="100%"
            mb="25px"
          >
            <Stat me="auto">
              <StatLabel
                fontSize="md"
                color="white"
                fontWeight="bold"
                textTransform="uppercase"
              >
                Available
              </StatLabel>
              <Flex>
                <StatNumber fontSize="30px" color={textColor} fontWeight="bold">
                  {fourgraphs.available}
                </StatNumber>
              </Flex>
            </Stat>
            <IconBox
              borderRadius="50%"
              as="box"
              h={"45px"}
              w={"45px"}
              bg={"white"}
            >
              <DocumentIcon h={"24px"} w={"24px"} color={iconBlue} />
            </IconBox>
          </Flex>
          <Text color="gray.400" fontSize="md">
            <Text as="span" color="red.400" fontWeight="bold" fontSize="30px">
            {fourgraphs.notavailable} { "  " }
            </Text>
            Not Available
          </Text>
        </Flex>
      </Card>
      <Card minH="125px" bgGradient='linear(to-bl, #1ab2ff, #80d4ff, #b3e6ff)'>
        <Flex direction="column">
          <Flex
            flexDirection="row"
            align="center"
            justify="center"
            w="100%"
            mb="25px"
          >
            <Stat me="auto">
              <StatLabel
                fontSize="md"
                color="white"
                fontWeight="bold"
                textTransform="uppercase"
              >
                Schedule Disposal
              </StatLabel>
              <Flex>
                <StatNumber fontSize="30px" color={textColor} fontWeight="bold">
                  20
                  {/* {fourgraphs.pullout} */}
                </StatNumber>
              </Flex>
            </Stat>
            <IconBox
              borderRadius="50%"
              as="box"
              h={"45px"}
              w={"45px"}
              bg={"white"}
            >
              <CartIcon h={"24px"} w={"24px"} color={iconBlue} />
            </IconBox>
          </Flex>
          <Text color="gray.400" fontSize="md">
            <Text as="span" color="red.400" fontWeight="bold" fontSize="30px">
            {fourgraphs.forpullout} {"  "}
            </Text>
            Schedule for Pullout
          </Text>
        </Flex>
      </Card>
    </SimpleGrid>
  );
}
