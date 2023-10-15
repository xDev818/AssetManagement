/* 

    Date : 10 / 12 / 23
    Author : Nole
    Activities
    Purpose : 
      import axios from 'axios'
      import * as React from 'react'
      import  { useEffect, useState } from 'react'
      import appSettings from "../../../src/appSettings";

    Date : 10 / 14 / 23
    Author : Nole
    Activities
    Purpose : 
      Update From (Registe Wth ) to (Register)
      Comment <HStack spacing='15px' justify='center' mb='22px'> </HStack>
        ** This Functionality will use later part
      Integrate Bcryptjs functionality
      Integrate log functionality

*/

import axios from 'axios'
import * as React from 'react'
import  { useEffect, useState, useRef } from 'react'
import {hash_password} from '../../components/Utils/password_helper'
import { Link as Anchor } from 'react-router-dom'

//Jinshin 10-14-2023
import Logs from 'components/Utils/logs_helper'

//import dotenv from 'dotenv'

// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
  LightMode,
} from "@chakra-ui/react";
// Assets
import BgSignUp from "assets/img/BgSignUp.png";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";

function SignUp() {

  const bgForm = useColorModeValue("white", "navy.800");
  const titleColor = useColorModeValue("gray.700", "blue.500");
  const textColor = useColorModeValue("gray.700", "white");
  const colorIcons = useColorModeValue("gray.700", "white");
  const bgIcons = useColorModeValue("trasnparent", "navy.700");
  const bgIconsHover = useColorModeValue("gray.50", "whiteAlpha.100");



  /*  Variables Declaration Here
  */
   // dotenv.config()

   const [positionID,setPositionID] = useState("")
   const [categoryID,setCategoryID] = useState("")

   const [values,setValues] = useState({
    username: '',
    email: '',
    password: ''
   })
   
    //  Jinshin
    const ButtonRef = useRef(null)
  
  useEffect(() => {
    /* Get Default PositionID for user in signup
    */

    var logvalues = {
      logtype: "",
      module: "",
      logfunction: "",
      logvalues : "",
      userID: ""
    }
      
    const url = {
      positionurl: "/positions"
    }

 
      axios.post(url.positionurl)

      .then((res) => {
        
        const dataResponse = res.data.message;
        if (dataResponse.includes("Record")) {
          setPositionID(res.data.result[0].positionDisplayID)
          
        } 
        
      })
      .catch( async (err) => {
        // console.log(err.status)

        //Jinshin: I made some changes here
        const errorStatus = err.code
        
        if (errorStatus.includes("ERR_NETWORK") ) {

          const useEffectLogs = new Logs(
            "DB",
            "Signup",
            "useEffect /Positions",
            err,
            ""
          )
          useEffectLogs.getLogs()

          alert( useEffectLogs.getMessage() )
          console.log( useEffectLogs.getLogs() )
          // End Jinshin


          // This is your previous sir noel
          // logvalues = {
          //   logtype: "Error: Database",
          //   module: "SignUp",
          //   logfunction: "UseEffect /positions",
          //   logvalues : err,
          //   userID: ""
          // }

          // alert("Error here : " + logvalues.logMessage)
          
        }
        else if ( errorStatus.includes("ERR_BAD_REQUEST") ) {

          const useEffectLogs = new Logs(
            errorStatus,
            "Signup",
            "useEffect /Positions",
            err.response.data.messasge,
            ""
          )
          useEffectLogs.getLogs()

          alert( useEffectLogs.getMessage() )
          console.log( useEffectLogs.getLogs() )
          // End Jinshin

          // logvalues = {
          //   logtype: "Error: " + errorStatus,
          //   module: "SignUp",
          //   logfunction: "UseEffect /positions",
          //   logMessage: err.response.data.message,
          //   logvalues : err.response.data.message,
          //   userID: ""
          // }

          // const request = await axios.post('/log',logvalues)
          // alert(err.response.data.message)

        }

      })
    
  }, [])

/* 
  useEffect(() => {
    
    var logvalues = {
      logtype: "",
      module: "",
      logfunction: "",
      logvalues : "",
      userID: ""
    }

    const url = {
      categoryurl: "/categories"
    }

    try {
      axios.post(url.categoryurl)

      .then((res) => {
        console.log(res.data)
        const dataResponse = res.data.message;
        if (dataResponse.includes("Record")) {
          setCategoryID(res.data.result[0].categoryID)
          
        } 

        
      })
      .catch( async (err) => {

        if (err) {
        logvalues = {
            logtype: "Error",
            module: "SignUp",
            logfunction: "UseEffect /categories",
            logvalues : err,
            userID: ""
          }
          
          alert(err)
        }
        else if (err.response.status === 404) {
          logvalues = {
            logtype: "Error",
            module: "SignUp",
            logfunction: "UseEffect /categories",
            logvalues : err.response.data.message,
            userID: ""
          }

          alert(err.response.data.message)
        }

        const request = await axios.post('/log',logvalues)

      })
    } catch (err) {
      alert(err)
    }
 
  }, [])
  
*/
  

  const handleInput = (e) => {
    console.log(e.target.name)
    setValues( { ...e.tar, [e.target.name]: [e.target.value.trim()] });
    //setErrors("test")
  };

  const HandleSubmit = async(event) => {

    
    const buttonStatus = ButtonRef.current
    
    console.log(buttonStatus)
    buttonStatus.disabled = true

    // buttonStatus.disabled = true

   // console.log("Get Position : " + positionID)
   // console.log("Get Category : " + categoryID)

    try {

      event.preventDefault()

      const pass = hash_password(values.password)
      
      const currentValues = {
        username: values.username,
        email: values.email,
        password: pass,
        positionID : positionID,
        categoryID: categoryID
      }

      const request = await axios.post('/users',currentValues)

      const response = await request.data

      if ( response.message.includes("Insert Success") ) {

        buttonStatus.disabled = false

        window.location.href = "/#/auth/signin"

      }

    }
    catch(err) {
      
      const errorStatus = err.code
      // var logvalues = {
      //   logtype: "",
      //   module: "",
      //   logfunction: "",
      //   logvalues : "",
      //   userID: ""
      // }


      if( errorStatus.includes('ERR_NETWORK') ) 
      {

        //Jinshin: I made some changes here
        const useEffectLogs = new Logs(
          "DB",
          "Signup",
          "Function /HandleSubmit",
          err,
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
              "Signup",
              "Function /HandleSubmit",
              err,
              ""
            )

            alert( log_status.getMessage() )
            console.log( log_status.getLogs() )

          }

          if( logStatus.includes("ERR_BAD_REQUEST") ) {

            const log_status = new Logs(
              logStatus,
              "Signup",
              "Function /HandleSubmit",
              err.response.data.message,
              ""
            )
            
            alert( log_status.getMessage() )
            console.log( log_status.getLogs() )

          }

        }
        // End Jinshin

        // Previous Sir Noel
        //  logvalues = {
        //   logtype: "Error",
        //   module: "SignUp",
        //   logfunction: "HandleSubmit",
        //   logvalues : "Server is not running",
        //   userID: ""
        // }

      } else if ( errorStatus.includes('ERR_BAD_REQUEST') ) {
        
        //Jinshin: I made some changes here
        const useEffectLogs = new Logs(
          errorStatus,
          "Signup",
          "Function /HandleSubmit",
          err.response.data.message,
          ""
        )
        useEffectLogs.getLogs()

        alert( useEffectLogs.getMessage() )
        console.log( useEffectLogs.getLogs() )
        buttonStatus.disabled = false

        try { // Issue in the logs, if there's no connection in the server or database, then this log api call will not be sent because there's no connection

          const request = await axios.post('/log',useEffectLogs.getLogs())
          const response = await request.data
          console.log(response)

        } catch ( err ) {

          const logStatus = err.code

          if( logStatus.includes("ERR_NETWOR") ) {

            const log_status = new Logs(
              "DB",
              "Signup",
              "Function /HandleSubmit",
              err,
              ""
            )

            alert( log_status.getMessage() )
            console.log( log_status.getLogs() )

          }

          if( logStatus.includes("ERR_BAD_REQUEST") ) {

            const log_status = new Logs(
              logStatus,
              "Signup",
              "Function /HandleSubmit",
              err.response.data.message,
              ""
            )
            
            alert( log_status.getMessage() )
            console.log( log_status.getLogs() )

          }

        }
        // End Jinshin

        //return alert( err.response.data.message )
        //  logvalues = {
        //   logtype: "Error",
        //   module: "SignUp",
        //   logfunction: "HandleSubmit",
        //   logvalues : err.response.data.message,
        //   userID: ""
        // }

      }
      // else {
      //     alert(err)
      // }

      // This is log api should be put in the called inside "catch section"
      // const request = await axios.post('/log',logvalues)

    }

  }

  return (
    <Flex
      direction='column'
      alignSelf='center'
      justifySelf='center'
      overflow='hidden'>
      <Box
        position='absolute'
        minH={{ base: "70vh", md: "50vh" }}
        maxH={{ base: "70vh", md: "50vh" }}
        w={{ md: "calc(100vw - 50px)" }}
        maxW={{ md: "calc(100vw - 50px)" }}
        left='0'
        right='0'
        bgRepeat='no-repeat'
        overflow='hidden'
        zIndex='-1'
        top='0'
        bgImage={BgSignUp}
        bgSize='cover'
        mx={{ md: "auto" }}
        mt={{ md: "14px" }}
        borderRadius={{ base: "0px", md: "20px" }}>
        <Box w='100vw' h='100vh' bg='blue.500' opacity='0.8'></Box>
      </Box>
      <Flex
        direction='column'
        textAlign='center'
        justifyContent='center'
        align='center'
        mt='125px'
        mb='30px'>

      </Flex>
      <Flex alignItems='center' justifyContent='center' mb='60px' mt='20px'>
        <Flex
          direction='column'
          w='445px'
          background='transparent'
          borderRadius='15px'
          p='40px'
          mx={{ base: "100px" }}
          bg={bgForm}
          boxShadow={useColorModeValue(
            "0px 5px 14px rgba(0, 0, 0, 0.05)",
            "unset"
          )}>
          <Text
            fontSize='xl'
            color={textColor}
            fontWeight='bold'
            textAlign='center'
            mb='22px'>
            Register 
          </Text>
          {/* 
          <HStack spacing='15px' justify='center' mb='22px'>
            <Flex
              justify='center'
              align='center'
              w='75px'
              h='75px'
              borderRadius='8px'
              border={useColorModeValue("1px solid", "0px")}
              borderColor='gray.200'
              cursor='pointer'
              transition='all .25s ease'
              bg={bgIcons}
              _hover={{ bg: bgIconsHover }}>
              <Link href='#'>
                <Icon as={FaFacebook} color={colorIcons} w='30px' h='30px' />
              </Link>
            </Flex>
            <Flex
              justify='center'
              align='center'
              w='75px'
              h='75px'
              borderRadius='8px'
              border={useColorModeValue("1px solid", "0px")}
              borderColor='gray.200'
              cursor='pointer'
              transition='all .25s ease'
              bg={bgIcons}
              _hover={{ bg: bgIconsHover }}>
              <Link href='#'>
                <Icon
                  as={FaApple}
                  color={colorIcons}
                  w='30px'
                  h='30px'
                  _hover={{ filter: "brightness(120%)" }}
                />
              </Link>
            </Flex>
            <Flex
              justify='center'
              align='center'
              w='75px'
              h='75px'
              borderRadius='8px'
              border={useColorModeValue("1px solid", "0px")}
              borderColor='gray.200'
              cursor='pointer'
              transition='all .25s ease'
              bg={bgIcons}
              _hover={{ bg: bgIconsHover }}>
              <Link href='#'>
                <Icon
                  as={FaGoogle}
                  color={colorIcons}
                  w='30px'
                  h='30px'
                  _hover={{ filter: "brightness(120%)" }}
                />
              </Link>
            </Flex>
          </HStack>
         
          <Text
            fontSize='lg'
            color='gray.400'
            fontWeight='bold'
            textAlign='center'
            mb='22px'>
            or
          </Text>
           */}
          <FormControl>
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
             Username
            </FormLabel>
            <Input
              
              variant='auth'
              fontSize='sm'
              ms='4px'
              type='text'
              placeholder='Your full name'
              mb='24px'
              size='lg'
              onChange={ e => setValues( { ...values, username: e.target.value } ) }
              value={values.username}
            />
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
              Email
            </FormLabel>
            <Input
              
              variant='auth'
              fontSize='sm'
              ms='4px'
              type='email'
              placeholder='Your email address'
              mb='24px'
              size='lg'
              onChange={ e => setValues( { ...values, email: e.target.value } ) }
              value={values.email}
            />
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
              Password
            </FormLabel>
            <Input
             
              variant='auth'
              fontSize='sm'
              ms='4px'
              type='password'
              placeholder='Your password'
              mb='24px'
              size='lg'
              onChange={ e => setValues( { ...values, password: e.target.value } ) }
              value={values.password}
            />
            {/* 
            <FormControl display='flex' alignItems='center' mb='24px'>
              <Switch id='remember-login' colorScheme='blue' me='10px' />
              <FormLabel htmlFor='remember-login' mb='0' fontWeight='normal'>
                Remember me
              </FormLabel>
            </FormControl>
            */}
            <Button
              ref={ButtonRef}
              fontSize='10px'
              variant='dark'
              fontWeight='bold'
              w='100%'
              h='45'
              mb='24px'
              onClick={HandleSubmit}
              >
              SIGN UP
            </Button>
          </FormControl>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            maxW='100%'
            mt='0px'>
            <Text color={textColor} fontWeight='medium'>
              Already have an account?
              <Link
                color={titleColor}
                as='span'
                ms='5px'
                href='#'
                fontWeight='bold'>
                <Anchor to="/auth/signin">
                  Sign In
                </Anchor>
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SignUp;
