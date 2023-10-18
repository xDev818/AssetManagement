/*

  Date : 10 / 18 / 23
  Author : Nole
  Activities
  Purpose : 
    update DepartmentViewer.js
    import { Link as Anchor } from "react-router-dom";
    Update location :
      import axios from "axios";
      import { useEffect,useState } from "react";
      import React from "react";
      import { Button, ButtonGroup } from "@chakra-ui/react";
      Remove : import FourGraphs from "components/FourGraphs/FourGraphs";
*/


import { Link as Anchor } from "react-router-dom";
import axios from "axios";
import { useEffect,useState } from "react";
import React from "react";
import decoder from "jwt-decode";

import Logs from "components/Utils/logs_helper";


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


export default function DepartmentViewer() {

  var userID = "" 

  const [departments, setDepartments] = useState([]);
  
  const LoadallDepartments = async () => {
    try {

      const tokenStorage = localStorage.getItem("token");
      const tokenDecoded = decoder(tokenStorage);

      userID = tokenDecoded.result[0].userDisplayID;

      const res = await axios.get("/get_all_departments");
      const data = await res.data;
      
      setDepartments(res.data.result)

    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    LoadallDepartments()
  }, []);


    const handleDelete = async (event,departmentid,departmentname) => {

      try {
        event.preventDefault()
        //alert("Delete ID : " + statusid)
        const deleteSuccess = await axios.post("/deleteDepartmentByID",{departmentid})
        .then((res) => {

          alert("Delete Successfull")

          LoadallDepartments()

          const deleteLogs = new Logs(
            'Info',
            "Department Viewer",
            "Function /handleDelete",
            'Delete departmentID :  ' + departmentid 
            + '   Departmentname :  ' + departmentname,
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

  return (
    <Box px={3}>
      <Card>
        <TableContainer>
          <Button colorScheme="green">
            <Anchor
                to={{
                pathname: "/admin/department",
                state: { departmentID: '' }
                }}>
              Create
            </Anchor>
            </Button>
          <Table size="lg">
            <Thead>
              <Tr>
                <Th>actions</Th>
                <Th>Department</Th>
                <Th>Description</Th>
              </Tr>
            </Thead>
            <Tbody>
                {departments.map((department) => (
                  <Tr key={department.departmentDisplayID}>
                    <Td>
                      <ButtonGroup>
                        <Button
                          colorScheme="red"
                          onClick={(e) => handleDelete(e,department.departmentDisplayID,department.departmentName)}
                        >
                          Delete
                        </Button>
                        <Button
                          colorScheme="blue"
                          
                        >
                           <Anchor
                            to={{
                            pathname: "/admin/department",
                            state: { departmentID: department.departmentDisplayID }
                            }}>
                           Edit
                          </Anchor>

                        </Button>
                      </ButtonGroup>
                    </Td>
                    <Td>{department.departmentName}</Td>
                    <Td>{department.description}</Td>
                  </Tr>
                ))}
              </Tbody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
