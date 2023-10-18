/* 

    Date : 10 / 18 / 23
    Author : Nole
    Activities
    Purpose : 
      create PositionViewer.js

*/

import { Link as Anchor } from "react-router-dom";
import Logs from "components/Utils/logs_helper";
import { useEffect, useState } from "react";
import axios from "axios";
import decoder from "jwt-decode";

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
import { Button, ButtonGroup } from "@chakra-ui/react";
import Card from "components/Card/Card";
import { Link } from "react-router-dom";

export default function PositionViewer() {


  
  var userID = ""

  const [positions, setPositions] = useState([]);

  useEffect(() => {
    LoadAllPositions()
  }, []);

  const LoadAllPositions = async () => {
    try {
      const tokenStorage = localStorage.getItem("token");
      const tokenDecoded = decoder(tokenStorage);

      userID = tokenDecoded.result[0].userDisplayID;

      const success = await axios.get("/positions/viewallpositions")

        .then((res) => {
          setPositions(res.data.result);

        })
        .catch((err) => {
          
          const InsertLogs = new Logs(
            'Error',
            "PositionViewer",
            "Function /LoadAllPositions",
            'LoadAllPositions',
            userID
          )
          
        });
    }
    catch(err) {
      alert(err)
    }
  }

  const handleDelete = async (event,positionID,positionname) => {

    try {
      event.preventDefault()
      
      const deleteSuccess = await axios.post("/positions/deletePosition",{positionID})
      .then((res) => {

        alert("Delete succes")

        LoadAllPositions()

        const deleteLogs = new Logs(
          'Info',
          "Position Viewer",
          "Function /handleDelete",
          'Delete statusID :  ' + positionID 
          + '   Statusname :  ' + positionname,
          userID
        )

        
       // const request = axios.post('/log',deleteLogs.getLogs())
       // const response =  request.data
        

      })
      .catch((err) => {
        alert(err)
      })
    } catch(err) {
        alert(err)
    }

  }

  return (
    <>
      <Stack>
        <Card>
          <TableContainer>
            <Box
              bgColor="green.600"
              w="100px"
              textAlign="center"
              py="2"
              borderRadius={5}
              textColor="white"
            >
              {/*</Box><Link to="/admin/assetstatus"  state={{ from: "occupation" }}>Create Test</Link> */ }
              
              <Link
                  to={{
                  pathname: "/admin/position",
                  state: { positionID: '' },
                  }}>
                Create
              </Link>

            </Box>
            <Table size="lg">
              <Thead>
                <Tr>
                  <Th>Actions</Th>
                  <Th>Position Name</Th>
                  <Th>Department Name</Th>
                  <Th>Description</Th>
                </Tr>
              </Thead>
              <Tbody>
                {positions.map((position) => (
                  <Tr key={position.id}>
                    <Td>
                      <ButtonGroup>
                        <Button
                          colorScheme="red"
                          onClick={(e) => handleDelete(e,position.id,position.positionName)}
                        >
                          Delete
                        </Button>
                        <Button
                          colorScheme="blue"
                          
                        >
                          <Link
                            to={{
                            pathname: "/admin/position",
                            state: { positionID: position.id }
                            }}>
                           Edit
                          </Link>
                        </Button>
                  
                      </ButtonGroup>
                    </Td>
                    <Td>{position.positionName}</Td>
                    <Td>{position.departmentName}</Td>
                    <Td>{position.description}</Td>
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
