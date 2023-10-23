
/* 

    Date : 10 / 23 / 23
    Author : Nole
    Activities
    Purpose : 
      created Checkout Asset
        
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
    
  } from "@chakra-ui/react";
  import { Button, ButtonGroup } from "@chakra-ui/react";
  
  import Modal1 from "components2/Modal/Modal";
  import Card from "components/Card/Card";
 
  
  export default function CheckOut () {

    var userID =''
    const [values,setPosition] = useState({
      positionid:'',
      positionname:'',
      description:'',
      departmentid: '',
      departmentname: ''
  })

  const [assets, setAssets] = useState([]);
  
    
    // const location = useLocation()
    // const  positionID  = location.state?.positionID
    const [btnstate,setbtnState] = useState()


    const LoadallDepartments = async () => {
      try {
       
        const tokenStorage = localStorage.getItem("token");
        const tokenDecoded = decoder(tokenStorage);
  
        userID = tokenDecoded.result[0].userDisplayID;
  
        const res = await axios.get("/get_all_departments");
        const data = await res.data;
        
        setDepartments(res.data.result)
      
  
      } catch (err) {
        alert(err)
      }
    };
  

    useEffect(() => {
      
      try {
        
        if(positionID) {
        
            axios.get('/positions/getPositionID/' + positionID)
            .then((res) => {
              setbtnState("Update")
                setPosition({
                  ...values,
                  positionid: res.data.result[0].positionDisplayID,
                  positionname: res.data.result[0].positionName,
                  description: res.data.result[0].description,
                  departmentid: res.data.result[0].departmentDisplayID,
                  departmentname: res.data.result[0].departmentName
                })
               
            })
            .catch((err) => {
              alert(err);
            });
          
        } else {
          setbtnState("Save")
           
          setPosition({
            ...values,
            positionid: '',
            positionname: '',
            description: '',
            departmentid: '',
            departmentname: ''
          })
        }

      }
      catch(err) {
        alert(err)
      }
    }, [])

    useEffect(() => {
        
      try { 

        LoadallDepartments();
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

      

        const positionvalues = {
          positionid: values.positionid,
          positionname: values.positionname,
          description: values.description,
          departmentid: values.departmentid,
          departmentname: values.departmentname,
          userID: userID
        }



        if(positionvalues.positionid === "") {
            // insert here
            const success = await axios.post('/positions/createNewPosition',positionvalues)
            .then((res) => {
            
              alert("Insert Successful")

              const InsertLogs = new Logs(
                'Info',
                "Asset Status",
                "Function /handleUpdate",
                ' Create   Position name :  ' + positionvalues.positionname,
                userID
              )
      
             // const request = axios.post('/log',InsertLogs.getLogs())
             // const response =  request.data

             window.location.href = "/#/admin/position-viewer"
              

            })
            .catch((err) => {
              alert(err);
            });
        } else if(!positionvalues.positionid == "") {
          /// update here
          const success = await axios.post('/positions/updatePosition',positionvalues)
          .then((res) => {
          
            alert("Update Successful")

            const InsertLogs = new Logs(
              'Info',
              "Asset Status",
              "Function /handleUpdate",
              ' Update Position ID : ' +  positionvalues.positionid
              + ' Position Name :  ' + positionvalues.positionname,
              userID
            )
    
          //  const request = axios.post('/log',InsertLogs.getLogs())
          //  const response =  request.data

           window.location.href = "/#/admin/position-viewer"
            
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
            <Select placeholder='Select option' size='md'
             onChange={ e => {
              setPosition( { ...values, departmentid: e.target.value } )}}
              value={values.departmentid}
             >
              {departments.map((department) => (
                <option value={department.departmentDisplayID} size='md'> 
                  {department.departmentName}
                </option>
                ))
                
              }

            </Select>

            </Box>
            <Box>
              <FormLabel fontSize={{ base: "sm" }}>Status Name:  </FormLabel>
              <Input id='positionname' label="Position name" placeholder="Position Name" 
              value={values.positionname}
              onChange={ e => {
                setPosition( { ...values, positionname: e.target.value } )}}
              />    
            </Box>
            <Box>
              <FormLabel fontSize={{ base: "sm" }}>Description:  </FormLabel>
              <Input id='description' label="Description" placeholder="Description" 
              value={values.description}
              onChange={ e => {
                setPosition( { ...values, description: e.target.value } )}}
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
  