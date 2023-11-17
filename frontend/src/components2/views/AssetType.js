
/* 

   
    Date : 10 / 21 / 23
    Author : Nole
    Activities
    Purpose : 
      create new AssetType.js
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

  export default function AssetType () {

    const toast = useToast()

    const graphCardBg = '#e6f2ff'
    const textColor = "#00334d"

    const [userdata,setUser] = useState({
        userID : ''
      });

    const [values,setAssetType] = useState({
      asset_typeid:'',
      asset_categoryid:'',
      asset_typename:'',
      asset_typedescription:''
  })
  const [categories, setCategories] = useState([]);

    // const location = useLocation()
    // const  asset_typeID  = location.state?.typeID
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

    const SetUsers = async () => { 

        const tokenStorage = localStorage.getItem("token");
        const tokenDecoded = decoder(tokenStorage);
    
         setUser({...userdata,
    
          userID : tokenDecoded.result[0].userDisplayID
    
      })
      }

      const LoadAllCategories = async () => {
        try {

          const success = await placeHolderAPI
            .get("/assetcategory/viewassetcategory")
    
            .then((res) => {
              setCategories(res.data.result);
            })
            .catch((err) => {

              const errorStatus = err.code;

              if (errorStatus.includes("ERR_NETWORK")) {
              
                showToast(
                  "Asset Type",
                  errorStatus,
                  "error"
                )
        
              } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
              
                const submitLogs = new Logs(
                  "Error",
                  "Asset Type",
                  "Function useEffect /assetcategory/viewassetcategory/",
                  err.response.data.message,
                  userID
                );

                submitLogs.insertLogs(submitLogs)
                showToast("Error Loading Asset Category",
                'Please wait while we are logging error',
                'warning')
              } else {

                const submitLogs = new Logs(
                  "Error",
                  "Asset Category",
                  "Function useEffect /assetcategory/viewassetcategory/",
                  err,
                  userID
                );

                submitLogs.insertLogs(submitLogs)
                showToast("Error Loading Asset Category",
               'Please wait while we are logging error',
               'warning')
              }



            });
        } catch (err) {
          
          const submitLogs = new Logs(
            "Error",
            "Asset Category",
            "Function useEffect /assetcategory/viewassetcategory/",
            err,
            userID
          );
          submitLogs.insertLogs(submitLogs)
          showToast("Error Loading Asset Category",
               'Please wait while we are logging error',
               'error')
          window.location.href = '/'; 
        }
      };

    useEffect(() => {
      
      try {
        const hashFragment = window.location.hash; // Get the hash fragment, e.g., '#/admin/position/b3552fb4-f7eb-4aae-8f4d-d12fcd338c18'
        const parts = hashFragment.split("/"); // Split the hash fragment by '/'
        const asset_typeID = parts[parts.length - 1]; // Get the last part, which is the ID

        SetUsers()  
        LoadAllCategories()

        if(asset_typeID === 'assettype') {
          setbtnState("Save")
           
          setAssetType({
            ...values,
            asset_typeid: '',
            asset_categoryid: '',
            asset_typename: '',
            asset_typedescription: ''
          })
        }

        else if(asset_typeID) {
        
          placeHolderAPI 
            .get('/assettype/get-AssetTypeByID/' + asset_typeID)
            .then((res) => {
              setbtnState("Update")
                setAssetType({
                  ...values,
                  asset_typeid: res.data.result[0].id,
                  asset_categoryid: res.data.result[0].assetCategID,
                  asset_typename: res.data.result[0].typeName,
                  asset_typedescription: res.data.result[0].description
                })
               
            })
            .catch((err) => {
              const errorStatus = err.code;

              if (errorStatus.includes("ERR_NETWORK")) {
              
                showToast(
                  "Asset Type",
                  errorStatus,
                  "error"
                )
        
              } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
              
                const submitLogs = new Logs(
                  "Error",
                  "Asset Type",
                  "Function useEffect assettype/get-AssetTypeByID/",
                  err.response.data.message,
                  userID
                );

                submitLogs.insertLogs(submitLogs)
                showToast("Error Loading Asset Category",
                'Please wait while we are logging error',
                'warning')
              } else {

                const submitLogs = new Logs(
                  "Error",
                  "Asset Category",
                  "Function useEffect assettype/get-AssetTypeByID/",
                  err,
                  userID
                );

                submitLogs.insertLogs(submitLogs)
                showToast("Error Loading Asset Category",
               'Please wait while we are logging error',
               'warning')
              }
            });
          
        } else {
          setbtnState("Save")
           
          setAssetType({
            ...values,
            asset_typeid: '',
            asset_categoryid: '',
            asset_typename: '',
            asset_typedescription: ''
          })
        }

      }
      catch(err) {
        const errorStatus = err.code;

        if (errorStatus.includes("ERR_NETWORK")) {
        
          showToast(
            "Asset Type",
            errorStatus,
            "error"
          )
  
        } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
        
          const submitLogs = new Logs(
            "Error",
            "Asset Type",
            "Function useEffect assettype/get-AssetTypeByID/",
            err.response.data.message,
            userID
          );

          submitLogs.insertLogs(submitLogs)
          showToast("Error Loading Asset Category",
          'Please wait while we are logging error',
          'error')
        } else {

          const submitLogs = new Logs(
            "Error",
            "Asset Category",
            "Function useEffect assettype/get-AssetTypeByID/",
            err,
            userID
          );

          submitLogs.insertLogs(submitLogs)
          showToast("Error Loading Asset Category",
         'Please wait while we are logging error',
         'error')
        }
      }
    }, [])

    async function handleUpdate(event)  {

      try {

        event.preventDefault();



        const typevalues = {

          asset_typeid: values.asset_typeid,
          asset_categoryid: values.asset_categoryid,
          asset_typename: values.asset_typename,
          asset_typedescription: values.asset_typedescription,
          userID: userdata.userID
        }

        if(typevalues.asset_typeid === "") {
            // insert here
            const success = await placeHolderAPI
              .post('/assettype/create-AssetType',typevalues)
            .then((res) => {
            
              

              const InsertLogs = new Logs(
                'Info',
                "Asset Status",
                "Function /handleUpdate",
                ' Create   Statusname :  ' + typevalues.asset_typename,
                userdata.userID
              )
              InsertLogs.insertLogs(InsertLogs)
              showToast(
                "Asset Type",
                ' Create   Asset Type :  ' + typevalues.asset_typename,
                "success"
              )

             window.location.href = "/#/admin/assetstype-viewer"

            })
            .catch((err) => {

              const errorStatus = err.code;
              if (errorStatus.includes("ERR_NETWORK")) {
        
                showToast(
                  "Asset Type",
                  errorStatus,
                  "error"
                )
        
              } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
              
                const submitLogs = new Logs(
                  "Error",
                  "Asset Type",
                  "Function handleUpdate assettype/create-AssetType/",
                  err.response.data.message,
                  userID
                );
      
                submitLogs.insertLogs(submitLogs)
                showToast("Error in creating Asset Type",
                'Please wait while we are logging error',
                'error')
              } else {
      
                const submitLogs = new Logs(
                  "Error",
                  "Asset Category",
                  "Function handleUpdate assettype/create-AssetType/",
                  err,
                  userID
                );
      
                submitLogs.insertLogs(submitLogs)
                showToast("Error in creating Asset Type",
               'Please wait while we are logging error',
               'error')
              }
            });
        } else if(!typevalues.asset_typeid == "") {
          /// update here
          const success = await placeHolderAPI 
            .post('/assettype/update-AssetType',typevalues)
          .then((res) => {
          
            

            const InsertLogs = new Logs(
              'Info',
              "Asset Status",
              "Function /handleUpdate",
              ' Update StatusID : ' +  typevalues.asset_typeid
              + ' Statusname :  ' + typevalues.asset_typename,
              userdata.userID
            )

            InsertLogs.insertLogs(InsertLogs)
            showToast(
              "Asset Type",
              ' Update Asset Type :  ' + typevalues.asset_typename,
              "success"
            )

           window.location.href = "/#/admin/assetstype-viewer"
            
          })
          .catch((err) => {
           
            const errorStatus = err.code;
            if (errorStatus.includes("ERR_NETWORK")) {
      
              showToast(
                "Asset Type",
                errorStatus,
                "error"
              )
      
            } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
            
              const submitLogs = new Logs(
                "Error",
                "Asset Type",
                "Function handleUpdate /update-AssetType",
                err.response.data.message,
                userID
              );
    
              submitLogs.insertLogs(submitLogs)
              showToast("Error in updating Aset Type",
              'Please wait while we are logging error',
              'error')
            } else {
    
              const submitLogs = new Logs(
                "Error",
                "Asset Category",
                "Function handleUpdate /update-AssetType",
                err,
                userID
              );
    
              submitLogs.insertLogs(submitLogs)
              showToast("Error in updating Aset Type",
             'Please wait while we are logging error',
             'error')
            }

        });
      }

      }
      catch (err) {
        const errorStatus = err.code;
        if (errorStatus.includes("ERR_NETWORK")) {
  
          showToast(
            "Asset Type",
            errorStatus,
            "error"
          )
  
        } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
        
          const submitLogs = new Logs(
            "Error",
            "Asset Type",
            "Function handleUpdate insert / update",
            err.response.data.message,
            userID
          );

          submitLogs.insertLogs(submitLogs)
          showToast("Error in inserting / updating Aset Type",
          'Please wait while we are logging error',
          'error')
        } else {

          const submitLogs = new Logs(
            "Error",
            "Asset Category",
            "Function handleUpdate insert / update",
            err,
            userID
          );

          submitLogs.insertLogs(submitLogs)
          showToast("Error in inserting / updating Aset Type",
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
                          Category:{" "}
                        </Text> 
                      </Box>
                      <Box pl={'2'} w={'100%'}   >
                      <Select id= 'asset_categoryid' placeholder='Select option' size='md'
                        onChange={ e => {
                          setAssetType( { ...values, asset_categoryid: e.target.value } )}}
                          value={values.asset_categoryid}
                        >
                        {categories.map((category) => (
                          <option value={category.id} size='md'> 
                            {category.assetCategName}
                          </option>
                          ))
                          
                        }

                      </Select>
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
                          Name:{" "}
                        </Text> 
                      </Box>       
                      <Box pl={'2'} w={'100%'}  >
                        <Input id='asset_typename' label="Asset Type name" placeholder="Asset Type Name" 
                        value={values.asset_typename}
                        onChange={ e => {
                          setAssetType( { ...values, asset_typename: e.target.value } )}}
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
                        <Textarea id='asset_typedescription' label="Description" placeholder="Description" 
                        value={values.asset_typedescription}
                        onChange={ e => {
                          setAssetType( { ...values, asset_typedescription: e.target.value } )}}
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
  