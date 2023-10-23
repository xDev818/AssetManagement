/* 

    Date : 10 / 19 / 23
    Author : Nole
    Activities
    Purpose : 
      create UserGroupViewer.js

    Date : 10 / 23 / 23
    Author : Nole
    Activities
    Purpose : 
      import generate_EXCEL from "components/Utils/generate_EXCEL";
      New Functionality
        const handleExcelReport = () => {
            try {
              generate_EXCEL(positions, "Position");
            } catch (err) {
              alert(err);
            }
          };

*/

import { Link as Anchor } from "react-router-dom";
import Logs from "components/Utils/logs_helper";
import { useEffect, useState } from "react";
import axios from "axios";
import decoder from "jwt-decode";
import generate_PDF from "components/Utils/generate_PDF";
import generate_EXCEL from "components/Utils/generate_EXCEL";


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
import Search from "components2/Search/Search";
import Pagination from "components2/Pagination/Pagination";

export default function UserGroupViewer() {
  var userID = "";

  const [usergroups, setUserGroups] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const tablePerPage = 6;
  const lastIndex = currentPage * tablePerPage;
  const firstIndex = lastIndex - tablePerPage;
  const tables = usergroups.slice(firstIndex, lastIndex);
  const tablePages = Math.ceil(usergroups.length / tablePerPage);
  const pageNumber = [...Array(tablePages + 1).keys()].slice(1);

  const nextPage = () => {
    console.log("cureentpage", currentPage);
    if (currentPage !== tablePages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentNumber = (number) => {
    setCurrentPage(number);
  };

  useEffect(() => {
    LoadAllUserGroups();
  }, []);

  const LoadAllUserGroups = async () => {
    try {
      const tokenStorage = localStorage.getItem("token");
      const tokenDecoded = decoder(tokenStorage);

      userID = tokenDecoded.result[0].userDisplayID;

      const success = await axios
        .get("/usergroup/viewuser-group")

        .then((res) => {
          setUserGroups(res.data.result);
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
    }
  };

  const handleDelete = async (event, usergroup_id, usergroupname) => {
    try {
      event.preventDefault();

      const deleteSuccess = await axios
        .post("/usergroup/delete-usergroup", { usergroup_id })
        .then((res) => {
          alert("Delete succes");

          LoadAllUserGroups();

          const deleteLogs = new Logs(
            "Info",
            "Position Viewer",
            "Function /handleDelete",
            "Delete statusID :  " +
              usergroup_id +
              "   Statusname :  " +
              usergroupname,
            userID
          );
        })
        .catch((err) => {
          alert(err);
        });
    } catch (err) {
      alert(err);
    }
  };

  const handleReport = () => {
    try {
      generate_PDF(usergroups, "User Group");
    } catch (err) {
      alert(err);
    }
  };

  const handleExcelReport = () => {
    try {
      generate_EXCEL(usergroups, "User Group");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <Stack>
        <Card height={694} position="relative">
          <TableContainer>
            {/*to={{
                  pathname: "/admin/usergroup",
                  state: { userGroupID: '' },
                  }}  */}
            <Search
              setSearch={setSearch}
              handleReport={handleReport}
              handleExcelReport={handleExcelReport}
              pathname="/admin/usergroup"
            />

            <Table size="lg">
              <Thead>
                <Tr>
                  <Th>Actions</Th>
                  <Th>Name</Th>
                  <Th>Description</Th>
                </Tr>
              </Thead>
              <Tbody>
                {tables
                  .filter((item) => {
                    const searchLower = search.toLowerCase();
                    const itemText = Object.values(item)
                      .join(" ")
                      .toLowerCase();
                    return search.toLowerCase() === ""
                      ? item
                      : itemText.includes(searchLower);
                  })
                  .map((group) => (
                    <Tr key={group.id}>
                      <Td>
                        <ButtonGroup>
                          <Button
                            colorScheme="red"
                            onClick={(e) =>
                              handleDelete(e, group.id, group.categoryName)
                            }
                          >
                            Delete
                          </Button>
                          <Button colorScheme="blue">
                            <Link
                              to={{
                                pathname: "/admin/usergroup/" + group.id ,
                                state: { userGroupID: group.id },
                              }}
                            >
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
            <Pagination
              data={usergroups}
              currentPage={currentPage}
              nextPage={nextPage}
              prevPage={prevPage}
              currentNumber={currentNumber}
              pageNumber={pageNumber}
            />
          </TableContainer>
        </Card>
      </Stack>
    </>
  );
}
