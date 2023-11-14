
/* 


    Date : 10 / 18 / 23
    Author : Nole
    Activities
    Purpose : 
      create Suppliers.js
        
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

  export default function Suppliers () {

    const toast = useToast()

    const graphCardBg = '#e6f2ff'
    const textColor = "#00334d"

    var userID =''
    const [values,setSupplier] = useState({
      supplierid:'',
      suppliername:'',
      address:'',
      contactno: '',
      email: ''
  })



    const location = useLocation()
    const  supplierID  = location.state?.supplierID
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
        const supplierID = parts[parts.length - 1]; // Get the last part, which is the ID

        if(supplierID === 'suppliers') {
          setbtnState("Save")
           
          setSupplier({
            ...values,
            supplierid: '',
            suppliername: '',
            address: '',
            contactno: '',
            email: ''
          })
        }

        else if(supplierID) {
            
            placeHolderAPI.get('/suppliers/getSupplierID/' + supplierID)
            .then((res) => {

              setbtnState("Update")
                setSupplier({
                  ...values,
                  supplierid: res.data.result[0].id,
                  suppliername: res.data.result[0].supplierName,
                  address: res.data.result[0].address,
                  contactno: res.data.result[0].contactno,
                  email: res.data.result[0].email
                })
               
            })
            .catch((err) => {
            

              const errorStatus = err.code;

              if (errorStatus.includes("ERR_NETWORK")) {
  
                showToast("Error Loading selected Supplier",
                err.code,
                'error')
  
               // alert(submitLogs.getMessage());
              } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
                const submitLogs = new Logs(
                  "Error",
                  "Supplier",
                  "Function useEffect /suppliers/getSupplierID/",
                  err.response.data.message,
                  userID
                );
  
                const request = submitLogs.insertLogs(submitLogs)
  
                showToast("Error Loading selected Supplier",
                 'Please wait while we are logging error',
                 'info')
               
              
              }
              //window.location.href = '/'; 
            });
          
        }  else {
          setbtnState("Save")
           
          setSupplier({
            ...values,
            supplierid: '',
            suppliername: '',
            address: '',
            contactno: '',
            email: ''
          })
        }

      }
      catch(err) {

        const errorStatus = err.code;

        if (errorStatus.includes("ERR_NETWORK")) {

          showToast("Error Loading selected Supplier",
          err.code,
          'error')

         // alert(submitLogs.getMessage());
        } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
          const submitLogs = new Logs(
            "Error",
            "Supplier",
            "Function useEffect /suppliers/getSupplierID/",
            err.response.data.message,
            userID
          );

          const request = submitLogs.insertLogs(submitLogs)

          showToast("Error Loading selected Supplier",
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

      

        const suppliervalues = {
          supplierid: values.supplierid,
          suppliername: values.suppliername,
          address: values.address,
          contactno: values.contactno,
          email: values.email,
          userID: userID
        }



        if(suppliervalues.supplierid === "") {
            // insert here
            const success = await placeHolderAPI .post('/suppliers/createSupplier',suppliervalues)
            .then((res) => {

              const InsertLogs = new Logs(
                'Info',
                "Asset Status",
                "Function /handleUpdate",
                ' Create   Position name :  ' + suppliervalues.suppliername,
                userID
              )
              const request = InsertLogs.insertLogs(InsertLogs)
              
              showToast(
                "Supplier",
                ' Create new Supplier Name :  ' + suppliervalues.suppliername ,
                "success"
              )

             // const request = axios.post('/log',InsertLogs.getLogs())
             // const response =  request.data

             window.location.href = "/#/admin/suppliers-viewer"
              

            })
            .catch((err) => {
              const errorStatus = err.code;

              if (errorStatus.includes("ERR_NETWORK")) {
      
                showToast("Error Loading selected Supplier",
                err.code,
                'error')
      
               // alert(submitLogs.getMessage());
              } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
                const submitLogs = new Logs(
                  "Error",
                  "Supplier",
                  "Function handleUpdate /suppliers/createSupplier/",
                  err.response.data.message,
                  userID
                );
      
                const request = submitLogs.insertLogs(submitLogs)
      
                showToast("Error inserting selected Supplier",
                 'Please wait while we are logging error',
                 'info')
              }
            });
        } else if(!suppliervalues.supplierid == "") {
          /// update here
          const success = await placeHolderAPI .post('/suppliers/updateSupplier',suppliervalues)
          .then((res) => {
            
            const InsertLogs = new Logs(
              'Info',
              "Asset Status",
              "Function /handleUpdate",
              ' Update Position ID : ' +  suppliervalues.supplierid
              + ' Position Name :  ' + suppliervalues.suppliername,
              userID
            )

            const request = InsertLogs.insertLogs(InsertLogs)
                  
            showToast(
              "Supplier",
              ' Updating Supplier Name :  ' + suppliervalues.suppliername ,
              "success"
            )

           window.location.href = "/#/admin/suppliers-viewer"
            
          })
          .catch((err) => {
           
            const errorStatus = err.code
      
            if( errorStatus.includes('ERR_NETWORK') ) 
            {
              showToast(
                "Supplier",
                errorStatus,
                "error"
              )

            } else if ( errorStatus.includes('ERR_BAD_REQUEST') ) {
             
              const submitLogs = new Logs(
                'Error',
                "Supplier",
                "Function /HandleSubmit",
                err.response.data.message,
                userID
              )

              
              const request = submitLogs.insertLogs(submitLogs)
      
                showToast("Error updating selected Supplier",
                 'Please wait while we are logging error',
                 'info')
           
                
            }
        });
      }

      }
      catch (err) {
        const errorStatus = err.code
      
        if( errorStatus.includes('ERR_NETWORK') ) 
        {
          showToast(
            "Supplier",
            errorStatus,
            "error"
          )

        } else if ( errorStatus.includes('ERR_BAD_REQUEST') ) {
         
          const submitLogs = new Logs(
            'Error',
            "Supplier",
            "Function /HandleSubmit",
            err.response.data.message,
            userID
          )

          const request = submitLogs.insertLogs(submitLogs)
      
          showToast("Error updating selected Supplier",
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
                  <Box  position={'relative'} alignItems={'flex-end'}  textAlign={'end'}  >
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
                    <Input id='suppliername' label="Supplier name" placeholder="Supplier Name" 
                      value={values.suppliername}
                      onChange={ e => {
                        setSupplier( { ...values, suppliername: e.target.value } )}}
                    />    
                  </Box>
              </Flex>
              <Flex align='center' mb='18px'>
                  <Box  position={'relative'} alignItems={'flex-end'} textAlign={'end'} h={'80px'} >
                    <Text
                      fontSize='md'
                      color={textColor}
                      w={'95px'}
                      fontWeight='bold'
                      me='10px'>
                      Address:{" "}
                    </Text> 
                  </Box >       
                  <Box pl={'2'} w={'100%'} >
                    <Textarea id='address' label="Address" placeholder="Address" 
                      value={values.address}
                      onChange={ e => {
                        setSupplier( { ...values, address: e.target.value } )}}
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
                      Contact No: {" "}
                    </Text> 
                  </Box>       
                  <Box pl={'2'} w={'100%'}  >
                    <Input id='contactno' label="Contact No" placeholder="Contact No" 
                      value={values.contactno}
                      onChange={ e => {
                        setSupplier( { ...values, contactno: e.target.value } )}}
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
                      Email:  {" "}
                    </Text> 
                  </Box>       
                  <Box pl={'2'} w={'100%'}  >
                    <Input id='email' label="Email" placeholder="Email" 
                      value={values.email}
                      onChange={ e => {
                        setSupplier( { ...values, email: e.target.value } )}}
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
  