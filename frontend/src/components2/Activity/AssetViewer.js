/* -------------------------------------------------------------------------- */
/*                                See Info Below                              */
/*               Write Updates , Activities and Comments Below                */
/*                              Before Coding                                 */
/* -------------------------------------------------------------------------- */

/* 


    Date : 10 / 20 / 23
    Author : Nole
    Activities
    Purpose : 
      create AssetViewer.js

    Date : 10 / 22 / 23
    Author : Nole
    Activities 
      Update Load Assets and Delete Assets
      Add Assets PDF Report
    Pattern From John
      import Search from "components2/Search/Search";
      import Pagination from "components2/Pagination/Pagination";
 
*/

import { Link as Anchor } from "react-router-dom";
import Logs from "components/Utils/logs_helper";
import { useEffect, useState } from "react";
import axios from "axios";
import decoder from "jwt-decode";
import generate_PDF from "components/Utils/generate_PDF";

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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast

} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup } from "@chakra-ui/react";
import Card from "components/Card/Card";
import { Link } from "react-router-dom";
import generate_EXCEL from "components/Utils/generate_EXCEL";

export default function AssetViewer() {

  const toast = useToast()
  
  const [assets, setAssets] = useState([]);
  const [userdata, setUser] = useState({
    userID: "",
  });

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const tablePerPage = 6;
  const lastIndex = currentPage * tablePerPage;
  const firstIndex = lastIndex - tablePerPage;
  const tables = assets.slice(firstIndex, lastIndex);
  const tablePages = Math.ceil(assets.length / tablePerPage);
  const pageNumber = [...Array(tablePages + 1).keys()].slice(1);

  // const nextPage = () => {
  //   console.log("cureentpage", currentPage);
  //   if (currentPage !== tablePages) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  // const prevPage = () => {
  //   if (currentPage !== 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  // const currentNumber = (number) => {
  //   setCurrentPage(number);
  // };


  const SetUsers = async () => {
    const tokenStorage = localStorage.getItem("token");
    const tokenDecoded = decoder(tokenStorage);

    setUser({
      ...userdata,

      userID: tokenDecoded.result[0].userDisplayID,
    });
  };
  useEffect(() => {
    SetUsers();
    LoadAllAssets();
  }, []);

  const LoadAllAssets = async () => {
    try {
      const success = await axios
        .get("/asset/view-AllAssets")

        .then((res) => {
          setAssets(res.data.result);
        })
        .catch((err) => {
          const InsertLogs = new Logs(
            "Error",
            "PositionViewer",
            "Function /LoadAllPositions",
            "LoadAllPositions",
            userdata.userID
          );
        });
    } catch (err) {
      alert(err);
    }
  };

  const handleDelete = async (event, assetid, assetname,statname) => {
    try {
      event.preventDefault();

    

      const deleteSuccess = await axios
        .post("/asset/delete-AssetByID", { assetid })
        .then((res) => {
          alert("Delete succes");

          LoadAllAssets();

          const deleteLogs = new Logs(
            "Info",
            "Position Viewer",
            "Function /handleDelete",
            "Delete statusID :  " + assetid + "   Statusname :  " + assetname,
            userdata.userID
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
      generate_PDF(assets, "Assets");
    } catch (err) {
      alert(err);
    }
  };

  const handleExcelReport = () => {
    try {
      generate_EXCEL(assets, "Assets");
    } catch (err) {
      alert(err);
    }
  };

  const handleEdit = (e,statname) => {

  };


  return (
    <>
      <Stack>
        <Card>
          <TableContainer>
          

            <Search
              setSearch={setSearch}
              handleReport={handleReport}
              handleExcelReport = {handleExcelReport} 
              pathname="/admin/asset"
            />

            <Table size="lg">
              <Thead>
                <Tr>
                  <Th>Actions</Th>
                  <Th>Type</Th>
                  <Th>Status</Th>
                  <Th>Vendor</Th>
                  <Th>Serial No</Th>
                  <Th>Code</Th>
                  <Th>Name</Th>
                  <Th>Description</Th>
                  <Th>Purchase</Th>
                  <Th>Amount</Th>
                  <Th>Depreciated</Th>
                  <Th>Amount YR</Th>
                </Tr>
              </Thead>
              <Tbody>
                {assets.map((asset) => (
                  <Tr key={asset.id}>
                    <Td>
                      <ButtonGroup>
                        <Button
                          colorScheme="red"
                          onClick={(e) =>
                            handleDelete(e, asset.id, asset.assetName,asset.statusName)
                          }
                        >
                          Delete
                        </Button>
                        <Button colorScheme="blue"
                        onClick={(e) =>
                          handleEdit(e, asset.statusName)}
                        >
                          <Link
                            to={{
                              pathname: "/admin/asset",
                              state: { assetID: asset.id },
                            }}
                          >
                            Edit
                          </Link>
                        </Button>
                      </ButtonGroup>
                    </Td>

                    <Td>{asset.typeName}</Td>
                    <Td>{asset.statusName}</Td>
                    <Td>{asset.name}</Td>
                    <Td>{asset.serialNo}</Td>
                    <Td>{asset.assetCode}</Td>
                    <Td>{asset.assetName}</Td>
                    <Td>{asset.description}</Td>
                    <Td>{asset.date_purchase}</Td>
                    <Td>{asset.Amount}</Td>
                    <Td>{asset.date_depreciated}</Td>
                    <Td>{asset.AmountYR}</Td>
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
