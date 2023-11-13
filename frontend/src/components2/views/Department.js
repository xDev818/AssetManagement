/* 

Date : 10 / 18 / 23
Author : Nole
Activities
Purpose : 
  Create Department.js 
    import { useLocation,Link } from 'react-router-dom'
    import Logs from 'components/Utils/logs_helper'
    import  { useEffect, useState } from 'react'
    import axios from 'axios'
    import decoder from 'jwt-decode'
        
*/

import { useLocation, Link } from "react-router-dom";
import Logs from "components/Utils/logs_helper";


import { useEffect, useState } from "react";
//import axios from "axios";
import { placeHolderAPI,showToastMessage } from "index";

import decoder from "jwt-decode";

import React from "react";

import {
  FormLabel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stack,
  HStack,
  Grid,
  GridItem,
  Box,
  Input,
  FormControl,
  Textarea,
  Flex,
  Center,
  Avatar,
  Text,
  Alert,
  AlertIcon,
  useToast
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import Card from "components/Card/Card";

import defaultLogo from "../../assets/img/Department.png"
import ShowError from "components/Utils/viewToast";

const Department = () => {
  // const location = useLocation();
  // const departmentID = location.state?.departmentID;

 const toast = useToast()

  const graphCardBg = '#e6f2ff'
  const textColor = "#00334d"

  const [btnstate, setbtnState] = useState("Save");

  const [values, setDepartments] = useState({
    departmentid: "",
    departmentname: "",
    description: "",
  });

  function viewToastify(title,desc,status) {
    // const toast = useToast()
     return (
       
           toast({
             title: title,
             description: desc,
             status: status,
             duration: 4000,
             isClosable: true,
             position: "top"
           })

      
      
     )
   }

  useEffect(() => {
    var userID = ''
    try {

      const tokenStorage = localStorage.getItem("token");
      const tokenDecoded = decoder(tokenStorage);

      userID = tokenDecoded.result[0].userDisplayID;

      const hashFragment = window.location.hash; // Get the hash fragment, e.g., '#/admin/position/b3552fb4-f7eb-4aae-8f4d-d12fcd338c18'
      const parts = hashFragment.split("/"); // Split the hash fragment by '/'
      const departmentID = parts[parts.length - 1]; // Get the last part, which is the ID

      if(departmentID === 'department') {
        setbtnState("Save");

        setDepartments({
          ...values,
          departmentid: "",
          departmentname: "",
          description: "",
        });
      }

      else if (departmentID) {
        
        placeHolderAPI
          .get("/getDepartmentByID/" + departmentID)
          //
          .then((res) => {
            setbtnState("Update");
            setDepartments({
              ...values,
              departmentid: res.data.result[0].departmentDisplayID,
              departmentname: res.data.result[0].departmentName,
              description: res.data.result[0].description,
            });
          })
          .catch((err) => {
            const errorStatus = err.code;

            if (errorStatus.includes("ERR_NETWORK")) {
              const submitLogs = new Logs(
                "DB",
                "Department",
                "Function useEffect /getDepartmentByID/",
                err,
                userID
              );

              viewToastify("Error Loading selected Department",
              err.code,
              'error')

             // alert(submitLogs.getMessage());
            } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
              const submitLogs = new Logs(
                "Error",
                "Department",
                "Function useEffect /getDepartmentByID/",
                err.response.data.message,
                userID
              );

              const request = submitLogs.insertLogs(submitLogs.getLogs())

              viewToastify("Error Loading selected Department",
               'Please wait while we are logging error',
               'error')
             
            
            }

          });
      } else {
        setbtnState("Save");

        setDepartments({
          ...values,
          departmentid: "",
          departmentname: "",
          description: "",
        });
      }
    } catch (err) {
      const errorStatus = err.code;

      if (errorStatus.includes("ERR_NETWORK")) {
        const submitLogs = new Logs(
          "DB",
          "Department",
          "Function useEffect /getDepartmentByID/",
          err,
          userID
        );

        viewToastify("Error Loading selected Department",
        err.code,
        'error')

       
      } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
        const submitLogs = new Logs(
          "Error",
          "Department",
          "Function useEffect /getDepartmentByID/",
          err.response.data.message,
          userID
        );

        const request = submitLogs.insertLogs(submitLogs.getLogs())

        viewToastify("Error Loading selected Department",
         'Please wait while we are logging error',
         'error')
       
      
      }
    }
  }, []);

  async function handleUpdate(event) {
    var userID = ''
    try {
      event.preventDefault();

      const tokenStorage = localStorage.getItem("token");
      const tokenDecoded = decoder(tokenStorage);

       userID = tokenDecoded.result[0].userDisplayID;

      const departmentvalues = {
        departmentid: values.departmentid,
        departmentname: values.departmentname,
        description: values.description,
        userID: userID,
      };

      if (departmentvalues.departmentid === "") {
        // insert here
        const success = await placeHolderAPI
          .post("/create-department", departmentvalues)
          .then((res) => {
            
            viewToastify("Department",
            " Create   Department name :  " + departmentvalues.departmentname + "successful",
            'success')
    

            const InsertLogs = new Logs(
              "Info",
              "Department",
              "Function /handleUpdate",
              " Create   Department name :  " + departmentvalues.departmentname,
              userID
            );

            InsertLogs.insertLogs(InsertLogs.getMessage())
    
            window.location.href = "/#/admin/department-viewer";
          })
          .catch((err) => {
            alert(err);
          });
      } else if (!departmentvalues.departmentid == "") {
        /// update here

        const success = await placeHolderAPI
          .post("/updateDepartmentByID", departmentvalues)
          .then((res) => {
            //alert("Update Successful");

            const InsertLogs = new Logs(
              "Info",
              "Department",
              "Function /handleUpdate",
              " Update DepartmentID : " +
                departmentvalues.departmentid +
                " Departmentname :  " +
                departmentvalues.departmentname,
              userID
            );

            InsertLogs.insertLogs(InsertLogs);

            viewToastify("Department",
            " Update Department successful",
            'success')

            window.location.href = "/#/admin/department-viewer";
          })
          .catch((err) => {
            const errorStatus = err.code;

            if (errorStatus.includes("ERR_NETWORK")) {
              const submitLogs = new Logs(
                "DB",
                "Department",
                "Function /Handleupdate",
                err,
                userID
              );
              viewToastify("Department",
              err.code,
              'error')
              
            } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
              const submitLogs = new Logs(
                "Error",
                "Department",
                "Function /HandleUpdate",
                err.response.data.message,
                userID
              );
              submitLogs.insertLogs(submitLogs);
              viewToastify("Error",
              " Error in Inserting / updating Department",
              'error')
            }
          });
      }
    } catch (err) {

      const errorStatus = err.code;

      if (errorStatus.includes("ERR_NETWORK")) {
        const submitLogs = new Logs(
          "DB",
          "Department",
          "Function /Handleupdate",
          err,
          userID
        );
        viewToastify("Department",
        err.code,
        'error')
        
      } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
        const submitLogs = new Logs(
          "Error",
          "Department",
          "Function /HandleUpdate",
          err.response.data.message,
          userID
        );
        submitLogs.insertLogs(submitLogs);
        viewToastify("Error",
        " Error in Inserting / updating Department",
        'error')
      }
    }
  }

  return (

    <>
    <HStack>
      
      <FormControl>  
         <Grid templateColumns={{ repeat:('6','1fr'), sm: "1fr", lg: "1.6fr 1.2fr" }} gap={5} >
         <GridItem colSpan={4}  maxHeight={'600px'} >
            <Card bg={graphCardBg} maxHeight={'600px'}>

              <Card bg={'white'}>

          

                <Flex align='center' mb='18px'>
                  <Box  position={'relative'} alignItems={'flex-end'} textAlign={'end'}>
                    <Text
                      fontSize='md'
                      color={textColor}
                      w={'95px'}
                      fontWeight='bold'
                      me='10px'>
                      Department:{" "}
                    </Text> 
                  </Box>       
                  <Box pl={'2'} w={'100%'}  >
                  <Input
                    w={500}
                    id="departmentname"
                    label="Department name"
                    placeholder="Department Name"
                    value={values.departmentname}
                    onChange={(e) => {
                      setDepartments({ ...values, departmentname: e.target.value });
                    }}
                  />
                  </Box>
                </Flex>
                <Flex align='center' mb='18px'>
                  <Box  position={'relative'} alignItems={'flex-end'} textAlign={'end'} h={'80px'}>
                    <Text
                      fontSize='md'
                      color={textColor}
                      w={'95px'}
                      fontWeight='bold'
                      me='10px'>
                      Description:{" "}
                    </Text> 
                  </Box>       
                  <Box pl={'2'} w={'100%'}  >
                  <Textarea
                    mb={4}
                    id="description"
                    label="Description"
                    placeholder="Description"
                    value={values.description}
                    onChange={(e) => {
                      setDepartments({ ...values, description: e.target.value });
                    }}
                  />
                  </Box>
                </Flex>

               
                
                  <Center>
                    <Button colorScheme="green" onClick={handleUpdate}>
                            Save
                      </Button>
                  </Center>

             
              </Card>
            </Card>
        </GridItem>
        <GridItem colStart={5} colEnd={6} maxHeight={'600px'} >
          <Card bg={graphCardBg}  >
              <Card bg={'white'}>
               
                    <Center  >
                      <Avatar
                      bg={'white'}
                      src = {defaultLogo}
                      h={'220px'}
                      w={'220px'}
                      >

                      </Avatar>
                    </Center>
  
                 
                 
                  <Box align='center'>
                    <Center>
                    <Button colorScheme="green" >
                          Upload Image
                    </Button>
                    </Center>

                  </Box>
           
                          
              </Card>
          </Card>
          </GridItem>
        </Grid>


      </FormControl>
    </HStack>
    </>

  
  );
};

export default Department;
