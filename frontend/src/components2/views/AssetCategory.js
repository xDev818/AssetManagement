
/* 

   
    Date : 10 / 19 / 23
    Author : Nole
    Activities
    Purpose : 
      create new AssetCategory.js
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
    Stack,
    Box,
    Input,
    FormControl,
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
  
  export default function AssetCategory () {

    const toast = useToast()

    const graphCardBg = '#e6f2ff'
    const textColor = "#00334d"

    const [values,setCaegory] = useState({
      asset_categoryid:'',
      asset_categoryname:'',
      asset_categorydescription:''
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
        const asset_categoryID = parts[parts.length - 1]; // Get the last part, which is the ID

        if(asset_categoryID === 'assetcategory') {
          setbtnState("Save")
           
            setCaegory({
              ...values,
              asset_categoryid: '',
                asset_categoryname: '',
                asset_categorydescription: ''
            })
        }

        else if(asset_categoryID) {
        
          placeHolderAPI 
            .get('/assetcategory/getCategoryByID/' + asset_categoryID)
            .then((res) => {
              setbtnState("Update")
                setCaegory({
                  ...values,
                  asset_categoryid: res.data.result[0].id,
                  asset_categoryname: res.data.result[0].assetCategName,
                  asset_categorydescription: res.data.result[0].description
                })
               
            })
            .catch((err) => {

              const errorStatus = err.code;

              if (errorStatus.includes("ERR_NETWORK")) {
              
                showToast(
                  "Asset Status",
                  errorStatus,
                  "error"
                )
        
              } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
              
                const submitLogs = new Logs(
                  "Error",
                  "Asset Status",
                  "Function useEffect /assetcategory/getCategoryByID/",
                  err.response.data.message,
                  userID
                );

                submitLogs.insertLogs(submitLogs)
                showToast("Error Loading selected Status",
               'Please wait while we are logging error',
               'info')
              } else {

                const submitLogs = new Logs(
                  "Error",
                  "Asset Category",
                  "Function useEffect /assetcategory/getCategoryByID/",
                  err,
                  userID
                );

                submitLogs.insertLogs(submitLogs)
                showToast("Error Loading selected Status",
               'Please wait while we are logging error',
               'error')
              }
            });
          
        } else {
          setbtnState("Save")
           
            setCaegory({
              ...values,
              asset_categoryid: '',
                asset_categoryname: '',
                asset_categorydescription: ''
            })
        }

      }
      catch(err) {

        const errorStatus = err.code;

        if (errorStatus.includes("ERR_NETWORK")) {
        
          showToast(
            "Asset Category",
            errorStatus,
            "error"
          )
  
        } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
        
          const submitLogs = new Logs(
            "Error",
            "Asset Category",
            "Function useEffect /assetcategory/getCategoryByID/",
            err.response.data.message,
            userID
          );

          submitLogs.insertLogs(submitLogs)
          showToast("Error Loading selected Category",
         'Please wait while we are logging error',
         'error')
        } else {

          const submitLogs = new Logs(
            "Error",
            "Asset Category",
            "Function useEffect /assetcategory/getCategoryByID/",
            err,
            userID
          );

          submitLogs.insertLogs(submitLogs)
          showToast("Error Loading selected Category",
          'Please wait while we are logging error',
          'error')
        }
      }
    }, [])

    async function handleUpdate(event)  {

      try {

        event.preventDefault();
        const tokenStorage = localStorage.getItem("token");
        const tokenDecoded = decoder(tokenStorage);

        const userID = tokenDecoded.result[0].userDisplayID;

        const categoryvalues = {
          asset_categoryid: values.asset_categoryid,
          asset_categoryname: values.asset_categoryname,
          asset_categorydescription: values.asset_categorydescription,
          userID: userID
        }

        if(categoryvalues.asset_categoryid === "") {
            // insert here
            const success = await placeHolderAPI 
              .post('/assetcategory/createAssetCategory',categoryvalues)
            .then((res) => {
            
             

              const InsertLogs = new Logs(
                'Info',
                "Asset Category",
                "Function /handleUpdate",
                ' Create   Category :  ' + categoryvalues.asset_categoryname,
                userID
              )

              InsertLogs.insertLogs(InsertLogs)

              showToast(
                "Asset Category",
                'Created Category :  ' + categoryvalues.asset_categoryname + "successful",
                "success"
              )

             window.location.href = "/#/admin/assetscategory-viewer"
              

            })
            .catch((err) => {
              
                const errorStatus = err.code;

                if (errorStatus.includes("ERR_NETWORK")) {
                
                  showToast(
                    "Asset Category",
                    errorStatus,
                    "error"
                  )
          
                } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
                
                  const submitLogs = new Logs(
                    "Error",
                    "Asset Category",
                    "Function handleUpdate /assetcategory/createAssetCategory",
                    err.response.data.message,
                    userID
                  );

                  submitLogs.insertLogs(submitLogs)

                  showToast("Error creating Category",
                  'Please wait while we are logging error',
                  'warning')
                } else {

                  const submitLogs = new Logs(
                    "Error",
                    "Asset Category",
                    "Function useEffect /assetcategory/createAssetCategory/",
                    err,
                    userID
                  );

                  submitLogs.insertLogs(submitLogs)
                  showToast("Error Creating Category",
                  'Please wait while we are logging error',
                  'warning')
                }
            });
        } else if(!categoryvalues.asset_categoryid == "") {
          /// update here
          const success = await placeHolderAPI 
            .post('/assetcategory/updateAssetCategory',categoryvalues)
          .then((res) => {
          
           

            const InsertLogs = new Logs(
              'Info',
              "Asset Status",
              "Function /handleUpdate",
              ' Update StatusID : ' +  categoryvalues.asset_categoryid
              + ' Statusname :  ' + categoryvalues.asset_categoryname,
              userID
            )
            InsertLogs.insertLogs(InsertLogs)

            showToast(
              "Asset Category",
              'Update Category :  ' + categoryvalues.asset_categoryname  + "successful",
              "success"
            )


           window.location.href = "/#/admin/assetscategory-viewer"
            
          })
          .catch((err) => {
           
            const errorStatus = err.code;

            if (errorStatus.includes("ERR_NETWORK")) {
            
              showToast(
                "Asset Category",
                errorStatus,
                "warning"
              )
      
            } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
            
              const submitLogs = new Logs(
                "Error",
                "Asset Category",
                "Function handleUpdate /assetcategory/updateAssetCategory",
                err.response.data.message,
                userID
              );

              submitLogs.insertLogs(submitLogs)

              showToast("Error updating Category",
              'Please wait while we are logging error',
              'warning')
            } else {

              const submitLogs = new Logs(
                "Error",
                "Asset Category",
                "Function handleUpdate /assetcategory/updateAssetCategory/",
                err,
                userID
              );

              submitLogs.insertLogs(submitLogs)
              showToast("Error updating Category",
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
            "Asset Category",
            errorStatus,
            "error"
          )
  
        } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
        
          const submitLogs = new Logs(
            "Error",
            "Asset Category",
            "Function handleUpdate create / update",
            err.response.data.message,
            userID
          );

          submitLogs.insertLogs(submitLogs)

          showToast("Error creating / updating Category",
          'Please wait while we are logging error',
          'error')
        } else {

          const submitLogs = new Logs(
            "Error",
            "Asset Category",
            "Function handleUpdate create / update",
            err,
            userID
          );

          submitLogs.insertLogs(submitLogs)
          showToast("Error creating / updating Category",
          'Please wait while we are logging error',
          'error')
        }
      }
    }
    
    return (

      <>
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
                          Category:{" "}
                        </Text> 
                      </Box>
                      <Box pl={'2'} w={'100%'}   >
                        <Input id='asset_categoryname' label="Asset Category name" placeholder="Asset Category Name" 
                          value={values.asset_categoryname}
                          onChange={ e => {
                            setCaegory( { ...values, asset_categoryname: e.target.value } )}}
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
                        <Textarea id='asset_categorydescription' label="Description" placeholder="Description" 
                          value={values.asset_categorydescription}
                          onChange={ e => {
                            setCaegory( { ...values, asset_categorydescription: e.target.value } )}}
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
        </>
    );
  }
  