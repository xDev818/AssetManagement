/* 

    Date : 10 / 18 / 23
    Author : Nole
    Activities
    Purpose : 
      import { Link as Anchor } from "react-router-dom";
      import Logs from "components/Utils/logs_helper";
      import { useEffect, useState } from "react";
      import axios from "axios";
      import decoder from "jwt-decode";
      import generate_PDF from "components/Utils/generate_PDF";

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
          console.log(res.data.result)
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

  const handleReport =() => {
      try {

          generate_PDF(positions,'Position')

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
            <ButtonGroup spacing={6}>
            <Button
              colorScheme='messenger'
            >
     
              <Link
                  to={{
                  pathname: "/admin/position",
                  state: { positionID: '' },
                  }}>
                New
              </Link>

            </Button>
            <Button
             colorScheme='green'
              
              onClick={handleReport}
              
            >        
             PDF Report
            </Button>
            </ButtonGroup>
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
