// Chakra imports
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Spacer,
  Text,
  useColorMode,
  useColorModeValue,
  useToast
} from "@chakra-ui/react";
// Assets
import BackgroundCard1 from "assets/img/BackgroundCard1.png";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import IconBox from "components/Icons/IconBox";
import { MastercardIcon, VisaIcon } from "components/Icons/Icons";
import { HSeparator } from "components/Separator/Separator";
import BillingRow from "components/Tables/BillingRow";
import InvoicesRow from "components/Tables/InvoicesRow";
import TransactionRow from "components/Tables/TransactionRow";
import React,{useState,useEffect} from "react";
import {
  FaPaypal,
  FaPencilAlt,
  FaRegCalendarAlt,
  FaWallet,
} from "react-icons/fa";
import { RiMastercardFill } from "react-icons/ri";
import {
  billingData,
  invoicesData,
  newestTransactions,
  olderTransactions,
} from "variables/general";

import axios from "axios";
import decoder from "jwt-decode";

import Logs from "components/Utils/logs_helper";

import sampleImage from "../../assets/img/avatars/avatar1.png"
import { Link as Anchor } from "react-router-dom";

function DashboardUsers() {
  // Chakra color mode
  const iconBlue = useColorModeValue("blue.500", "blue.500");
  
  const borderColor = useColorModeValue("#dee2e6", "transparent");
  const { colorMode } = useColorMode();


  const toast = useToast()
  
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    location: "",
    department: "",
    group: "",
    image: ""

  });
  // const [userdata, setUser] = useState({
  //   userID: "",
  // });

 
  useEffect( async () => {

    var userid = ""
    try {
      const tokenStorage = localStorage.getItem("token");
      const tokenDecoded = decoder(tokenStorage);
       userid = tokenDecoded.result[0].userDisplayID

      const success = await axios.get("/dashboard/users-viewProfile/" + userid)

        .then((res) => {
          
          setProfile( {...profile,
            name: res.data.result[0].FullName,
            email: res.data.result[0].email,
            location: res.data.result[0].Location,
            department: res.data.result[0].departmentName,
            group: res.data.result[0].categoryName,
            image: res.data.result[0].imgFilename, 
          });

         
        })
        .catch((err) => {
         
          const useEffectLogs = new Logs(
            "Error",
            "DashBoardUsers",
            "Function /LoadAProfile",
            "DashBoardUsers  " +  err.response.data.message,
           userid
          );

          useEffectLogs.insertLogs(useEffectLogs)

        });
    } catch (err) {
      const useEffectLogs = new Logs(
        "Error",
        "DashBoardUsers",
        "Function /LoadAProfile",
        "DashBoardUsers  " +  err.response.data.message,
       userid
      );

      useEffectLogs.insertLogs(useEffectLogs)
    }
  }, []);

 
  const graphCardBg = '#e6f2ff'
  const textColor = "#00334d"

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Grid templateColumns={{ sm: "1fr", lg: "2fr 1.2fr" }} templateRows='1fr' >
        <Card bg={graphCardBg}>
          <Grid
            templateColumns={{
              sm: "1fr",
              md: "1fr 1fr",
              xl: "1fr 1fr 1fr 1fr",
            }}
            templateRows={{ sm: "auto auto auto", md: "1fr auto", xl: "1fr" }}
            gap='26px'>
            <Card
              // backgroundImage={
              //   colorMode === "dark"
              //     ? "linear-gradient(180deg, #3182CE 0%, #63B3ED 100%)"
              //     : BackgroundCard1
              // }
              bg={'white'}
             // backgroundRepeat='no-repeat'
             // background='cover'
             // bgPosition='10%'
              p='16px'
              h={{ sm: "220px", xl: "100%" }}
              gridArea={{ md: "1 / 1 / 2 / 3", xl: "1 / 1 / 2 / 3" }}>
              <Grid templateColumns={{ sm: "1fr", xl: "repeat(3, 1fr)" }} gap='22px'>



              {/* <CardBody h='100%' w='100%' >

                <Flex
                  direction='column'
                  color='white'
                  h='100%'
                  p='0px 10px 20px 10px'
                  w='100%'>
                  <Flex justify='space-between' align='center'>
                    <Text fontSize='md' fontWeight='bold' color={textColor} textTransform={'uppercase'}>
                      Profile Information
                    </Text>
                    <Avatar
                      src={sampleImage}
                     size="xl"
                      color='gray.400'
                    />
                  </Flex>
                  <Spacer />
                  <Flex direction='column'>
                   
                      <Text
                        fontSize='sm'
                        letterSpacing='1px'
                        fontWeight='bold'
                        color={textColor}
                        textTransform={'uppercase'}
                        
                        >
                         
                        Name : { ' '}
                        
                      </Text>
                    
                    <Text  fontSize='sm' fontWeight='bold' textTransform={'initial'}>
                        {'Dev'}
                        </Text> 
                    <Flex mt='14px'>
                      <Flex direction='column' me='34px'>
                        <Text fontSize='xs'>VALID THRU</Text>
                        <Text fontSize='xs' fontWeight='bold'>
                          05/24
                        </Text>
                      </Flex>
                      <Flex direction='column'>
                        <Text fontSize='xs'>CVV</Text>
                        <Text fontSize='xs' fontWeight='bold'>
                          09X
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </CardBody> */}
                      <Card p='0px' my={{ sm: "24px", xl: "0px" }}  width={'22vw'} h={'32vh'} > 
          <CardHeader p='12px 5px' mb='12px'>
            <Text fontSize='lg' color={textColor} fontWeight='bold' textTransform={'uppercase'}>
              Profile Information
            </Text>
            <HSeparator  />
          </CardHeader>
          {/* <CardBody px='5px'> */}
            <Flex direction='column' >
              {/* <Text fontSize='md' color='gray.400' fontWeight='400' mb='30px'>
                Hi, I’m Esthera Jackson, Decisions: If you can’t decide, the
                answer is no. If two equally difficult paths, choose the one
                more painful in the short term (pain avoidance is creating an
                illusion of equality).
              </Text> */}

             

                  <Flex align='center' mb='18px'>
                    <Text
                      fontSize='md'
                      color={textColor}
                      fontWeight='bold'
                      me='10px'>
                      Full Name:{" "}
                    </Text>        
                    <Text fontSize='md' color='gray.400' fontWeight='400'>
                      {profile.name}
                    </Text>      
                  </Flex>

                  <Flex align='center' mb='18px'>
                    <Text
                      fontSize='md'
                      color={textColor}
                      fontWeight='bold'
                      me='10px'>
                      Email:{" "}
                    </Text>        
                    <Text fontSize='md' color='gray.400' fontWeight='400'>
                      {profile.email}
                    </Text>      
                  </Flex>


                  <Flex align='center' mb='18px'>
                    <Text
                      fontSize='md'
                      color={textColor}
                      fontWeight='bold'
                      me='10px'>
                      Department:{" "}
                    </Text>        
                    <Text fontSize='md' color='gray.400' fontWeight='400'>
                      {profile.department}
                    </Text>      
                  </Flex>            
                               

            
              <Flex align='center' mb='18px'>
                <Text
                  fontSize='md'
                  color={textColor}
                  fontWeight='bold'
                  me='10px'>
                  Group:{" "}
                </Text>
                <Text fontSize='md' color='gray.400' fontWeight='400'>
                      {profile.group}
                    </Text> 
                <Flex>
         
                  {/* <Link
                    href='#'
                    color={iconColor}
                    fontSize='lg'
                    me='10px'
                    _hover={{ color: "blue.500" }}>
                    <Icon as={FaInstagram} />
                  </Link>
                  <Link
                    href='#'
                    color={iconColor}
                    fontSize='lg'
                    me='10px'
                    _hover={{ color: "blue.500" }}>
                    <Icon as={FaTwitter} />
                  </Link> */}
                </Flex>
              </Flex>
             
            </Flex>
          {/* </CardBody> */}
         </Card> 

              </Grid>
            </Card>
            <Card p='16px' display='flex' align='center' justify='center' >
              <CardBody>
                <Flex direction='column' align='center' w='100%' py='14px'>
                <Avatar
                      src={
                        profile.image
                        ?
                         `http://localhost:5001/image/static/${profile?.image}`
                        : sampleImage
                      }
                     size="1xl"
                      color='gray.400'
                    />
                  <Flex
                    direction='column'
                    m='14px'
                    justify='center'
                    textAlign='center'
                    align='center'
                    w='100%'>
                    {/* <Text fontSize='md' color={textColor} fontWeight='bold'>
                      Salary
                    </Text>
                    <Text
                      mb='24px'
                      fontSize='xs'
                      color='gray.400'
                      fontWeight='semibold'>
                      Belong Interactive
                    </Text>
                    <HSeparator /> */}
                    {/* <Avatar
                      src={sampleImage}
                     size="xl"
                      color='gray.400'
                    /> */}
                  </Flex>
                  <Anchor
                   // href='#'
                    //color={iconColor}
                   
                    me='10px'
                    _hover={{ color: "blue.500" }}>
                      <Text
                        fontSize='sm'
                        color={'gray.400'}
                        fontWeight='bold'
                        me='10px'>
                          {profile?.image
                          ? 'Superb'
                          : 'Need to update'
                          }
                       
                      </Text>
                  </Anchor>
                </Flex>
              </CardBody>
            </Card>
            <Card p='16px' display='flex' align='center' justify='center' >
              <CardBody>
                <Flex direction='column' align='center' w='100%' py='14px'>
                <Avatar
                      // src={
                      //   profile.image
                      //   ?
                      //    `http://localhost:5001/image/static/${profile?.image}`
                      //   : sampleImage
                      // }
                      src={sampleImage}
                     size="1xl"
                      color='gray.400'
                    />
                  <Flex
                    direction='column'
                    m='14px'
                    justify='center'
                    textAlign='center'
                    align='center'
                    w='100%'>
                    {/* <Text fontSize='md' color={textColor} fontWeight='bold'>
                      Salary
                    </Text>
                    <Text
                      mb='24px'
                      fontSize='xs'
                      color='gray.400'
                      fontWeight='semibold'>
                      Belong Interactive
                    </Text>
                    <HSeparator /> */}
                    {/* <Avatar
                      src={sampleImage}
                     size="xl"
                      color='gray.400'
                    /> */}
                  </Flex>
                  <Anchor
                   // href='#'
                    //color={iconColor}
                   
                    me='10px'
                    _hover={{ color: "blue.500" }}>
                      <Text
                        fontSize='sm'
                        color={'gray.400'}
                        fontWeight='bold'
                        me='10px'>
                          Department
                       
                      </Text>
                  </Anchor>
                </Flex>
              </CardBody>
            </Card>
          </Grid>
          <Card p='16px' mt='24px'>
            <CardHeader>
              <Flex
                justify='space-between'
                align='center'
                minHeight='60px'
                w='100%'>
                <Text fontSize='lg' color={textColor} fontWeight='bold'>
                  Payment Method
                </Text>
                <Button variant={colorMode === "dark" ? "primary" : "dark"}>
                  ADD A NEW CARD
                </Button>
              </Flex>
            </CardHeader>
            <CardBody  >
              <Flex
                direction={{ sm: "column", md: "row" }}
                align='center'
                w='100%'
                justify='center'
                py='1rem'>
                <Flex
                  p='1rem'
                  bg={colorMode === "dark" ? "navy.900" : "transparent"}
                  borderRadius='15px'
                  width='100%'
                  //border='1px solid'
                  borderColor={borderColor}
                  align='right'
                  mb={{ sm: "24px", md: "0px" }}
                  me={{ sm: "0px", md: "24px" }}>
                  <IconBox me='10px' w='25px' h='22px'>
                    <MastercardIcon w='100%' h='100%' />
                  </IconBox>
                  <Text color='gray.400' fontSize='md' fontWeight='semibold'>
                    7812 2139 0823 XXXX
                  </Text>
                  <Spacer />
                  <Button p='0px' w='16px' h='16px' variant='no-effects'>
                    <Icon
                      as={FaPencilAlt}
                      color={colorMode === "dark" && "white"}
                    />
                  </Button>
                </Flex>
                <Flex
                  p='16px'
                  bg={colorMode === "dark" ? "navy.900" : "transparent"}
                  borderRadius='15px'
                  width='100%'
                  border='1px solid'
                  borderColor={borderColor}
                  align='center'>
                  <IconBox me='10px' w='25px' h='25px'>
                    <VisaIcon w='100%' h='100%' />
                  </IconBox>
                  <Text color='gray.400' fontSize='md' fontWeight='semibold'>
                    7812 2139 0823 XXXX
                  </Text>
                  <Spacer />
                  <Button
                    p='0px'
                    bg='transparent'
                    w='16px'
                    h='16px'
                    variant='no-effects'>
                    <Icon
                      as={FaPencilAlt}
                      color={colorMode === "dark" && "white"}
                    />
                  </Button>
                </Flex>
              </Flex>
            </CardBody>
          </Card>
        </Card>
        <Card
          p='22px'
          my={{ sm: "24px", lg: "0px" }}
          ms={{ sm: "0px", lg: "24px" }}>
          <CardHeader>
            <Flex justify='space-between' align='center' mb='1rem' w='100%'>
              <Text fontSize='lg' color={textColor} fontWeight='bold'>
                Invoices
              </Text>
              <Button
                variant='outlined'
                color={colorMode === "dark" && "white"}
                borderColor={colorMode === "dark" && "white"}
                _hover={colorMode === "dark" && "none"}
                minW='110px'
                maxH='35px'>
                VIEW ALL
              </Button>
            </Flex>
          </CardHeader>
          <CardBody>
            <Flex direction='column' w='100%'>
              {invoicesData.map((row, idx) => {
                return (
                  <InvoicesRow
                    date={row.date}
                    code={row.code}
                    price={row.price}
                    logo={row.logo}
                    format={row.format}
                    key={idx}
                  />
                );
              })}
            </Flex>
          </CardBody>
        </Card>
      </Grid>
      <Grid templateColumns={{ sm: "1fr", lg: "1.6fr 1.2fr" }}>
        <Card my={{ lg: "24px" }} me={{ lg: "24px" }}>
          <Flex direction='column'>
            <CardHeader py='12px'>
              <Text color={textColor} fontSize='lg' fontWeight='bold'>
                Billing Information
              </Text>
            </CardHeader>
            <CardBody>
              <Flex direction='column' w='100%'>
                {billingData.map((row, key) => {
                  return (
                    <BillingRow
                      name={row.name}
                      company={row.company}
                      email={row.email}
                      number={row.number}
                      key={key}
                    />
                  );
                })}
              </Flex>
            </CardBody>
          </Flex>
        </Card>
        <Card my='24px' ms={{ lg: "24px" }}>
          <CardHeader mb='12px'>
            <Flex direction='column' w='100%'>
              <Flex
                direction={{ sm: "column", lg: "row" }}
                justify={{ sm: "center", lg: "space-between" }}
                align={{ sm: "center" }}
                w='100%'
                my={{ md: "12px" }}>
                <Text
                  color={textColor}
                  fontSize={{ sm: "lg", md: "xl", lg: "lg" }}
                  fontWeight='bold'>
                  Your Transactions
                </Text>
                <Flex align='center'>
                  <Icon
                    as={FaRegCalendarAlt}
                    color='gray.400'
                    fontSize='md'
                    me='6px'></Icon>
                  <Text color='gray.400' fontSize='sm' fontWeight='semibold'>
                    23 - 30 March 2022
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody>
            <Flex direction='column' w='100%'>
              <Text
                color='gray.400'
                fontSize={{ sm: "sm", md: "md" }}
                fontWeight='semibold'
                my='12px'>
                NEWEST
              </Text>
              {newestTransactions.map((row, idx) => {
                return (
                  <TransactionRow
                    name={row.name}
                    logo={row.logo}
                    date={row.date}
                    price={row.price}
                    key={idx}
                  />
                );
              })}
              <Text
                color='gray.400'
                fontSize={{ sm: "sm", md: "md" }}
                fontWeight='semibold'
                my='12px'>
                OLDER
              </Text>
              {olderTransactions.map((row, idx) => {
                return (
                  <TransactionRow
                    name={row.name}
                    logo={row.logo}
                    date={row.date}
                    price={row.price}
                    key={idx}
                  />
                );
              })}
            </Flex>
          </CardBody>
        </Card>
      </Grid>
    </Flex>
  );
}

export default DashboardUsers;
