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

    Date : 10 / 18 / 23
    Author : Nole
    Activities
    Purpose : 
      Added in import 
          Menu
          MenuButton,
          MenuList,
          MenuItem,
      import { ChevronDownIcon} from '@chakra-ui/icons'

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
  IconButton,
  Icon,
  Input,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import { Button, ButtonGroup, Wrap, WrapItem } from "@chakra-ui/react";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";
import Card from "components/Card/Card";
import { Link } from "react-router-dom";
import Pagination from "components2/Pagination/Pagination";
import { TbodyRes } from "components2/Pagination/Pagination";
import Search from "components2/Search/Search";

export default function PositionViewer() {
  var userID = "";

  const [positions, setPositions] = useState([]);
  const [search, setSearch] = useState("");

  const [positionId, setPositionId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tablePerPage = 6;
  const lastIndex = currentPage * tablePerPage;
  const firstIndex = lastIndex - tablePerPage;
  const tables = positions.slice(firstIndex, lastIndex);
  const tablePages = Math.ceil(positions.length / tablePerPage);
  const pageNumber = [...Array(tablePages + 1).keys()].slice(1);

  const filteredTables = tables.filter((item) => {
    const searchLower = search.toLowerCase();
    const itemText = Object.values(item).join(" ").toLowerCase();
    return searchLower === "" || itemText.includes(searchLower);
  });

  const nextPage = () => {
    if (currentPage !== tablePages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // const nextPage = () => {
  //   if (currentPage !== tablePages) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  // const prevPage = () => {
  //   if (currentPage !== 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  const currentNumber = (number) => {
    setCurrentPage(number);
  };

  useEffect(() => {
    LoadAllPositions();
  }, []);

  const LoadAllPositions = async () => {
    try {
      const tokenStorage = localStorage.getItem("token");
      const tokenDecoded = decoder(tokenStorage);

      userID = tokenDecoded.result[0].userDisplayID;

      const success = await axios
        .get("/positions/viewallpositions")

        .then((res) => {
          setPositions(res.data.result);
          console.log(res.data.result);
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

  const handleDelete = async (event, positionID, positionname) => {
    try {
      event.preventDefault();

      const deleteSuccess = await axios
        .post("/positions/deletePosition", { positionID })
        .then((res) => {
          alert("Delete succes");

          LoadAllPositions();

          const deleteLogs = new Logs(
            "Info",
            "Position Viewer",
            "Function /handleDelete",
            "Delete statusID :  " +
              positionID +
              "   Statusname :  " +
              positionname,
            userID
          );

          // const request = axios.post('/log',deleteLogs.getLogs())
          // const response =  request.data
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
      generate_PDF(positions, "Position");
    } catch (err) {
      alert(err);
    }
  };

  console.log("tables", tables, positions);

  return (
    <>
      <Stack>
        <Card height={694} position="relative">
          <TableContainer>
            {/*   state: { positionID: '' }, */}
            <Search
              setSearch={setSearch}
              handleReport={handleReport}
              pathname="/admin/position"
            />

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
                  .map((position) => (
                    <Tr key={position.id}>
                      <Td>
                        <ButtonGroup>
                          <Button
                            colorScheme="red"
                            onClick={(e) =>
                              handleDelete(
                                e,
                                position.id,
                                position.positionName
                              )
                            }
                          >
                            <DeleteIcon />
                          </Button>
                          <Button colorScheme="blue">
                            <Link
                              to={{
                                pathname: "/admin/position/" + position.id,
                                state: { positionID: position.id },
                              }}
                            >
                              <EditIcon />
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

            <Pagination
              data={positions}
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
