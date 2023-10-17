/* 

    Date : 10 / 16 / 23
    Author : Nole
    Activities
    Purpose : 
      Create AssetStatus.js

      import { Link as Anchor } from 'react-router-dom'
      import Logs from 'components/Utils/logs_helper'
      import axios from 'axios'

      Create useEffect to load the Asset Status

*/

import { Link as Anchor } from 'react-router-dom'
import Logs from 'components/Utils/logs_helper'
import  { useEffect, useState } from 'react'
import axios from 'axios'
import decoder from 'jwt-decode'


import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stack,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import Card from "components/Card/Card";


export default function AssetStatusViewer() {
  

  // const navigate = useNavigate()

  // const handleNew_Edit = (statusID) => {
   
  //   navigate('/admin/assestatus',{})

  //   };
   

/* 

*/


const [assetStatus,setStatus] = useState([])


useEffect( () => {


  const tokenStorage = localStorage.getItem('token')
  const tokenDecoded = decoder(tokenStorage)

  const userID =tokenDecoded.result[0].userDisplayID


  axios.get('/getViewallStatus')
  //axios.get('/getViewallStatus')
  .then((res) => {

  setStatus(res.data.result)
  //console.log("userID : " , userID)
  console.log(" What value : " , res.data.result)

  })
  .catch(err => {

    console.log(err)

  })

    
}, [])

  return (
    <>
      <Stack>
        <Card>
          <TableContainer>
            <Button colorScheme="green">
              Create Test
            </Button>
            <Table size="lg">
              <Thead>
                <Tr>
                  <Th>Actions</Th>
                  <Th>Status Name</Th>
                  <Th>Description</Th>
                </Tr>
              </Thead>
              <Tbody>
                {assetStatus.map((item) => (
                  <Tr key={item.assetStatusID}>
                    <Td>
                      <ButtonGroup>
                        <Button
                          colorScheme="red"
                          onClick={() => handleDelete(item.assetStatusID)}
                        >
                          Delete
                        </Button>
                        <Button
                          colorScheme="blue"
                          onClick={() => handleNew_Edit(item.assetStatusID)}
                        >
                          Edit
                        </Button>
                      </ButtonGroup>
                    </Td>
                    <Td>{item.statusName}</Td>
                    <Td>{item.statusDescription}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            
          </TableContainer>
        </Card>
      </Stack>
    </>
  );
}


