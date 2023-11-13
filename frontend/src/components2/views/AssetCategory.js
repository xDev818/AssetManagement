
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
  } from "@chakra-ui/react";
  import { Button, ButtonGroup } from "@chakra-ui/react";
  
  import Modal1 from "components2/Modal/Modal";
  import Card from "components/Card/Card";
  
  
  export default function AssetCategory () {

    const graphCardBg = '#e6f2ff'
    const textColor = "#00334d"

    const [values,setCaegory] = useState({
      asset_categoryid:'',
      asset_categoryname:'',
      asset_categorydescription:''
  })

    const [btnstate,setbtnState] = useState()


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
              //setbtnState("Save")
              alert(err);
              window.location.href = '/'; 
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
        alert(err)
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
            
              alert("Insert Successful")

              const InsertLogs = new Logs(
                'Info',
                "Asset Status",
                "Function /handleUpdate",
                ' Create   Statusname :  ' + categoryvalues.asset_categoryname,
                userID
              )
      
             // const request = axios.post('/log',InsertLogs.getLogs())
             // const response =  request.data

             window.location.href = "/#/admin/assetscategory-viewer"
              

            })
            .catch((err) => {
              alert(err);
            });
        } else if(!categoryvalues.asset_categoryid == "") {
          /// update here
          const success = await placeHolderAPI 
            .post('/assetcategory/updateAssetCategory',categoryvalues)
          .then((res) => {
          
            alert("Update Successful")

            const InsertLogs = new Logs(
              'Info',
              "Asset Status",
              "Function /handleUpdate",
              ' Update StatusID : ' +  categoryvalues.asset_categoryid
              + ' Statusname :  ' + categoryvalues.asset_categoryname,
              userID
            )
    
          //  const request = axios.post('/log',InsertLogs.getLogs())
          //  const response =  request.data

           window.location.href = "/#/admin/assetscategory-viewer"
            
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
              <Input id='asset_categoryname' label="Asset Category name" placeholder="Asset Category Name" 
              value={values.asset_categoryname}
              onChange={ e => {
                setCaegory( { ...values, asset_categoryname: e.target.value } )}}
              />    
            </Box>
            <Box>
              <FormLabel fontSize={{ base: "sm" }}>Description:  </FormLabel>
              <Input id='asset_categorydescription' label="Description" placeholder="Description" 
              value={values.asset_categorydescription}
              onChange={ e => {
                setCaegory( { ...values, asset_categorydescription: e.target.value } )}}
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
  