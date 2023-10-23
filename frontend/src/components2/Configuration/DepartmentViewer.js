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
      import generate_PDF from "components/Utils/generate_PDF";
*/

import { Link as Anchor } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import decoder from "jwt-decode";
import generate_PDF from "components/Utils/generate_PDF";

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
  IconButton,
  Flex,
  Input,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import Card from "components/Card/Card";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Pagination from "components2/Pagination/Pagination";
import { Link } from "react-router-dom";
import Search from "components2/Search/Search";

export default function DepartmentViewer() {
  var userID = "";

  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const tablePerPage = 6;
  const lastIndex = currentPage * tablePerPage;
  const firstIndex = lastIndex - tablePerPage;
  const tables = departments.slice(firstIndex, lastIndex);
  const tablePages = Math.ceil(departments.length / tablePerPage);
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

  const LoadallDepartments = async () => {
    try {
      const tokenStorage = localStorage.getItem("token");
      const tokenDecoded = decoder(tokenStorage);

      userID = tokenDecoded.result[0].userDisplayID;

      const res = await axios.get("/get_all_departments");
      const data = await res.data;
      console.log("data", data);
      setDepartments(res.data.result);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    LoadallDepartments();
  }, []);

  const handleDelete = async (
    event,
    departmentid,
    departmentname,
    pathname
  ) => {
    try {
      event.preventDefault();
      //alert("Delete ID : " + statusid)
      const deleteSuccess = await axios
        .post("/deleteDepartmentByID", { departmentid })
        .then((res) => {
          alert("Delete Successfull");

          LoadallDepartments();

          const deleteLogs = new Logs(
            "Info",
            "Department Viewer",
            "Function /handleDelete",
            "Delete departmentID :  " +
              departmentid +
              "   Departmentname :  " +
              departmentname,
            userID
          );

          const request = axios.post("/log", deleteLogs.getLogs());
          const response = request.data;
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
      generate_PDF(departments, "Department");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Box px={3}>
      <Card height={694} position="relative">
        <TableContainer>
          {/*   state: { departmentID: '' } */}
          <Search
            setSearch={setSearch}
            handleReport={handleReport}
            pathname="/admin/department"
          />
          <Table size="lg">
            <Thead>
              <Tr>
                <Th>actions</Th>
                <Th>Department</Th>
                <Th>Description</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tables
                .filter((item) => {
                  const searchLower = search.toLowerCase();
                  const itemText = Object.values(item).join(" ").toLowerCase();
                  return search.toLowerCase() === ""
                    ? item
                    : itemText.includes(searchLower);
                })
                .map((department) => (
                  <Tr key={department.departmentDisplayID}>
                    <Td>
                      <ButtonGroup>
                        <Button
                          colorScheme="red"
                          onClick={(e) =>
                            handleDelete(
                              e,
                              department.departmentDisplayID,
                              department.departmentName
                            )
                          }
                        >
                          Delete
                        </Button>
                        <Button colorScheme="blue">
                          <Anchor
                            to={{
                              pathname: "/admin/department",
                              state: {
                                departmentID: department.departmentDisplayID,
                              },
                            }}
                          >
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
          <Pagination
            data={departments}
            currentPage={currentPage}
            nextPage={nextPage}
            prevPage={prevPage}
            currentNumber={currentNumber}
            pageNumber={pageNumber}
          />
        </TableContainer>
      </Card>
    </Box>
  );
}
