/* 


    Date : 10 / 18 / 23
    Author : Nole
    Activities
    Purpose : 
      create SuppliersViewer.js


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
import Pagination from "components2/Pagination/Pagination";
import Search from "components2/Search/Search";

export default function SuppliersViewer() {
  var userID = "";

  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const tablePerPage = 6;
  const lastIndex = currentPage * tablePerPage;
  const firstIndex = lastIndex - tablePerPage;
  const tables = suppliers.slice(firstIndex, lastIndex);
  const tablePages = Math.ceil(suppliers.length / tablePerPage);
  const pageNumber = [...Array(tablePages + 1).keys()].slice(1);

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

  const currentNumber = (number) => {
    setCurrentPage(number);
  };

  useEffect(() => {
    LoadAllSuppliers();
  }, []);

  const LoadAllSuppliers = async () => {
    try {
      const tokenStorage = localStorage.getItem("token");
      const tokenDecoded = decoder(tokenStorage);

      userID = tokenDecoded.result[0].userDisplayID;

      const success = await axios
        .get("/suppliers/viewallsuppliers")

        .then((res) => {
          setSuppliers(res.data.result);
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

  const handleDelete = async (event, supplierid, suppliername) => {
    try {
      event.preventDefault();

      const deleteSuccess = await axios
        .post("/suppliers/deleteSupplier", { supplierid })
        .then((res) => {
          alert("Delete succes");

          LoadAllSuppliers();

          const deleteLogs = new Logs(
            "Info",
            "Position Viewer",
            "Function /handleDelete",
            "Delete statusID :  " +
              supplierid +
              "   Statusname :  " +
              suppliername,
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
      generate_PDF(suppliers, "Suppliers");
    } catch (err) {
      alert(err);
    }
  };

  const handleExcelReport = () => {
    try {
      generate_EXCEL(suppliers, "Suppliers");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <Stack>
        <Card height={694} position="relative">
          <TableContainer>
            {/* state: {supplierID:} */}
            <Search
              pathname="/admin/suppliers"
              setSearch={setSearch}
              handleReport={handleReport}
              handleExcelReport={handleExcelReport}
            />
            <Table size="lg">
              <Thead>
                <Tr>
                  <Th>Actions</Th>
                  <Th>Supplier</Th>
                  <Th>Address</Th>
                  <Th>Contact No</Th>
                  <Th>Email</Th>
                </Tr>
              </Thead>
              <Tbody>
                {tables
                  .filter((item) => {
                    const searchLower = search.toLowerCase();
                    const positionNameLower = item.supplierName.toLowerCase();
                    return search.toLowerCase() === ""
                      ? item
                      : positionNameLower.toLowerCase().includes(searchLower);
                  })
                  .map((supplier) => (
                    <Tr key={supplier.id}>
                      <Td>
                        <ButtonGroup>
                          <Button
                            colorScheme="red"
                            onClick={(e) =>
                              handleDelete(
                                e,
                                supplier.id,
                                supplier.supplierName
                              )
                            }
                          >
                            Delete
                          </Button>
                          <Button colorScheme="blue">
                            <Link
                              to={{
                                pathname: "/admin/suppliers",
                                state: { supplierID: supplier.id },
                              }}
                            >
                              Edit
                            </Link>
                          </Button>
                        </ButtonGroup>
                      </Td>
                      <Td>{supplier.supplierName}</Td>
                      <Td>{supplier.address}</Td>
                      <Td>{supplier.contactno}</Td>
                      <Td>{supplier.email}</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
            <Pagination
              data={suppliers}
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
