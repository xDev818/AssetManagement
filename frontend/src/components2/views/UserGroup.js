
/* 

   
    Date : 10 / 19 / 23
    Author : Nole
    Activities
    Purpose : 
      create new UserGroup.js
      import { useLocation,Link } from 'react-router-dom'
      import Logs from 'components/Utils/logs_helper'
      import  { useEffect, useState } from 'react'
      import axios from 'axios'
      import decoder from 'jwt-decode'
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
    Input,
    FormControl,
    Stack,
    Box,
    Select,
    useToast,
    Grid,
    GridItem,
    Flex,
    Center,
    Avatar,
    Text,
    Textarea
  } from "@chakra-ui/react";
  import { Button, ButtonGroup } from "@chakra-ui/react";
  
  import Modal1 from "components2/Modal/Modal";
  import Card from "components/Card/Card";
 
  import defaultLogo from "../../assets/img/Department.png"
  
  export default function UserGroup () {

    const toast = useToast()
    
    const graphCardBg = '#e6f2ff'
    const textColor = "#00334d"

    const [values,setUserGroup] = useState({
      usergroup_id:'',
      usergroup_name:'',
      usergroup_description:''
  })

    // const location = useLocation()
    // const  usergroup_id  = location.state?.userGroupID
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
        const usergroup_id = parts[parts.length - 1]; // Get the last part, which is the ID

        if (usergroup_id === 'usergroup') {
          setbtnState("Save")
           
          setUserGroup({
            ...values,
            usergroup_id: '',
            usergroup_name: '',
            usergroup_description: ''
          })
        }
       else  if(usergroup_id) {
        
        placeHolderAPI.get('/usergroup/getUserGroupByID/' + usergroup_id)
            .then((res) => {
              setbtnState("Update")
                setUserGroup({
                  ...values,
                  usergroup_id: res.data.result[0].id,
                  usergroup_name: res.data.result[0].categoryName,
                  usergroup_description: res.data.result[0].categoryDesc
                })
               
            })
            .catch((err) => {

              const errorStatus = err.code;

              if (errorStatus.includes("ERR_NETWORK")) {
              
                showToast(
                  "User",
                  errorStatus,
                  "error"
                )
        
              } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
              
                const submitLogs = new Logs(
                  "Error",
                  "User",
                  "Function useEffect usergroup/getUserGroupByID/",
                  err.response.data.message,
                  userID
                );

                submitLogs.insertLogs(submitLogs)
                showToast("Error Loading selected User",
                'Please wait while we are logging error',
                'warning')
              } else {

                const submitLogs = new Logs(
                  "Error",
                  "User",
                  "Function useEffect usergroup/getUserGroupByID/",
                  err,
                  userID
                );

                submitLogs.insertLogs(submitLogs)
                showToast("Error Loading selected User",
               'Please wait while we are logging error',
               'warning')
              }
            });
          
        } else {
          setbtnState("Save")
           
            setUserGroup({
              ...values,
              usergroup_id: '',
              usergroup_name: '',
              usergroup_description: ''
            })
        }

      }
      catch(err) {
        const errorStatus = err.code;

        if (errorStatus.includes("ERR_NETWORK")) {
        
          showToast(
            "User",
            errorStatus,
            "error"
          )
  
        } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
        
          const submitLogs = new Logs(
            "Error",
            "User",
            "Function useEffect usergroup/getUserGroupByID/",
            err.response.data.message,
            userID
          );

          submitLogs.insertLogs(submitLogs)
          showToast("Error Loading selected User",
          'Please wait while we are logging error',
          'warning')
        } else {

          const submitLogs = new Logs(
            "Error",
            "User",
            "Function useEffect usergroup/getUserGroupByID/",
            err,
            userID
          );

          submitLogs.insertLogs(submitLogs)
          showToast("Error Loading selected User",
         'Please wait while we are logging error',
         'warning')
        }
      }
    }, [])

    async function handleUpdate(event)  {

      try {

        event.preventDefault();
        const tokenStorage = localStorage.getItem("token");
        const tokenDecoded = decoder(tokenStorage);

        const userID = tokenDecoded.result[0].userDisplayID;

      

        const usergroupvalues = {
          usergroup_id: values.usergroup_id,
          usergroup_name: values.usergroup_name,
          usergroup_description: values.usergroup_description,
          userID: userID
        }

        if(usergroupvalues.usergroup_id === "") {
            // insert here
            const success = await placeHolderAPI.post('/usergroup/create-usergroup',usergroupvalues)
            .then((res) => {
            
              const InsertLogs = new Logs(
                'Info',
                "Asset Status",
                "Function /handleUpdate",
                ' Create   User Group :  ' + usergroupvalues.usergroup_name,
                userID
              )
              InsertLogs.insertLogs(InsertLogs)
              showToast("User",
              ' Create   User Group :  ' + usergroupvalues.usergroup_name + " successful",
              'success')

             window.location.href = "/#/admin/usergroup-viewer"

            })
            .catch((err) => {
              const errorStatus = err.code;

              if (errorStatus.includes("ERR_NETWORK")) {
              
                showToast(
                  "User",
                  errorStatus,
                  "error"
                )
        
              } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
              
                const submitLogs = new Logs(
                  "Error",
                  "User",
                  "Function handleUpdate usergroup/create-usergroup/",
                  err.response.data.message,
                  userID
                );

                submitLogs.insertLogs(submitLogs)
                showToast("Error in creating user",
                'Please wait while we are logging error',
                'warning')
              } else {

                const submitLogs = new Logs(
                  "Error",
                  "User",
                  "Function handleUpdate usergroup/create-usergroup/",
                  err,
                  userID
                );

                submitLogs.insertLogs(submitLogs)
                showToast("Error in creating user",
               'Please wait while we are logging error',
               'warning')
              }
            });
        } else if(!usergroupvalues.usergroup_id == "") {
          /// update here
          const success = await placeHolderAPI.post('/usergroup/update-usergroup',usergroupvalues)
          .then((res) => {
          
            const InsertLogs = new Logs(
              'Info',
              "User",
              "Function /handleUpdate",
              ' Update GrouupID : ' +  usergroupvalues.usergroup_id
              + ' User Group :  ' + usergroupvalues.usergroup_name,
              userID
            )

            InsertLogs.insertLogs(InsertLogs)
            showToast("User",
            ' Update User Group :  ' + usergroupvalues.usergroup_name + " successful",
            'success')
    

           window.location.href = "/#/admin/usergroup-viewer"
            
          })
          .catch((err) => {
            const errorStatus = err.code;

            if (errorStatus.includes("ERR_NETWORK")) {
            
              showToast(
                "User",
                errorStatus,
                "error"
              )
      
            } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
            
              const submitLogs = new Logs(
                "Error",
                "User",
                "Function handleUpdate usergroup/update-usergroup/",
                err.response.data.message,
                userID
              );

              submitLogs.insertLogs(submitLogs)
              showToast("Error in updating user",
              'Please wait while we are logging error',
              'warning')
            } else {

              const submitLogs = new Logs(
                "Error",
                "User",
                "Function handleUpdate usergroup/update-usergroup/",
                err,
                userID
              );

              submitLogs.insertLogs(submitLogs)
              showToast("Error in updating user",
             'Please wait while we are logging error',
             'warning')
            }

        });
      } 

      }
      catch (err) {
        const errorStatus = err.code;

        if (errorStatus.includes("ERR_NETWORK")) {
        
          showToast(
            "User",
            errorStatus,
            "error"
          )
  
        } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
        
          const submitLogs = new Logs(
            "Error",
            "User",
            "Function handleUpdateinsert / update",
            err.response.data.message,
            userID
          );

          submitLogs.insertLogs(submitLogs)
          showToast("Error in creating / updating user",
          'Please wait while we are logging error',
          'error')
        } else {

          const submitLogs = new Logs(
            "Error",
            "User",
            "Function handleUpdate creating / updating",
            err,
            userID
          );

          submitLogs.insertLogs(submitLogs)
          showToast("Error in creating / updating",
         'Please wait while we are logging error',
         'error')
        }
      }
    }
    
    return (

        <Stack>

<FormControl>  
            <Grid templateColumns={{ repeat:('6','1fr'), sm: "1fr", lg: "1.6fr 1.2fr" }} gap={5} >
            <GridItem colSpan={4}  maxHeight={'600px'} >
                <Card bg={graphCardBg} maxHeight={'600px'}>

                  <Card bg={'white'}>

                  <Flex align='center' mb='18px' >
                      
                      <Box  >
                        <Text
                          fontSize='md'
                          color={textColor}
                        
                          fontWeight='bold'
                          me='10px'>
                          Name:{" "}
                        </Text> 
                      </Box>
                      <Box pl={'2'} w={'100%'}   >
                        <Input id='usergroup_name' label="User Group name" placeholder="User Group Name" 
                          value={values.usergroup_name}
                          onChange={ e => {
                          setUserGroup( { ...values, usergroup_name: e.target.value } )}}
                        />    
                      </Box> 
                    </Flex>

                    <Flex align='center' mb='18px'>
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
                        <Textarea id='usergroup_description' label="Description" placeholder="Description" 
                          value={values.usergroup_description}
                          onChange={ e => {
                          setUserGroup( { ...values, usergroup_description: e.target.value } )}}
                        />   
                      </Box>
                    </Flex>

                      <Center>
                        <Button colorScheme="green" onClick={handleUpdate}>
                                {btnstate}
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
  