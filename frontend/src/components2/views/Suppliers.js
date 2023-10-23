
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
import axios from 'axios'
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
    Grid
  } from "@chakra-ui/react";
  import { Button, ButtonGroup } from "@chakra-ui/react";
  
  import Modal1 from "components2/Modal/Modal";
  import Card from "components/Card/Card";
 
  
  export default function Suppliers () {

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


  

    useEffect(() => {
      
      try {
        
        const hashFragment = window.location.hash; // Get the hash fragment, e.g., '#/admin/position/b3552fb4-f7eb-4aae-8f4d-d12fcd338c18'
        const parts = hashFragment.split("/"); // Split the hash fragment by '/'
        const supplierID = parts[parts.length - 1]; // Get the last part, which is the ID

        if(supplierID) {
            console.log(supplierID)
            axios.get('/suppliers/getSupplierID/' + supplierID)
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
              alert(err);
              window.location.href = '/'; 
            });
          
        } else {
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
        alert(err)
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
            const success = await axios.post('/suppliers/createSupplier',suppliervalues)
            .then((res) => {
            
              alert("Insert Successful")

              const InsertLogs = new Logs(
                'Info',
                "Asset Status",
                "Function /handleUpdate",
                ' Create   Position name :  ' + suppliervalues.suppliername,
                userID
              )
      
             // const request = axios.post('/log',InsertLogs.getLogs())
             // const response =  request.data

             window.location.href = "/#/admin/suppliers-viewer"
              

            })
            .catch((err) => {
              alert(err);
            });
        } else if(!suppliervalues.supplierid == "") {
          /// update here
          const success = await axios.post('/suppliers/updateSupplier',suppliervalues)
          .then((res) => {
          
            alert("Update Successful")

            const InsertLogs = new Logs(
              'Info',
              "Asset Status",
              "Function /handleUpdate",
              ' Update Position ID : ' +  suppliervalues.supplierid
              + ' Position Name :  ' + suppliervalues.suppliername,
              userID
            )
    
          //  const request = axios.post('/log',InsertLogs.getLogs())
          //  const response =  request.data

           window.location.href = "/#/admin/suppliers-viewer"
            
          })
          .catch((err) => {
           
            const errorStatus = err.code
      
            if( errorStatus.includes('ERR_NETWORK') ) 
            {

              
              const submitLogs = new Logs(
                "DB",
                "AssetStatus",
                "Function /HandleSubmit",
                err,
                userID
              )
              
              alert( submitLogs.getMessage() )

            } else if ( errorStatus.includes('ERR_BAD_REQUEST') ) {
             
              const submitLogs = new Logs(
                'Error',
                "Asset Status",
                "Function /HandleSubmit",
                err.response.data.message,
                userID
              )
      
              try {
      
                const request = axios.post('/log',submitLogs.getLogs())
                const response =  request.data
                console.log(response)
      
              } catch ( err ) {
      
                const logStatus = err.code
      
                if( logStatus.includes("ERR_NETWOR") ) {
      
                  const submitLogs = new Logs(
                    "DB",
                    "Asset Status",
                    "Function /HandleSubmit",
                    err,
                    userID
                  )
      
                  alert( submitLogs.getMessage() )
                  console.log( submitLogs.getLogs() )
      
                }
      
                if( logStatus.includes("ERR_BAD_REQUEST") ) {
      
                  const submitLogs = new Logs(
                    "Error",
                    "Asset Status",
                    "Function /HandleSubmit",
                    err.response.data.message,
                    userID
                  )
                  
                  alert( submitLogs.getMessage() )
                  console.log( submitLogs.getLogs() )
      
                }
      
              }

          }});
      }

      }
      catch (err) {
        alert(err)
      }
    }
    
    return (

        <Stack>
          <FormControl>
          <Card>
            <Grid templateColumns="repeat(6, 1fr)" gap={0}>
              <GridItem>
                <FormLabel fontSize={{ base: "sm" }}>Vendor Name:  </FormLabel>
              </GridItem>
              <GridItem>
              <Input id='suppliername' label="Supplier name" placeholder="Supplier Name" 
              value={values.suppliername}
              onChange={ e => {
                setSupplier( { ...values, suppliername: e.target.value } )}}
              />    
              </GridItem>
            </Grid>
            
            <Box>
              <FormLabel fontSize={{ base: "sm" }}>Address:  </FormLabel>
              <Input id='address' label="Address" placeholder="Address" 
              value={values.address}
              onChange={ e => {
                setSupplier( { ...values, address: e.target.value } )}}
              />    
            </Box>
            <Box>
              <FormLabel fontSize={{ base: "sm" }}>Contact No:  </FormLabel>
              <Input id='contactno' label="Contact No" placeholder="Contact No" 
              value={values.contactno}
              onChange={ e => {
                setSupplier( { ...values, contactno: e.target.value } )}}
              />    
            </Box>
            <Box>
              <FormLabel fontSize={{ base: "sm" }}>Email:  </FormLabel>
              <Input id='email' label="Email" placeholder="Email" 
              value={values.email}
              onChange={ e => {
                setSupplier( { ...values, email: e.target.value } )}}
              />    
            </Box>
            <Box>
            <Button colorScheme="green" onClick={handleUpdate}>
              {/* <Link
                  to={{
                  pathname: "/admin/assetstatusviewer"
                  }}>
              </Link> */}
              {btnstate}

            </Button>
          </Box>
          </Card>
          </FormControl>
        </Stack>
      
    );
  }
  