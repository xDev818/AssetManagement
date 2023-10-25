/* -------------------------------------------------------------------------- */
/*                                See Info Below                              */
/*               Write Updates , Activities and Comments Below                */
/*                              Before Coding                                 */
/* -------------------------------------------------------------------------- */

/* 


    Date : 10 / 26 / 23
    Author : Nole
    Activities
    Purpose : 
      create User Checkin Viewer

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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  StatLabel,

} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup } from "@chakra-ui/react";
import Card from "components/Card/Card";
import { Link } from "react-router-dom";

export default function UserCheckin_Viewer() {
  

  const [assets, setAssets] = useState([]);
 
  const [userdata,setUser] = useState({
    userid : '',
    deptid:'',
    positionid:''
  });

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const tablePerPage = 6;
  const lastIndex = currentPage * tablePerPage;
  const firstIndex = lastIndex - tablePerPage;
  //const tables = assets.slice(firstIndex, lastIndex);
 // const tablePages = Math.ceil(assets.length / tablePerPage);
 // const pageNumber = [...Array(tablePages + 1).keys()].slice(1);

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

  const SetUsers = async () => {
    const tokenStorage = localStorage.getItem("token");
    const tokenDecoded = decoder(tokenStorage);

  
    setUser({
      ...userdata,

      userid: tokenDecoded.result[0].userDisplayID,
      deptid: tokenDecoded.result[0].departmentDisplayID,
      positionid : tokenDecoded.result[0].positionID


    });
  };
  useEffect(() => {
    SetUsers();
    LoadAllAssetsCheckout();
  }, []);

  const LoadAllAssetsCheckout = async () => {
    try {
      const success = await axios
        .get("/assetcheckout/get-assetcheckout-byIT")

        .then((res) => {
          setAssets(res.data.result);
          console.log(assets)
        })
        .catch((err) => {
          const InsertLogs = new Logs(
            "Error",
            "PositionViewer",
            "Function /LoadAllPositions",
            "LoadAllPositions",
            userdata.userid
          );
        });
    } catch (err) {
      alert(err);
    }
  };

  const handleReport = () => {
    try {
      generate_PDF(assets, "CheckIn");
    } catch (err) {
      alert(err);
    }
  };

  const handleExcelReport = () => {
    try {
      generate_EXCEL(assets, "CheckIn");
    } catch (err) {
      alert(err);
    }
  };

  // // No need to routes to server
  // const handleGenerateReceiving = (docref) => {
  //     try {
  //           generate_PDF(assets, "Receiving",docref)
  //     } catch(err) {

  //     }
  // }
  const handleReceiving = async (e,detailID,active) => {
      return <Button>
                Test
            </Button>
    // try {
    //     e.preventDefault()
       
    //     if( active == 0) {
    //         const success = await axios.post("/assetcheckout/activate-receiving",{detailID})

    //         .then((res) => {
    //           alert("activate successful")
    //           LoadAllAssetsCheckout()
    //         })
    //         .catch((err) => {
    //           const InsertLogs = new Logs(
    //             "Error",
    //             "PositionViewer",
    //             "Function /LoadAllPositions",
    //             "LoadAllPositions",
    //             userdata.userid
    //           );
    //         });
    //     } else {
    //       alert("already activated")
    //     }

    // } catch (err) {
    //   alert(err);
    // }
  };


  return (
    <>
      <Stack>
        <Card>
          <TableContainer>
            {/* <ButtonGroup spacing={6}>
            <Button
              colorScheme='messenger'
            >
              <Anchor
                  to={{
                  pathname: "/admin/asset",
                  state: { assetID: '' },
                  }}>
                New
              </Anchor>

            </Button>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme='green'>
                Report
              </MenuButton>
              <MenuList>
                <MenuItem   onClick={handleReport}  colorScheme='green'>PDF </MenuItem>
                <MenuItem   colorScheme='green' >Excel</MenuItem>
                
              </MenuList>
          </Menu>
 
            </ButtonGroup> */}

            <Search
              setSearch={setSearch}
              handleReport={handleReport}
              handleExcelReport = {handleExcelReport}
              pathname="/admin/checkout"
            />
        
            <Table size="lg">
              <Thead>
                <Tr>
                  <Th>Status</Th>
                  <Th>Ref No</Th>
                  <Th>Type</Th>
                  <Th>Serial No</Th>
                  <Th>Code</Th>
                  <Th>Name</Th>
                  <Th>Department</Th>
                  <Th>Checkout Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {assets.map((asset) => (
                  <Tr key={asset.detailID}>
                    <Td>
                      <ButtonGroup>
                        
                        <Button
                          colorScheme="green"

                          onClick={(e) =>
                            handleReceiving( e,asset.detailID,asset.active_checkin)}
                        >
                        {asset.statusName}
                        </Button>
                      </ButtonGroup>
                    </Td>
                    <Td>{asset.docRef_Checkin}</Td>
                    <Td>{asset.typeName}</Td>
                    <Td>{asset.serialNo}</Td>
                    <Td>{asset.assetCode}</Td>
                    <Td>{asset.assetName}</Td>
                    <Td>{asset.departmentName}</Td>
                    <Td>{asset.date_checkout}</Td>

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
