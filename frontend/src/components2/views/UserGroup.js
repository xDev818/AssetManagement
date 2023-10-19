
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
  } from "@chakra-ui/react";
  import { Button, ButtonGroup } from "@chakra-ui/react";
  
  import Modal1 from "components2/Modal/Modal";
  import Card from "components/Card/Card";
 
  
  export default function UserGroup () {

    const [values,setUserGroup] = useState({
      usergroup_id:'',
      usergroup_name:'',
      usergroup_description:''
  })

    const location = useLocation()
    const  usergroup_id  = location.state?.userGroupID
    const [btnstate,setbtnState] = useState()


    useEffect(() => {
      
      try {
        
        if(usergroup_id) {
        
            axios.get('/usergroup/getUserGroupByID/' + usergroup_id)
            .then((res) => {
              setbtnState("Update")
                setCaegory({
                  ...values,
                  usergroup_id: res.data.result[0].id,
                  usergroup_name: res.data.result[0].categoryName,
                  usergroup_description: res.data.result[0].categoryDesc
                })
               
            })
            .catch((err) => {
              alert(err);
            });
          
        } else {
          setbtnState("Save")
           
            setCaegory({
              ...values,
                usergroup_id: '',
                usergroup_name: '',
                usergroup_description: ''
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

      

        const usergroupvalues = {
          usergroup_id: values.usergroup_id,
          usergroup_name: values.usergroup_name,
          usergroup_description: values.usergroup_description,
          userID: userID
        }

        if(usergroupvalues.usergroup_id === "") {
            // insert here
            const success = await axios.post('/assetcategory/createAssetCategory',usergroupvalues)
            .then((res) => {
            
              alert("Insert Successful")

              const InsertLogs = new Logs(
                'Info',
                "Asset Status",
                "Function /handleUpdate",
                ' Create   Statusname :  ' + usergroupvalues.usergroup_name,
                userID
              )
      
             // const request = axios.post('/log',InsertLogs.getLogs())
             // const response =  request.data

             window.location.href = "/#/admin/usergroup-viewer"
              

            })
            .catch((err) => {
              alert(err);
            });
        } else if(!usergroupvalues.usergroup_id == "") {
          /// update here
          const success = await axios.post('/assetcategory/updateAssetCategory',usergroupvalues)
          .then((res) => {
          
            alert("Update Successful")

            const InsertLogs = new Logs(
              'Info',
              "Asset Status",
              "Function /handleUpdate",
              ' Update StatusID : ' +  usergroupvalues.usergroup_id
              + ' Statusname :  ' + usergroupvalues.usergroup_name,
              userID
            )
    
          //  const request = axios.post('/log',InsertLogs.getLogs())
          //  const response =  request.data

           window.location.href = "/#/admin/usergroup-viewer"
            
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
        </Stack>
      
    );
  }
  