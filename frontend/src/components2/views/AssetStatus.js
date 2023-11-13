
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
  } from "@chakra-ui/react";
  import { Button, ButtonGroup } from "@chakra-ui/react";
  
  import Modal1 from "components2/Modal/Modal";
  import Card from "components/Card/Card";
 
  
  export default function AssetStatus () {

    const graphCardBg = '#e6f2ff'
    const textColor = "#00334d"

    const [values,setStatus] = useState({
      statusid:'',
      statusname:'',
      description:''
  })

    
    const [btnstate,setbtnState] = useState()

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
              alert(err);
              window.location.href = '/'; 
            });
          
        }  else {
          setbtnState("Save")
           
          setStatus({
            ...values,
            statusid: '',
            statusname: '',
            description: ''
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

      

        const statusvalues = {
          statusid: values.statusid,
          statusname: values.statusname,
          description: values.description,
          userID: userID
        }

        if(statusvalues.statusid === "") {
            // insert here
            const success = await placeHolderAPI
              .post('/status',statusvalues)
            .then((res) => {
            
              alert("Insert Successful")

              const InsertLogs = new Logs(
                'Info',
                "Asset Status",
                "Function /handleUpdate",
                ' Create   Statusname :  ' + statusvalues.statusname,
                userID
              )
      
             // const request = axios.post('/log',InsertLogs.getLogs())
             // const response =  request.data

             window.location.href = "/#/admin/assetstatusviewer"
              

            })
            .catch((err) => {
              alert(err);
            });
        } else if(!statusvalues.statusid == "") {
          /// update here
          const success = await placeHolderAPI
            .post('/updateStatusbyID',statusvalues)
          .then((res) => {
          
            alert("Update Successful")

            const InsertLogs = new Logs(
              'Info',
              "Asset Status",
              "Function /handleUpdate",
              ' Update StatusID : ' +  statusvalues.statusid
              + ' Statusname :  ' + statusvalues.statusname,
              userID
            )
    
          //  const request = axios.post('/log',InsertLogs.getLogs())
          //  const response =  request.data

           window.location.href = "/#/admin/assetstatusviewer"
            
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
      
                const request = placeHolderAPI 
                  .post('/log',submitLogs.getLogs())
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
          <Card bg={graphCardBg}>
          <FormControl>
          <Card bg={'white'}>
            
            <Box>
              <FormLabel fontSize={{ base: "sm" }}>Status Name:  </FormLabel>
              <Input id='statusname' label="Status name" placeholder="Status Name" 
              value={values.statusname}
              onChange={ e => {
                setStatus( { ...values, statusname: e.target.value } )}}
              />    
            </Box>
            <Box>
              <FormLabel fontSize={{ base: "sm" }}>Description:  </FormLabel>
              <Input id='description' label="Description" placeholder="Description" 
              value={values.description}
              onChange={ e => {
                setStatus( { ...values, description: e.target.value } )}}
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
          </Card>
        </Stack>
      
    );
  }
  