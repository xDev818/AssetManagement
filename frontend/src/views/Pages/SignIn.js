/* 

    Date : 10 / 13 / 23
    Author : Jinshin
    Activities
    Purpose : 
      import axios from 'axios'
      import  { useState } from 'react'
      loginHandler = () => {}
      onChange={ e => setValues( { ...values, username: e.target.value } ) }
      value={ values.username }
      onChange={ e => setValues( { ...values, password: e.target.value } ) }
      value={ values.password }

 Date : 10 / 15 / 23
    Author : Nole
    Activities
    Purpose : 
      Add - import { Link as Anchor } from 'react-router-dom'
        ** Use in Signup under "Already have Account (Sign up )"

  Date : 10 / 17 / 23
    Author : John
    Activities
    Purpose : 
      Changed Background Image and sign In form

  ------------------

  Date : 10 / 17 / 23
    Author : Josh
    Activities
    Purpose : 
      Imported:
          - import OnType_Validate from "components/Utils/ontype_validate";
      Function:
          - onChange={(e) => {
              setValues({ ...values, username: e.target.value })
              OnType_Validate.username( e.currentTarget, e.target.value )
            }}
          - onChange={(e) => {
              setValues({ ...values, password: e.target.value })
              OnType_Validate.password( e.currentTarget, 'signin', e.target.value )
            }}
          - if ( response.isRegister === null || response.isRegister == 0 ) {
                  window.location.href = "/#/admin/update-profile";
                } else {
                  window.location.href = "/";
                }

  ------------

  Date : 10 / 18 / 23
    Author : Josh
    Activities
    Purpose : 
      Function:
          - useEffectLogs.insertLogs( useEffectLogs.getLogs() )
*/

import { Link as Anchor } from "react-router-dom";

import React from "react";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Icon,
  Link,
  Switch,
  Text,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
// Assets
import NewSignInImage from "assets/img/NewSignInImage.webp";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";

// Imported: Jinshin
import { useState, useRef, useEffect } from "react";
import Logs from "components/Utils/logs_helper";
import OnType_Validate from "components/Utils/ontype_validate";
import axios from "axios";
// End Jinshin

