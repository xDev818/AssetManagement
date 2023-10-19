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

    Date : 10 / 18 / 23
    Author : Nole
    Activities
    Purpose : 
      update useEffect(() => { .. }
      new function LoadAllStatus - use in useEffect and Delete Function
      new function handleDelete for ( Delete asste by Stat ID )
      new function handleReport 
        *** Generate PDF Report
        
*/

import { Link as Anchor } from "react-router-dom";
import Logs from "components/Utils/logs_helper";
import { useEffect, useState } from "react";
import axios from "axios";
import decoder from "jwt-decode";
import generate_PDF from "components/Utils/generate_PDF";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stack,
  Box,
} from "@chakra-ui/react";
import { Button, ButtonGroup,Wrap,WrapItem } from "@chakra-ui/react";
import Card from "components/Card/Card";
import { Link } from "react-router-dom";

export default function AssetStatusViewer() {
  //const handleNew_Edit = (statusID) => {};

  /* 

*/
  var userID = ""

  const [assetStatus, setStatus] = useState([]);

  useEffect(() => {
    LoadAllStatus()
  }, []);

  const LoadAllStatus = async () => {
    try {
      const tokenStorage = localStorage.getItem("token");
      const tokenDecoded = decoder(tokenStorage);

      userID = tokenDecoded.result[0].userDisplayID;

      const success = await axios.get("/getallStatus")
        //axios.get('/getViewallStatus')
        .then((res) => {
          setStatus(res.data.result);

        })
        .catch((err) => {
          
          const InsertLogs = new Logs(
            'Error',
            "Asset Status Viewer",
            "Function /LoadAllStatus",
            'LoadAllStatus',
            userID
          )

          
        });
    }
    catch(err) {
      alert(err)
    }
  }

  const handleDelete = async (event,statusid,statusname) => {

    try {
      event.preventDefault()
      //alert("Delete ID : " + statusid)
      const deleteSuccess = await axios.post("/deleteStatusbyID",{statusid})
      .then((res) => {

        alert("Delete Successfull")

        LoadAllStatus()

        const deleteLogs = new Logs(
          'Info',
          "Asset Status Viewer",
          "Function /handleDelete",
          'Delete statusID :  ' + statusid 
          + '   Statusname :  ' + statusname,
          userID
        )

        const request = axios.post('/log',deleteLogs.getLogs())
        const response =  request.data
        

      })
      .catch((err) => {
        alert(err)
      })
    } catch(err) {
        alert(err)
    }

  }

  const handleReport =() => {
    try {

    

        generate_PDF(assetStatus,'Asset Status')

    }
    catch(err) {
      alert(err)
    }
  }

  return (
    <>
      <Stack>
        <Card>
          <TableContainer>
          <Wrap spacing={4}>
          <WrapItem>
            <Button   
              colorScheme='messenger'
            >
              
              <Link
                  to={{
                  pathname: "/admin/assetstatus",
                  state: { assetstatID: '' },
                  }}>
                New
              </Link>

            </Button>
            </WrapItem>
            
            <WrapItem>
            <Button
             colorScheme='green'
              
              onClick={handleReport}
              
            >        
             PDF Report
            </Button>
            </WrapItem>
            </Wrap>
            <Table size="lg">
              <Thead>
                <Tr>
                  <Th>Actions</Th>
                  <Th>Status Name</Th>
                  <Th>Description</Th>
                </Tr>
              </Thead>
              <Tbody>
                {assetStatus.map((status) => (
                  <Tr key={status.assetStatusID}>
                    <Td>
                      <ButtonGroup>
                        <Button
                          colorScheme="red"
                          onClick={(e) => handleDelete(e,status.assetStatusID,status.statusName)}
                        >
                          Delete
                        </Button>
                        <Button
                          colorScheme="blue"
                          
                        >
                          <Link
                            to={{
                            pathname: "/admin/assetstatus",
                            state: { assetstatID: status.assetStatusID }
                            }}>
                           Edit
                          </Link>
                        </Button>
                  
                      </ButtonGroup>
                    </Td>
                    <Td>{status.statusName}</Td>
                    <Td>{status.statusDescription}</Td>
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
