/* 



    Date : 10 / 19 / 23
    Author : Nole
    Activities
    Purpose : 
      create AssetCategoryViewer.js

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

import Search from "components2/Search/Search";
import Pagination from "components2/Pagination/Pagination";


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
import { textChangeRangeIsUnchanged } from "typescript";


export default function AssetCategoryViewer() {
  var userID = "";

  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const tablePerPage = 6;
  const lastIndex = currentPage * tablePerPage;
  const firstIndex = lastIndex - tablePerPage;
  const tables = categories.slice(firstIndex, lastIndex);
  const tablePages = Math.ceil(categories.length / tablePerPage);
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
    LoadAllCategories();
  }, []);

  const LoadAllCategories = async () => {
    try {
      const tokenStorage = localStorage.getItem("token");
      const tokenDecoded = decoder(tokenStorage);

      userID = tokenDecoded.result[0].userDisplayID;

      const success = await axios
        .get("/assetcategory/viewassetcategory")

        .then((res) => {
          setCategories(res.data.result);
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

  const handleDelete = async (event, asset_categoryid, asset_categoryname) => {
    try {
      event.preventDefault();

      const deleteSuccess = await axios
        .post("/assetcategory/deleteassetcategory", { asset_categoryid })

        .then((res) => {
          alert("Delete succes");

          LoadAllCategories();

          const deleteLogs = new Logs(
            "Info",
            "Position Viewer",
            "Function /handleDelete",
            "Delete statusID :  " +
              asset_categoryid +
              "   Statusname :  " +
              asset_categoryname,
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
      console.log(categories);
      generate_PDF(categories, "Asset Category");
    } catch (err) {
      alert(err);
    }
  };

  const handleExcelReport = () => {
    try {
      generate_EXCEL(categories, "Asset Category");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <Stack>
        <Card height={694} position="relative">
          <TableContainer>
            {/*   to={{
                  pathname: "/admin/assetcategory",

                  state: { categoryID: '' },
                  }}> */}
            <Search
              setSearch={setSearch}
              handleReport={handleReport}
              handleExcelReport={handleExcelReport}
              pathname="/admin/assetcategory"
            />

            <Table size="lg">
              <Thead>
                <Tr>
                  <Th>Actions</Th>
                  <Th>Asset Category</Th>
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
                  .map((category) => (
                    <Tr key={category.id}>
                      <Td>
                        <ButtonGroup>
                          <Button
                            colorScheme="red"
                            onClick={(e) =>
                              handleDelete(
                                e,
                                category.id,
                                category.assetCategName
                              )
                            }
                          >
                            Delete
                          </Button>
                          <Button colorScheme="blue">
                            <Link
                              to={{
                                pathname: "/admin/assetcategory/" + category.id ,
                                state: { categoryID: category.id },
                              }}
                            >
                              Edit
                            </Link>
                          </Button>
                        </ButtonGroup>
                      </Td>
                      <Td>{category.assetCategName}</Td>
                      <Td>{category.description}</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>

            <Pagination
              data={categories}
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
