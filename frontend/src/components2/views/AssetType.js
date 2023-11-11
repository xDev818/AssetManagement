
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
    Select
  } from "@chakra-ui/react";
  import { Button, ButtonGroup } from "@chakra-ui/react";
  
  import Modal1 from "components2/Modal/Modal";
  import Card from "components/Card/Card";
  
  
  export default function AssetType () {

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


    const SetUsers = async () => { 

        const tokenStorage = localStorage.getItem("token");
        const tokenDecoded = decoder(tokenStorage);
    
         setUser({...userdata,
    
          userID : tokenDecoded.result[0].userDisplayID
    
      })
      }

      const LoadAllCategories = async () => {
        try {

          const success = await axios
            .get("/assetcategory/viewassetcategory")
    
            .then((res) => {
              setCategories(res.data.result);
            })
            .catch((err) => {
              const InsertLogs = new Logs(
                "Error",
                "PositionViewer",
                "Function /LoadAllPositions",
                "LoadAllPositions",
                userID
              );
            });
        } catch (err) {
          
          alert(err);
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
        
            axios.get('/assettype/get-AssetTypeByID/' + asset_typeID)
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
              alert(err);
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
        alert(err)
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
            const success = await axios.post('/assettype/create-AssetType',typevalues)
            .then((res) => {
            
              alert("Insert Successful")

              const InsertLogs = new Logs(
                'Info',
                "Asset Status",
                "Function /handleUpdate",
                ' Create   Statusname :  ' + typevalues.asset_typename,
                userdata.userID
              )
      
             // const request = axios.post('/log',InsertLogs.getLogs())
             // const response =  request.data

             window.location.href = "/#/admin/assetstype-viewer"
              

            })
            .catch((err) => {
              alert(err);
            });
        } else if(!typevalues.asset_typeid == "") {
          /// update here
          const success = await axios.post('/assettype/update-AssetType',typevalues)
          .then((res) => {
          
            alert("Update Successful")

            const InsertLogs = new Logs(
              'Info',
              "Asset Status",
              "Function /handleUpdate",
              ' Update StatusID : ' +  typevalues.asset_typeid
              + ' Statusname :  ' + typevalues.asset_typename,
              userdata.userID
            )
    
          //  const request = axios.post('/log',InsertLogs.getLogs())
          //  const response =  request.data

           window.location.href = "/#/admin/assetstype-viewer"
            
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
                userdata.userID
              )
              
              alert( submitLogs.getMessage() )

            } else if ( errorStatus.includes('ERR_BAD_REQUEST') ) {
             
              const submitLogs = new Logs(
                'Error',
                "Asset Status",
                "Function /HandleSubmit",
                err.response.data.message,
                userdata.userID
              )
      
              try {
      
                const request = axios.post('/log',submitLogs.getLogs())
                const response =  request.data
                console.log(response)
      
              } catch ( err ) {
                console.log(err)
                const logStatus = err.code
      
                if( logStatus.includes("ERR_NETWOR") ) {
      
                  const submitLogs = new Logs(
                    "DB",
                    "Asset Status",
                    "Function /HandleSubmit",
                    err,
                    userdata.userID
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
                    userdata.userID
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
          <Card bg={'white'}>
          <FormControl>
          
          <Box>
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
            <Box>
              <FormLabel fontSize={{ base: "sm" }}>Status Name:  </FormLabel>
              <Input id='asset_typename' label="Asset Type name" placeholder="Asset Type Name" 
              value={values.asset_typename}
              onChange={ e => {
                setAssetType( { ...values, asset_typename: e.target.value } )}}
              />    
            </Box>
            <Box>
              <FormLabel fontSize={{ base: "sm" }}>Description:  </FormLabel>
              <Input id='asset_typedescription' label="Description" placeholder="Description" 
              value={values.asset_typedescription}
              onChange={ e => {
                setAssetType( { ...values, asset_typedescription: e.target.value } )}}
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
          
          </FormControl>
          </Card>
          </Card>
        </Stack>
      
    );
  }
  