function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgForm = useColorModeValue("white", "navy.800");
  const titleColor = useColorModeValue("gray.700", "blue.500");
  const colorIcons = useColorModeValue("gray.700", "white");
  const bgIcons = useColorModeValue("trasnparent", "navy.700");
  const bgIconsHover = useColorModeValue("gray.50", "whiteAlpha.100");

  // Start: Jinshin
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const ButtonRef = useRef();

  useEffect(() => {
    try {
    const storage = localStorage;

    if (storage.getItem("token")) {
      window.location.href = "/";
    } else {
      localStorage.removeItem("token");
    }
  } catch(err) {
    alert("no token in user login")
    alert(err)
  }
  }, []);

  const loginHandler = async () => {
    const buttonStatus = ButtonRef.current;
    buttonStatus.disabled = true;

    try {
      // alert(values.username)
      // alert(values.password)
      
      const request = await axios.post("/users/login", values);

      const response = await request.data;

      if (response.message.includes("Record Found")) {
        
        localStorage.setItem("token", response.token);
        buttonStatus.disabled = false;

        if ( response.isRegister === null || response.isRegister == 1 ) {

          window.location.href = "/#/admin/update-profile";
          
        } else {

          window.location.href = "/";

        }

      }
    } catch (err) {
      const errorStatus = err.code;

      if (errorStatus.includes("ERR_NETWORK")) {
        const useEffectLogs = new Logs(
          "DB",
          "Login",
          "Function /loginHandler",
          err,
          ""
        );

        alert(useEffectLogs.getMessage());
        console.log(useEffectLogs.getLogs());
        buttonStatus.disabled = false;
      }

      if (errorStatus.includes("ERR_BAD_REQUEST")) {
        const useEffectLogs = new Logs(
          errorStatus,
          "Login",
          "Function /loginHandler",
          err.response.data.message,
          ""
        );
        useEffectLogs.getLogs();

        alert(useEffectLogs.getMessage());
        console.log(useEffectLogs.getLogs());
        buttonStatus.disabled = false;

        useEffectLogs.insertLogs( useEffectLogs.getLogs() )

      }
    }

   // console.log("asd");
  };
  // End Jinshin

  return (
    <Flex position="relative">
      <Flex
        h={{ sm: "100vh", md: "100vh", lg: "100vh" }}
        maxW="1044px"
        mx="auto"
        pt={{ md: "0px" }}
        flexDirection={{ base: "column" }}
      >
        <Flex w="100%" h="100%" mb="60px" mt={{ base: "50px", md: "20px" }}>
          <Flex
            zIndex="2"
            direction="column"
            w="445px"
            h="622"
            background="transparent"
            mx={{ base: "100px" }}
            m={{ base: "20px", md: "auto" }}
            bgImage={NewSignInImage}
            bgRepeat="no-repeat"
            bgSize="cover"
            display={{ base: "none", md: "flex" }}

            // boxShadow={useColorModeValue(
            //   "0px 5px 14px rgba(0, 0, 0, 0.05)",
            //   "unset"
            // )}
          >
            <Box w="100%" h="100%" bgSize="cover" bg="blackAlpha.600">
              <Flex justifyContent="center" alignItems="center" h="100%">
                <Text
                  zIndex={10}
                  color="white"
                  align="center"
                  px={18}
                  fontWeight="semibold"
                >
                  Asset management Corporation
                </Text>
              </Flex>
            </Box>
          </Flex>
          <Flex
            zIndex="2"
            direction="column"
            w="445px"
            h={{ base: "700px", md: "auto" }}
            borderRadius={{ base: 10, md: 0 }}
            background="transparent"
            p="40px"
            mx={{ base: "100px" }}
            m={{ base: "10px", md: "auto" }}
            bg={bgForm}
            // boxShadow={useColorModeValue(
            //   "0px 5px 14px rgba(0, 0, 0, 0.05)",
            //   "unset"
            // )}
          >
            <Text
              fontSize="xl"
              color={textColor}
              fontWeight="bold"
              textAlign="center"
              mb="22px"
            >
              Register With
            </Text>
            <HStack spacing="15px" justify="center" mb="22px">
              <Flex
                justify="center"
                align="center"
                w="75px"
                h="75px"
                borderRadius="8px"
                border={useColorModeValue("1px solid", "0px")}
                borderColor="gray.200"
                cursor="pointer"
                transition="all .25s ease"
                bg={bgIcons}
                _hover={{ bg: bgIconsHover }}
              >
                <Link href="#">
                  <Icon as={FaFacebook} color={colorIcons} w="30px" h="30px" />
                </Link>
              </Flex>
              <Flex
                justify="center"
                align="center"
                w="75px"
                h="75px"
                borderRadius="8px"
                border={useColorModeValue("1px solid", "0px")}
                borderColor="gray.200"
                cursor="pointer"
                transition="all .25s ease"
                bg={bgIcons}
                _hover={{ bg: bgIconsHover }}
              >
                <Link href="#">
                  <Icon
                    as={FaApple}
                    color={colorIcons}
                    w="30px"
                    h="30px"
                    _hover={{ filter: "brightness(120%)" }}
                  />
                </Link>
              </Flex>
              <Flex
                justify="center"
                align="center"
                w="75px"
                h="75px"
                borderRadius="8px"
                border={useColorModeValue("1px solid", "0px")}
                borderColor="gray.200"
                cursor="pointer"
                transition="all .25s ease"
                bg={bgIcons}
                _hover={{ bg: bgIconsHover }}
              >
                <Link href="#">
                  <Icon
                    as={FaGoogle}
                    color={colorIcons}
                    w="30px"
                    h="30px"
                    _hover={{ filter: "brightness(120%)" }}
                  />
                </Link>
              </Flex>
            </HStack>
            <Text
              fontSize="lg"
              color="gray.400"
              fontWeight="bold"
              textAlign="center"
              mb="22px"
            >
              or
            </Text>
            <FormControl>
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Username
              </FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                ms="4px"
                type="text"
                placeholder="Your full name"
                mb="24px"
                size="lg"
                onChange={(e) => {
                  setValues({ ...values, username: e.target.value });
                  OnType_Validate.username(
                    e.currentTarget,
                    "signin",
                    e.target.value
                  );
                }}
                value={values.username}
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Password
              </FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                ms="4px"
                type="password"
                placeholder="Your password"
                mb="24px"
                size="lg"
                onChange={(e) => {
                  setValues({ ...values, password: e.target.value });
                  OnType_Validate.password(
                    e.currentTarget,
                    "signin",
                    e.target.value
                  );
                }}
                value={values.password}
              />
              <FormControl display="flex" alignItems="center" mb="24px">
                <Switch id="remember-login" colorScheme="blue" me="10px" />
                <FormLabel htmlFor="remember-login" mb="0" fontWeight="normal">
                  Remember me
                </FormLabel>
              </FormControl>
              <Button
                ref={ButtonRef}
                fontSize="10px"
                variant="dark"
                fontWeight="bold"
                w="100%"
                h="45"
                mb="24px"
                onClick={loginHandler}
              >
                SIGN IN
              </Button>
            </FormControl>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="0px"
            >
              <Text color={textColor} fontWeight="medium">
                Already have an account?
                <Link
                  color={titleColor}
                  as="span"
                  ms="5px"
                  href="#"
                  fontWeight="bold"
                >
                  <Anchor to="/auth/signup">Sign up</Anchor>
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Box
          overflowX="hidden"
          h="100%"
          w="100%"
          left="0px"
          position="absolute"
          bgImage={NewSignInImage}
          bgRepeat="no-repeat"
          bgSize="cover"
        >
          <Box
            w="100%"
            h="100%"
            bgSize="cover"
            bg="blackAlpha.900"
            opacity="0.8"
          ></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;
