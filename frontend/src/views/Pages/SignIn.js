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

*/

import { Link as Anchor } from 'react-router-dom'

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
} from "@chakra-ui/react";
// Assets
import signInImage from "assets/img/signInImage.png";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { Redirect } from "react-router-dom";

// Imported: Jinshin

import { useState, useRef, useEffect } from 'react'

import Logs from "components/Utils/logs_helper";
import axios from 'axios'



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

  const ButtonRef = useRef()

  useEffect( () => {

    const storage = localStorage

    if( storage.getItem("token") && storage.getItem('token').length === 637  ) {

      window.location.href = "/"

    } else {

      localStorage.removeItem('token')

    }


  }, [])

  const loginHandler = async () => {
    // const request = await axios.post("/users/login", values);


    const buttonStatus = ButtonRef.current
    buttonStatus.disabled = true

    try {

      const request = await axios.post('/users/login', values)

      const response = await request.data

      if ( response.message.includes("Record Found") ) {

        window.location.href = "/"
        localStorage.setItem("token", response.token)
        buttonStatus.disabled = false

      }


    } catch ( err ) {

      const errorStatus = err.code

      if( errorStatus.includes('ERR_NETWORK') ) {

        const useEffectLogs = new Logs(
          "DB",
          "Login",
          "Function /loginHandler",
          err,
          ""
        )

        alert( useEffectLogs.getMessage() )
        console.log( useEffectLogs.getLogs() )
        buttonStatus.disabled = false

      }

      if ( errorStatus.includes('ERR_BAD_REQUEST') ) {

        const useEffectLogs = new Logs(
          errorStatus,
          "Login",
          "Function /loginHandler",
          err.response.data.message,
          ""
        )
        useEffectLogs.getLogs()

        alert( useEffectLogs.getMessage() )
        console.log( useEffectLogs.getLogs() )
        buttonStatus.disabled = false

        try {

          const request = await axios.post('/log',useEffectLogs.getLogs())
          const response = await request.data
          console.log(response)

        } catch ( err ) {

          const logStatus = err.code

          if( logStatus.includes("ERR_NETWOR") ) {

            const log_status = new Logs(
              "DB",
              "Login",
              "Function /loginHandler",
              err,
              ""
            )

            alert( log_status.getMessage() )
            console.log( log_status.getLogs() )

          }

          if( logStatus.includes("ERR_BAD_REQUEST") ) {

            const log_status = new Logs(
              logStatus,
              "Login",
              "Function /loginHandler",
              err.response.data.message,
              ""
            )
            
            alert( log_status.getMessage() )
            console.log( log_status.getLogs() )

          }

        }

      }

    }

    console.log("asd");
  };
  // End Jinshin

  return (
    <Flex position="relative" mb="40px">
      <Flex
        minH={{ md: "1000px" }}
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ md: "0px" }}
      >
        <Flex
          w="100%"
          h="100%"
          alignItems="center"
          justifyContent="center"
          mb="60px"
          mt={{ base: "50px", md: "20px" }}
        >
          <Flex
            zIndex="2"
            direction="column"
            w="445px"
            background="transparent"
            borderRadius="15px"
            p="40px"
            mx={{ base: "100px" }}
            m={{ base: "20px", md: "auto" }}
            bg={bgForm}
            boxShadow={useColorModeValue(
              "0px 5px 14px rgba(0, 0, 0, 0.05)",
              "unset"
            )}
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
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
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
                onChange={(e) =>
                  setValues({ ...values, username: e.target.value })
                }
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
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
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
                fontSize='10px'
                variant='dark'
                fontWeight='bold'
                w='100%'
                h='45'
                mb='24px' onClick={loginHandler}>
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
                  as='span'
                  ms='5px'
                  href='#'
                  fontWeight='bold'>
                  <Anchor to="/auth/signup">
                  Sign up
                  </Anchor>
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
          bgImage={signInImage}
        >
          <Box
            w="100%"
            h="100%"
            bgSize="cover"
            bg="blue.500"
            opacity="0.8"
          ></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;
