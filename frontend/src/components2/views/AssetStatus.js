
/* 

    Date : 10 / 16 / 23
    Author : Nole
    Activities
    Purpose : 
      Create AssetStatus.js

      import { Link as Anchor } from 'react-router-dom'
      import Logs from 'components/Utils/logs_helper'
      import axios from 'axios'

      Create useEffect to Create/Update the Asset Status

    Date : 10 / 18 / 23
    Author : Nole
    Activities
    Purpose : 
      update useEffect(() => { .. }
      new function handleUpdate for ( Insert and Update )
        
*/

import { useLocation,Link } from 'react-router-dom'
import Logs from 'components/Utils/logs_helper'
import  { useEffect, useState } from 'react'
//import axios from 'axios'
import { placeHolderAPI } from 'index'
import decoder from 'jwt-decode'


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
    Box,
    Input,
    FormControl,
    GridItem,
    Grid,
    Flex,
    useToast,
    Center,
    Avatar,
    Text,
    Textarea
  } from "@chakra-ui/react";
  import { Button, ButtonGroup } from "@chakra-ui/react";
  
  import Modal1 from "components2/Modal/Modal";
  import Card from "components/Card/Card";
 
  import defaultLogo from "../../assets/img/Department.png"

  export default function AssetStatus () {

    const toast = useToast()

    const graphCardBg = '#e6f2ff'
    const textColor = "#00334d"

    const [values,setStatus] = useState({
      statusid:'',
      statusname:'',
      description:''
  })

    
    const [btnstate,setbtnState] = useState()



    function showToast(title,desc,status) {
    
      return (
        
            toast({
              title: title,
              description: desc,
              status: status,
              duration: 3000,
              //isClosable: true,
              position: "top"
            })
 
       
       
      )
    }
 
    
    useEffect(() => {
      
      try {
        const hashFragment = window.location.hash; // Get the hash fragment, e.g., '#/admin/position/b3552fb4-f7eb-4aae-8f4d-d12fcd338c18'
        const parts = hashFragment.split("/"); // Split the hash fragment by '/'
        const statusID = parts[parts.length - 1]; // Get the last part, which is the ID


        if (statusID === 'assetstatus') {
          setbtnState("Save")
           
            setStatus({
              ...values,
              statusid: '',
              statusname: '',
              description: ''
            })
        }
        else if(statusID) {
        
          placeHolderAPI 
            .get('/getStatusbyID/' + statusID)
            .then((res) => {
              setbtnState("Update")
                setStatus({
                  ...values,
                  statusid: res.data.result[0].assetStatusID,
                  statusname: res.data.result[0].statusName,
                  description: res.data.result[0].statusDescription
                })
               
            })
            .catch((err) => {
              const errorStatus = err.code;

              if (errorStatus.includes("ERR_NETWORK")) {
  
                showToast("Error Loading selected Status",
                err.code,
                'error')
  
               // alert(submitLogs.getMessage());
              } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
                const submitLogs = new Logs(
                  "Error",
                  "Status",
                  "Function useEffect /getStatusbyID/",
                  err.response.data.message,
                  userID
                );
  
                const request = submitLogs.insertLogs(submitLogs)
  
                showToast("Error Loading selected Status",
                 'Please wait while we are logging error',
                 'info')

              }
            });
          
        } 

      }
      catch(err) {
        const errorStatus = err.code;

        if (errorStatus.includes("ERR_NETWORK")) {

          showToast("Error Loading selected Status",
          err.code,
          'error')

         // alert(submitLogs.getMessage());
        } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
          const submitLogs = new Logs(
            "Error",
            "Status",
            "Function useEffect /getStatusbyID",
            err.response.data.message,
            userID
          );

          const request = submitLogs.insertLogs(submitLogs)

          showToast("Error Loading selected Status",
           'Please wait while we are logging error',
           'info')
         
        
        }
      }
    }, [])

    async function handleUpdate(event)  {

      try {

        event.preventDefault();
        const tokenStorage = localStorage.getItem("token");
        const tokenDecoded = decoder(tokenStorage);

        const userID = tokenDecoded.result[0].userDisplayID;

      

        const statusvalues = {
          statusid: values.statusid,
          statusname: values.statusname,
          description: values.description,
          userID: userID
        }

        console.log(statusvalues)

        if(statusvalues.statusid === "") {
            // insert here
            const success = await placeHolderAPI
              .post('/status',statusvalues)
            .then((res) => {

              const InsertLogs = new Logs(
                'Info',
                "Asset Status",
                "Function /handleUpdate",
                ' Create   Statusname :  ' + statusvalues.statusname,
                userID
              )
              showToast("Status",
              ' Create   Statusname :  ' + statusvalues.statusname,
              'success')
      
              const request = InsertLogs.insertLogs(InsertLogs)

             window.location.href = "/#/admin/assetstatusviewer"
              

            })
            .catch((err) => {

              const errorStatus = err.code;

              if (errorStatus.includes("ERR_NETWORK")) {
      
                showToast("Error inserting Status",
                err.code,
                'error')
      
               // alert(submitLogs.getMessage());
              } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
                const submitLogs = new Logs(
                  "Error",
                  "Status",
                  "Function handleUpdate /status",
                  err.response.data.message,
                  userID
                );
      
                const request = submitLogs.insertLogs(submitLogs)
      
                showToast("Error inserting Status",
                 'Please wait while we are logging error',
                 'info')
               
              
              } 

            });
        } else if(!statusvalues.statusid == "") {
          /// update here
          const success = await placeHolderAPI
            .post('/updateStatusbyID',statusvalues)
          .then((res) => {
          
           

            const InsertLogs = new Logs(
              'Info',
              "Asset Status",
              "Function /updateStatusbyID",
              ' Update StatusID : ' +  statusvalues.statusid
              + ' Statusname :  ' + statusvalues.statusname,
              userID
            )

            showToast("Status",
              ' Update Statusname :  ' + statusvalues.statusname,
              'success')
    
              const request = InsertLogs.insertLogs(InsertLogs)

           window.location.href = "/#/admin/assetstatusviewer"
            
          })
          .catch((err) => {

            const errorStatus = err.code;

            if (errorStatus.includes("ERR_NETWORK")) {
    
              showToast("Error inserting Status",
              err.code,
              'error')
    
             // alert(submitLogs.getMessage());
            } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
              const submitLogs = new Logs(
                "Error",
                "Status",
                "Function handleUpdate /updateStatusbyID",
                err.response.data.message,
                userID
              );
    
              const request = submitLogs.insertLogs(submitLogs)
    
              showToast("Error updating Status",
               'Please wait while we are logging error',
               'info')
            
            } 

          })
        }

      }
      catch (err) {

        const errorStatus = err.code;

        if (errorStatus.includes("ERR_NETWORK")) {

          showToast("Error inserting/updating Status",
          err.code,
          'error')

         // alert(submitLogs.getMessage());
        } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
          const submitLogs = new Logs(
            "Error",
            "Status",
            "Function handleUpdate insert/update",
            err.response.data.message,
            userID
          );

          const request = submitLogs.insertLogs(submitLogs)

          showToast("Error inserting/updating Status",
           'Please wait while we are logging error',
           'info')
        
        } 
      }
    }
    
    return (

        <Stack>
          
          <FormControl>

          <Grid templateColumns={{ repeat:('6','1fr'), sm: "1fr", lg: "1.6fr 1.2fr" }} gap={4} >
            <GridItem colSpan={4}  maxHeight={'600px'} >
              <Card bg={graphCardBg} maxHeight={'600px'}>
                <Card bg={'white'}>
                <Flex align='center' mb='18px' >
                  <Box  position={'relative'} alignItems={'flex-end'} textAlign={'end'}>
                    <Text
                      fontSize='md'
                      color={textColor}
                      w={'95px'}
                      fontWeight='bold'
                      me='10px'>
                      Name:{" "}
                    </Text> 
                  </Box>       
                  <Box pl={'2'} w={'100%'}  >
                    <Input id='statusname' label="Status name" placeholder="Status Name" 
                      value={values.statusname}
                      onChange={ e => {
                        setStatus( { ...values, statusname: e.target.value } )}}
                    />   
                  </Box>
                </Flex>
                <Flex align='center' mb='18px' >
                  <Box  position={'relative'} alignItems={'flex-end'} textAlign={'end'}>
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
                    <Input id='description' label="Description" placeholder="Description" 
                      value={values.description}
                      onChange={ e => {
                        setStatus( { ...values, description: e.target.value } )}}
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
          
        </Stack>
      
    );
  }
  