
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
 
  
  export default function AssetStatus () {

    const [values,setStatus] = useState([])

    const location = useLocation()
    const  statusID  = location.state?.assetstatID

    useEffect(() => {

      try {
       
        if(statusID) {
          alert("sss " + statusID)
            axios.get('/getStatusbyID/' + statusID)
            .then((res) => {
              setStatus(res.data.result);
              
              console.log(res.data.result);
            })
            .catch((err) => {
              console.log(err);
            });
          
        } else {
          alert("Empty : " + statusID)
        }

      }
      catch(err) {
        alert(err)
      }
    }, [])

    return (

        <Stack>
          <FormControl>
          <Card>
            <Box>
              <FormLabel fontSize={{ base: "sm" }}>Status Name:  </FormLabel>
              <Input id='statusname' label="Status name" placeholder="Status Name"  />    
            </Box>
            <Box>
              <FormLabel fontSize={{ base: "sm" }}>Description:  </FormLabel>
              <Input id='description' label="Description" placeholder="Description" />    
            </Box>
            <Box>
            <Button colorScheme="green">
              <Link
                  to={{
                  pathname: "/admin/assetstatusviewer"
                  }}>
                  Update Profile
              </Link>
            </Button>
          </Box>
          </Card>
          </FormControl>
        </Stack>
      
    );
  }
  