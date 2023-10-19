
/* 




    Date : 10 / 19 / 23
    Author : Nole
    Activities
    Purpose : 
      create UserGroup.js

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
import { Button, ButtonGroup } from "@chakra-ui/react";
import Card from "components/Card/Card";
import { Link } from "react-router-dom";

export default function UserGroupViewer() {

  
  var userID = ""

  const [usergroups, setUserGroups] = useState([]);

  useEffect(() => {
    LoadAllUserGroups()
  }, []);

  const LoadAllUserGroups = async () => {
    try {
      const tokenStorage = localStorage.getItem("token");
      const tokenDecoded = decoder(tokenStorage);

      userID = tokenDecoded.result[0].userDisplayID;

      const success = await axios.get("/usergroup/viewuser-group")

        .then((res) => {
          setUserGroups(res.data.result);

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

  const handleDelete = async (event,usergroup_id,usergroupname) => {

    try {
      event.preventDefault()
      
      const deleteSuccess = await axios.post("/usergroup/delete-usergroup",{usergroup_id})
      .then((res) => {

        alert("Delete succes")

        LoadAllUserGroups()

        const deleteLogs = new Logs(
          'Info',
          "Position Viewer",
          "Function /handleDelete",
          'Delete statusID :  ' + usergroup_id
          + '   Statusname :  ' + usergroupname,
          userID
        )

      

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
          console.log(usergroups)
          generate_PDF(usergroups,'User Group')

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
     
              <Anchor
                  to={{
                  pathname: "/admin/usergroup",
                  state: { userGroupID: '' },
                  }}>
                New
              </Anchor>

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
                  <Th>Name</Th>
                  <Th>Description</Th>
                </Tr>
              </Thead>
              <Tbody>
                {usergroups.map((group) => (
                  <Tr key={group.id}>
                    <Td>
                      <ButtonGroup>
                        <Button
                          colorScheme="red"
                          onClick={(e) => handleDelete(e,group.id,group.categoryName)}
                        >
                          Delete
                        </Button>
                        <Button
                          colorScheme="blue"
                          
                        >
                          <Link
                            to={{
                            pathname: "/admin/usergroup",
                            state: { userGroupID: group.id }
                            }}>
                           Edit
                          </Link>
                        </Button>
                  
                      </ButtonGroup>
                    </Td>
                    <Td>{group.categoryName}</Td>
                    <Td>{group.categoryDesc}</Td>

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
